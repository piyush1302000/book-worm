import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

function getPosition(position) {
    switch (position) {
        case 'left':
            return {position: 'absolute', left: 20, bottom: 270}
        default:
            return {position: 'absolute', right: 20, bottom: 270}
    }
    
}


const CustomButton = ( {children, style, onPress, position} ) => {
const floatActionButton = position? getPosition(position) : [];
    return(
    <TouchableOpacity onPress={onPress} style={floatActionButton}>
    <View style={[styles.button, style]}>
        {children}
    </View>
    </TouchableOpacity>
    );
}

CustomButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    style: PropTypes.object
}

CustomButton.defaultProps = {
    style: {}
}

const styles = StyleSheet.create({
    button:
    {width: 50,
     height: 50,
     backgroundColor: '#a5deba',
     paddingLeft: 5,
     alignItems: 'center',
     justifyContent: 'center'}
})

export default CustomButton