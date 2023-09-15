import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Snackbar } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "../api/index"

// import TextFieldComponent from '../components/TextFieldComponent';
import FormComponents from '../components/FormComponents';

import { babypowder, lightgrey, logocolor, oxfordblue, primarybutton, white } from "../../colorpalette"

MaterialIcons.loadFont();

Icon.loadFont();

class LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            welcomeText: "Welcome",
            loginButtonText: "Login",
            form: [
                { id: 1, title: "E-Mail", dbName: "email", placeholder: "example@mail.com", value: "", active: false, type: "text" },
                { id: 2, title: "Password", dbName: "password", placeholder: "password", value: "", active: false, type: "text" },
            ],
            rememberMe: true,
            snackbarVisible: false,
            snackbarValue: "Hi",
            auth: false,
            loginTimeout: 1000
        };
    }

    editFormValues = (field, value) => {
        this.state.form.forEach(formData => {
            if ((formData.id === field.id) && (formData.title === field.title)) {
                formData.value = value
            }
        })

        this.setState({ form: this.state.form })
    }

    getActiveTextBox(activeid) {
        const form = this.state.form
        form.map(frm => {
            frm.active = false
            if (frm.id === activeid) frm.active = true
        })
        this.refresh += 1
        this.setState({ form: form })
    }

    buildApiBody() {
        const body = {}
        this.state.form.map(formData => {
            if (formData.dbName) {
                body[formData.dbName] = formData.value
            }
        })
        return body
    }

    onSubmit() {
        console.log("clicked")
        // console.log(this.state.form)
        axios.post("/user/auth", this.buildApiBody()).then(async (response) => {
            console.log(response)
            if (response?.data?.status === true) {
                this.setState({ welcomeText: "Welcome " + response?.data?.user?.username, auth: true })
                if (this.state.rememberMe) {
                    await AsyncStorage.setItem("user_id", response?.data?.user?.user_id);
                }
                setTimeout(() => { this.props.navigation.replace('Landing') }, this.state.loginTimeout)
            }
        }).catch(error => {
            console.log(error)
            console.log(error?.response?.data)
            if (error?.response?.data?.status === false) {
                this.setState({
                    snackbarVisible: true,
                    snackbarValue: error.response?.data?.error
                })
            }
        })
    }

    onClickRememberMe() {
        this.setState({ rememberMe: !this.state.rememberMe })
    }

    onClickSignUp() {
        this.props.navigation.navigate('Signup')
        // if (this.state.form[0]?.value) {
        //     this.setState({
        //         snackbarVisible: true,
        //         snackbarValue: "Email sent to " + this.state.form[0]?.value
        //     })
        // } else {
        //     this.setState({
        //         snackbarVisible: true,
        //         snackbarValue: "Enter valid email"
        //     })
        // }
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 3, width: "100%", padding: 100, justifyContent: "center", alignItems: "center", backgroundColor: oxfordblue, borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }}>
                    <MaterialIcons style={{ width: 100, height: 100, color: logocolor }} name={'cloud-lock'} size={100} ></MaterialIcons>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ color: logocolor, fontSize: 25, fontWeight: 700, fontFamily: 'Roboto' }}>Secure</Text>
                        <Text style={{ fontSize: 25, fontWeight: 700, paddingLeft: 1, fontFamily: 'Roboto', color: babypowder }}>cloud</Text>
                    </View>
                    {/* <Image
                        style={styles.welcomeLogo}
                        source={require('../assets/logo.png')}
                    /> */}
                    {this.state.auth ? <Text style={styles.welcomeText}>{this.state.welcomeText}</Text> : null}
                </View>

                <View style={styles.loginTextBoxContainer}>
                    <FlatList
                        style={styles.loginTextBox}
                        data={this.state.form}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => FormComponents({ field: item, index, getActiveTextBox: this.getActiveTextBox.bind(this), editable: true, editFormValues: this.editFormValues.bind(this) })}
                        ItemSeparatorComponent={() => (<View style={styles.loginTextBoxSeperator}></View>)}
                    />
                </View>

                <View style={styles.textLinkContainer}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignContent: "center", justifyContent: "center" }}
                        onPress={() => this.onClickRememberMe()}
                    >
                        <Icon style={{ paddingHorizontal: 5 }} name={this.state.rememberMe ? 'radio-button-on-sharp' : 'radio-button-off-sharp'} size={16} color={oxfordblue} />
                        <Text>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onClickSignUp()}
                    >
                        <Text>Create new account?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginButtonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => this.onSubmit()}
                    >
                        <Text style={styles.loginButtonText}>{this.state.loginButtonText}</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.footerSpace} /> */}
                <Snackbar
                    visible={this.state.snackbarVisible}
                    onDismiss={() => { this.setState({ snackbarVisible: false }) }}
                    duration={2000}>
                    {this.state.snackbarValue}
                </Snackbar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center"
    },
    welcomeLogo: {
        // flex: 1,
        // width: "100%"
        width: 107,
        height: 92,
    },
    welcomeText: {
        flex: 3,
        color: white,
        fontSize: 21,
        textAlign: "center",
        fontWeight: "600",
        top: 110

    },
    loginTextBoxContainer: {
        flex: 3,
        flexDirection: "column",
        width: "100%",
        paddingVertical: 20
    },
    loginTextBox: {
        padding: 20
    },
    loginTextBoxSeperator: {
        padding: 15
    },
    textLinkContainer: {
        flex: 0.5,
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        // backgroundColor: danger,
    },
    loginButtonContainer: {
        flex: 2,
        width: "100%",
        padding: 20,
        // backgroundColor: "green",
        justifyContent: "center"
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: primarybutton,
        padding: 25,
        borderRadius: 10
    },
    loginButtonText: {
        color: white,
        fontWeight: "500",
        fontSize: 16
    },
    footerSpace: {
        flex: 6,
    }

})


export default LoginScreen;