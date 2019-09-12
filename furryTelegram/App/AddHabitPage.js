import React from 'react';
import { StyleSheet, TextInput, Button, View, Picker } from 'react-native';
import Habit from './Habit';

/*
* Page: Add Habit
*/
export default class AddHabitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'schedule': {},
            'goal': 0,
            'minimum': 0,
            'type': 'Binary',
            'newSchedule': new Array(7).fill(false)
        };
    }

    handleFixedScheduleButtonClick = (i) => {
        currSchedule = this.state.newSchedule
        currSchedule[i] = !currSchedule[i]
        this.setState({newSchedule: currSchedule})
    }

    addFixedScheduleButtonComponents = () => {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day_of_week, i) => {
                    return (
                        <View key={i} style={[styles.button, this.state.newSchedule[i] ? styles.pressedButton : styles.unpressedButton]}>
                            <Button
                                title = {day_of_week}
                                onPress = {() => this.handleFixedScheduleButtonClick(i)}
                            />
                        </View>
                    )
                })}
            </View>
        )
    }

    addHabitTypePickerComponent = () => {
        return (
            <View style={styles.habitTypePicker}>
            <Picker
                selectedValue={this.state.type}
                style={{height: 20, width: 100}}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({type: itemValue})
                }
                }>
                <Picker.Item label="Binary" value="Binary" />
                <Picker.Item label="Continuous" value="Continuous" />
            </Picker>
            </View>
        )
    }

    /*
    * Creates a TextInput Component
    */

    addTextInputComponents = () => {
        return (
            <View style={{position: 'absolute', top: 200}}>
                {this.addTextInputComponent("Habit Name", this.handleNameInput)}
                {this.addTextInputComponent("Schedule", this.handleScheduleInput)}
                {this.addFixedScheduleButtonComponents()}
                {this.addTextInputComponent("Goal", this.handleGoalInput)}
                {this.addTextInputComponent("Minimum", this.handleMinimumInput)}
            </View>
        )
    }

    addTextInputComponent = (name, callback) => {
        return (
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {name}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {callback}/>
        )
    }

    handleNameInput = (inputText) => {
        this.setState({
            name: inputText
        })
    }
    handleScheduleInput = (inputText) => {
        this.setState({
            schedule: inputText
        })
    }
    handleGoalInput = (inputText) => {
        this.setState({
            goal: inputText
        })
    }
    handleMinimumInput = (inputText) => {
        this.setState({
            minimum: inputText
        })
    }

    /*
    * Creates a Button Component used to Submit
    */
    addSubmitButtonComponent = () => {
        return (
            <View style={{position: 'absolute', top: 600}}>
                <Button
                    title="Submit"
                    onPress={this.handleSubmitButtonPress}
                />
            </View>
        )
    }

    handleSubmitButtonPress = () => {
        const addNewHabit = this.props.navigation.getParam('addHabitCallback', () => {})
        const src = this.props.navigation.getParam('src', () => {})
        addNewHabit(new Habit(this.state.name, this.state.type, this.state.schedule, this.state.goal, this.state.minimum, {}))
        this.props.navigation.navigate(src)
    }
      
    //React Render
    render() {
      return (
        <View style={styles.container}>
            {this.addHabitTypePickerComponent()}
            {this.addTextInputComponents()}
            {this.addSubmitButtonComponent()}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    },
    habitTypePicker: {
        height: '40%',
        width: '100%',    
    },
    button: {
        height: 50,
        width: 50
    },
    pressedButton: {
        backgroundColor: 'purple'
    },
    unpressedButton: {
        backgroundColor: 'grey'
    }
 })