
import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native'

import { getUniqueId } from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';

const ProfileListPage = ({navigation}) => {

  const [selectedIndex, setSelctedIndex] = useState(null)
  const [profiles, setProfiles] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    getUniqueId()
      .then((uniqueId) => {
        return fetch(`https://vegetoyou.com/member/${uniqueId}`)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.profiles) {
          setProfiles(json.profiles)
        }
        
      })
      .catch(error => {
        console.log(error);
        Alert.alert(`Error: ${error}`);
      })
  }, [isFocused])

  const handleTouchAddProfile = () => {
    console.log("haha")
    navigation.navigate("CreateProfile")
  }

  const handleStartPressed = () => {
    if (selectedIndex === null) {
      return
    }

    const selectedProfile = profiles[selectedIndex]

    navigation.navigate("Profile", selectedProfile)
  }

  const handleSelectProfile = (index) => {
    setSelctedIndex(index)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileList}>
        <Text style={styles.titleText}>
          프 로 필
        </Text>
        {
          profiles.map((profile, index) => {
            return (
              <View key={index}
                style={{
                  ...((index === selectedIndex) ? styles.profileSelectIndicator : {}),
                  ...styles.profileItemContainerDefault
                }}
              >
                <Pressable style={styles.profileItem} 
                  onPress={() => handleSelectProfile(index)}
                >
                  <Image 
                    style={{
                      ...styles.avartarIcon
                    }}
                    source={require('../img/character_green_avartar.png')} />
                  <Text style={styles.profileName}>{profile.name}</Text>
                </Pressable>
              </View>
            )
          })
        }
        <TouchableOpacity onPress={handleTouchAddProfile}>
          <Image 
            style={styles.loginIcon}
            source={require('../img/plus_button_icon.png')} />
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity style={styles.enterButton}
        onPress={handleStartPressed}
      >
        <Text style={styles.enterButtonTitle}>입장하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    padding: 30 
  },
  profileList: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexGrow: 1
  },
  profileSelectIndicator: {
    backgroundColor: "#EBFF00",
    borderColor: "#EBFF00",
    borderRadius: 20
  },
  profileItemContainerDefault: {
    padding: 10
  },
  profileItem: {
    backgroundColor: "#ffffff",
    width: "80%",
    padding: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderStyle:"solid",
    borderRadius: 15,
  },
  profileName: {
    marginLeft: 20,
    fontSize: 30,
    textAlign: "center"
  },
  titleText: {
    marginTop: 50,
    fontSize: 30
  },
  avartarIcon: {
    
  },
  loginIcon: {
    marginTop: 30
  },
  enterButton: {
    backgroundColor: "#225C21",
    padding: 10,
    borderRadius: 10,
    width: 173
  },
  enterButtonTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center"
  }
});

export default ProfileListPage;