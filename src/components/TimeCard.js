import React, {useRef ,useState} from 'react';
import {Animated, View, StyleSheet, Text ,StatusBar ,DatePickerIOS ,ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { Card } from 'react-native-elements';
import AnimatedCard from '../components/AnimatedCard';
import { renderNode } from '@rneui/base';


const TimeCard = props => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [timeItem ,setTimeItem] = useState([]);
  const Value = useRef(new Animated.Value(-500)).current;
  
  const ButtonValue = useRef(new Animated.Value(-310)).current;

  const AddTime = () => {
    //const time = chosenDate.substring(10 ,14)
    console.log(chosenDate);
    setTimeItem([...timeItem , chosenDate]);
    DeleteCard();
  };

  const DeleteTime = (index) => {
    let TimeCopy = [...timeItem];
    TimeCopy.splice(index , 1);
    setTimeItem(TimeCopy);
  };
  
  
  const AddCard =() =>{
    AddButton();
    Animated.timing(Value, {
      delay:200,
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
  };
  const DeleteCard =() =>{
    DeleteButton();
    Animated.timing(Value, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const AddButton =() =>{
    
    Animated.timing(ButtonValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
  };
  const DeleteButton =() =>{
    
    Animated.timing(ButtonValue, {
      delay:200,
      toValue: -310,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  
  return (
    <View>
      <StatusBar barStyle={'dark-content'}/>
      <Animated.View
        style={{
          transform: [{translateX: Value}],
          
        }}
      >
                <Card  borderRadius={20} >
                    <View >
                    <DatePickerIOS
                            date={chosenDate}
                            onDateChange={setChosenDate}
                            mode={'time'}
                            
                            
                      />
                    </View>
                    <View style={{flexDirection:'row' ,alignItems:'center', justifyContent:'center'}}>
                      <View style={{paddingRight:100}}>
                        <Button buttonStyle={{ borderRadius: 25, backgroundColor :'ffffff',borderColor:'rgba(111,206,182,1)',borderWidth:2}}
                        onPress={DeleteCard}>
                          <Text style={{fontSize:20 ,color:'rgba(111,206,182,1)'}}>
                            Cancel
                          </Text>
                        </Button>
                      </View>
                      
                      <Button buttonStyle={{ borderRadius: 25,backgroundColor :'rgba(111,206,182,1)',borderColor:'rgba(111,206,182,1)',borderWidth:2}}
                      onPress ={AddTime}>
                      <Text style={{fontSize:20 ,color:'rgba(255,255,255,1)'}}>
                            Confirm
                          </Text>
                      </Button>

                    </View>
                    
                </Card>

      </Animated.View>
      
      <Animated.View
        style={{
          transform: [{translateY: ButtonValue}],
          
        }}
      > 
      <View style ={{marginTop: 20 ,marginLeft:10,marginRight:10 }}>
                    <Button  
                        title='Add Time' 
                        buttonStyle ={{
                          borderRadius: 20,
                          backgroundColor: 'rgba(111,206,182,1)' 
                        }}
                        onPress ={AddCard}/>
        </View>

        <ScrollView>
        {
            timeItem.map((item , index) => {
              const format = (min) => {
                if(min <10)
                {
                  return('0' + min);
                }
                else return (min);
              }
              return(
                <AnimatedCard key ={index} Hour={item.getHours()} Min = {format(item.getMinutes())}/>
              );
            })
        }          
        </ScrollView>

      </Animated.View>                  
      
      
    </View>
  );
};


const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    backgroundColor: '#aaa',
    marginVertical: 10,
  },
  Detail: {
    flexDirection:"row",
    
},
closeImage: {
    
    width: 26, 
    height: 26,
    alignItems:'center',
    justifyContent:'center',
    
},
clockImage: {
    marginTop: 6,
    marginLeft: 5,
    width: 25, 
    height: 25,
    
},
TimeText:{
    color: 'aaaaaa',
    fontSize: 32,
    fontWeight: 'lighter',
    marginTop: 0,
    paddingLeft: 20,
},
TimeNum:{
    color: 'gray',
    fontSize: 32,
    fontWeight: 'lighter',
    marginTop: 0,
    paddingLeft: 20,
},
Button:{
    borderRadius:10,
    paddingLeft:0,
    width: 40, 
    height: 40,
    flex:1,
    backgroundColor:"fffff",
    
},
container: {
  flex: 1,
  justifyContent: 'center',
},
});

export default TimeCard;