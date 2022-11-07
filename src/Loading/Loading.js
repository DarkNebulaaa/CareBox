import { ThemeConsumer } from '@rneui/themed';
import { Text,SafeAreaView, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Styles from './LoadingStyleSheet'
import {useState ,useEffect} from 'react' ;
import Lottie from 'lottie-react-native';

const Loading = ({navigation}) => {

   const [ isLoad , setIsLoad ] = useState(false);

   useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isLoad) {
      navigation.replace('CareBox');
    }
  }, [isLoad, navigation]);
          
  
          
          
  
   

  
  
    return(   
      
      <SafeAreaView style ={Styles.background}>
        <View style={{justifyContent:'center',alignItems:'center',marginTop: 150 ,flex:2}}>
          <Lottie source={require('../../assets/anim/CareApp_Loading.json')} 
                  autoPlay 
                  style={Styles.lottie}
                  loop={false}/>
        </View>
        
        <View style={{
              flex:1,
              alignContent:'center',
              justifyContent:'center',
        }}>
          <Text style = {Styles.text} > powered by Apple.Inc</Text>
        </View>
     
   </SafeAreaView>);
  }
  export default Loading;