import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from './HomePage';
import AddHabitPage from './AddHabitPage';
import LTGoalsPage from './GoalsPage';
import AddGoalsPage from './AddGoalPage';
import HabitListPage from './HabitListPage';
import HabitDetailPage from './HabitDetailPage';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Habit from './Habit';
import LongTermGoal from './LongTermGoal';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error)
  }
};

_retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log(error)
  }
};

defaultData = {
  "habits": [
      new Habit("Stretch", "Continuous", {}, 30, 60, {}),
      new Habit("Yoga", "Binary", {"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}, 15, null, {}),
      new Habit("Prehab", "Binary", {}, 30, null, {}),
      new Habit("Water", "Continuous", {}, 30, 1, {}),
  ],
  "goals": [
    new LongTermGoal(
      "Send LaRambla", 
      "I will achieve this goal by getting HELLA endurance", 
      '10/20/20'),
    new LongTermGoal(
      "Splits Rotation", 
     "Start in front splits, rotate to middle splits, and end in the other side splits!", 
      "10/20/20"),
  ],
  'devDate': new Date(2019, 0, 0)
}

useDefaults = () => {
  _storeData('state', JSON.stringify(defaultData))
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      stateLoaded: false,
      devMode: true,
      habits: [],
      goals: [],
      devDate:  null
    };
    useDefaults()
    this.initializeState().then(() => {
      this.setState({stateLoaded: true})
    })
  }

  initializeState = async () => {
    return AsyncStorage.getItem('state').then((value) => {
      stateData = JSON.parse(value)
      habits = []
      stateData['habits'].map((raw_habit, i) => {
        habits.push(new Habit(raw_habit.habit_name, raw_habit.type, raw_habit.schedule, raw_habit.goal, raw_habit.minimum, raw_habit.history))
      })
      goals = []
      stateData['goals'].map((raw_goal, i) => {
        goals.push(new LongTermGoal(raw_goal.goal_name, raw_goal.description, raw_goal.end_date))
      })
      year_month = stateData['devDate'].split('-')
      day = year_month[2].split('T')
      hour_min = day[1].split(':')
      secs = hour_min[2].split('.')
      if (year_month[0].substring(0, 1) == '"') {
        year_month[0] = year_month[0].substring(1)
      }
      devDate = new Date(year_month[0], year_month[1]-1, day[0], hour_min[0], hour_min[1], secs[0])
      console.log("DevDate from Storage", devDate)
      this.setState({habits: habits, goals: goals, devDate: devDate})
    })
  }

  addNewHabitCallback = (newHabit) => {
    this.setState(previousState => ({ 
      habits: [...previousState.habits, newHabit]
    }))  
  }
  addNewGoalCallback = (newGoal) => {
    this.setState(previousState => ({ 
      goals: [...previousState.goals, newGoal]
    }))  
  }

  incrementDevDateCallback = () => {
    var tomorrow = this.state.devDate;
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.setState({devDate: tomorrow})
  }

  decrementDevDateCallback = () => {   
    var yesterday = this.state.devDate;
    yesterday.setDate(yesterday.getDate() - 1);
    this.setState({devDate: yesterday})
  }

  componentDidUpdate = () => {
    this.state.habits.map((habit, i) => {
      habit.updateMode(this.state.devMode, this.state.devDate)
    })
    var date = this.state.devDate
    console.log("Date", date)
    if (this.state.stateLoaded) {
      var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()))
      var result = JSON.stringify(utcDate);
      _storeData('state', JSON.stringify({'habits':this.state.habits, 'goals':this.state.goals, 'devDate':result}))
    }
  }

  render() {
    if(this.state.stateLoaded) {
      return <AppContainer 
        screenProps = {{
          'habits':this.state.habits, 
          'addNewHabitCallback':this.addNewHabitCallback,
          'goals':this.state.goals,
          'addNewGoalCallback':this.addNewGoalCallback,
          'devMode': this.state.devMode,
          'devDate': this.state.devDate,
          'incrementDevDateCallback': this.incrementDevDateCallback,
          'decrementDevDateCallback': this.decrementDevDateCallback,
        }}
      />;
    }
    else {
      return (
        <View style={{top: "50%", alignItems: "center", height: '100%', width:'100%'}}>
          <Text>
            Loading...
          </Text>
        </View>
      )
    }
  }
}

console.disableYellowBox = true;

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        headerTitle: 'Home'
      }
    },
    Habits: {
      screen: HabitListPage,
      navigationOptions: {
        headerTitle: 'Habits',
      }
    },
    Goals: {
      screen: LTGoalsPage,
      navigationOptions: {
        headerTitle: 'Goals'
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        headerTitle: 'Home'
      }
    },    
    AddHabit: {
      screen: AddHabitPage,
      navigationOptions: {
        headerTitle: 'Create New Habit'
      }
    },
    AddGoal: {
      screen: AddGoalsPage, 
      navigationOptions: {
        headerTitle: 'Create New Goal'
      }
    },
    HabitDetail: {
      screen: HabitDetailPage,
      navigationOptions: {
        headerTitle: 'Habit Details'
      }
    },
    Footer: TabNavigator
  },
  {
    initialRouteName: "Footer"
  }
);



const AppContainer = createAppContainer(AppNavigator);