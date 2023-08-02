import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/Ionicons";



import ProfileScreen from './ProfileScreen';
import UsersScreen from './UsersScreen';


const Tab = createBottomTabNavigator();
Icon.loadFont();

class HomeScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }


    DashboardScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Dashboard!</Text>
            </View>
        );
    }

    SettingsScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView flex>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Dashboard') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Drive') {
                            iconName = focused ? 'folder-open' : 'folder-open-outline';
                        } else if (route.name === 'Feed') {
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
                    <Tab.Screen name="Dashboard" component={this.DashboardScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Tab.Screen name="Drive" component={this.SettingsScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Tab.Screen name="Feed" component={this.SettingsScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Tab.Screen name="Users" component={UsersScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
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
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({

})


export default HomeScreen;