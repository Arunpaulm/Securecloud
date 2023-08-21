import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from 'expo-blur';
import { View, StyleSheet } from 'react-native';


import SettingScreen from './SettingScreen';
import UsersScreen from './UsersScreen';
import VaultScreen from './VaultScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import * as SecureStore from 'expo-secure-store';

import { babypowder, black, blue, oxfordblue, tabactive, tabinactive } from "../../colorpalette"

const Tab = createBottomTabNavigator();
Icon.loadFont();

class LandingScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        await SecureStore.setItemAsync("user_id", "f7b12b9b-9d72-46be-9373-eb3f757e6c46");
    }

    render() {
        return (
            <View style={styles.container}>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Vault') {
                                iconName = focused ? 'lock-open' : 'lock-closed-outline';
                            } else if (route.name === 'Notification') {
                                iconName = focused ? 'notifications' : 'notifications-outline';
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
                        tabBarBackground: () => (
                            <BlurView tint={babypowder} intensity={100} style={{}} />
                        ),
                        tabBarStyle: {
                            backgroundColor: oxfordblue,
                            borderTopWidth: 0,
                            elevation: 0,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30
                        }
                    })}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Tab.Screen name="Vault" component={VaultScreen}
                        options={{
                            title: "Private Vault",
                            headerStyle: { backgroundColor: oxfordblue, borderBottomColor: 0, elevation: 0 },
                            headerTintColor: babypowder,
                            headerTitleStyle: { fontWeight: 'bold' },
                        }} />
                    <Tab.Screen name="Notification" component={NotificationScreen} options={{
                        title: "History", headerStyle: { backgroundColor: oxfordblue },
                        headerTintColor: babypowder,
                        headerTitleStyle: { fontWeight: 'bold' }
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
            </View>
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