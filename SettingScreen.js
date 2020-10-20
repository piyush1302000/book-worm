import React from 'react'
import {View, Text} from 'react-native'
import CustomButton from '../components/CustomButton'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export class SettingScreen extends React.Component{

    signOut = async () => {
        try{
            await firebase.auth().signOut();
            this.props.navigation.navigate('WelcomeScreen')
        }catch(error){
            alert('Unable to SignOut right now')
        }
    }

    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2E424D'}}>
                <CustomButton title="Back" onPress={this.signOut} style={{width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: '#a5deba', marginBottom: 10}}>
                        <Text style={{fontWeight: '100', color: '#fff'}}>Log Out</Text>
                    </CustomButton>
            </View>
        )
    }
}