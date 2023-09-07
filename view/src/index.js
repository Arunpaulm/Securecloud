import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
    setCustomTextInput,
    setCustomText
} from 'react-native-global-props';
// import * as LocalAuthentication from 'expo-local-authentication';

import Router from "./router";

import { oxfordblue, white } from "../colorpalette"

import crypto from './crypto'

SplashScreen.preventAutoHideAsync();

function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    // crypto()
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

    if (!fontsLoaded) { return null }

    // useEffect(async () => {
    //     const screenLock = await SecureStore.getItemAsync("screen_lock");
    //     if (Boolean(screenLock)) {
    //         onFaceId() // disabled considering the compatability
    //     }
    // }, [])


    // face detection code
    // const onFaceId = async () => {
    //     try {
    //         // Checking device compatiblility
    //         const isCompatible = await LocalAuthentication.hasHardwareAsync();

    //         if (!isCompatible) { throw new Error('Failed: compatiblility issue') }

    //         // Using device biometrics records if exist
    //         const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    //         if (!isEnrolled) { throw new Error('No Face auth / biometrics found.') }

    //         // Authenticate user
    //         await LocalAuthentication.authenticateAsync();

    //         Alert.alert('Authenticated')
    //     } catch (error) { Alert.alert('error', error?.message) }
    // }

    return (
        <>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar
                    animated={true}
                    backgroundColor={oxfordblue}
                    barStyle='light-content'
                    showHideTransition="fade"
                />

                <Router />
            </SafeAreaView>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: oxfordblue
    },
    buttonsContainer: {
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
})

export default App;