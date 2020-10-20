import React from 'react'
import {View, Text} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'

export class WelcomeScreen extends React.Component{
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#2E424D'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="ios-bookmarks" size={150} color={'#bada55'} />
                     <Text style={{fontSize: 45, color: '#fff'}}>Book Worm</Text>
                </View>
                 <View style={{flex: 1, alignItems: 'center'}}>
                     <CustomButton title="Log in" onPress={() => this.props.navigation.navigate('LogInScreen')} style={{width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: '#a5deba', marginBottom: 10}}>
                        <Text style={{fontWeight: '100', color: '#fff'}}>Log In</Text>
                    </CustomButton>       
                 </View> 
            </View>
        )
    }
}