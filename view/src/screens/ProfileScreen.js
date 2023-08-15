import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/Ionicons";

import FormComponents from '../components/FormComponents';

Icon.loadFont();

class ProfileScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            form: [
                { id: 1, title: "Name", placeholder: "Enter your name", value: "Some value", active: false },
                { id: 2, title: "Date of birth", placeholder: "Date of birth", value: "", active: false },
                { id: 3, title: "Phone number", placeholder: "Enter your phone number", value: "", active: false },
                { id: 4, title: "E-Mail", placeholder: "example@mail.com", value: "", active: false },
                { id: 5, type: "text", title: "Password", placeholder: "password", value: "", active: false },
                { id: 6, title: "Confirm Password", placeholder: "password", value: "", active: false }
            ],
            loginButtonText: "Confirm changes",
            editable: this.props?.route?.params?.editable === undefined ? this.props.editable : this.props?.route?.params?.editable,
            refresh: 0
        };
    }

    componentDidMount() {
        // this.searchTextBox.focus()
        // console.log("this.state.editable : ", this.state.editable)
        // console.log("this.state.editable : ", this.props.editable)
        console.log("this.state.editable componentDidMount: ", this.state.editable)
    }

    componentDidUpdate() {
        console.log("updating")
        // console.log(this.state.searchBarActive)
        console.log("this.state.editable componentDidUpdate: ", this.state.editable)
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
        this.setState({ searchBarActive: false })
        console.log(this.state.form)
    }

    editFormValues = (field, value) => {
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
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => FormComponents({ field: item, index, getActiveTextBox: this.getActiveTextBox.bind(this), editable: this.state.editable, editFormValues: this.editFormValues.bind(this) })}
                        ItemSeparatorComponent={() => (<View style={styles.loginTextBoxSeperator}></View>)}
                    />
                </View>

                {this.state.editable ? <>
                    <View style={{ flex: 0.2 }} />
                    <View style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => this.onSubmit()}
                        >
                            <Text style={styles.loginButtonText}>{this.state.loginButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    loginTextBoxContainer: {
        flex: 70,
        flexDirection: "column",
        width: "100%",
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
        backgroundColor: "#003399",
        padding: 25,
        borderRadius: 10
    },
    loginButtonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    },
    footerSpace: {
        // flex: 6,
    }

})


export default ProfileScreen;