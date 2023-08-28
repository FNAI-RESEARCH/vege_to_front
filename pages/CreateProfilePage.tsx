import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

import allergyIcons from '../data/allergyIcons'

import { getUniqueId } from 'react-native-device-info';

const CreateProfilePage = ({ navigation }) => {

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [allergyCheckList, setAllergyCheckList] = useState(Array(allergyIcons.length).fill(false))

  const checkAllergy = (index: Int32) => {
    let previousValue = allergyCheckList[index];
    console.log(previousValue);
    allergyCheckList[index] = !previousValue;

    setAllergyCheckList([...allergyCheckList]);
  }

  const handleBirthDateChage = (inputText) => {
    const numericInput = inputText.replace(/[^\d]/g, '');

    if (numericInput.length <= 8) {
      // Format the input as YYYY-MM-DD
      const formattedInput = numericInput
        .replace(/(\d{4})(\d{2})?(\d{2})?/, '$1-$2-$3')
        .replace(/(-)$/, '');

        setBirthDate(formattedInput);
    }
  }

  const handleSaveButtonPressed = () => {
    const allergyList = []
    allergyCheckList.forEach((checked, i) => {
      if (checked) {
        allergyList.push(allergyIcons[i].name)
      }
    })

    console.log(allergyList)
    
    getUniqueId()
      .then((uniqueId) => {
        return fetch(`https://vegetoyou.com/member/create?device_ID=${uniqueId}`,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            name,
            birth: new Date(birthDate).getTime(),
            gender,
            allergy: JSON.stringify(allergyList)
          }),
        })
      })
      .then(response => response.json())
      .then(json => {
        
        console.log(`response: ${JSON.stringify(json)}`)
        Alert.alert(`프로파일이 성공적으로 만들어 졌어요!`);
        
      })
      .catch(error => {
        console.log(error);
        Alert.alert(`error: ${error}`);
      })

    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: "center"}}>
        <Image
          style={styles.avartarIcon}
          source={require('../img/character_green_avartar.png')} />
        <View style={styles.profileInputContainer}>
          <TextInput style={{
              opacity: 0.3,
              ...styles.inputStyle
            }}
            value={name}
            onChangeText={(newValue) => setName(newValue)}
            placeholder="프로필명"
          />
          
          <TextInput style={styles.inputStyle}
            value={birthDate}
            onChangeText={handleBirthDateChage}
            placeholder='생년월일'
            keyboardType="numeric"
          />
          
          <TextInput
            value={gender}
            onChangeText={(v) => setGender(v)} 
            style={styles.inputStyle}
            placeholder='성별'
          />
        </View>

        <Text style={styles.instructionText}>
          알레르기가 있는 식품을 체크해주세요.
        </Text>
        <View style={styles.allergiesContainer}>
          {
            allergyIcons.map((alleryItem, idx) => {
              return (
                <Pressable key={idx} style={styles.allergyItemContainer}
                  onPress={() => checkAllergy(idx)}
                >
                  <Image
                    style={{
                      opacity: allergyCheckList[idx] ? 1.0 : 0.3,
                      ...styles.allergyIcon
                    }}
                    source={alleryItem.src} />
                  <Text style={styles.allergyItemName}>{alleryItem.name}</Text>
                </Pressable>
              ) 
            })
          }
        </View>
        </ScrollView>
        <TouchableOpacity style={styles.saveButton}
          onPress={handleSaveButtonPressed}
        >
          <Text style={styles.saveButtonTitle}>
            저 장
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20,
    alignItems: "center"

  },
  avartarIcon: {
    width: 87,
    height: 100
  },
  profileInputContainer: {
    alignItems: "flex-start"
  },
  inputStyle: {
    marginTop: 10,
    fontSize: 20,
    height: 40,
    width: 200,
    borderBottomWidth: 1,
  },
  instructionText: {
    marginTop: 42, 
    fontSize: 20
  },
  allergiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 15
  },
  allergyItemContainer: {
    width: 65,
    margin: 10
  },
  allergyIcon: {
    width: 65,
    height: 65
    
  },
  allergyItemName: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 12
  },
  saveButton: {
    backgroundColor: "#225C21",
    borderRadius: 10,
    height: 45,
    width: 173,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  saveButtonTitle: {
    fontSize: 24,
    color: "#ffffff"
    
  }
});

export default CreateProfilePage;