import React from 'react'; 
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
  Image
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';

// Importing Parking Provider Screens
import ProviderBookingDetailsScreen from './src/ParkingProviderScreens/ProviderBookingDetailScreen';
import ProviderLoginScreen from './src/ParkingProviderScreens/ProviderLoginScreen';
import ProviderProfileScreen from './src/ParkingProviderScreens/ProviderProfileScreen';
import ProviderSignupScreen from './src/ParkingProviderScreens/ProviderSignupScreen';
import ProviderUpdateScreen from './src/ParkingProviderScreens/ProviderUpdateScreen';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const providerToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(providerToken ? 'providerApp' : 'providerAuth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        {/* <Image source={require('./assets/epark.png')} /> */}
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
});


 const ProviderLoginFLow = createStackNavigator({ 
    ProviderLoginScreen : ProviderLoginScreen,
    ProviderSignupScreen : ProviderSignupScreen
 });

// const ProviderMainFlow = createBottomTabNavigator({
//   ProviderDetails : ProviderBookingDetailsScreen,
//   ProviderProfileFLow : createStackNavigator({
//     ProviderProfile : ProviderProfileScreen,
//     ProviderUpdate : ProviderUpdateScreen 
//   }),
// })

const profileflow = createStackNavigator({ 
  ProviderProfile : ProviderProfileScreen,
  ProviderUpdate : ProviderUpdateScreen,
 });


const TabStack= createBottomTabNavigator(
  {
    //Defination of Navigaton bottom options
    ProviderDetails: { 
      screen: ProviderBookingDetailsScreen,
      navigationOptions: {
       
        tabBarIcon: ({tintColor}) =>  <Feather
        name='info'
        color={tintColor}
        size={25}
      />
      }
    },
    profileflow: { 
      screen: profileflow,
      navigationOptions: {
       
        tabBarIcon: ({tintColor}) =>  
        <Feather
        name='user'
        color={tintColor}
        size={25}
      />
      }
    },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
      initialRouteName: 'ProviderDetails',
      headerMode:'none',
      navigationOptions:{tabBarVisible: false},
      tabBarOptions: {
      activeTintColor: '#006F9C',
      inactiveTintColor:'#708090',
      showLabel: false,
      
    },

  }
);

// const switchNavigator = createSwitchNavigator({
//   UserLoginFlow: createStackNavigator({
//     Home : HomeScreen,
//     UserLoginScreen : UserLoginScreen,
//     UserSignupScreen : UserSignupScreen
//   }),
//   ProviderLoginFLow: createStackNavigator({
//     Home : HomeScreen,
//     ProviderLoginScreen : ProviderLoginScreen,
//     ProviderSignupScreen : ProviderSignupScreen
//   }),
//   UserMainFLow: createBottomTabNavigator({
//     MapScreen : MapScreen,
//     UserBookingDetails : UserBookingDetailsScreen,
//     UserProfileFLow : createStackNavigator({
//       UserProfile : UserProfileScreen,
//       UserUpdate : UserUpdateScreen 
//     })
//   }),
//   ProviderMainFlow: createBottomTabNavigator({
//     ProviderDetails : ProviderBookingDetailsScreen,
//     ProviderProfileFLow : createStackNavigator({
//       ProviderProfile : ProviderProfileScreen,
//       ProviderUpdate : ProviderUpdateScreen 
//     }),
//   })
// })
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    providerAuth: ProviderLoginFLow,
    providerApp: TabStack,

  },
  {
    initialRouteName: 'AuthLoading',
  }
));
