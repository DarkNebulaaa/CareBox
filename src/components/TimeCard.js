import React, { useRef, useState } from "react";
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
import { renderNode } from "@rneui/base";

import AsyncStorage from "@react-native-async-storage/async-storage";

async function  initTimeObject() {
    for(let i = 0 ; i < 10 ; i ++)
    {
      if(AsyncStorage.getItem("＠ＣareBox:time:" + i ) != null)  
        {
          
        }
    }
}
const TimeCard = (props) => {
  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@     Define Value     @@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  // State Value
  const [chosenDate, setChosenDate] = useState(new Date());
  const [timeItem, setTimeItem] = useState([]);
  //Animation Value
  const Value = useRef(new Animated.Value(-500)).current;
  const ButtonValue = useRef(new Animated.Value(-310)).current;

 // AsyncStorage.clear();
  //JSON Struct

  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@    Function Here    @@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  const AddTime = () => {
    //const time = chosenDate.substring(10 ,14)

    setTimeItem([...timeItem, chosenDate]);
    DeleteCard();
  };
  const DeleteTime = (index) => {
    removeData(index);
    let TimeCopy = [...timeItem];
    TimeCopy.splice(index, 1);
    setTimeItem(TimeCopy);
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
  const storeData = async (index, hour, min) => {
    try {
      await AsyncStorage.setItem(
        "＠ＣareBox:time:" + index,
        "T" + hour + ":" + min
      );
    } catch (error) {
      // 儲存錯誤
      console.log("error: err to  storeData");
    }
  };
  const removeData = async (index) => {
    try {
      await AsyncStorage.removeItem( "＠ＣareBox:time:" + index)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
  const getData = async (index) => {
    try {
      const value = await AsyncStorage.getItem("＠ＣareBox:time:" + index);
      if (value !== null) {
        // 有值！
        console.log(value);
      }
    } catch (error) {
      // 取值錯誤
      console.log("error: err to get!!");
    }
  };
 

  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@    Return the frontend    @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

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
            onPress={AddCard}
          />
        </View>

        <ScrollView>
          {timeItem.map((item, index) => {
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
            
            
            storeData(
              index,
              formatH(item.getHours()),
              formatM(item.getMinutes())
            );
            
            

            return (
              
              <AnimatedCard
                key={index}
                Hour={formatH(item.getHours())}
                Min={formatM(item.getMinutes())}
                DeleteTime={DeleteTime}
              >
                
              </AnimatedCard>
              
             
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
