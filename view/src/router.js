import * as React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import LandingScreen from './screens/LandingScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createStackNavigator();

function Routes() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Signup">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false, headerBackTitle: "Back" }} />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, headerBackTitle: "Back", title: "Edit Profile" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default Routes;