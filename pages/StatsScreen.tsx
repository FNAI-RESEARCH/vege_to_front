import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import DropDownPicker from 'react-native-dropdown-picker';

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import BottomNavigation from './BottomNavigation'; // Import the BottomNavigation component

const ingredientIcons=[
    {
        id: 0, 
        name: "토마토",
        src: require("../assets/vege_to_you/ingredients/tomato.png")
    },
    {
        id: 1, 
        name: "적채",
        src: require("../assets/vege_to_you/ingredients/red_cabbage.png")
    },
    {
        id: 2, 
        name: "비트",
        src: require("../assets/vege_to_you/ingredients/beet.png")
    },
    {
        id: 3, 
        name: "당근",
        src: require("../assets/vege_to_you/ingredients/carrot.png")
    },
    {
        id: 4, 
        name: "파프리카",
        src: require("../assets/vege_to_you/ingredients/paprika.png")
    },
    {
        id: 5, 
        name: "호박",
        src: require("../assets/vege_to_you/ingredients/pumpkin.png")
    },
    {
        id: 6, 
        name: "시금치",
        src: require("../assets/vege_to_you/ingredients/spinach.png")
    },
    {
        id: 7, 
        name: "브로콜리",
        src: require("../assets/vege_to_you/ingredients/broccoli.png")
    },
    {
        id: 8, 
        name: "피망",
        src: require("../assets/vege_to_you/ingredients/bell_pepper.png")
    },
    {
        id: 9, 
        name: "콜라비",
        src: require("../assets/vege_to_you/ingredients/kohlrabi.png")
    },
    {
        id: 10, 
        name: "자색고구마",
        src: require("../assets/vege_to_you/ingredients/sweet_potato.png")
    },
    {
        id: 11, 
        name: "가지",
        src: require("../assets/vege_to_you/ingredients/eggplant.png")
    },
    {
        id: 12, 
        name: "무",
        src: require("../assets/vege_to_you/ingredients/daikon.png")
    },
    {
        id: 13, 
        name: "콜리플라워",
        src: require("../assets/vege_to_you/ingredients/cauliflower.png")
    },
    {
        id: 14, 
        name: "양파",
        src: require("../assets/vege_to_you/ingredients/onion.png")
    }
]

const ingredientIconsRed=[
    {
        name: "토마토",
        src: require("../assets/vege_to_you/ingredients/tomato.png")
    },
    {
        name: "적채",
        src: require("../assets/vege_to_you/ingredients/red_cabbage.png")
    },
    {
        name: "비트",
        src: require("../assets/vege_to_you/ingredients/beet.png")
    }
]

const ingredientIconsYellow=[
    {
        name: "당근",
        src: require("../assets/vege_to_you/ingredients/carrot.png")
    },
    {
        name: "파프리카",
        src: require("../assets/vege_to_you/ingredients/paprika.png")
    },
    {
        name: "호박",
        src: require("../assets/vege_to_you/ingredients/pumpkin.png")
    }
]

const ingredientIconsGreen=[
    {
        name: "시금치",
        src: require("../assets/vege_to_you/ingredients/spinach.png")
    },
    {
        name: "브로콜리",
        src: require("../assets/vege_to_you/ingredients/broccoli.png")
    },
    {
        name: "피망",
        src: require("../assets/vege_to_you/ingredients/bell_pepper.png")
    },
]

const ingredientIconsPurple=[
    {
        name: "콜라비",
        src: require("../assets/vege_to_you/ingredients/kohlrabi.png")
    },
    {
        name: "자색고구마",
        src: require("../assets/vege_to_you/ingredients/sweet_potato.png")
    },
    {
        name: "가지",
        src: require("../assets/vege_to_you/ingredients/eggplant.png")
    },
]

const ingredientIconsWhite=[
    {
        name: "무",
        src: require("../assets/vege_to_you/ingredients/daikon.png")
    },
    {
        name: "콜리플라워",
        src: require("../assets/vege_to_you/ingredients/cauliflower.png")
    },
    {
        name: "양파",
        src: require("../assets/vege_to_you/ingredients/onion.png")
    }
]

