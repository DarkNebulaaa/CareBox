import React, { useState, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Button } from "@rneui/themed";
import { Card } from "react-native-elements";



const AnimatedCard = (props) => {
  const leftValue = useRef(new Animated.Value(0)).current;
  const RemoveValue = useRef(new Animated.Value(0)).current;
  const StartPoint = 0;
  const EndPoint = -140;
  let EndValue = 0;



  const DeleteCard = () => {
    if (EndValue === 0) {
      EndValue = EndPoint;
    } else {
      EndValue = StartPoint;
    }

    Animated.timing(leftValue, {
      toValue: EndValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    console.log(EndValue);
  };
  const Removing =() =>{ 
    Animated.timing(RemoveValue, {
      toValue: -800,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    props.DeleteTime;
    
  };
  return (
    <View>
      <Animated.View style={{
          transform: [{ translateX: RemoveValue }],
          flex: 1,
          
        }}>
      <Animated.View
        style={{
          transform: [{ translateX: leftValue }],
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Card title="Local Modules" borderRadius={20}>
          <View style={styles.Detail}>
            <Image
              style={styles.clockImage}
              source={require("../../assets/clock.png")}
            />
            <Text style={styles.TimeText}>Time</Text>
            <Text style={styles.TimeNum}>
              {props.Hour}:{props.Min}
            </Text>

            <View style={{ paddingLeft: 75 }}>
              <Button buttonStyle={styles.Button} onPress={DeleteCard}>
                <Image
                  style={styles.closeImage}
                  source={require("../../assets/close.png")}
                />
              </Button>
            </View>
          </View>
        </Card>
        <Button
          buttonStyle={{ borderRadius: 20, backgroundColor: "#e62824" }}
          style={{ paddingTop: 15, paddingLeft: 12 }}
          onPress={ props.DeleteTime}
          onPressIn={
            Removing}
          
          
        >
          <Text
            style={{
              fontSize: 22,
              padding: 15,
              color: "#ffffff",
              fontWeight: "blod",
            }}
          >
            Delete
          </Text>
        </Button>
      </Animated.View>
      </Animated.View>
    </View>
  );
};

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
});

export default AnimatedCard;
