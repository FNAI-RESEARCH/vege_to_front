
import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { getUniqueId } from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';

const ProfileListPage = ({navigation}) => {

  const [profiles, setProfiles] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    

    getUniqueId()
      .then((uniqueId) => {
        return fetch(`http://54.180.173.143/member/${uniqueId}`)
      })
      .then(response => response.json())
      .then(json => {
        // console.log(`response: ${JSON.stringify(json)}`)
        // console.log(`profiles: ${JSON.stringify(json.profiles, null, 2)}`)
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileList}>
        <Text style={styles.titleText}>
          프 로 필
        </Text>
        {
          profiles.map((profile, index) => {
            return (
              <TouchableOpacity style={styles.profileItem} key={index}>
                <Image 
                  style={styles.avartarIcon}
                  source={require('../img/character_green_avartar.png')} />
                <Text style={styles.profileName}>{profile.name}</Text>
              </TouchableOpacity>
            )
          })
        }
        <TouchableOpacity onPress={handleTouchAddProfile}>
          <Image 
            style={styles.loginIcon}
            source={require('../img/plus_button_icon.png')} />
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity style={styles.enterButton}>
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
  profileItem: {
    marginTop: 20,
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