import React, { useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';

import { useFonts } from 'expo-font';

import {
    setCustomTextInput,
    setCustomText
} from 'react-native-global-props';

import * as SplashScreen from 'expo-splash-screen';
import Router from "./router";

SplashScreen.preventAutoHideAsync();

function App() {

    const customTextInputProps = {
        style: {
            fontFamily: 'Roboto'
        }
    };

    // Setting default styles for all Text components.
    const customTextProps = {
        style: {
            fontFamily: 'Roboto'
        }
    };

    const [fontsLoaded] = useFonts({
        'Roboto': require('./assets/fonts/Roboto-Regular.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            console.log("close splash screen")
            await SplashScreen.hideAsync();
        }
        setCustomText(customTextProps);
        setCustomTextInput(customTextInputProps);
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar translucent backgroundColor={"#5993c0"} barStyle="light-content" />
            <Router />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export default App;