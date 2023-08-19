import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/Ionicons";


import SettingScreen from './SettingScreen';
import UsersScreen from './UsersScreen';
import VaultScreen from './VaultScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import * as SecureStore from 'expo-secure-store';

import { tabactive, tabinactive } from "../../colorpalette"

const Tab = createBottomTabNavigator();
Icon.loadFont();

class LandingScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        await SecureStore.setItemAsync("user_id", "74de57d2-09c6-476e-af69-cdf69bdad27d");
    }

    render() {
        return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Vault') {
                        iconName = focused ? 'lock-open-outline' : 'lock-closed';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Users') {
                        iconName = focused ? 'people' : 'people-outline';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={focused ? tabactive : tabinactive} />;
                },
                tabBarActiveTintColor: tabactive,
                tabBarInactiveTintColor: tabinactive,
            })}>
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                <Tab.Screen name="Vault" component={VaultScreen} options={{ title: "Private Vault" }} />
                <Tab.Screen name="Notification" component={NotificationScreen} options={{ title: "Notification log" }} />
                <Tab.Screen name="Users" component={UsersScreen} options={{ title: "All Users" }} />
                <Tab.Screen name="Settings" component={SettingScreen} options={{}} />
                {/* <Tab.Screen name="Setting" children={() => <ProfileScreen editable={false} />} options={{
                    title: "My Profile", headerBackTitle: "Back", headerRight: () => (
                        <Button
                            onPress={() => {
                                this.props.navigation.navigate("Profile", { editable: true })
                            }}
                            title="Edit"
                        />)
                }} /> */}
                {/* initialParams={{ editable: false }} */}
            </Tab.Navigator>
        );
    }
}

export default LandingScreen;