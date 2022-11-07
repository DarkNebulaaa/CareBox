import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Text, View, Image  ,TouchableOpacity, SafeAreaView  ,Platform, ScrollView} from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { Button } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Card } from 'react-native-elements';
import Styles from './HomeStyle.js'
import { fonts } from '@rneui/base';
import { setStatusBarBackgroundColor } from 'expo-status-bar';




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
                                }}> Status :  </Text>
                <View style={{paddingTop: 2}}>
                  <Badge value =  {connection}  status= {connection} badgeStyle ={{ fontSize:12 }}/>
                </View>
                </View>

                
                <Text style={Styles.text}> Let's care about your health !!</Text>
                

              </View>
              
            </View>
        </Card>

        <View style ={{marginTop: 20 ,marginLeft:10,marginRight:10 }}>
                    <Button  
                        title='Add Time' 
                        buttonStyle ={{
                          borderRadius: 20,
                          backgroundColor: 'rgba(111,206,182,1)' 
                        }}/>
        </View>

        <ScrollView>

        <Card title="Local Modules" borderRadius={20}>
            <View style ={Styles.Detail}>
              <Image     
                style = {Styles.clockImage}
                source ={require('../../assets/clock.png')}
              />
              <Text style={Styles.TimeText}>Time</Text>
              <Text style={Styles.TimeNum}>23:59</Text>
                            
              <View style={{paddingLeft:70}}>
                <Button buttonStyle ={Styles.Button}>
                  <Image 
                    style = {Styles.closeImage}
                    source ={require('../../assets/close.png')}/>
                 </Button>
              </View>
            </View>
        </Card>



        </ScrollView>

        
      </View>
    </SafeAreaView>
    );
  };

export default Home;