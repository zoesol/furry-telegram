import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class AddGoalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //React Render
    render() {
      return (
        <View styles={styles.root}>
            <Text> Calendar </Text>
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