const recommendIcon=require("../assets/vege_to_you/stats_icon.png")

export default function StatsScreen({ navigation, category }) {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    
    const [index, setIndex]=useState(2);

    const loadSelectedIngredients = async () => {
        try {
          const savedIngredients = await AsyncStorage.getItem('allIngredients');
          if (savedIngredients) {
            setSelectedIngredients(JSON.parse(savedIngredients));
          }
        } catch (error) {
          console.error('Error loading selectedIngredients:', error);
        }
    };

    const saveSelectedIngredients = async () => {
        try {
          await AsyncStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
        } catch (error) {
          console.error('Error saving selectedIngredients:', error);
        }
      };

      useEffect(() => {
        loadSelectedIngredients();
    }, []); 

    const [open, setOpen]=useState(false);
    const [value, setValue]=useState(null);
    const [items, setItems]=useState([{label: "하루", value: "1"}, {label: "삼일", value: 2}, {label: "일주일", value: 3}]);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.upperSpace}>
            <Text style={styles.homeTxt}>
                얼마나 먹었을까요?
            </Text>
        </View>
        <View style={{zIndex: 1}}>
            <DropDownPicker
                style={{minHeight: 30, marginBottom: "3%", fontSize: 18}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="일주일"
                placeholderStyle={{fontSize: 18}}
                containerStyle={{width: "28%", marginLeft: "3%", marginBottom: "3%", fontSize: 18}}
            />
        </View>
            <View   
                style={{   
                flexDirection: "row",
                marginBottom: "3%",
                marginLeft: "2%"
            }}>
                {selectedIngredients.map((ingredient, index) => {
                    /*const ingredient = ingredientIcons.find(item => item.name === ingredientName);
                    if (ingredient) {
                        return (
                            <View 
                                key={index}
                                style={{
                                    alignItems: "center",
                                    paddingHorizontal: "2%",
                                    marginTop : "3%",
                                }}
                                >
                                <Image 
                                style={{
                                    height: 45,
                                    width: 45,
                                    marginBottom: "20%",
                                }}
                                source={ingredient.src} />
                            </View>
                        );
                    } else {
                        return null; 
                    }*/
                    let icon = null;
                    if (ingredientIconsRed.find((item) => item.name === ingredient)) {
                        icon = ingredientIconsRed.find((item) => item.name === ingredient).src;
                    } else {
                        icon = null;
                    }
            
                    if (icon!=null) {
                        return (
                            <View key={index} style={{paddingHorizontal: "1%"}}>
                            <Image source={icon} style={{ width: 45, height: 45}} />
                            </View>
                        ); } else {
                            return null;
                        }   
                })}  
                </View>
                <View style={{
                    flexDirection: "row",
                    marginBottom: "3%",
                    marginLeft: "2%"
                    }}> 
                {selectedIngredients.map((ingredient, index) => {
                    let icon = null;

                    if (ingredientIconsYellow.find((item) => item.name === ingredient)) {
                        icon = ingredientIconsYellow.find((item) => item.name === ingredient).src;
                    } else {
                        icon = null;
                    }
        
                    if (icon!=null) {
                        return (
                            <View key={index} style={{paddingHorizontal: "1%"}}>
                            <Image source={icon} style={{ width: 45, height: 45}} />
                            </View>
                        ); } else {
                            return null;
                        }    
                })}  
                </View>
                <View style={{
                    flexDirection: "row",
                    marginBottom: "3%",
                    marginLeft: "2%"
                    }}> 
                {selectedIngredients.map((ingredient, index) => {
                    let icon = null;

                    if (ingredientIconsGreen.find((item) => item.name === ingredient)) {
                        icon = ingredientIconsGreen.find((item) => item.name === ingredient).src;
                    } else {
                        icon = null;
                    }
                    if (icon!=null) {
                    return (
                        <View key={index} style={{paddingHorizontal: "1%"}}>
                        <Image source={icon} style={{ width: 45, height: 45}} />
                        </View>
                    ); } else {
                        return null;
                    } 
                })}  
                </View>
                <View style={{
                    flexDirection: "row",
                    marginBottom: "3%",
                    marginLeft: "2%"
                    }}> 
                {selectedIngredients.map((ingredient, index) => {
                    let icon = null;

                    if (ingredientIconsPurple.find((item) => item.name === ingredient)) {
                        icon = ingredientIconsPurple.find((item) => item.name === ingredient).src;
                    } else {
                        icon = null;
                    }
        
                    if (icon!=null) {
                        return (
                            <View key={index} style={{paddingHorizontal: "1%"}}>
                            <Image source={icon} style={{ width: 45, height: 45}} />
                            </View>
                        ); } else {
                            return null;
                        }    
                })}  
                </View>
                <View style={{
                    flexDirection: "row",
                    marginLeft: "2%"
                    }}> 
                {selectedIngredients.map((ingredient, index) => {
                    let icon = null;

                    if (ingredientIconsWhite.find((item) => item.name === ingredient)) {
                        icon = ingredientIconsWhite.find((item) => item.name === ingredient).src;
                    } else {
                        icon = null;
                    }
        
                    if (icon!=null) {
                        return (
                            <View key={index} style={{paddingHorizontal: "1%"}}>
                            <Image source={icon} style={{ width: 45, height: 45}} />
                            </View>
                        ); } else {
                            return null;
                        }   
                })}  
                </View>
    
        <View style={{alignItems: "center"}}>
        <View style={[styles.upperSpace, {marginTop: "5%",marginBottom: "3%"}]}>
            <Image 
                style={{height: 40, width: 40}}
                source={recommendIcon}/>
            <Text style={styles.homeTxt}>
                다음은 무얼 먹을까?
            </Text>
        </View>
        <View style={styles.recommendBoard}/>
        <View style={{height: "10%"}}/>
        <TouchableOpacity style={styles.moreRecommend}>
            <Text style={styles.rcmBtnTxt}>
                추천 레시피 더보기
            </Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={{
                position: "absolute",
                flexDirection: "row",
                alignContent: "space-around",
                bottom: "1%",
                alignItems: "center"
            }}>
        <BottomNavigation navigation={navigation} selectedIndex={index} />
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        //position: "absolute",
        flex: 1,
        //alignItems: "center",
        marginTop: 30,
        backgroundColor: "white",
    },
    upperSpace: {
        flexDirection: "row",
        //alignItems: "center"
    },
    homeTxt: {
        //fontfamily: Inter,
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "400",
        alignItems: "flex-start",
        marginTop: "3%",
        marginLeft: "4%",
        marginBottom: "2%"
        //position: "absolute",
        //lineHeight: "normal",
    },
    plusBtn: {
        left: "400%",
        width: 38,
        height: 38,
    },
    ingreColorTxt: {
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "400",   
        marginLeft: "4%", 
        marginBottom: "2%"
    },
    ingreTxt: {
        fontSize: 12,
        alignSelf: "center"
    },
    globalMenuContainer: {
        //bottom: "-53%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        marginBottom: "7%"
        //marginLeft: "4%"
    },
    globalIcons: {
        height: 38,
        width: 38,
    },
    checkBtn: {
        width: 173,
        height: 37,
        color: "#225C21",
        // opacity: 
        //     ingredientsList[idx]
        //     ? 1 
        //     : 0.3
    },
    recommendBoard: {
        width: "80%",
        height: 130,
        borderRadius: 20,
        backgroundColor: "#EBEBEB"
    },
    moreRecommend: {
        width: "70%",
        height: 40,
        borderRadius: 15,
        backgroundColor: "#225C21",
        alignContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    rcmBtnTxt: {
        fontSize: 24,
        color: "white"
    }
});
