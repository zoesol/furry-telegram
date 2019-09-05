import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from './HomePage';
import AddHabitPage from './AddHabitPage';
import LTGoalsPage from './GoalsPage';
import AddGoalsPage from './AddGoalPage';
import HabitListPage from './HabitListPage';
import { createBottomTabNavigator } from 'react-navigation-tabs';


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
        headerTitle: 'Habits'
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
    Footer: TabNavigator
  },
  {
    initialRouteName: "Footer"
  }
);



const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}