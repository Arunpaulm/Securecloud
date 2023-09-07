import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Snackbar } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import TextFieldComponent from '../components/TextFieldComponent';
import FormComponents from '../components/FormComponents';

import { babypowder, logocolor, oxfordblue, primarybutton, white } from "../../colorpalette"

MaterialIcons.loadFont();

Icon.loadFont();

class SignupScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            welcomeText: "Signup",
            loginButtonText: "Signup",
            form: [
                { id: 0, title: "userId", dbName: "user_id", value: "", active: false, type: null },
                { id: 1, title: "Name", dbName: "username", placeholder: "Enter your name", value: "", active: false, type: "text" },
                // { id: 2, title: "Date of birth", placeholder: "Date of birth", value: "", active: false, type: "text" },
                { id: 3, title: "Phone number", dbName: "phone", placeholder: "Enter your phone number", value: "", active: false, type: "text" },
                { id: 4, title: "E-Mail", dbName: "email", placeholder: "example@mail.com", value: "", active: false, type: "text" },
                { id: 5, title: "Password", dbName: "password", placeholder: "password", value: "", active: false, type: "text" },
                { id: 6, title: "Confirm Password", placeholder: "password", value: "", active: false, type: "text" }

            ],
            snackbarVisible: false,
            snackbarValue: "Hi"
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
        this.setState({ form: form })
    }

    onSubmit() {
        console.log("clicked")
        console.log(this.state.form)
        this.props.navigation.navigate('Landing')
    }

    onClickRememberMe() {
        this.setState({ rememberMe: !this.state.rememberMe })
    }

    onClickForgotPassword() {
        if (this.state.form[0]?.value) {
            this.setState({
                snackbarVisible: true,
                snackbarValue: "Email sent to " + this.state.form[0]?.value
            })
        } else {
            this.setState({
                snackbarVisible: true,
                snackbarValue: "Enter valid email"
            })
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 2, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: oxfordblue, borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }}>
                    <MaterialIcons style={{ width: 100, height: 100, color: logocolor }} name={'cloud-lock'} size={100} ></MaterialIcons>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ color: logocolor, fontSize: 25, fontWeight: 700, fontFamily: 'Roboto' }}>Secure</Text>
                        <Text style={{ fontSize: 25, fontWeight: 700, paddingLeft: 1, fontFamily: 'Roboto', color: babypowder }}>cloud</Text>
                    </View>
                    {/* <Image
                        style={styles.welcomeLogo}
                        source={require('../assets/logo.png')}
                    /> */}
                    {/* <Text style={styles.welcomeText}>{this.state.welcomeText}</Text> */}
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
        color: "#333866",
        fontSize: 21,
        textAlign: "center",
        fontWeight: "600"

    },
    loginTextBoxContainer: {
        flex: 6,
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
        flex: 1,
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


export default SignupScreen;