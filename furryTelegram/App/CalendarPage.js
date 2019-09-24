import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDate: new Date()
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
            <View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
                    {this.state.activeDate.getFullYear()}
                </Text>
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

    addCalendarBodyComponents = () => {
        var matrix = this.generateMatrix();
        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                console.log(item, this.state.activeDate, this.state.activeDate.getDate())
                return (
                    <Text
                        key = {colIndex}
                        style={{
                            flex: 1,
                            height: 18,
                            textAlign: 'center',
                            // Highlight header
                            backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                            // Highlight Sundays
                            color: colIndex == 0 ? '#a00' : '#000',
                            // Highlight current date
                            fontWeight: item == this.state.activeDate.getDate() ? 'bold': 'normal'
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
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-around',
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
        if (this.props.screenProps.devMode) {
            this.setState({activeDate: this.props.screenProps.devDate})
        }
    }

    //React Render
    render() {
        var matrix = this.generateMatrix();
        return (
            <View>
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