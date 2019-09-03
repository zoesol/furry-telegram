import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from './HomePage';
import AddHabitPage from './AddHabit';
import LTGoalsPage from './GoalsPage';
import AddGoalsPage from './AddLongTermGoal'
import { createBottomTabNavigator } from 'react-navigation-tabs';


const TabNavigator = createBottomTabNavigator(
  {
    Home: HomePage,
    Goals: LTGoalsPage
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: HomePage,
    AddHabit: AddHabitPage,
    Goals: LTGoalsPage,
    AddGoal: AddGoalsPage, 
    Footer: TabNavigator
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