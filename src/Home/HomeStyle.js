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
        paddingLeft:8,
        width: 40, 
        height: 40,
        flex:1,
        backgroundColor:"fffff",
        
    }

})

export default Styles;