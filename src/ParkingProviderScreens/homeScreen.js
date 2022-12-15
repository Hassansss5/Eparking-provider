import React from 'react';
import { Ngrok_Url } from '../keys';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TextInput, Text, Image, View, Button, Alert, TouchableOpacity, ImageBackground, Platform } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={Platform.OS == 'ios' ? 1 : 1} source={require('../images/one.jpg')} style={styles.backgroundImage}>
                <Image style={styles.LogoImage} source={require('../images/epar.png')} />
                <View style={{ flex: 1, flexDirection: "row", marginTop: '30%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserLoginScreen')}>
                        <Image style={styles.UserImage} source={require('../images/user1.png')} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProviderLoginScreen')}>

                        <Image style={styles.UserImage} source={require('../images/Parking1.png')} />

                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

HomeScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    LogoImage: {
        marginLeft: '13%',
        marginTop: '22%',
        width: 290,
        height: 200,
        marginBottom: 10
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    UserImage: {
        marginLeft: "14%",
        width: 150,
        height: 150,
    },
    parkingImage: {
        width: 150,
        height: 150,
    },
    // buttonUser: {
    //     borderRadius: 12,
    //     marginLeft: "34%",
    //     textAlign: "center",
    //     paddingLeft: 50,
    //     paddingTop: 5,
    //     marginTop: 15,
    //     width: '35%',
    //     height: 40,
    //     backgroundColor: '#FF9C00',
    //     letterSpacing: 1,
    //     marginBottom: 60
    // },
    // buttonparking: {
    //     borderRadius: 12,
    //     marginLeft: "28%",
    //     textAlign: "center",
    //     marginTop: 5,
    //     paddingTop: 5,
    //     paddingLeft: 18,
    //     width: '50%',
    //     height: 40,
    //     backgroundColor: '#FF9C00',
    //     letterSpacing: 1
    // },
    // textlogin: {
    //     color: 'white',
    //     fontSize: 22,
    //     fontWeight: "bold"
    // }
});

export default HomeScreen;