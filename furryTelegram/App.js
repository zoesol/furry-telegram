import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AddHabitPage from './AddHabit';

const styles = StyleSheet.create({
  homePage: {
    position: "absolute",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  habitGroup: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'relative',
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
    right: '35%',
    backgroundColor:"purple"
  },

});

// Might want to add additional features in the future like a required duration or stuff for categorical habits
function Habit(name, schedule, month_goal) {
  this.habit_name = name;
  this.history = {};
  //A map of the day of week to time of day the activity has to be complete
  // Value is 'X' if the activity is not scheudled for that day of the week
  this.schedule = schedule;
  this.goal = month_goal;
  //This currently just looks at all log entries for a particular habit
  // In the future could look for different metrics like max weight, num total hours, etc.
  this.getProgress = function () {
    return Math.round(Object.keys(this.history).length*100.0/this.goal)/100;
  }
  this.setHistory = function (logText) {
    //Just uses random numer as key right now
    //In the future make this the current date and time
    this.history[Math.random()] = logText
  }
};

const DAY_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function constructSchedule(days) {
  let noSchedule = (Object.keys(days).length == 0);
  let schedule = {}
  DAY_OF_WEEK.map((day, i) => {
    //If a plan is specified that just blank initialize
    if (noSchedule) {
      schedule[day] = "Anytime"
    }
    //Else assume habit is to be done everyday at anytime
    else {
      schedule[day] = "X"
    }
  })
  //If a plan is specified then insert those tasks into the schedule
  if (!noSchedule) {
    Object.keys(days).map((day, i) => {
      schedule[day] = days[day]
    })
  }
  return schedule;
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDialogVisible: false,
      // HABITS ARE HARDCODED FOR NOW
      // Later should be loaded from user profile in persistent storage
      habits: [
        new Habit("Stretch", constructSchedule({}), 30),
        new Habit("Yoga", constructSchedule({"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}), 15),
        new Habit("Prehab", constructSchedule({}), 30),
        new Habit("Water", constructSchedule({}), 30),
        new Habit("Hang Board", constructSchedule({"Tuesday": "Evening", "Saturday": "Anytime"}), 6),
        new Habit("Lift", constructSchedule({"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}), 15),
        new Habit("Foam Roll", constructSchedule({}), 30)
      ],
      pressStatus: Array.from(7, (_, i) => false),
      lastPressed: null
    };
  }
  //Changing habits.history here doesnt work because this call back is create when the render is run 
  // This function is create at habits.history's intial state and then all future executions operation on the same instance
  // So it updates the copy but doesnt have the real thing
  logHabit = (inputText) => {
    this.state.habits[this.state.lastPressed].setHistory(inputText)
    this.setState({isDialogVisible: false})
    console.log(this.props)
  }
  toggleButtonStatus = (i) => {
    this.setState((previousState) => {
      let newPressStatus = previousState.pressStatus;
      newPressStatus[i] = !newPressStatus[i];
      return {pressStatus: newPressStatus}
    }
    )
    //Add activity to habit history
    if (!this.state.pressStatus[i]) {
      this.setState({
        isDialogVisible: true,
        lastPressed: i
      })
    }
    //Add multilogging functinality (ex if I stretch more than once in a day)
  }
  addDiaglogInputComponent = () => {
    return (
      <DialogInput isDialogVisible={this.state.isDialogVisible}
        title={'DialogInput'}
        message={"Message for DialogInput"}
        hintInput ={"HINT INPUT"}
        submitInput={ (inputText) => {this.logHabit(inputText)} }
        closeDialog={ () => {this.showDialog(false)}}>
      </DialogInput>
    )
  }
  addHabitButtonComponents = () => {
    return (
      <View style={styles.habitGroup}>
        {this.state.habits.map((habit, i) => {
          return (
            <View style={[styles.habit, this.state.pressStatus[i] ? styles.onButton : styles.offButton]}>
              <Button
                title={habit.habit_name}
                onPress={() => this.toggleButtonStatus(i)}
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
  addAddHabitButtonComponent = () => {
    return (
      <View style={styles.addHabitButton}>
        <Button
          title="New Habit"
          onPress={() => this.props.navigation.navigate('AddHabit')}
        />
      </View>
    )
  }
  addPageTitleComponent = () => {
    return (
      <View style={styles.pageTitle}>
        <Text>
          Home Pages
        </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.homePage}>
        {this.addPageTitleComponent()}
        {this.addAddHabitButtonComponent()}
        {this.addHabitButtonComponents()}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomePage,
    AddHabit: AddHabitPage,
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}