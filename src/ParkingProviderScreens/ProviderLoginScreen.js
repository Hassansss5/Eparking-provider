import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Alert, TouchableOpacity, KeyboardAvoidingView, TextInput, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Ngrok_Url } from '../keys';

// const UserLoginScreen = ({ navigation }) => {

//   const [email, setemail] = useState("")
//   const [password, setpassword] = useState("");
// // submit = () => {
// //   fetch("http://00ba17a4.ngrok.io/user/signin",
// //     {
// //       method:"POST",
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //          email, password
// //       })
// //     })
// //     .then(res => res.json())
// //     .then((data) => {
// //       try {
// //         alert(`Name : ${email} your Account Login successfully`);
// //         navigation.navigate("Map");
// //         console.log(data);
// //         // await AsyncStorage.setItem('token', data.token);
// //       } catch (e) {
// //         console.log('Error : ', e)
// //         alert(e);
// //       }
// //     })
// // }


//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image style={styles.LogoImage} source={require('../images/epar.png')} />
//       </View>
//       <Animatable.View  animation='fadeInUpBig'  style={styles.footer}>
//         <Text style={styles.text_footer}>E-MAIL</Text>
//         <View style={styles.action} >
//            <Feather
//               name='mail'
//               color='#006F9C'
//               size={22}
//             />
//           <TextInput
//             placeholder='Your Email'
//             style={styles.textInput}
//             onChangeText={(text) => { setemail(text) }}
//             value={email}
//           />
//         </View>
//         <Text style={[styles.text_footer, { marginTop: 40 }]}>PASSWORD</Text>
//         <View style={styles.action}>
//           <Feather
//             name='lock'
//             color='#006F9C'
//             size={22}
//           />
//             <TextInput
//               placeholder='Your Password'
//               secureTextEntry={true}
//               style={styles.textInput}
//               onChangeText={(text) => { setpassword(text) }}
//             value={password}
//             />
//           <TouchableOpacity>
//               <Feather
//                 name='eye-off'
//                 color='#006F9C'
//                 size={25}
//               />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity>
//           <Text style={{ marginTop: 25, fontSize: 14, letterSpacing: 1, color: '#006F9C' }} onPress={() => navigation.navigate('UserSignup')}>Create Account ?</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.buttonlogin}   onPress={() => navigation.navigate('MapScreen',{email}) }>
//           <Text style={styles.textlogin}>
//             Sign In
//        </Text>
//         </TouchableOpacity>
//       </Animatable.View>
//       </View>
//   );
// }
//////////////

class ProviderLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emptyEmail: '',
      emptyPassword: ''
    }
  }
  emailValidator() {
    if (this.state.email == "") {
      this.setState({ emptyEmail: 'Email Field Should Not be Empty' })
    }
    else {
      this.setState({ emptyEmail: '' });
    }
  }
  passworValidator() {
    if (this.state.password == "") {
      this.setState({ emptyPassword: 'Password Field Should Not be Empty' })
    }
    else {
      this.setState({ emptyPassword: '' });
    }
  }

  submit = async () => {
    fetch(`${Ngrok_Url}/provider/signin`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }
        )
      })
      .then(res => res.json())
      .then(async (data) => {
        try {
          // alert(`Name : ${this.state.email} your Account Login successfully`);
          await AsyncStorage.setItem('token', data.token);
          alert(`Name : ${this.state.email} your Account Login successfully`);
          console.log(data);
          this.props.navigation.navigate('ProviderDetails');
        } catch (e) {
          // console.log('Error : ', e)
          alert('Please Enter Correct Details !');
        }
      })
  }

  render() {
    const { navigate } = this.props.navigation;  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.LogoImage} source={require('../images/epar.png')} />
        </View>
        <Animatable.View animation='fadeInUpBig' style={styles.footer}>
          <Text style={styles.text_footer}>E-MAIL</Text>
          <View style={styles.action} >
            <Feather
              name='mail'
              color='#006F9C'
              size={22}
            />
            <TextInput
              placeholder='Your Email'
              onBlur={() => this.emailValidator()}
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ email: text }) }}
            />
          </View>
          <Text style={{ color: 'red' }}>{this.state.emptyEmail}</Text>
          <Text style={[styles.text_footer, { marginTop: 15 }]}>PASSWORD</Text>
          <View style={styles.action}>
            <Feather
              name='lock'
              color='#006F9C'
              size={22}
            />
            <TextInput
              placeholder='Your Password'
              secureTextEntry={true}
              onBlur={() => this.passworValidator()}
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ password: text }) }}
            />
            <TouchableOpacity>
              <Feather
                name='eye-off'
                color='#006F9C'
                size={25}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'red' }}>{this.state.emptyPassword}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProviderSignupScreen')}>
            <Text style={{ marginTop: 15, fontSize: 14, letterSpacing: 1, color: '#006F9C' }}>Create Account ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonlogin} onPress={() => { this.submit() }}>
            <Text style={styles.textlogin}>
              Sign In
             </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}

ProviderLoginScreen.navigationOptions = () => {
  return {
    title: 'Parking Provider Sign-In',
    headerStyle: {
      backgroundColor: '#FFBE59',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      letterSpacing: 1,
      fontSize: 20,
      flex: 1,
      textAlign: "center",
    },
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE59',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center"
  },
  text_footer: {
    marginTop: 15,
    color: '#006F9C',
    fontSize: 17,
    marginBottom: 6
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFBE59',
    paddingBottom: 5,
    color: 'black'
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: '#FF9C00',
  },
  buttonlogin: {
    width: '100%',
    height: 45,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    borderRadius: 12,
    paddingTop: 10,
    marginTop: 40
  },
  buttonSignUp: {
    width: '100%',
    height: 45,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    borderRadius: 12,
    paddingTop: 10,
    marginTop: 20
  },
  textlogin: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1
  },
  LogoImage: {
    marginLeft: '14%',
    marginBottom: -60,
    width: 265,
    height: 190,
  },

});

export default ProviderLoginScreen;