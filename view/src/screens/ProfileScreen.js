import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { Snackbar } from 'react-native-paper';
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormComponents from '../components/FormComponents';
import axios from "../api/index"

import { background, primarybuttonbg, white } from "../../colorpalette"

Icon.loadFont();

class ProfileScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            form: [
                { id: 0, title: "userId", dbName: "user_id", value: "", active: false, type: null },
                { id: 1, title: "Name", dbName: "username", placeholder: "Enter your name", value: "", active: false, type: "text" },
                // { id: 2, title: "Date of birth", placeholder: "Date of birth", value: "", active: false, type: "text" },
                { id: 3, title: "Phone number", dbName: "phone", placeholder: "Enter your phone number", value: "", active: false, type: "text" },
                { id: 4, title: "E-Mail", dbName: "email", placeholder: "example@mail.com", value: "", active: false, type: "text" },
                { id: 5, title: "Password", placeholder: "password", value: "", active: false, type: "text" },
                { id: 6, title: "Confirm Password", placeholder: "password", value: "", active: false, type: "text" },
                // {
                //     id: 7, title: "Role", dbName: "type", placeholder: "Customer", value: "", active: false, type: "picker",
                //     options: ["client", "Admin", "Customer", "Developer"]
                // },
                // { id: 8, title: "isActive", dbName: "is_active", placeholder: "password", value: false, active: false, type: "checkbox" },

            ],
            loginButtonText: "Confirm changes",
            editable: this.props?.route?.params?.editable === undefined ? this.props.editable : this.props?.route?.params?.editable,
            refresh: 0,
            snackbarVisible: false,
            snackbarValue: ""
        };

    }

    componentDidMount() {
        // this.searchTextBox.focus()
        // console.log("this.state.editable : ", this.state.editable)
        // console.log("this.state.editable : ", this.props.editable)
        // const field = this.props?.route?.params
        // console.log("field ", field)
        // this.setState(field)
        // console.log("this.state.editable componentDidMount: ", this.state.editable)
        this.loadApi()
    }

    componentDidUpdate() {
        console.log("updating")
        // console.log(this.state.searchBarActive)
        // console.log("this.state.editable componentDidUpdate: ", this.state.editable)
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



    getActiveTextBox(activeid) {
        const form = this.state.form
        form.map(frm => {
            frm.active = false
            if (frm.id === activeid) frm.active = true
        })

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
        const formData = this.buildApiBody()
        console.log("formData - ", formData)
        axios.patch("/user/" + formData.user_id, formData).then((response) => {
            console.log(response)

        }).catch(error => { console.log(error) })

        console.log(this.state.form)
        this.setState({ snackbarVisible: true, snackbarValue: "User updated successfully" })
    }

    editFormValues(field, value) {
        this.state.form.forEach(formData => {
            if ((formData.id === field.id) && (formData.title === field.title)) {
                formData.value = value
            }
        })

        this.setState({ form: this.state.form })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.2 }} />

                <View style={styles.loginTextBoxContainer}>
                    <FlatList
                        style={styles.loginTextBox}
                        data={this.state.form}
                        // scrollEnabled={false}
                        keyExtractor={(item) => item.id.toString() + item.title + "list"}
                        renderItem={({ item, index }) => FormComponents({ field: item, index, getActiveTextBox: this.getActiveTextBox.bind(this), editable: this.state.editable, editFormValues: this.editFormValues.bind(this) })}
                        ItemSeparatorComponent={() => (<View style={styles.loginTextBoxSeperator}></View>)}
                    />
                </View>

                {this.state.editable ? <>
                    {/* <View style={{ flex: 0.2 }} /> */}
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => this.onSubmit()}
                        >
                            <Text style={styles.loginButtonText}>{this.state.loginButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </> : null}

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
        backgroundColor: background,
        alignItems: 'center',
    },
    loginTextBoxContainer: {
        flex: 80,
        flexDirection: "column",
        width: "100%"
    },
    loginTextBox: {
        padding: 20
    },
    loginTextBoxSeperator: {
        padding: 15
    },
    loginButtonContainer: {
        flex: 10,
        width: "100%",
        padding: 20,
        // backgroundColor: "green",
        justifyContent: "center"
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: primarybuttonbg,
        padding: 15,
        borderRadius: 10
    },
    loginButtonText: {
        color: white,
        fontWeight: "500",
        fontSize: 16
    },
    footerSpace: {
        // flex: 6,
    }

})


export default ProfileScreen;