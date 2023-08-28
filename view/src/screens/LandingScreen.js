import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/Ionicons";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import { BlurView } from 'expo-blur';
import { View, StyleSheet, Platform } from 'react-native';


import SettingScreen from './SettingScreen';
import UsersScreen from './UsersScreen';
import VaultScreen from './VaultScreen';
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';
import NewsScreen from './NewsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from 'expo-secure-store';

import { babypowder, black, blue, oxfordblue, tabactive, tabinactive } from "../../colorpalette"

const Tab = createBottomTabNavigator();
Icon.loadFont();
MIcon.loadFont();

class LandingScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        await AsyncStorage.setItem("user_id", "d4084131-7b0c-4196-9803-a59b47c58853");
        // await SecureStore.setItemAsync("user_id", "d4084131-7b0c-4196-9803-a59b47c58853");
    }

    render() {
        return (
            <View style={styles.container}>
                <Tab.Navigator
                    initialRouteName="Settings"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Vault') {
                                iconName = focused ? 'lock-open' : 'lock-closed-outline';
                            } else if (route.name === 'History') {
                                if (focused)
                                    return <MIcon name={'history'} size={size} color={focused ? tabactive : tabinactive} />
                                else
                                    return <MIcon name={'history'} size={size} color={focused ? tabactive : tabinactive} />
                            } else if (route.name === 'News') {
                                iconName = focused ? 'newspaper' : 'newspaper-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            } else if (route.name === 'Users') {
                                iconName = focused ? 'people' : 'people-outline';
                            }

                            // We can add any component here to generate tab icons
                            return <Icon name={iconName} size={size} color={focused ? tabactive : tabinactive} />;
                        },
                        tabBarActiveTintColor: tabactive,
                        tabBarInactiveTintColor: tabinactive,
                        // tabBarBackground: () => (
                        //     <BlurView tint={babypowder} intensity={100} style={{}} />
                        // ),
                        tabBarStyle: {
                            backgroundColor: oxfordblue,
                            borderTopWidth: 0,
                            elevation: 0,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30
                        }
                    })}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerBackTitle: "Back", unmountOnBlur: true }} />
                    {Platform.OS === "web" ? null : <Tab.Screen name="Vault" component={VaultScreen}
                        options={{
                            title: "Private Vault",
                            headerStyle: { backgroundColor: oxfordblue, borderBottomColor: 0, elevation: 0 },
                            headerTintColor: babypowder,
                            headerTitleStyle: { fontWeight: 'bold' },
                            unmountOnBlur: true
                        }} />}
                    <Tab.Screen name="History" component={HistoryScreen} options={{
                        title: "History", headerStyle: { backgroundColor: oxfordblue },
                        headerTintColor: babypowder,
                        headerTitleStyle: { fontWeight: 'bold' },
                        unmountOnBlur: true
                    }} />
                    <Tab.Screen name="News" component={NewsScreen} options={{
                        title: "News", headerStyle: { backgroundColor: oxfordblue },
                        headerTintColor: babypowder,
                        headerTitleStyle: { fontWeight: 'bold' },
                        unmountOnBlur: true
                    }} />
                    <Tab.Screen name="Users" component={UsersScreen} options={{
                        title: "All Users", headerStyle: { backgroundColor: oxfordblue },
                        headerTintColor: babypowder,
                        headerTitleStyle: { fontWeight: 'bold' }
                    }} />
                    <Tab.Screen name="Settings" component={SettingScreen} options={{
                        headerStyle: { backgroundColor: oxfordblue },
                        headerTintColor: babypowder,
                        headerTitleStyle: { fontWeight: 'bold' }
                    }} />
                </Tab.Navigator>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: babypowder
    }
})

export default LandingScreen;