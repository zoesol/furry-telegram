import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import Habit from './Habit';

export default class AddHabitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': "",
            'schedule': {},
            'goal': 0,
        };
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
    render() {
      return (
        // <Text>Add Habit Page</Text>
        <View style={styles.container}>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Habit Name"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleNameInput}/>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Schedule"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleScheduleInput}/>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Goal"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGoalInput}/>
            <View>
                <Button
                    title="Submit"
                    onPress={() => {
                      console.log(this.props)
                      const addNewHabit = this.props.navigation.getParam('addHabitCallback', () => {})
                      addNewHabit(
                        new Habit(
                          this.state.name, 
                          this.state.schedule, 
                          this.state.goal
                        )
                      )
                        this.props.navigation.navigate('Home')
                    }}
                />
            </View>
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