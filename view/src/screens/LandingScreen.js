import React, { Component } from "react";
import { StyleSheet, Text, Button, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/Ionicons";



import ProfileScreen from './ProfileScreen';
import UsersScreen from './UsersScreen';
import VaultScreen from './VaultScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';


const Tab = createBottomTabNavigator();
Icon.loadFont();

class LandingScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
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
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Users') {
                        iconName = focused ? 'people' : 'people-outline';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={focused ? "#6A6EEE" : "#D9D9D9"} />;
                },
                tabBarActiveTintColor: "#6A6EEE",
                tabBarInactiveTintColor: "#D9D9D9",
            })}>
                <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                <Tab.Screen name="Vault" component={VaultScreen} options={{ title: "Private Vault" }} />
                <Tab.Screen name="Notification" component={NotificationScreen} options={{ title: "Notification log" }} />
                <Tab.Screen name="Users" component={UsersScreen} options={{ title: "All Users" }} />
                {/* initialParams={{ editable: false }} */}
                <Tab.Screen name="Profile" children={() => <ProfileScreen editable={false} />} options={{
                    title: "My Profile", headerBackTitle: "Back", headerRight: () => (
                        <Button
                            onPress={() => {
                                this.props.navigation.navigate("Profile", { editable: true })
                            }}
                            title="Edit"
                        />)
                }} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default LandingScreen;