import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

export default class ProgressBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Size of the enclosing square
        const sqSize = Dimensions.get('window').width;

        const strokeWidth = 25;
        // SVG centers the stroke width on the radius, subtract out so circle fits in square
        const radius = (sqSize - strokeWidth) / 3.8;
        // Enclose cicle in a circumscribing square
        const viewBox = `0 0 ${sqSize} ${sqSize}`;
        // Arc length at 100% coverage is the circle circumference
        const dashArray = radius * Math.PI * 2;
        // Scale 100% coverage overlay with the actual percent
        const dashOffset = dashArray - dashArray * this.props.percentage / 100;

        return (
            <View
            style={{height: "100%"}}>
                <Text
                    style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                    {this.props.title}
                </Text>
                <Svg
                    viewBox={viewBox}>
                    <Circle
                        fill='none'
                        stroke='#ddd'
                        className="circle-background"
                        cx={sqSize / 2}
                        cy={sqSize * 0.4}
                        r={radius}
                        strokeWidth={`${strokeWidth}px`} />
                    <Circle
                        fill='none'
                        stroke={this.props.color}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className="circle-progress"
                        cx={sqSize * 0.6}
                        cy={sqSize / 2}
                        r={radius}
                        strokeWidth={`${strokeWidth}px`}
                        // Start progress marker at 12 O'Clock
                        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                        style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                        }} />
                    <View style={{height: '100%', paddingTop: '30%'}}>
                        <Text
                            fill='red'
                            className="circle-text"
                            dy=".3em"
                            style={{textAlign: 'center', fontSize: 24}}>
                            {`${this.props.percentage}%`}
                        </Text>
                    </View>
                </Svg>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     // app: {
//     //     marginTop: '40px',
//     // },
//     // circleBackground: {
//     //     stroke: '#ddd',
//     // },
//     // circleProgress: {
//     //     fill: 'none',
//     //     stroke: 'red',
//     //     strokeLinecap: 'round',
//     //     strokeLinejoin: 'round',
//     // },
//     circleText: {
//         fontSize: '3em',
//         fontWeight: 'bold',
//         fill: 'red',
//     },
// });