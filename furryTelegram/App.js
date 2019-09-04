import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AddHabitPage from './AddHabit';
import LTGoalsPage from './GoalsPage';
import AddGoalsPage from './AddLongTermGoal'
import Habit from './Habit';
import { YellowBox } from 'react-native';

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
    backgroundColor: 'lightgrey'
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
    top: '10%',
    left: '10%',
    backgroundColor:"purple",
    width: '30%'
  },
  goalsButton: {
    top: '10%',
    position: 'absolute',
    right: '10%',
    backgroundColor:"purple",
    width: '30%'
  },
  habitButtonText: {
    textAlign: 'center'
  }
});

class HomePage extends Component {
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
      lastPressed: null
    };
  }
  
  logHabit = (inputText) => {
    this.togglePressStatus(this.state.lastPressed)
    this.state.habits[this.state.lastPressed].setHistory(inputText)
    this.setState({isDialogVisible: false, noteText: ""})
  }
  togglePressStatus = (i) => {
    this.setState((previousState) => {
      let newPressStatus = previousState.pressStatus;
      newPressStatus[i] = !newPressStatus[i];
      return {pressStatus: newPressStatus}
      }
    )
  }
  handleHabitButtonClick = (i) => {
    if (!this.state.pressStatus[i]) {
      this.setState({
        isDialogVisible: true,
        lastPressed: i
      })
    }
    //Add multilogging functinality (ex if I stretch more than once in a day)
  }
  handleCloseDialog = () => {
    this.setState({isDialogVisible: false})
  }
  addDiaglogInputComponent = () => {
    return (
      <Dialog.Container visible={this.state.isDialogVisible} contentStyle={{height: 300, paddingBottom: 120}}>
        <Dialog.Title>Dialog Input</Dialog.Title>
        <Dialog.Description>Message for Dialog Input</Dialog.Description>
        <Dialog.Input height="100%" multiline={true} onChangeText={(inputtxt)=> this.setState({noteText: inputtxt})}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={this.handleCloseDialog}></Dialog.Button>
        <Dialog.Button label="Submit" onPress={() => this.logHabit(this.state.noteText)}></Dialog.Button>
      </Dialog.Container> 
    )
  }
  addHabitButtonComponents = () => {
    return (
      <View style={styles.habitGroup}>
        {this.state.habits.map((habit, i) => {
          return (
            <View key={i} style={[styles.habit, this.state.pressStatus[i] ? styles.onButton : styles.offButton]}>
              <Button
                title={habit.habit_name}
                onPress={() => this.handleHabitButtonClick(i)}
                color='black'
              />
              <Text style={styles.habitButtonText}>
                {habit.getProgress()}
              </Text>
            </View>
          )
        })}
        {this.addDiaglogInputComponent()}
      </View>
    )
  }
  addNewHabit = (newHabit) => {
    this.setState(previousState => ({ 
      habits: [...previousState.habits, newHabit]
    }))
  }

  addAddHabitButtonComponent = () => {
    return (
      <View style={styles.addHabitButton}>
        <Button
          color='white'
          title="New Habit"
          onPress={() => this.props.navigation.navigate('AddHabit', {
            addHabitCallback: this.addNewHabit
          })}
        />
      </View>
    )
  }

  addGoalsButtonComponent = () => {
    return (
      <View style={styles.goalsButton}>
        <Button
          color='white'
          title="Goals"
          onPress={() => this.props.navigation.navigate('Goals')}
        />
      </View>
    )
  }
  addPageTitleComponent = () => {
    return (
      <View style={styles.pageTitle}>
        <Text>
          Home
        </Text>
      </View>
    )
  }

  addNavigationButtonsComponent = () => {
    return (
      <View style={{width: '100%', flexDirection:'row'}}>
        {this.addAddHabitButtonComponent()}
        {this.addGoalsButtonComponent()}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.homePage}>
        {this.addPageTitleComponent()}
        {this.addNavigationButtonsComponent()}
        {this.addHabitButtonComponents()}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomePage,
    AddHabit: AddHabitPage,
    Goals: LTGoalsPage,
    AddGoal: AddGoalsPage, 
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