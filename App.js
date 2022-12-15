import React from 'react';
import { StatusBar } from 'react-native';
import { Text, View, Image  ,TouchableOpacity,SafeAreaView} from 'react-native';




import { useEffect } from 'react';
import { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Loading from './src/Loading/Loading';
import Home from './src/Home/Home'
const Stack = createStackNavigator();

/*########################################################
 #                  MQTT   varible  Here                 #
##########################################################*/
const topicsub = 'esp32/app';
const topic = 'esp32/app';
const mqttAddr = 'fc9f0b02-internet-facing-7829070156367d76.elb.us-east-1.amazonaws.com';
const mqttPort = 8083 ;


/*########################################################
 #                   Function Here                       #
##########################################################*/
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});


/*########################################################
##########################################################
##########################################################*/ 
export default function App() {
  

  return (
    
    <NavigationContainer >
      <StatusBar barStyle    = "dark-content"/>
      <Stack.Navigator initialRouteName="Loading">
        
        <Stack.Screen 
        name="CareBox" 
        component={Home} 
        options={{animationEnabled: true,
                  cardStyleInterpolator: forFade,
                  headerTintColor: '#111',
                  color:'black',
                  
          }}
        
        />

        <Stack.Screen 
        name="Loading"  
        component={Loading} 
        options={{animationEnabled: false,headerShown : false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}