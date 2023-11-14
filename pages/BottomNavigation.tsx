import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, useState } from 'react-native';

const profileBtn=require("../assets/vege_to_you/profile.png");
const homeBtn=require("../assets/vege_to_you/homeBtn.png");
const statsBtn=require("../assets/vege_to_you/statistics.png");
const bookmarkBtn=require("../assets/vege_to_you/bookmarkBtn.png");

//const [naviPos, setNaviPos]=useState("-33%");

const BottomNavigation = ({ navigation, selectedIndex }) => {
  
  const mainNaviList = [
    {
      id: 0,
      category: "profile",
      src: profileBtn
    },
    {
      id: 1,
      category: "Home",
      src: homeBtn
    },
    {
      id: 2,
      category: "Statistics",
      src: statsBtn
    },
    {
      id: 3,
      category: "bookMark",
      src: bookmarkBtn
    }
  ];

  /*const changeId=(id)=>{
    id==0?
        setNaviPos("-33%")
        : id==1?
            setNaviPos("-33%")
            : id==2?
                setNaviPos("2%")
                : setNaviPos("-33%")
  }*/

  return (
    <View style={[styles.container, {
        //bottom: naviPos
        }]}>
      {mainNaviList.map((list) => (
        <TouchableOpacity
          key={list.id}
          style={styles.menuItem}
          onPress={() => {
            //changeId(list.id)
            navigation.navigate(list.category);
          }}
        >
          <Image
            style={{
              width: 38,
              height: 38,
              opacity: selectedIndex === list.id ? 1 : 0.3
            }}
            source={list.src}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: "2%"
  },
  menuItem: {
    //flexDirection: "column",
    paddingHorizontal: "7%",
    paddingTop: "3%",
    paddingBottom: "3%",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default BottomNavigation;
