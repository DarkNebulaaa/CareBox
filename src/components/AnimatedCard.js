import React, {useRef} from 'react';
import {Animated, View, StyleSheet, TouchableOpacity, Text ,Image} from 'react-native';
import { Button } from '@rneui/themed';
import { Card } from 'react-native-elements';
const AnimatedCard = props => {
  const leftValue = useRef(new Animated.Value(0)).current;
  const rightValue = useRef(new Animated.Value(-500)).current;

  const AddCard = () => {
    Animated.timing(rightValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const DeleteCard = () => {
    Animated.timing(leftValue, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View
        style={{
          transform: [{translateX: leftValue}],
        }}
      >
                <Card title="Local Modules" borderRadius={20}>
                    <View style ={styles.Detail}>
                        <Image     
                            style = {styles.clockImage}
                            source ={require('../../assets/clock.png')}
                        />
                        <Text style={styles.TimeText}>Time</Text>
                        <Text style={styles.TimeNum}>23:59</Text>
                            
                    <View style={{paddingLeft:65}}>
                        <Button buttonStyle ={styles.Button} onPress ={(DeleteCard)}>
                            <Image 
                                style = {styles.closeImage}
                                source ={require('../../assets/close.png')}/>
                        </Button>
                    </View>
                    </View>
                </Card>

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
    
}
});

export default AnimatedCard;