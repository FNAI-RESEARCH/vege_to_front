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

//import useSelectedIngredients from './SelectedIngredientsState';

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

export default function ChooseIngredients({ navigation }) {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [addIngredients, setAddIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [isSelected, setSelected]=useState(false);
    
    const ingredientData = {
      red: ingredientIconsRed,
      yellow: ingredientIconsYellow,
      green: ingredientIconsGreen,
      purple: ingredientIconsPurple,
      white: ingredientIconsWhite,
    };
  
    const toggleIngredientSelection = (color, name) => {
      const updatedSelection = [...selectedIngredients];
      const ingredientIndex = updatedSelection.indexOf(name);
  
      if (ingredientIndex === -1) {
        updatedSelection.push(name);
      } else {
        updatedSelection.splice(ingredientIndex, 1);
      }
  
      if (selectedIngredients.length>0){
        setSelected(true);
      }
      
      setSelectedIngredients(updatedSelection);

      console.log(selectedIngredients);
    };

    const getColorCode=(color)=>{
        switch (color) {
          case "red":
            return "#FF0606";
          case "yellow":
            return "#FF9900";
          case "green":
            return "#29A714";
          case "purple":
            return "#8D0FDB";
          case "white":
            return "#A1A1A1";
        }
      }

      /*const returnIngredients=()=>{
        return { selectedIngredients, setSelectedIngredients };
      }  */

      const loadSelectedIngredients = async () => {
        try {
          const savedIngredients = await AsyncStorage.getItem('selectedIngredients');
          if (savedIngredients) {
            setAllIngredients(JSON.parse(savedIngredients));
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

      const loadAllIngredients = async () => {
        try {
          const savedIngredients = await AsyncStorage.getItem('allIngredients');
          if (savedIngredients) {
            setAddIngredients(JSON.parse(savedIngredients));
          }
        } catch (error) {
          console.error('Error loading selectedIngredients:', error);
        }
    };

      const saveNewIngredients = async (newIngredients) => {
        try {
          // 새로운 데이터와 기존 데이터를 합쳐서 AsyncStorage에 저장합니다.
          const mergedIngredients = [...addIngredients, ...newIngredients];
          await AsyncStorage.setItem('allIngredients', JSON.stringify(mergedIngredients));
          //setSelectedIngredients(mergedIngredients);
          console.log('Ingredients saved successfully');
        } catch (error) {
          console.error('Error saving ingredients', error);
        }
      };
    
      const addNewIngredients = async () => {
        // 새로운 데이터를 추가하고 저장합니다.
        const newIngredients = selectedIngredients;
        saveNewIngredients(newIngredients);
      };

      useEffect(() => {
        loadSelectedIngredients();
        loadAllIngredients();
    }, []); 

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.upperSpace}>
            <Text style={styles.homeTxt}>
                재료 추가하기
            </Text>
        </View>
        <View style={{height: "3%"}}/>
        {/* 각 색상별로 재료를 표시 */}
        {Object.keys(ingredientData).map((color) => (
          <View key={color}>
            <Text style={[styles.ingreColorTxt, { color: getColorCode(color) }]}>
              {color.toUpperCase()}
            </Text>
            <View style={styles.globalMenuContainer}>
              {ingredientData[color].map((ingredient, idx) => (
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  key={idx}
                  onPress={() => {
                    toggleIngredientSelection(color, ingredient.name);
                  }}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      marginHorizontal: "7%",
                      marginBottom: "7%",
                      opacity: selectedIngredients.includes(ingredient.name) ? 1 : 0.3,
                    }}
                    source={ingredient.src}
                  />
                  <Text style={styles.ingreTxt}>{ingredient.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        </ScrollView>
        <View style={{alignItems: "center"}}>
        <TouchableOpacity
            disabled={!isSelected}
            style={{     
                position: "absolute",
                bottom: "3%",
                //bottom: "30%",   
                marginBottom: "5%",
                width: 173,
                height: 27,
                borderRadius: 10,
                backgroundColor: selectedIngredients.length > 0 ? "#225C21" : "#8FB68E",
                //opacity: 0.3
                alignContent: "center",
                alignItems: "center"
                }}
            onPress={()=>{
              //setAllIngredients(concat(allIngredients, selectedIngredients))
              addNewIngredients();
              saveSelectedIngredients();
              navigation.navigate('Home');
            }}>
            <Text
                style={styles.checkBtnTxt}>
                확인
            </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    },
    homeTxt: {
        //fontfamily: Inter,
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "400",
        alignItems: "flex-start",
        marginTop: "3%",
        marginLeft: "4%"
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
    checkBtnTxt: {
        fontSize: 24,
        color: "white",
        marginTop: 7,
    }
});

/*export default function ChooseIngredients({navigation, category}){

    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const toggleIngredientSelection = (name) => {
        // Create a copy of the selectedIngredients array
        const updatedSelection = [...selectedIngredients];
    
        // Toggle the selection status for the ingredient
        const ingredientIndex = updatedSelection.indexOf(name);
        if (ingredientIndex === -1) {
          // Ingredient is not in the selected list, so add it
          updatedSelection.push(name);
        } else {
          // Ingredient is in the selected list, so remove it
          updatedSelection.splice(ingredientIndex, 1);
        }
    
        // Update the state with the new selection
        setSelectedIngredients(updatedSelection);
      }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.upperSpace}>
                <Text style={styles.homeTxt}>
                    재료 추가하기
                </Text>
            </View>
            <View style={{height: "3%"}}/>
            <Text style={[styles.ingreColorTxt, {color: "red"}]}>
                RED
            </Text>
            <View style={styles.globalMenuContainer}>
            {ingredientIconsRed.map((ingredientsList, idx) => (
            <TouchableOpacity
                style={{alignItems: "center"}}
                key={idx}
            onPress={() => {
              toggleIngredientSelection(ingredientsList.name);
            }}
            >
                <Image
                    style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: "7%",
                    marginBottom: "7%",
                    opacity: 
                    selectedIngredients.includes(ingredientsList.name) ? 1 : 0.3
                    }}
                    source={ingredientsList.src}
                />
                <Text style={styles.ingreTxt}>{ingredientsList.name}</Text>
            </TouchableOpacity>
            ))}
            </View>
            <View style={{height: "5%"}}/>
            <Text style={[styles.ingreColorTxt, {color: "#FF9900"}]}>
                YELLOW
            </Text>
            <View style={styles.globalMenuContainer}>
            {ingredientIconsYellow.map((ingredientsList, idx) => (
            <TouchableOpacity
                style={{alignItems: "center"}}
                key={idx}
            onPress={() => {
              toggleIngredientSelection(ingredientIconsYellow.name);
            }}
            >
                <Image
                    style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: "7%",
                    marginBottom: "7%",
                    opacity: 
                    selectedIngredients.includes(ingredientsList.name) ? 1 : 0.3
                    }}
                    source={ingredientsList.src}
                />
                <Text style={styles.ingreTxt}>{ingredientsList.name}</Text>
            </TouchableOpacity>
            ))}
            </View>
            <View style={{height: "5%"}}/>
            <Text style={[styles.ingreColorTxt, {color: "#29A714"}]}>
                GREEN
            </Text>
            <View style={styles.globalMenuContainer}>
            {ingredientIconsGreen.map((ingredientsList, idx) => (
            <TouchableOpacity
                style={{alignItems: "center"}}
                key={idx}
            onPress={() => {
              toggleIngredientSelection(ingredientIconsGreen.name);
            }}
            >
                <Image
                    style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: "7%",
                    marginBottom: "7%",
                    opacity: 
                    selectedIngredients.includes(ingredientsList.name) ? 1 : 0.3
                    }}
                    source={ingredientsList.src}
                />
                <Text style={styles.ingreTxt}>{ingredientsList.name}</Text>
            </TouchableOpacity>
            ))}
            </View>
            <View style={{height: "5%"}}/>
            <Text style={[styles.ingreColorTxt, {color: "#8D0FDB"}]}>
                PURPLE
            </Text>
            <View style={styles.globalMenuContainer}>
            {ingredientIconsPurple.map((ingredientsList, idx) => (
            <TouchableOpacity
                style={{alignItems: "center"}}
                key={idx}
            onPress={() => {
              toggleIngredientSelection(ingredientIconsPurple.name);
            }}
            >
                <Image
                    style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: "7%",
                    marginBottom: "7%",
                    opacity: 
                    selectedIngredients.includes(ingredientsList.name) ? 1 : 0.3
                    }}
                    source={ingredientsList.src}
                />
                <Text style={styles.ingreTxt}>{ingredientsList.name}</Text>
            </TouchableOpacity>
            ))}
            </View>
            <View style={{height: "5%"}}/>
            <Text style={[styles.ingreColorTxt, {color: "#A1A1A1"}]}>
                WHITE
            </Text>
            <View style={styles.globalMenuContainer}>
            {ingredientIconsWhite.map((ingredientsList, idx) => (
            <TouchableOpacity
                style={{alignItems: "center"}}
                key={idx}
            onPress={() => {
              toggleIngredientSelection(ingredientIconsWhite.name);
            }}
            >
                <Image
                    style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: "7%",
                    marginBottom: "7%",
                    opacity: 
                    selectedIngredients.includes(ingredientsList.name) ? 1 : 0.3
                    }}
                    source={ingredientsList.src}
                />
                <Text style={styles.ingreTxt}>{ingredientsList.name}</Text>
            </TouchableOpacity>
            ))}
            </View>
            <View
                style={{     
                    position: "absolute",
                    bottom: "30%",   
                    width: 173,
                    height: 37,
                    color: "#225C21",
                    //opacity: 0.3
                    }}>

            </View>
            </ScrollView>
        </SafeAreaView>
    );

}*/
