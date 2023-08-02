import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, headerBackTitle: "Back", title: "Edit Profile" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;