import React from 'react';
import { StyleSheet, Button, Text, View, YellowBox } from 'react-native';
import Dialog from 'react-native-dialog';
import Habit from './Habit';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDialogVisible: false,
      // HABITS ARE HARDCODED FOR NOW
      // Later should be loaded from user profile in persistent storage
      habits: [
        new Habit("Stretch", {}, 30),
        new Habit("Yoga", {"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}, 15),
        new Habit("Prehab", {}, 30),
        new Habit("Water", {}, 30),
        new Habit("Hang Board", {"Tuesday": "Evening", "Saturday": "Anytime"}, 6),
        new Habit("Lift", {"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}, 15),
      ],
      pressStatus: Array.from(7, (_, i) => false),
      lastPressed: 0,
      noteText: ""
    };
  }

 /*
 * Maps the list of Habit Object and Creates a Button Component for each
 *  Each Habit Button can be clicked to log the completion of that habit.
 */
  addHabitButtonComponents = () => {
    return (
      <View style={styles.habitGroup}>
        {this.state.habits.map((habit, i) => {
          return (
            <View key={i} style={[styles.habit, this.state.pressStatus[i] ? styles.onButton : styles.offButton]}>
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
    if (!this.state.pressStatus[i]) {
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
    return (
      <Dialog.Container visible={this.state.isDialogVisible} contentStyle={{height: 300, paddingBottom: 120}}>
        <Dialog.Title>{this.state.habits[this.state.lastPressed].habit_name} Log</Dialog.Title>
        {/* <Dialog.Description>Message for Dialog Input</Dialog.Description> */}
        <Dialog.Input height="100%" multiline={true} onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={this.handleCloseDialog}></Dialog.Button>
        <Dialog.Button label="Submit" onPress={() => this.handleSubmitDialog(this.state.noteText)}></Dialog.Button>
      </Dialog.Container> 
    )
  }

handleHabitLogTextInput = (inputText) => {
  this.setState({noteText: inputText})
}

handleSubmitDialog = (inputText) => {
  this.setState((previousState) => {
    let newPressStatus = previousState.pressStatus;
    newPressStatus[this.state.lastPressed] = !newPressStatus[this.state.lastPressed];
    return {pressStatus: newPressStatus}
    }
  )
  this.state.habits[this.state.lastPressed].setHistory(inputText)
  this.setState({isDialogVisible: false, noteText: ""})
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
            addHabitCallback: this.addNewHabitCallback
          })}
          color='white'
        />
      </View>
    )
  }

  addNewHabitCallback = (newHabit) => {
    this.setState(previousState => ({ 
      habits: [...previousState.habits, newHabit]
    }))
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

//Silences the designated warnings
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
]);

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
  onButton: {
    backgroundColor:"blue"
  },
  offButton: {
    backgroundColor:"green"
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