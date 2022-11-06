import {StyleSheet} from 'react-native';
const Styles = StyleSheet.create({

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
        marginTop: 700,
        color: '2c3532',
        fontSize: 14,
        fontWeight: 'lighter',
    },
})

export default  Styles;