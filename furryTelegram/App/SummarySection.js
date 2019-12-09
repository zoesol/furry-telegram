import React from 'react';
import { View, Dimensions } from 'react-native';
import NumberBlock from './NumberBlock';
import ProgressBlock from './ProgressBlock';

export default class SummarySection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const screenWidth = Dimensions.get('window').width / 2;
        const goalValue = 3;
        const currentStreak = 1;
        const longestStreak = 4;
        const textOffset = '10%';
        const primaryColor = this.props.primaryColor;

        return (
            <View>
                <View style={{flexDirection: "row", height: screenWidth, flexWrap: "wrap"}}>
                    <View 
                    style={{width: "50%"}}
                    class='upper-left summary-block'>
                        <NumberBlock 
                        title='Goal' 
                        number={goalValue}
                        textOffset={textOffset}
                        label="days / week"
                        color={primaryColor}></NumberBlock>
                    </View>
                    <View 
                    style={{width:"50%", paddingTop: "-20%"}}
                    class='upper-right summary-block'>
                        <ProgressBlock 
                            title='Progress'
                            percentage="25"
                            color={primaryColor}
                        ></ProgressBlock>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View 
                    style={{width: "50%", height: screenWidth}}
                    class='lower-left summary-block'>
                        <NumberBlock 
                        title='Current Streak'
                        number={currentStreak}
                        textOffset={textOffset}
                        label="week"
                        color={primaryColor}></NumberBlock>
                    </View>
                    <View 
                    style={{width: "50%", height: screenWidth}}
                    class='lower-right summary-block'>
                        <NumberBlock 
                        title='Longest Streak'
                        number={longestStreak}
                        textOffset={textOffset}
                        label="weeks"
                        color={primaryColor}></NumberBlock>
                    </View>
                </View>
            </View>
        );
    }
}
