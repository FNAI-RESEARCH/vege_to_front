  import React from 'react'
  import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Image
  } from 'react-native'

  import allergyIcons from '../data/allergyIcons'

const ProfilePage = ({route}) => {
  const {name, gender, birth} = route.params

  const allergies = JSON.parse(route.params.allergy)

  return (
    <SafeAreaView style={{width: "100%"}}>
      <Text style={styles.profileTextItem}>
        프로필 이름: {name}
      </Text>
      <Text style={styles.profileTextItem}>
        성별 : {gender}
      </Text>
      <Text style={styles.profileTextItem}>
        생년월일: {new Date(birth).toLocaleDateString()}
      </Text>
      <Text style={styles.profileTextItem}>
        나의 알려지 목록
      </Text>
      <View style={styles.allergiesContainer}>
        {allergies.map((allergyName, index) => {
          const allergyItem = allergyIcons.find(item => item.name === allergyName)
          return (
            <View key={index} style={styles.allergyItemContainer}>
              <Image
                style={styles.allergyIcon}
                source={allergyItem.src} />
              <Text style={styles.allergyItemName}>
                {allergyName}
              </Text>
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileTextItem: {
    marginTop: 5,
    fontSize: 20,
  },
  allergiesContainer: {
    marginTop: 20,
    width: "100%",
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
})

export default ProfilePage;