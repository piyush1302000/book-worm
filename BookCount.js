import React from 'react'
import {View, Text} from 'react-native'
import PropTypes from 'prop-types'

const BookCount = ({title, count}) =>
 (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 20}} > {title} </Text>
            <Text> {count} </Text>
          </View>
 );

 BookCount.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string
 };

 export default BookCount;