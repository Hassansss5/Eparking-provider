import React from 'react';
import { StyleSheet, Text, Image, View, Alert, TouchableOpacity, KeyboardAvoidingView, TextInput, Keyboard, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import { Ngrok_Url } from '../keys';


class UserSignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      // firstName: '',
      // lastName: '',
      // email: '',
      // phoneNo: '',
      // password: '',
      // firstNameErr: '',
      // lastNameErr: '',
      // emailErr: '',
      // emptyfirstName: '',
      // emptylastName: '',
      // emptyEmail: '',
      // emptyPhone: '',
      // emptyPassword: ''
      fullName: '',
      email: '',
      phoneNo: '',
      parkingName: '',
      address: '',
      discription: '',
      price: '',
      spots: '',
      free: '',
      password:'',
    }
    console.log(this.state.password);
  }
  submit = () => {
    let fullNameRjx = /^[a-zA-Z]+$/;
    let parkingNameRjx = /^[a-zA-Z]+$/;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    let isValidfullName = fullNameRjx.test(this.state.fullName);
    let isValidemail = emailPattern.test(this.state.email);
    let isValidpassword = passwordPattern.test(this.state.password);
    if (!isValidfullName) {
      // this.setState({firstNameErr:'First Name Should be Alphabatic'});
      alert('Full Name Should be Alphabatic');
      Keyboard.dismiss();
    }
    else if (!isValidemail) {
      // this.setState({emailErr:'Provide Valid Email'});
      alert('Provide Valid Email. ' + ' Email Should be According to Email Format');
      Keyboard.dismiss();
    }
    else if (!isValidpassword) {
      // this.setState({emailErr:'Provide Valid Email'});
      alert('Password Should Contain at least one number, one lowercase and one uppercase letter, Total six characters');
      Keyboard.dismiss();
    }
    else {
      fetch(`${Ngrok_Url}/map/mark`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNo: this.state.phoneNo,
            parkingName: this.state.parkingName,
            address: this.state.address,
            description: this.state.discription,
            price: this.state.price,
            spots: this.state.spots,
            free: this.state.free,
            password:this.state.password
          }
          )
        })
        .then(res => res.json())
        .then(async (data) => {
          try {
            alert(`Name : ${this.state.fullName} your Account Created successfully`);
            await AsyncStorage.setItem('token', data.token);
            this.props.navigation.navigate('ProviderLoginScreen');
          } catch (e) {
            console.log('Error: ', e);
          }
        })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='position' style={styles.container} >
        <Animatable.View animation='fadeInUpBig'  >
          <Text style={styles.text_footer}>FULL NAME</Text>
          <View style={styles.action} >
            <FontAwesome
              name='user-o'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Full Name'
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ fullName: text }) }}
            />
          </View>
          <Text style={styles.text_footer}>E-MAIL</Text>
          <View style={styles.action} >
            <Feather
              name='mail'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Email'
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ email: text }) }}
            />
          </View>
          <Text style={styles.text_footer}>PHONE NO</Text>
          <View style={styles.action} >
            <Feather
              name='phone'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Phone No'
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={(text) => { this.setState({ phoneNo: text }) }}
            />
          </View>
          <Text style={styles.text_footer}>PARKING NAME</Text>
          <View style={styles.action} >
            <Feather
              name='user'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Parking Name'
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ parkingName: text }) }}
            />
          </View>
          <Text style={[styles.text_footer,]}>ADDRESS</Text>
          <View style={styles.action}>
            <Feather
              name='lock'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Address'
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ address: text }) }}
            />
          </View>
          <Text style={[styles.text_footer,]}>DISCRIPTION</Text>
          <View style={styles.action}>
            <Feather
              name='info'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Discription'
              style={styles.textInput}
              onChangeText={(text) => { this.setState({ discription: text }) }}
            />
          </View>
          <View style={styles.containerr}>
            <View style={styles.viewStyleOne}>
              <Text style={styles.text_footer}>PRICE</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder='Your Price'
                  style={styles.textInputt}
                  keyboardType='numeric'
                  onChangeText={(text) => { this.setState({ price: text }) }}
                />
              </View>
            </View>
            <View style={styles.viewStyleOne}>
              <Text style={styles.text_footer}>SPOTS</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder='Your Spots'
                  style={styles.textInputt}
                  keyboardType='numeric'
                  onChangeText={(text) => { this.setState({ spots: text }) }}
                />
              </View>
            </View>
            <View style={styles.viewStyleOne}>
              <Text style={styles.text_footer}>FREE</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder='Your Free Slots'
                  style={styles.textInputt}
                  keyboardType='numeric'
                  onChangeText={(text) => { this.setState({ free: text }) }}
                />
              </View>
            </View>
          </View>
          <Text style={[styles.text_footer,]}>PASSWORD</Text>
          <View style={styles.action}>
            <Feather
              name='lock'
              color='#006F9C'
              size={20}
            />
            <TextInput
              placeholder='Your Password'
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(text) => { this.setState({ password: text }) }}
            />
          </View>
          <TouchableOpacity style={styles.buttonlogin} onPress={() => { this.submit() }}>
            <Text style={styles.textlogin}>
              Sign Up
         </Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    );
  }
}

UserSignupScreen.navigationOptions = () => {
  return {
    title: 'Parking Provider Sign-Up',
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
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: '5%'
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderColor: 'blue',
    borderWidth: 5,
  },
  text_header: {
    color: '#fff',
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center"
  },
  text_footer: {
    color: '#006F9C',
    paddingBottom: 8,
    fontSize: 15,
    paddingTop: 10
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#FFBE59',
    paddingBottom: 5,
    color: 'black',
    marginBottom: 10
  },
  containerr: {
    // backgroundColor:'#4286f4', 
    // flex: 1,
    flexDirection: 'row'
  },
  viewStyleOne: {
    width: '31%',
    height: 80,
    marginRight: 15,
    marginBottom: 10,
  },
  textStyle: {
    textAlign: 'center'
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: '#FF9C00',
  },
  textInputt: {
    flex: 1,
    paddingLeft: 8,
    color: '#FF9C00',
  },
  buttonlogin: {
    width: '100%',
    height: 45,
    borderColor: '#006F9C',
    backgroundColor: '#006F9C',
    borderRadius: 12,
    paddingTop: 10,
    marginTop: 10
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

export default UserSignupScreen;