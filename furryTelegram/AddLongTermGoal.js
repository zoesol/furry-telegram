import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import Goal from './LongTermGoal';

export default class AddGoalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': "",
            'description': "",
            'end_date': "",
        };
    }

    static navigationOptions = {
        title: 'New Goal Page',
      };

    handleNameInput = (inputText) => {
        this.setState({
            name: inputText
        })
    }
    handleDescriptionInput = (inputText) => {
        this.setState({
            description: inputText
        })
    }
    handleEndDateInput = (inputText) => {
        this.setState({
            end_date: inputText
        })
    }
    componentWillUnmount = () => {
        console.log("Unmounting Add Goal Page")
      }

    render() {
      return (
        // <Text>Add Habit Page</Text>
        <View style={styles.container}>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Goal Name"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleNameInput}/>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Description"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleDescriptionInput}/>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "End Date"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleEndDateInput}/>
            <View>
                <Button
                    title="Submit"
                    onPress={() => {
                      const addNewGoal = this.props.navigation.getParam('addGoalCallback', () => {})
                      addNewGoal(
                        new Goal(
                          this.state.name, 
                          this.state.description, 
                          this.state.end_date
                        )
                      )
                        this.props.navigation.navigate('Goals')
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