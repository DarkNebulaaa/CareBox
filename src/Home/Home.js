import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import { Button } from "@rneui/themed";
import { useState ,useEffect} from "react";
import { Card } from "react-native-elements";
import Styles from "./HomeStyle.js";
import init from "react_native_mqtt";
import { mqttConfig } from "../mqtt/mqttConfig";
import TimeCard from "../components/TimeCard.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addr = mqttConfig.addr;
const port = mqttConfig.port;
const subTopic = mqttConfig.subTopic;
const topic = mqttConfig.topic;
const user = mqttConfig.user;
const password = mqttConfig.password;
let canPub = true;
let morning =1;
let noon =1;
let evening =1;
init({
  size: 10000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});


function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}

const Home = ({ navigation }) => {
  
  const getData = async () => {
    try {
      
      const value = await AsyncStorage.getItem("＠ＣareBox:time:");
      if (value !== null) {
        // 有值
        //console.log(value);
        let strValue =JSON.parse(value);
        for(let i = 0 ;i < 4 ; i++)
        {
         let hour= strValue[i].slice(0, 2);
            
            if(hour > 0 && hour <12)
            {
               morning =12;
               noon =noon;
               evening =evening;
            }
            else if(hour > 12 && hour <17)
            {
               morning =morning;
               noon =hour;
               evening =evening;
            }
            else if(hour > 17 && hour <23)
            {
               morning =morning;
               noon =noon;
               evening =hour;
            }
        }
        
      }
    } catch (error) {
      // 取值錯誤
      console.log("error: err to get!!" + error);
    }
  };
  /*#####################################################################
   ######################           MQTT           ######################
   #####################################################################*/
  const client = new Paho.MQTT.Client(
    addr,
    port,
    "clientID-1" + parseInt(Math.random() * 100)
  );

  const onMessageArrived = (message) => {
    console.log(" onMessageArrived : " + message.payloadString);
  };

  const onConnect = () => {
    console.log(" onConnect ");
    setConnection("success");
    client.subscribe(subTopic);
   
  };
  async function  Pub () {
    
    await getData();
    let data ={
      "morning": morning,
      "noon": noon,
      "evening": evening  
    }
    //console.log(string);
    client.subscribe(subTopic);

        await client.publish(topic,JSON.stringify(data));
  
    
  };
  const onFailure = () => {
    console.log(" failure ");
    setConnection("waring");
  };
  async function mqttInit() {
    client.onMessageArrived = onMessageArrived;
    await client.connect({
      onSuccess: onConnect,
      useSSL: false,
      userName: user,
      password: password,
      onFailure: onFailure,
    });
  }
  mqttInit();
  
  
  /*#####################################################################
 ######################           ####           ######################
 #####################################################################*/
  const [connection, setConnection] = useState("error");
  
  /*
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  */
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.container}>
        <Card title="Local Modules" borderRadius={20}>
          <View style={Styles.Detail}>
            <Image
              style={Styles.Image}
              source={require("../../assets/CareBox.png")}
            />
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    paddingLeft: 5,
                    paddingTop: 0,
                    fontSize: 18,
                    fontWeight: "lighter",
                  }}
                >
                  {" "}
                  Connection :{" "}
                </Text>
                <View style={{ paddingTop: 2 }}>
                  <Badge
                    value={connection}
                    status={connection}
                    badgeStyle={{ fontSize: 12 }}
                  />
                </View>
              </View>

              <Text style={Styles.text}> Let's care about your health !!</Text>
              <Button buttonStyle={{
                borderRadius: 25,
                backgroundColor: "rgba(111,206,182,1)",
                borderColor: "rgba(111,206,182,1)",
                borderWidth: 2,
              }}
              style ={{paddingTop :40,paddingLeft:20}}
              onPress= {Pub}> Refresh </Button>
            </View>
          </View>
        </Card>

        <TimeCard></TimeCard>
      </View>
    </SafeAreaView>
  );
};

export default Home;
