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
import { useState } from "react";
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

init({
  size: 10000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

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

const Home = ({ navigation }) => {
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
    client.publish(topic, 'getData(1)');
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
            </View>
          </View>
        </Card>

        <TimeCard></TimeCard>
      </View>
    </SafeAreaView>
  );
};

export default Home;
