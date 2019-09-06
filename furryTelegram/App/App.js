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


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      habits: [
        new Habit("Stretch", "Continuous", {}, 30, 60),
        new Habit("Yoga", "Binary", {"Monday": "Evening", "Wednesday": "Afternoon", "Friday": "Evening"}, 15, null),
        new Habit("Prehab", "Binary", {}, 30, null),
        new Habit("Water", "Continuous", {}, 30, 1),
      ],
    };
  }
  addNewHabitCallback = (newHabit) => {
    this.setState(previousState => ({ 
      habits: [...previousState.habits, newHabit]
    }))  
  }
  render() {
    return <AppContainer 
      screenProps = {{'habits':this.state.habits, 'addNewHabitCallback':this.addNewHabitCallback}}
    />;
  }
}

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