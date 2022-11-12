import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Text, View, Image  ,TouchableOpacity, SafeAreaView  , ScrollView} from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { Card } from 'react-native-elements';
import Styles from './HomeStyle.js'

import TimeCard from '../components/TimeCard.js';






const Home = ({navigation}) => {

  const [connection ,setConnection] = useState('success');
  /*
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  */
  
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style ={Styles.container}>

      <Card title="Local Modules" borderRadius={20}>
            <View style ={Styles.Detail}>
              <Image     
              style = {Styles.Image}
              source ={require('../../assets/CareBox.png')}
              />
              <View style ={{ flexDirection: 'column'}}>

                <View style ={{ flexDirection: 'row'}}>
                  <Text style = {{ paddingLeft: 5,
                                   paddingTop: 0,
                                   fontSize: 18,
                                   fontWeight: 'lighter',
                                }}> Connection :  </Text>
                <View style={{paddingTop: 2}}>
                  <Badge value =  {connection}  status= {connection} badgeStyle ={{ fontSize:12 }}/>
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