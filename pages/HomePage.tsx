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

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import BottomNavigation from './BottomNavigation'; // Import the BottomNavigation component

//import ingredientIcons from '../components/matchIngredients'

//import selectedIngredients from './ChooseIngredients';
//import useSelectedIngredients from './SelectedIngredientsState';
//import returnIngredients from './ChooseIngredients';

const homeIllust=require("../assets/vege_to_you/home_salad.png");
const plusBtn=require("../assets/vege_to_you/plusBtn.png");
const profileBtn=require("../assets/vege_to_you/profile.png");
const homeBtn=require("../assets/vege_to_you/homeBtn.png");
const statsBtn=require("../assets/vege_to_you/statistics.png");
const bookmarkBtn=require("../assets/vege_to_you/bookmarkBtn.png");

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

export default function HomePage({navigation, category}){

    const [index, setIndex] = useState(1);
    const [chosenIngredients, setChosenIngredients]=useState(false);
    const [selectedIngredients, setSelectedIngredients]=useState([]);
    const [clearIngredients, setClearIngredients]=useState([]);
    //const [selectedStates, setSelectedStates] = useState(Array(selectedIngredients.length).fill(false));
    const [selectedIngredientIndex, setSelectedIngredientIndex] = useState(-1);
    const [isClear, setClear]=useState(false);

    /*if(selectedIngredients.length>0){
        setChosenIngredients(true);
    }*/

    const handleTouchPlus=()=>{
        console.log("플러스 버튼 눌렀어!");
        console.log(selectedIngredients.length);
        navigation.navigate("Ingredients");
    }

    const loadSelectedIngredients = async () => {
        try {
          const savedIngredients = await AsyncStorage.getItem('selectedIngredients');
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

    const chkSelectedLength = () => {
        if(selectedIngredients.length>0){
            return true;
        }else
            return false;
    };

    useEffect(() => {
        loadSelectedIngredients();
    }); 

    useEffect(() => {
        saveSelectedIngredients();
        setClear(false);
    }, [isClear]); 


    return(
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
            <View style={styles.upperSpace}>
                <Text style={styles.homeTxt}>
                    홈
                </Text>
                <TouchableOpacity
                    onPress={handleTouchPlus}>
                    <Image 
                        style={styles.plusBtn}
                        source={plusBtn}/>
                </TouchableOpacity>
            </View>
            {  selectedIngredients.length>0 ? 
            (
            <View>
            <View style={{alignItems: "center"}}>
                <View   
                style={{   
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                {selectedIngredients.map((ingredientName, index) => {
                    const ingredient = ingredientIcons.find(item => item.name === ingredientName);
                    const isSelected = selectedIngredientIndex === index;
                    if (ingredient) {
                        return (
                            <TouchableOpacity 
                                key={index}
                                style={{
                                    alignItems: "center",
                                    paddingHorizontal: isSelected ? "2%" : "5%",
                                    marginTop : isSelected? "4%" : "8%",
                                    borderWidth: isSelected ? 10 : 0,
                                    borderColor: isSelected ? "#EBFF00" : "transparent"
                                }}
                                onPress={() => {
                                    setSelectedIngredientIndex(isSelected ? -1 : index);
                                }}
                                >
                                <Image 
                                style={{
                                    height: 50,
                                    width: 50,
                                    marginBottom: "20%",
                                }}
                                source={ingredient.src} />
                                <Text>{ingredient.name}</Text>
                            </TouchableOpacity>
                        );
                    } else {
                        return null; 
                    }
                })}    
                </View>  
                <View style={{position: "absolute", bottom: "0%", alignItems: "center"}}>       
                    <TouchableOpacity 
                        style={styles.afterMeal}
                        onPress={()=>{
                            setSelectedIngredients([]);
                            saveSelectedIngredients();
                            setClear(true);
                            //console.log(selectedIngredients)
                    }}>
                        <Text style={styles.afterMealTxt}>
                            잘 먹었습니다!
                        </Text>
                    </TouchableOpacity>
            </View>
            </View>
            </View>
            )
            : (
            <View style={{alignItems: "center"}}>
                <View style={{height: "45%"}}/>
                <Image source={homeIllust}/>
                <Text style={styles.guideTxt}>
                    접시에 채소를 담아주세요!
                </Text>
            </View>
            )
            }
            </View>
            <View style={{
                position: "absolute",
                flexDirection: "row",
                bottom: "1%",
                alignItems: "center"}}
            >
            <BottomNavigation 
            navigation={navigation} 
            selectedIndex={index} />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: "center",
        marginTop: 30,
        backgroundColor: "white",
    },
    upperSpace: {
        flexDirection: "row",
        marginTop: "3%"
    },
    homeTxt: {
        //fontfamily: Inter,
        fontSize: 33,
        fontStyle: "normal",
        fontWeight: "400",
        alignItems: "center",
        position: "absolute",
        marginTop: "1%"
        //lineHeight: "normal",
    },
    plusBtn: {
        left: "440%",
        width: 35,
        height: 35,
        marginTop: "1%"
    },
    guideTxt: {
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "400",   
        color: "#767070",
        marginTop: "5%", 
    },
    globalMenuContainer: {
        bottom: "-40%",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-around",
    },
    globalIcons: {
        height: 38,
        width: 38,
    },
    afterMeal: {
        bottom: "-1250%",
        height: 38,
        width: 235,
        borderRadius: 10,
        backgroundColor: "#225C21",
        alignItems: "center",
        alignContent: "center"
    },
    afterMealTxt: {
        fontSize: 24,
        fontWeight: "400",   
        color: "white"
    }
});
