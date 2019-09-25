import React from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';

export default class HabitListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  addNewHabitButtonComponent = () => {
    tabHeight = `${60.0/(this.props.screenProps.habits.length+1)}%`
      return (
        <View style={[styles.habitTab, styles.addNewHabitButton, {height: tabHeight}]}>
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
    backcolor = `#07d400`;
    progress = habit.getProgress()
    if (progress > 0.0) {
      backcolor = `#07d4${Math.min(Math.ceil(progress * 255), 255).toString(16)}`;
    }
    tabHeight = `${60.0/(this.props.screenProps.habits.length+1)}%`
    return (
        <View key={i} style={[styles.habitTab, {backgroundColor: backcolor, height: tabHeight}]}>
            <Button style
                title = {habit.habit_name}
                color = 'black'
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
      <View style={styles.pageTitleView}>
        <Text style={styles.pageTitle}>
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
        top: '10%'
    },
    habitTab: {
        width: '96%',
        backgroundColor: 'grey',
        borderWidth: 1,
        justifyContent: 'center',
        margin: '2%'
    },
    addNewHabitButton: {
        backgroundColor: 'white'
    },
    pageTitleView: {
      top: '5%',
    },
    pageTitle: {
      fontWeight: 'bold',
      fontSize: 40
    },
});