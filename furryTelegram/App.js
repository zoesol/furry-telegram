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
    backgroundColor:"blue"
  },
  pageTitle: {
    top: '10%',
  }

});

const habits = [
  'Stretch', 
  'Yoga', 
  'Prehab', 
  'Water', 
  'Hang Board', 
  'Lift', 
  'Foam Roll'
]

export default class HelloWorldApp extends Component {
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
              <View style={styles.habit}>
                <Button
                  title={habit}
                >
                </Button>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
}
