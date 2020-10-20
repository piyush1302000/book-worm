import React from 'react'
import {View, Text, StyleSheet, TextInput, ActivityIndicator} from 'react-native'
import CustomButton from '../components/CustomButton'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export class LogInScreen extends React.Component{

    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            isloading: false
        }
    }

    onSignIn = async () => {
        if (this.state.email && this.state.password) {
            this.setState({isloading: true})
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                if (response) {
                    this.setState({isloading: false})
                    this.props.navigation.navigate('LoadingScreen')
                }
            }catch(error){
                this.setState({isloading: false})
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('A user with that email does not exist.Try signing Up')
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter an valid email address')
                        break;
                }
            }
        }
        else{
            alert('Please enter email and password')
        }
    }

    onSignUp = async () => {
        if (this.state.email && this.state.password) {
            this.setState({isloading: true})
            try{
                const response = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                if (response) {
                    this.setState({isloading: false})
                    const user = firebase.database().ref('users/').child(response.user.uid).set({email: response.user.email,uid: response.user.uid})
                    this.props.navigation.navigate('LoadingScreen')
                }
            }catch(error)
            {
                this.setState({isloading: false})
                if (error.code == 'auth/email-already-in-use') {
                    alert('User already Exists.Try Loggin in')
                }
            } 
        }
        else{
            alert('Please enter email and password')
        }
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.isloading? <View style={[StyleSheet.absoluteFill,{alignItems: 'center', justifyContent: 'center', zIndex: 1000, elevation: 1000}]}>
                <ActivityIndicator size='large' color="#bada55" />
                </View>
                 : null }
                <View style={{flex: 1, paddingTop: 20}}>
                <TextInput style={styles.textInput}
                placeholder="abc@example.com"
                placeholderTextColor="#b6b6b6"
                keyboardType="email-address"
                onChangeText={email => this.setState({email: email})}
                />
                <TextInput style={styles.textInput}
                 placeholder="enter password"
                 placeholderTextColor="#b6b6b6"
                 secureTextEntry
                 onChangeText={password => this.setState({password: password})} 
                />
                <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 20}}>
                <CustomButton title="Log in" onPress={this.onSignIn} style={{width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: '#a5deba', marginBottom: 10}}>
                    <Text style={{fontWeight: '100', color: '#fff'}}>Log In</Text>
                </CustomButton>
                <CustomButton title="Log in" onPress={this.onSignUp} style={{width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: '#deada5', marginBottom: 10}}>
                    <Text style={{fontWeight: '100', color: '#fff'}}>Sign Up</Text>
                </CustomButton>
                </View>
                </View>
                <View style={{flex: 1}}/>  
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E424D'
    },
    textInput: {
        height: 50,
        borderWidth: 0.5,
        borderColor: '#E9E9E9',
        marginHorizontal: 40,
        marginBottom: 10,
        color: '#fff',
        paddingHorizontal: 10
    }
})