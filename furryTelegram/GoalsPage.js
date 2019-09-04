import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  goalsList: {
    top: '10%',
    height: '80%',
    width: '80%',
  },
  goalView: {
    height: '15%',
    width: '100%',
    backgroundColor: 'grey'
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  goalDueDate: {
    fontStyle: 'italic'
  },
  pageTitleView: {
    top: '5%',
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 40
  },
  addGoalButton: {
    bottom: '5%',
    right: '30%',
    backgroundColor: 'purple'
  }
});

export default class LTGoalsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      goals: []
    }
  }
  static navigationOptions = {
    title: 'Long Term Goals',
  };

  addGoalCallback = (newGoal) => {
    this.setState(previousState => ({ 
      goals: [...previousState.goals, newGoal]
    })) 
    this.props.navigation.getParam('addGoalCallback', () => {})(newGoal)
  }

  componentWillMount = () => {
    this.setState({
      goals: this.props.navigation.getParam('goals', [])
    }) 
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.pageTitleView}>
          <Text style={styles.pageTitle}>
              Long Term Goals Page
          </Text>
        </View>
        <View style={styles.goalsList}>
          {this.state.goals.map((goal, i) => {
            return (
              <View key={i} style={styles.goalView}>
                <Text style={styles.goalTitle}>
                  {goal.goal_name}
                </Text>
                <Text>
                  {goal.description}
                </Text>
                <Text style={styles.goalDueDate}>
                  Goal Date: {goal.end_date}
                </Text>
              </View>
            )
          })}
        </View>
        <View style={styles.addGoalButton}>
          <Button
            title="Add New Goal"
            onPress={() => this.props.navigation.navigate('AddGoal', {
              addGoalCallback: this.addGoalCallback
            })}
          />
        </View>
      </View>
    );
  }
}