import React from 'react';
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

    handleSubmitButtonPress = () => {
        const addNewGoal = this.props.navigation.getParam('addGoalCallback', () => {})
        addNewGoal(new Goal(this.state.name, this.state.description, this.state.end_date))
        this.props.navigation.navigate('Goals')
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

    //React Render
    render() {
      return (
        <View style={styles.container}>
            {this.addTextInputComponent("Goal Name", this.handleNameInput)}
            {this.addTextInputComponent("Description", this.handleDescriptionInput)}
            {this.addTextInputComponent("End Date", this.handleEndDateInput)}
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