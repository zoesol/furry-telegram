import React from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';
import CalendarPage from './CalendarPage';

export default class HabitListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        habit: props.navigation.getParam('habit', null)
    };
  }

    /*
  * Creates a Text Component for the Page Title
  */
 addPageTitleComponent = () => {
    return (
      <View style={styles.pageTitle}>
        <Text>
          {this.state.habit.habit_name}
        </Text>
      </View>
    )
  }

  //React Render
  render() {
    return (
      <View style={styles.root}>
        {this.addPageTitleComponent()}
        <CalendarPage>
        </CalendarPage>
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
});