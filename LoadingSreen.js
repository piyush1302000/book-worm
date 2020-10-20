import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export class LoadingScreen extends React.Component{

    componentDidMount(){
     this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
    this.unSubscribe =  firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('HomeScreen', {user})
            }
            else{
                this.props.navigation.navigate('LogInScreen')
            }
        })
    }

    componentWillUnmount(){
        this.unSubscribe();
    }

    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#bada55" />
            </View>
        )
    }
}