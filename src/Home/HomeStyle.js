import {StyleSheet} from 'react-native';
const Styles = StyleSheet.create({
    container: {
        
        flex: 1,
    },
    background: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
     lottie: {
        width: 300,
        height: 300,
        paddingTop: 0,
        transform: [{ rotate: "20deg" }],
    },
    text: {
        paddingTop: 10,
        paddingLeft:10,
        color: '2c3532',
        fontSize: 12,
        fontWeight: 'lighter',
    },
    title: {
        color: 'aaaaaa',
        fontSize: 23,
        fontWeight: 'lighter',
        marginTop: 0,
        marginLeft: 0,
        

    },
    
    Image: {
        marginTop: 10,
        marginLeft: 20,
        width: 120, 
        height: 120,
        
    },

    AlignItems: {
        alignItems: 'flex-start',
        flex:1,
    },
    Detail: {
        flexDirection:"row",
    }
   

})

export default Styles;