import React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';

export default class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDate: new Date(),
            devMode: props.screenProps.devMode,
            devDate: props.screenProps.devDate,
            habits: props.screenProps.habits
        };
    }

    months = ["January", "February", "March", "April", 
        "May", "June", "July", "August", "September", "October", 
        "November", "December"
    ];
 
    weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    generateMatrix() {
        var matrix = [];

        matrix[0] = this.weekDays;

        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();
 
        var firstDay = new Date(year, month, 1).getDay();

        var maxDays = this.nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }
        return matrix;
    }

    addMonthYearTextComponents = () => {
        return (
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                <View class='buttonContainer'
                    style= {{
                        position: 'absolute',
                        left: 20,
                    }}>
                    <Button 
                        title="<"
                        onPress={() => this.changeMonth(-1)}
                    />
                </View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
                    {this.state.activeDate.getFullYear()}
                </Text>
                <View class='buttonContainer'
                style= {{
                    position: 'absolute',
                    right: 20,
                }}>
                    <Button title=">"
                        onPress={() => this.changeMonth(+1)}/>
                </View>
            </View>
        )
    }

    _onPress = (item) => {    
        this.setState(() => {
          if (!item.match && item != -1) {
            this.state.activeDate.setDate(item);
            return this.state;
          }
        });
    };

    checkForSuccess = (date) => {
        var bool = true
        this.state.habits.map((habit, i) => {
            if (!(date in habit.getSuccessDays())) {
                bool = false
            }
        })
        return bool
    }

    isGoalEndDate = (calDate) => {
        var bool = false
        this.state.habits.map((habit, i) => {
            modDate = `${habit.goalEndDate.getDate()}/${habit.goalEndDate.getMonth()+1}/${habit.goalEndDate.getFullYear()}`
            if (modDate == calDate) {
                bool = true
            }
        })
        return bool
    }

    addCalendarBodyComponents = () => {
        var matrix = this.generateMatrix();
        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                var calDate = `${item}/${this.state.activeDate.getMonth()+1}/${this.state.activeDate.getFullYear()}`;
                var success = this.checkForSuccess(calDate)
                return (
                    <Text
                        key = {colIndex}
                        style={{
                            textAlign: 'center',
                            backgroundColor: success ? '#0f0' : '#fff',
                            color: 'black',
                            borderWidth: this.isGoalEndDate(calDate) ? 1: 0,
                            fontWeight: item == this.state.activeDate.getDate() ? 'bold': 'normal',
                            width: 50, // probably shouldn't be hard-coded
                        }}
                        onPress={() => this._onPress(item)}>
                            {item != -1 ? item : ''}
                    </Text>
                );
            });
            return (
                <View
                    key = {rowIndex}
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 50,
                        padding: 15,
                        alignItems: 'center',
                    }}>
                    {rowItems}
                </View>
            );
        });
        return (
            <View>
                {rows}
            </View>
            
        )
    }
 
    componentDidMount = () => {
        if (this.state.devMode) {
            this.setState({activeDate: new Date(this.state.devDate.valueOf())})
        }
    }

    changeMonth = (n) => {
        this.setState(() => {
          this.state.activeDate.setMonth(
            this.state.activeDate.getMonth() + n
          )
          return this.state;
        });
    }

    makeCalendar = () => {
        var firstDay = new Date(this.state.activeDate.getFullYear(), 
            this.state.activeDate.getMonth(), 1).getDay();
        for (var i = 0; i < 6; i++) {

        }
    }

    //React Render
    render() {
        var matrix = this.generateMatrix();
        return (
            <View style = {{ top: '5%' }}
            >
                {this.addMonthYearTextComponents()}
                {this.addCalendarBodyComponents()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        alignItems: "center",
        alignContent: "center",
        width: '100%',
        height: '100%',
    },
 })