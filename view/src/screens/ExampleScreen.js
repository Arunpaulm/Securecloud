import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import TextFieldComponent from '../components/TextFieldComponent';

Icon.loadFont();

class ExampleScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() { }


    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})


export default ExampleScreen;