import React from 'react';
import { StyleSheet, TextInput, Button, View} from 'react-native';
import Habit from './Habit';

/*
* Page: Add Habit
*/
export default class AddHabitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'goal': 0,
            'minimum': 0,
            'type': 'Binary',
            'schedule': new Array(7).fill(false),
            'scheduleType': 'Fixed',
            'goalRange': "Weekly"
        };
    }

    handleGoalRangeButtonClick = (i) => {
        if (i == 0) {
            this.setState({goalRange: "Weekly"})
        }
        else if (i == 1) {
            this.setState({goalRange: "Monthly"})
        }
        else if (i == 2) {
            this.setState({goalRange: "Annual"})
        }
    }

    addGoalRangeButtonComponents = () => {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={[styles.bigButton, this.state.goalRange == "Weekly" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Weekly'
                        onPress = {() => this.handleGoalRangeButtonClick(0)}
                    />
                </View>
                <View style={[styles.bigButton, this.state.goalRange == "Monthly" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Monthly'
                        onPress = {() => this.handleGoalRangeButtonClick(1)}
                    />
                </View>
                <View style={[styles.bigButton, this.state.goalRange == "Annual" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Annual'
                        onPress = {() => this.handleGoalRangeButtonClick(2)}
                    />
                </View>
            </View>
        )
    }

    handleScheduleTypeButtonClick = (i) => {
        if (i == 0) {
            this.setState({scheduleType: "Fixed"})
        }
        else if (i == 1) {
            this.setState({scheduleType: "Flexible"})
        }
    }

    addScheduleTypeButtonComponents = () => {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                <View style={[styles.bigButton, this.state.scheduleType == "Fixed" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Fixed'
                        onPress = {() => this.handleScheduleTypeButtonClick(0)}
                    />
                </View>
                <View style={[styles.bigButton, this.state.scheduleType == "Flexible" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Flexible'
                        onPress = {() => this.handleScheduleTypeButtonClick(1)}
                    />
                </View>
            </View>
        )
    }

    handleFixedScheduleButtonClick = (i) => {
        currSchedule = this.state.schedule
        currSchedule[i] = !currSchedule[i]
        this.setState({newSchedule: currSchedule})
    }

    addFixedScheduleButtonComponents = () => {
        return (
            <View style={[this.state.scheduleType == "Fixed" ? {flex: 1, flexDirection: 'row'} : {display: 'none'}]}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day_of_week, i) => {
                    return (
                        <View key={i} style={[styles.button, this.state.schedule[i] ? styles.pressedButton : styles.unpressedButton]}>
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

    handleHabitTypeButtonClick = (i) => {
        if (i == 0) {
            this.setState({type: "Binary"})
        }
        else if (i == 1) {
            this.setState({type: "Continuous"})
        }
    }

    addHabitTypePickerComponent = () => {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 15}}>
                <View style={[styles.bigButton, this.state.type == "Binary" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Binary'
                        onPress = {() => this.handleHabitTypeButtonClick(0)}
                    />
                </View>
                <View style={[styles.bigButton, this.state.type == "Continuous" ? styles.pressedButton : styles.unpressedButton]}>
                    <Button 
                        title = 'Continuous'
                        onPress = {() => this.handleHabitTypeButtonClick(1)}
                    />
                </View>
            </View>
        )
    }

    /*
    * Creates a TextInput Component
    */

    addTextInputComponents = () => {
        return (
            <View style={{position: 'absolute', top: 125}}>
                {this.addTextInputComponent("Habit Name", this.handleNameInput)}
                {this.addScheduleTypeButtonComponents()}
                {this.addFixedScheduleButtonComponents()}
                {this.addTextInputComponent("Goal", this.handleGoalInput)}
                {this.addGoalRangeButtonComponents()}
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
        if (this.state.scheduleType) {
            this.state.schedule = {}
        }
        addNewHabit(new Habit(this.state.name, this.state.type, this.state.schedule, this.state.goal, this.state.minimum, this.state.goalRange, {}))
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
    bigButton: {
        height: 50,
        width: 125,
    },
    pressedButton: {
        backgroundColor: 'purple'
    },
    unpressedButton: {
        backgroundColor: 'grey'
    }
 })