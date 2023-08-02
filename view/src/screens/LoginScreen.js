import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/Ionicons";

import TextFieldComponent from '../components/TextFieldComponent';

Icon.loadFont();

class LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            welcomeText: "Login",
            loginButtonText: "Login",
            form: [
                { id: 1, title: "E-Mail", placeholder: "example@mail.com", value: "", active: false },
                { id: 2, title: "Password", placeholder: "example@mail.com", value: "", active: false }
            ],
            rememberMe: false
        };
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

    onSubmit() {
        console.log("clicked")
        console.log(this.state.form)
        this.props.navigation.navigate('HomeScreen')
    }

    onClickRememberMe() {
        this.setState({ rememberMe: !this.state.rememberMe })
    }

    onClickForgotPassword() {

    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ flex: 0.2 }} />
                <Image
                    style={styles.welcomeLogo}
                    source={require('../assets/logo.png')}
                />
                <View style={{ flex: 0.2 }} />
                <Text style={styles.welcomeText}>{this.state.welcomeText}</Text>
                <View style={styles.loginTextBoxContainer}>
                    <FlatList
                        style={styles.loginTextBox}
                        data={this.state.form}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => <TextFieldComponent field={item} getActiveTextBox={this.getActiveTextBox.bind(this)} />}
                        ItemSeparatorComponent={() => (<View style={styles.loginTextBoxSeperator}></View>)}
                    />
                </View>
                <View style={{ flex: 0.2 }} />
                <View style={styles.textLinkContainer}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignContent: "center", justifyContent: "center" }}
                        onPress={() => this.onClickRememberMe()}
                    >
                        <Icon style={{ paddingHorizontal: 5 }} name={this.state.rememberMe ? 'radio-button-on-sharp' : 'radio-button-off-sharp'} size={16} color={"#D9D9D9"} />
                        <Text>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onClickForgotPassword()}
                    >
                        <Text>Forgot Password?</Text>
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
                <View style={styles.footerSpace} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    welcomeLogo: {
        // flex: 1,
        // width: "100%"
        width: 107,
        height: 92,
    },
    welcomeText: {
        flex: 3,
        color: "#333866",
        fontSize: 21,
        textAlign: "center",
        fontWeight: "600"

    },
    loginTextBoxContainer: {
        flex: 5,
        flexDirection: "column",
        width: "100%",
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
        // backgroundColor: "red",

    },
    loginButtonContainer: {
        flex: 3,
        width: "100%",
        padding: 20,
        // backgroundColor: "green",
        justifyContent: "center"
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#6A6EEE",
        padding: 25,
        borderRadius: 10
    },
    loginButtonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    },
    footerSpace: {
        flex: 6,
    }

})


export default LoginScreen;