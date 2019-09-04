import React from 'react';
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import Habit from './Habit';

/*
* Page: Add Habit
*/
export default class AddHabitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': "",
            'schedule': {},
            'goal': 0,
        };
    }

    /*
    * Creates a TextInput Component
    */
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

    /*
    * Creates a Button Component used to Submit
    */
    addSubmitButtonComponent = () => {
        return (
            <View>
                <Button
                    title="Submit"
                    onPress={this.handleSubmitButtonPress}
                />
            </View>
        )
    }

    handleSubmitButtonPress = () => {
        const addNewHabit = this.props.navigation.getParam('addHabitCallback', () => {})
        addNewHabit(new Habit(this.state.name, this.state.schedule, this.state.goal))
        this.props.navigation.navigate('Home')
    }
      
    //React Render
    render() {
      return (
        <View style={styles.container}>
            {this.addTextInputComponent("Habit Name", this.handleNameInput)}
            {this.addTextInputComponent("Schedule", this.handleScheduleInput)}
            {this.addTextInputComponent("Goal", this.handleGoalInput)}
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
    }
 })