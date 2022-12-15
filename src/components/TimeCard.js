import React, { Children, useRef, useState, useEffect } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  DatePickerIOS,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import { Card } from "react-native-elements";
import AnimatedCard from "../components/AnimatedCard";


import AsyncStorage from "@react-native-async-storage/async-storage";
AsyncStorage.clear();
const TimeCard = (props) => {
  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@     Define Value     @@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
 
  
  //initTimeObject();
  // State Value
  const [chosenDate, setChosenDate] = useState(new Date());
  const [timeItem, setTimeItem] = useState([]); //初始化務必對他做async storage 的存取

  //Animation Value
  const [canAddTime, setCanAddTime] = useState(false);
  const Value = useRef(new Animated.Value(-500)).current;
  const ButtonValue = useRef(new Animated.Value(-310)).current;

  
  //JSON Struct


  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@    Function Here    @@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  async function CheckCanAddTime() {
    console.log(timeItem.length);
    if ((await timeItem.length) < 4) {
      setCanAddTime(false);
    } else {
      setCanAddTime(true);
    }
  }
  async function AddTime() {
    
    //add time 會對chosendate 做format以及字串化儲存在陣列,async storage當中
    const formatM = (min) => {
      if (min < 10) {
        return "0" + min;
      } else return min;
    };
    const formatH = (hour) => {
      if (hour < 10) {
        return "0" + hour;
      } else return hour;
    };
    const strHour = chosenDate.getHours();
    const strMin = chosenDate.getMinutes();
    const strTime = formatH(strHour) + ":" + formatM(strMin);
    await setTimeItem([...timeItem, strTime]);
   // await storeData().then(()=> {console.log(timeItem)});
    DeleteCard();
  }
  async function DeleteTime  (index) {
    CheckCanAddTime();
    
    let TimeCopy = [...timeItem];
    TimeCopy.splice(index, 1);
     await setTimeItem(TimeCopy);
     console.log(timeItem);
     
    // await storeData().then(()=> {console.log(timeItem)});
    
  };
  const AddCard = () => {
    AddButton();
    Animated.timing(Value, {
      delay: 200,
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const DeleteCard = () => {
    DeleteButton();
    Animated.timing(Value, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const AddButton = () => {
    Animated.timing(ButtonValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const DeleteButton = () => {
    Animated.timing(ButtonValue, {
      delay: 200,
      toValue: -310,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("＠ＣareBox:time:", JSON.stringify(timeItem)).then(props.mqtt());
    } catch (error) {
      // 儲存錯誤
      console.log("error: err to  storeData");
      
    }
  };

  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("＠ＣareBox:time:");
      if (value !== null) {
        // 有值！
        console.log("getData :" + typeof value + " (" + value + ")");
      }
    } catch (error) {
      // 取值錯誤
      console.log("error: err to get!!");
    }
  };

  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@    Return the frontend    @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
useEffect(() => {
  CheckCanAddTime();
}, [timeItem]);

  useEffect(() => {
    storeData();
  }, [timeItem]);
  return (
    <View>
      <StatusBar barStyle={"dark-content"} />
      <Animated.View
        style={{
          transform: [{ translateX: Value }],
        }}
      >
        <Card borderRadius={20}>
          <View>
            <DatePickerIOS
              date={chosenDate}
              onDateChange={setChosenDate}
              mode={"time"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ paddingRight: 100 }}>
              <Button
                buttonStyle={{
                  borderRadius: 25,
                  backgroundColor: "ffffff",
                  borderColor: "rgba(111,206,182,1)",
                  borderWidth: 2,
                }}
                onPress={DeleteCard}
              >
                <Text style={{ fontSize: 20, color: "rgba(111,206,182,1)" }}>
                  Cancel
                </Text>
              </Button>
            </View>

            <Button
              buttonStyle={{
                borderRadius: 25,
                backgroundColor: "rgba(111,206,182,1)",
                borderColor: "rgba(111,206,182,1)",
                borderWidth: 2,
              }}
              onPress={AddTime}
              
            >
              <Text style={{ fontSize: 20, color: "rgba(255,255,255,1)" }}>
                Confirm
              </Text>
            </Button>
          </View>
        </Card>
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: ButtonValue }],
        }}
      >
        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <Button
            title="Add Time"
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "rgba(111,206,182,1)",
            }}
            disabled={canAddTime}
            onPress={AddCard}
          />
        </View>

        <ScrollView>
          {timeItem.map((item, index) => {
            return (
              <AnimatedCard
                key={index}
                Hour={item.slice(0, 2)}
                Min={item.slice(3, 5)}
                DeleteTime={DeleteTime}
              ></AnimatedCard>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@    Style Sheet    @@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

const styles = StyleSheet.create({
  btnText: {
    textAlign: "center",
    backgroundColor: "#aaa",
    marginVertical: 10,
  },
  Detail: {
    flexDirection: "row",
  },
  closeImage: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  clockImage: {
    marginTop: 6,
    marginLeft: 5,
    width: 25,
    height: 25,
  },
  TimeText: {
    color: "aaaaaa",
    fontSize: 32,
    fontWeight: "lighter",
    marginTop: 0,
    paddingLeft: 20,
  },
  TimeNum: {
    color: "gray",
    fontSize: 32,
    fontWeight: "lighter",
    marginTop: 0,
    paddingLeft: 20,
  },
  Button: {
    borderRadius: 10,
    paddingLeft: 0,
    width: 40,
    height: 40,
    flex: 1,
    backgroundColor: "fffff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default TimeCard;
