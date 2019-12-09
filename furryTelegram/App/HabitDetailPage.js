import React from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';
import CalendarPage from './CalendarPage';
import SummarySection from './SummarySection';

export default class HabitListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
        habit: props.navigation.getParam('habit', null),
        primaryColor: '#34ebc6'
    };
  }

    /*
  * Creates a Text Component for the Page Title
  */
 addPageTitleComponent = () => {
    return (
      <View style={styles.pageTitle, {backgroundColor: this.state.primaryColor}}>
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
        <View style={{
          width: '100%', 
          height: "7%", 
          backgroundColor: this.state.primaryColor}}>
          <Text style={{fontSize: 24, textAlign: 'center', paddingTop: '3%', fontWeight: 'bold'}}>
            {this.state.habit.habit_name}
          </Text>
        </View>
        <CalendarPage screenProps = {this.props.screenProps}>
        </CalendarPage>
        <View 
        style={{width: "100%"}}
        class="summary-container">
          <SummarySection
            primaryColor={this.state.primaryColor}>
          </SummarySection>
        </View>
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
        top: '3%',
        width: '100%',
    },
});