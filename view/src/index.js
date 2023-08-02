import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput } from 'react-native';

import Router from "./router";

class App extends Component {
    constructor (props) {
        super(props);
    }

    // componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // setTimeout(() => {
    //   console.log("close splash screen")
    //   SplashScreen.hide();
    // }, 3000)
    // }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Router />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    }
})


export default App;