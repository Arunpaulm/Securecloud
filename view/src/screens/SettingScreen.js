import React, { Component } from "react";
import { StyleSheet, Text, Platform, View, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from 'react-native-paper';
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { avatarSettingicon, oxfordblue, white } from "../../colorpalette"
import axios from "../api/index"

import { background, logocolor, babypowder, primarybutton, primarybuttonbg, success, successBg, warning, warningBg, danger, dangerBg } from "../../colorpalette"

Icon.loadFont();

class SettingScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            form: [
                { id: 1, title: "Name", dbName: "username", placeholder: "Enter your name", value: "", active: false, type: "text" },
                // { id: 2, title: "Date of birth", placeholder: "Date of birth", value: "", active: false, type: "text" },
                { id: 3, title: "Phone number", dbName: "phone", placeholder: "Enter your phone number", value: "", active: false, type: "text" },
                { id: 4, title: "E-Mail", dbName: "email", placeholder: "example@mail.com", value: "", active: false, type: "text" },
                { id: 5, title: "Password", placeholder: "password", value: "", active: false, type: "text" },
                { id: 6, title: "Confirm Password", placeholder: "password", value: "", active: false, type: "text" },
                {
                    id: 7, title: "Role", dbName: "role", placeholder: "Customer", value: "", active: false, type: "picker",
                    options: ["Admin", "Customer", "Developer"]
                },
                { id: 8, title: "isActive", dbName: "is_active", placeholder: "password", value: "", active: false, type: "checkbox" },

            ],
            screenLock: true
        };
    }

    componentDidMount() {
        this.loadApi()
    }

    componentDidUpdate() {
    }

    async loadApi() {
        // const userId = await SecureStore.getItemAsync("user_id");
        const userId = await AsyncStorage.getItem("user_id");
        axios.get("/user/" + userId).then((response) => {
            const field = { form: response.data?.data?.user || {} }
            console.log("field before", field)
            field.form = this.state.form.map(form => {
                Object.keys(field.form).map(index => {
                    if (form.dbName === index) {
                        form.placeholder = field.form[index]
                        form.value = field.form[index]
                    }
                })
                return form
            })

            this.setState(field)
            console.log("this.state.form ", this.state.form)
        }).catch(error => { console.log(error) })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 6, justifyContent: "flex-end", alignItems: "center" }}>
                    <Avatar.Text size={150} label={this.state.form?.[0]?.value?.split("")[0]?.toUpperCase()} color={babypowder} style={{ backgroundColor: avatarSettingicon, borderRadius: 30 }} />
                    {/* <Avatar.Image size={100} source={require('../assets/avatar.png')} /> */}
                    <Text style={{ fontSize: 25, fontWeight: 600, padding: 25, color: white }}>{this.state.form?.[0]?.value}</Text>
                </View>

                <View style={styles.settingOptionsContainer}>
                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={{ ...styles.buttonContainer, ...styles.primaryButton }}
                            onPress={() => {
                                this.props.navigation.navigate("Profile", { editable: true, form: this.state.form })
                            }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: white }}>EDIT PROFILE</Text>
                        </TouchableOpacity>
                    </View>
                    {Platform.OS === "web" ? null :
                        <View style={{ marginVertical: 10 }}>
                            <TouchableOpacity style={{ ...styles.buttonContainer, ...(this.state.screenLock ? styles.successButton : styles.warningButton) }} onPress={async () => {
                                // await SecureStore.setItemAsync("screen_lock", String(!this.state.screenLock));
                                await AsyncStorage.getItem("screen_lock", String(!this.state.screenLock));
                                this.setState({ screenLock: !this.state.screenLock })
                            }}>
                                <Text style={{ fontSize: 15, fontWeight: 600, color: white }}>SCREEN LOCK - {this.state.screenLock ? "ON" : "OFF"}</Text>
                            </TouchableOpacity>
                        </View>}

                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={{ ...styles.buttonContainer, ...styles.primaryButton }}>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: white }}>ABOUT THIS APP</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={{ ...styles.buttonContainer, ...styles.dangerButton }} onPress={async () => {
                            if (Platform.OS === "web") {
                                await AsyncStorage.setItem("user_id", "");
                                this.props.navigation.navigate("Login")
                                console.log("User logout logic")
                            } else if (["ios", "android"].indexOf(Platform.OS) > -1) {

                                Alert.alert(
                                    'Logout User',
                                    'Are you sure?',
                                    [
                                        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        {
                                            text: 'Yes', onPress: async () => {
                                                await AsyncStorage.setItem("user_id", "");
                                                this.props.navigation.navigate("Login")
                                                console.log("User logout logic")
                                            }
                                        },
                                    ],
                                    { cancelable: false });
                            }
                        }}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 600, color: white }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: oxfordblue,
        alignItems: 'center',
    },
    settingOptionsContainer: {
        flex: 10,
        padding: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        backgroundColor: babypowder
    },
    buttonContainer: {
        padding: 20,
        width: 350,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    primaryButton: {
        borderColor: primarybutton,
        backgroundColor: primarybuttonbg
    },
    dangerButton: {
        borderColor: danger,
        backgroundColor: dangerBg
    },
    successButton: {
        borderColor: success,
        backgroundColor: successBg
    },
    warningButton: {
        borderColor: warning,
        backgroundColor: warningBg
    }

})


export default SettingScreen;