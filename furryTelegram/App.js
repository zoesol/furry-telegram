import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

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
  }

});

// Might want to add additional features in the future like a required duration or stuff for categorical habits
function Habit(name, schedule, month_goal) {
  this.habit_name = name;
  this.history = {"2":2, 'test': 'test2'};
  //A map of the day of week to time of day the activity has to be complete
  // Value is 'X' if the activity is not scheudled for that day of the week
  this.schedule = schedule;
  this.goal = month_goal;
  //This currently just looks at all log entries for a particular habit
  // In the future could look for different metrics like max weight, num total hours, etc.
  this.getProgress = function () {
    return Math.round(Object.keys(this.history).length*100.0/this.goal)/100;
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

//HABITS ARE HARDCODED FOR NOW
//Later should be loaded from user profile in persistent storage
const habits = [
  new Habit("Stretch", constructSchedule({}), 30),
  new Habit("Yoga", constructSchedule({"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}), 15),
  new Habit("Prehab", constructSchedule({}), 30),
  new Habit("Water", constructSchedule({}), 30),
  new Habit("Hang Board", constructSchedule({"Tuesday": "Evening", "Saturday": "Anytime"}), 6),
  new Habit("Lift", constructSchedule({"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}), 15),
  new Habit("Foam Roll", constructSchedule({}), 30)
]

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: Array.from(Array(habits.length), (_, i) => false)};
    console.log(habits);
  }
  toggleButtonStatus = (i) => {
    console.log(this.state)
    this.setState((previousState) => {
      let newPressStatus = previousState.pressStatus;
      newPressStatus[i] = !newPressStatus[i];
      return {pressStatus: newPressStatus}
    }
    )
    //Add activity to habit history
    if (!this.state.pressStatus[i]) {
      habits[i].history[`test${i}`] = `testVal${i}`
    }
    //Remove false log from habit history
    else {
      delete habits[i].history[`test${i}`]
    }
  }
  render() {
    return (
      <View style={styles.homePage}>
        <View style={styles.pageTitle}>
          <Text>
            Home Page
          </Text>
        </View>
        <View style={styles.habitGroup}>
          {habits.map((habit, i) => {
            return (
              <View style={[styles.habit, this.state.pressStatus[i] ? styles.onButton : styles.offButton]}>
                <Button
                  title={habit.habit_name}
                  onPress={() => this.toggleButtonStatus(i)}
                >
                </Button>
                <Text>
                  {habit.getProgress()}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
}
