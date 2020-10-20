import React from 'react'
import {View, Text, ScrollView, SafeAreaView, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {DrawerItems} from 'react-navigation'

export class CustomDrawer extends React.Component{

    render(){
        return(
            <ScrollView>
                <SafeAreaView style={{backgroundColor: '#2E424D', paddingTop: Platform.OS == 'android'? 30 : 0}} />
                <View style={{height: 150, backgroundColor: '#2E424D', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="ios-bookmarks" size={100} color={'#bada55'} />
                    <Text style={{fontSize: 24,color: '#fff'}}>Book Worm</Text>
                </View>
                <DrawerItems {...this.props} />
            </ScrollView>
        )
    }
}