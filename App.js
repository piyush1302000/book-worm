import React from 'react';
import { View } from 'react-native';
import {HomeScreen} from './screens/HomeScreen'
import {WelcomeScreen} from './screens/WelcomeScreen'
import {LogInScreen} from './screens/LogInScreen'
import {SettingScreen} from './screens/SettingScreen'
import {LoadingScreen} from './screens/LoadingSreen'
import {CustomDrawer} from './components/CustomDrawer'
import {Ionicons} from '@expo/vector-icons'
import * as firebase from 'firebase/app'
import {firebaseConfig} from './config/config'
import {createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator} from 'react-navigation'

const DrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
    title: 'Home',
    drawerIcon: () => <Ionicons name="ios-home" size={24} />
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
    title: 'Settings',
    drawerIcon: () => <Ionicons name="ios-settings" size={24} />
    }
  }
},
{
  contentComponent: CustomDrawer
}
)

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  LogInScreen: {
    screen: LogInScreen,
    navigationOptions: {

    }
  }
},{
  mode: 'modal',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2E424D'
    }
  }
})

const AppSwitchContainer = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  DrawerNavigator
})

const AppContainer = createAppContainer(AppSwitchContainer)


export default class App extends React.Component {

  constructor(){
    super()
    this.initializeFirebase()
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  }

  render(){
  return (
   <View style={{flex: 1}}>
     <AppContainer/>
   </View>
  );
  }
}

