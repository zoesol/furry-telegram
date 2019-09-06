import React from 'react';
import { StyleSheet, Button, Text, View, YellowBox } from 'react-native';
import Dialog from 'react-native-dialog';
import Habit from './Habit';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDialogVisible: false,
      pressStatus: Array.from(7, (_, i) => 0),
      lastPressed: 0,
      logText: "",
      logInterval: 0,
    };
  }

 /*
 * Maps the list of Habit Object and Creates a Button Component for each
 *  Each Habit Button can be clicked to log the completion of that habit.
 */
  addHabitButtonComponents = () => {
    return (
      <View style={styles.habitGroup}>
        {this.props.screenProps.habits.map((habit, i) => {
          bWidth = 0
          backcolor = `#07d400`;
          if (this.state.pressStatus[i]) {
            backcolor = `#07d4${Math.min(Math.ceil(this.state.pressStatus[i] * 255), 255).toString(16)}`;
            if (this.state.pressStatus[i] >= 1.0) {
              bWidth = 1
            }
          }
          return (
            <View key={i} style={[styles.habit, {backgroundColor: backcolor, borderWidth: bWidth}]}>
              <Button
                title={habit.habit_name}
                onPress={() => this.handleHabitButtonClick(i)}
                color="black"
              />
              <Text>
                {habit.getProgress()}
              </Text>
            </View>
          )
        })}
        {this.addDiaglogInputComponent()}
      </View>
    )
  }

  handleHabitButtonClick = (i) => {
    if (this.props.screenProps.habits[i].type == "Continuous" || this.state.pressStatus[i] < 1.0 || !this.state.pressStatus[i]) {
      this.setState({
        isDialogVisible: true,
        lastPressed: i
      })
    }
  }

 /*
 * Create a Diaglog Input Component used for logging of a completed Habit
 */
  addDiaglogInputComponent = () => {
    let dialogTitle = `${this.props.screenProps.habits[this.state.lastPressed].habit_name} Log`
    if (this.props.screenProps.habits[this.state.lastPressed].type == "Continuous") {
      return (
        <Dialog.Container visible={this.state.isDialogVisible} contentStyle={{height: 300, paddingBottom: 120}}>
        <Dialog.Title> {dialogTitle} </Dialog.Title>
        <Dialog.Input height="30%" multiline={false} onChangeText={(inputText)=> this.handleHabitLogIntervalInput(inputText)}></Dialog.Input>
        <Dialog.Input height="70%" multiline={true} onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={this.handleCloseDialog}></Dialog.Button>
        <Dialog.Button label="Submit" onPress={() => this.handleSubmitDialog(this.state.logText)}></Dialog.Button>
      </Dialog.Container> 
      )
    }
    else if (this.props.screenProps.habits[this.state.lastPressed].type == "Binary") {
      return (
        <Dialog.Container visible={this.state.isDialogVisible} contentStyle={{height: 300, paddingBottom: 120}}>
          <Dialog.Title> {dialogTitle} </Dialog.Title>
          {/* <Dialog.Description>Message for Dialog Input</Dialog.Description> */}
          <Dialog.Input height="100%" multiline={true} onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCloseDialog}></Dialog.Button>
          <Dialog.Button label="Submit" onPress={() => this.handleSubmitDialog()}></Dialog.Button>
        </Dialog.Container> 
      )
    }
    else {
      console.log("Error in Construction of DialogInput's Inputs")
      return (null)
    }
  }

handleHabitLogIntervalInput = (inputText) => {
  this.setState({logInterval: inputText})
}

handleHabitLogTextInput = (inputText) => {
  this.setState({logText: inputText})
}

handleSubmitDialog = () => {
  this.props.screenProps.habits[this.state.lastPressed].updateLog(this.state.logText, this.state.logInterval)

  this.setState((previousState) => {
    let newPressStatus = previousState.pressStatus;
    newPressStatus[this.state.lastPressed] = this.props.screenProps.habits[this.state.lastPressed].getProgressTowardsMinimum();
    return {pressStatus: newPressStatus}
    }
  )
  this.setState({isDialogVisible: false, logText: "", logInterval: 0})
}

handleCloseDialog = () => {
  this.setState({isDialogVisible: false})
}


  /*
  * Creates a Button Component that navigates to the Add Habit Page
  */
  addNewHabitButtonComponent = () => {
    return (
      <View style={styles.addHabitButton}>
        <Button
          title="New Habit"
          onPress={() => this.props.navigation.navigate('AddHabit', {
            addHabitCallback: this.props.screenProps.addNewHabitCallback,
            src: "Home"
          })}
          color='white'
        />
      </View>
    )
  }


  /*
  * Creates a Text Component for the Page Title
  */
  addPageTitleComponent = () => {
    return (
      <View style={styles.pageTitle}>
        <Text>
          Home
        </Text>
      </View>
    )
  }

  //React Render
  render() {
    return (
      <View style={styles.homePage}>
        {this.addPageTitleComponent()}
        {this.addNewHabitButtonComponent()}
        {this.addHabitButtonComponents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  habitGroup: {
    width: '100%',
    height: '50%',
    top: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'lightgrey',
  },
  habit: {
    width: 80, height: 80, margin: 10,
  },
  habitAchieved: {
  },
  pageTitle: {
    top: '10%',
  },
  addHabitButton: {
    position: 'absolute',
    top: '3%',
    left: '10%',
    backgroundColor:"purple",
    width: '30%'
  },
  goalsButton: {
    top: '3%',
    position: 'absolute',
    right: '10%',
    backgroundColor:"purple",
    width: '30%'
  },
  habitButtonText: {
    textAlign: 'center'
  }
});