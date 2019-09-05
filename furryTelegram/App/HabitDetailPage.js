import React from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';

export default class HabitListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

    /*
  * Creates a Text Component for the Page Title
  */
 addPageTitleComponent = () => {
    return (
      <View style={styles.pageTitle}>
        <Text>
          {this.props.habit.habit_name}
        </Text>
      </View>
    )
  }

  //React Render
  render() {
    return (
      <View style={styles.root}>
        {this.addPageTitleComponent()}
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