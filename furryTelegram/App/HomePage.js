import React from 'react';
import { StyleSheet, Button, Text, View, YellowBox } from 'react-native';
import Dialog from 'react-native-dialog';
import Modal from "react-native-modal"
import { TextInput } from 'react-native-gesture-handler';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDialogVisible: false,
      lastPressed: 0,
      logText: "",
      logInterval: 0,
    };
  }

 /*
 * Maps the list of Habit Object and Creates a Button Component for each
 *  Each Habit Button can be clicked to log the completion of that habit.
 */
  addHabitButtonComponents = () => {
    return (
      <View style={styles.habitGroup}>
        {this.props.screenProps.habits.map((habit, i) => {
          bWidth = 0
          backcolor = `#07d400`;
          progress = habit.getProgressTowardsMinimum()
          if (progress > 0.0) {
            backcolor = `#07d4${Math.min(Math.ceil(progress * 255), 255).toString(16)}`;
            if (progress >= 1.0) {
              bWidth = 1
            }
          }
          return (
            <View key={i} style={[styles.habit, {backgroundColor: backcolor, borderWidth: bWidth}]}>
              <Button
                title={habit.habit_name}
                onPress={() => this.handleHabitButtonClick(i)}
                color="black"
              />
              <Text>
                {habit.getProgress()}
              </Text>
            </View>
          )
        })}
        {/* {this.addDiaglogInputComponent()} */}
        {this.addModalInputCompnent()}
      </View>
    )
  }

  handleHabitButtonClick = (i) => {
    habit = this.props.screenProps.habits[i]
    if (habit.type == "Continuous" || habit.getProgressTowardsMinimum() < 1.0) {
      this.setState({
        isDialogVisible: true,
        lastPressed: i
      })
    }
  }

  addBinaryInputComponent = () => {
    return (
      <View style={{top:'8%', backgroundColor: 'grey', height: '40%', width:'85%'}}>
      <Text> Log </Text>
      <TextInput
        style={{backgroundColor: "orange", height:"100%", borderWidth: 1}}
        multiline
        numberOfLines = {5}
        onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}
      />
    </View>
    )
  }

  addContinuousInputComponent = () => {
    return (
      <View style={{top:'8%', backgroundColor: 'grey', height: '60%', width:'85%'}}>
      <Text> Interval </Text>
      <TextInput
        style={{backgroundColor: "orange", height:"10%", borderWidth: 1}}
        onChangeText={(inputText)=> this.handleHabitLogIntervalInput(inputText)}
        keyboardType='numeric'
      />
      <Text> Log </Text>
      <TextInput
        style={{backgroundColor: "orange", height:"70%", borderWidth: 1}}
        multiline
        numberOfLines = {5}
        onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}
      />
    </View>
    )
  }

  addModalInputCompnent = () => {
    let dialogTitle = `${this.props.screenProps.habits[this.state.lastPressed].habit_name} Log`
    if (this.props.screenProps.habits[this.state.lastPressed].type == "Continuous") {
      createInputComponentFunc = this.addContinuousInputComponent
      submitHeight = '10%'
    }
    else if (this.props.screenProps.habits[this.state.lastPressed].type == "Binary") {
      createInputComponentFunc = this.addBinaryInputComponent
      submitHeight = '20%'
    }
    return (
      <Modal 
      isVisible={this.state.isDialogVisible}
      onBackdropPress={this.handleCloseDialog}
      >
        <View style={{ flex: 1, top: '30%', alignItems: 'center' }}>
          <View style={styles.modalInputBox}> 
            <Text>{dialogTitle} </Text>
            {createInputComponentFunc()}
            <View style={{backgroundColor: 'grey', top: submitHeight}}>
            <Button
              title="Submit"
              onPress={() => this.handleSubmitDialog(this.state.logText)}
              color='black'
            />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

 /*
 * Create a Diaglog Input Component used for logging of a completed Habit
 */
  addDiaglogInputComponent = () => {
    let dialogTitle = `${this.props.screenProps.habits[this.state.lastPressed].habit_name} Log`
    if (this.props.screenProps.habits[this.state.lastPressed].type == "Continuous") {
      return (
        <Dialog.Container visible={this.state.isDialogVisible} contentStyle={{height: 300, paddingBottom: 120}}>
        <Dialog.Title> {dialogTitle} </Dialog.Title>
        <Dialog.Input height="30%" multiline={false} onChangeText={(inputText)=> this.handleHabitLogIntervalInput(inputText)}></Dialog.Input>
        <Dialog.Input height="70%" multiline={true} onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={this.handleCloseDialog}></Dialog.Button>
        <Dialog.Button label="Submit" onPress={() => this.handleSubmitDialog(this.state.logText)}></Dialog.Button>
      </Dialog.Container> 
      )
    }
    else if (this.props.screenProps.habits[this.state.lastPressed].type == "Binary") {
      return (
        <Dialog.Container visible={this.state.isDialogVisible} contentStyle={{height: 300, paddingBottom: 120}}>
          <Dialog.Title> {dialogTitle} </Dialog.Title>
          {/* <Dialog.Description>Message for Dialog Input</Dialog.Description> */}
          <Dialog.Input height="100%" multiline={true} onChangeText={(inputText)=> this.handleHabitLogTextInput(inputText)}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCloseDialog}></Dialog.Button>
          <Dialog.Button label="Submit" onPress={() => this.handleSubmitDialog()}></Dialog.Button>
        </Dialog.Container> 
      )
    }
    else {
      console.log("Error in Construction of DialogInput's Inputs")
      return (null)
    }
  }
 
handleHabitLogIntervalInput = (inputText) => {
  this.setState({logInterval: inputText})
}

handleHabitLogTextInput = (inputText) => {
  this.setState({logText: inputText})
}

handleSubmitDialog = () => {
  habit = this.props.screenProps.habits[this.state.lastPressed]
  updatedHistory = habit.updateLog(this.state.logText, this.state.logInterval)
  this.props.screenProps.updateHabitCallback(this.state.lastPressed, updatedHistory)
  this.setState({isDialogVisible: false, logText: "", logInterval: 0}) 
}

handleCloseDialog = () => {
  this.setState({isDialogVisible: false})
}


  /*
  * Creates a Button Component that navigates to the Add Habit Page
  */
  addNewHabitButtonComponent = () => {
    return (
      <View style={styles.addHabitButton}>
        <Button
          title="New Habit"
          onPress={() => this.props.navigation.navigate('AddHabit', {
            addHabitCallback: this.props.screenProps.addNewHabitCallback,
            src: "Home"
          })}
          color='white'
        />
      </View>
    )
  }

  addDateChangeComponents = () => {
    if(this.props.screenProps.devMode) {
      return (
        <View style={styles.dateChangeButton}>
          <Button
            title="Increment Date"
            onPress={this.props.screenProps.incrementDevDateCallback}
            color='white'
          />
          <Button
            title="Decrement Date"
            onPress={this.props.screenProps.decrementDevDateCallback}
            color='white'
          />
        </View>
      )
    }
  }


  /*
  * Creates a Text Component for today's date
  */
  addDateComponent = () => {
   if (this.props.screenProps.devMode) {
    currDate = this.props.screenProps.devDate
   }
   else {
    currDate = new Date()
   }
   var date =  currDate.getDate(); //Current Date
   var month = currDate.getMonth()+1; //Current Month
   var year = currDate.getFullYear(); //Current Year
   currDate = date + '/' + month + '/' + year

   return (
    <View style={styles.dateText}>
      <Text>
        Today's date is... {currDate}
      </Text>
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
          Home
        </Text>
      </View>
    )
  }

  componentDidMount = () => {
  }

  //React Render
  render() {
    return (
      <View style={styles.homePage}>
        {this.addPageTitleComponent()}
        {this.addDateComponent()}
        {this.addDateChangeComponents()}
        {this.addNewHabitButtonComponent()}
        {this.addHabitButtonComponents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  habitGroup: {
    width: '100%',
    height: '50%',
    top: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'lightgrey',
  },
  habit: {
    width: 80, height: 80, margin: 10,
  },
  habitAchieved: {
  },
  pageTitle: {
    top: '10%',
  },
  addHabitButton: {
    position: 'absolute',
    top: '3%',
    left: '10%',
    backgroundColor:"purple",
    width: '30%'
  },
  goalsButton: {
    top: '3%',
    position: 'absolute',
    right: '10%',
    backgroundColor:"purple",
    width: '30%'
  },
  habitButtonText: {
    textAlign: 'center'
  },
  dateText: {
    top: '35%'
  },
  dateChangeButton: {
    position: 'absolute',
    top: '7%',
    left: '70%',
    backgroundColor:"purple",
    width: '30%'
  },
  modalInputBox: {
    height: '40%',
    width: '75%',
    backgroundColor: 'white',
    alignItems: 'center'
  }
});