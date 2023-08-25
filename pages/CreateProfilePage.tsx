import React, { useState } from 'react';
import {
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
import DeviceInfo from 'react-native-device-info';

const allergyIcons = [
  {
    name: "난류(가금류)",
    src: require('../img/allergy/egg_icon_02.png'),
  },
  {
    name: "소고기",
    src: require('../img/allergy/beef_icon_02.png'),
  },
  { 
    name: "돼지고기",
    src: require('../img/allergy/pork_icon_02.png') 
  },
  { 
    name: "닭고기",
    src: require('../img/allergy/turkey_icon_02.png') 
  },
  
  { 
    name: "새우",
    src: require('../img/allergy/shirimp_icon.png') 
  },
  { 
    name: "게",
    src: require('../img/allergy/crab_icon.png') 
  },
  { 
    name: "오징어",
    src: require('../img/allergy/squid_icon.png') 
  },
  { 
    name: "고등어",
    src: require('../img/allergy/mackerel_icon.png') 
  },
  { 
    name: "조개류(홍합, 굴, 전복포함)",
    src: require('../img/allergy/clam_icon.png') 
  },
  { 
    name: "우유",
    src: require('../img/allergy/milk_icon.png') 
  },
  { 
    name: "땅콩",
    src: require('../img/allergy/peanut_icon.png') 
  },
  { 
    name: "호두",
    src: require('../img/allergy/walnut_icon.png') 
  },

  { 
    name: "잣",
    src: require('../img/allergy/pine_nut_icon.png') 
  },
  { 
    name: "대두",
    src: require('../img/allergy/soyabean_icon.png') 
  },
  { 
    name: "복숭아",
    src: require('../img/allergy/peach_icon.png') 
  },
  { 
    name: "토마토",
    src: require('../img/allergy/tomato_icon.png') 
  },

  { 
    name: "밀",
    src: require('../img/allergy/wheat_sack_icon.png') 
  },
  { 
    name: "메밀",
    src: require('../img/allergy/buckwheat_icon.png') 
  },
  { 
    name: "이황산류",
    src: require('../img/allergy/wine_bottle_icon.png') 
  }
]

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
        console.log(`DeviceId : ${uniqueId}`)
        return fetch(`http://54.180.173.143/member/create?device_ID=${uniqueId}`,{
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
      })
      .catch(error => {
        console.log(error);
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
            onChangeText={(newValue) => setBirthDate(newValue)}
            placeholder='생년월일'
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