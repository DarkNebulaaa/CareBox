import { ThemeConsumer } from '@rneui/themed';
import { Text,SafeAreaView } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Styles from './LoadingStyleSheet'
import {useState} from 'react' ;


const Loading = ({navigation}) => {

   const [ isLoad , setIsLoad ] = useState(true);

   function wait(delay) {
    return new Promise(resolve => {
      setTimeout(resolve,delay)
    });
   };

   const successLoad = () => {
          
          navigation.replace("CareBox");
          
          
   }
   

   async function WaitAnim(){
     await wait(3000).then(successLoad);
     //after 3 sec to do
     
     
   }
   WaitAnim();
    return(   
      
      <SafeAreaView style ={Styles.background}>
      <AnimatedLoader
     visible={true}
     overlayColor="rgba(255,255,255,0)"
     source={require('../../assets/anim/CareApp_Loading.json')}
     animationStyle={Styles.lottie}
     speed={1}
     autoplay
     loop={false}
     >
   </AnimatedLoader>
  
     <Text style = {Styles.text} > powered by Apple.Inc</Text>
   </SafeAreaView>);
  }
  export default Loading;