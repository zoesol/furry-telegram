import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

export default class NumberBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Size of the enclosing square
        const sqSize = Dimensions.get('window').width;
        primaryColor = this.props.color;

        return (
            <View
            style={{height: "100%"}}>
                <Text
                    style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                    {this.props.title}
                </Text>
                <Text
                style={{textAlign: 'center', fontSize: 80, 
                    paddingTop: this.props.textOffset, color: primaryColor}}>
                    {this.props.number}
                </Text>
                <Text
                style={{textAlign: 'center', fontSize: 18}}>
                    {this.props.label}</Text>
            </View>
        );
    }
}
