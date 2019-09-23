import React from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';

export default class HabitListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  addNewHabitButtonComponent = () => {
      return (
        <View style={[styles.habitTab, styles.addNewHabitButton]}>
            <Button style
                title = 'New Habit'
                onPress = {() => this.props.navigation.navigate('AddHabit', {
                    addHabitCallback: this.props.screenProps.addNewHabitCallback,
                    src: 'Habits'
                  })}
            />
        </View>
      )
  }

  addHabitTabComponents = () => {
      const habits = this.props.screenProps.habits
      return (
          <View style={styles.habitList}>
            {habits.map((habit, i) => {
                return (this.addHabitTabComponent(habit, i))
            })}
            {this.addNewHabitButtonComponent()}
          </View>
      )
    
  }

  addHabitTabComponent = (habit, i) => {
    return (
        <View key={i} style={styles.habitTab}>
            <Button style
                title = {habit.habit_name}
                onPress = {() => this.props.navigation.navigate('HabitDetail', {
                    habit: habit,
                    src: 'Habits'
                })}
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
          Habits
        </Text>
      </View>
    )
  }

  //React Render
  render() {
    return (
      <View style={styles.root}>
        {this.addPageTitleComponent()}
        {this.addHabitTabComponents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        alignItems: "center",
    },
    pageTitle: {
        top: '10%',
    },
    habitList: {
        width: "100%",
        height: "100%",
        top: '20%'
    },
    habitTab: {
        width: '100%',
        height: '10%',
        backgroundColor: 'grey'
    },
    addNewHabitButton: {
        backgroundColor: 'white'
    }
});