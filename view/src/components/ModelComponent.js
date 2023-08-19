import React, { Component } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import TextFieldComponent from "../components/TextFieldComponent"
import PickerComponent from "../components/PickerComponent"
import CheckboxComponent from "../components/CheckboxComponent"
import FormComponents from '../components/FormComponents';

import axios from "../api/index"

class ModelComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            form: [
                { id: 0, title: "userId", dbName: "user_id", value: "", active: false, type: null },
                { id: 1, title: "Name", dbName: "username", placeholder: "Enter your name", value: "", active: false, type: "text" },
                // { id: 2, title: "Date of birth", placeholder: "Date of birth", value: "", active: false, type: "text" },
                { id: 3, title: "Phone number", dbName: "phone", placeholder: "Enter your phone number", value: "", active: false, type: "text" },
                { id: 4, title: "E-Mail", dbName: "email", placeholder: "example@mail.com", value: "", active: false, type: "text" },
                { id: 5, title: "Password", dbName: "password", placeholder: "password", value: "", active: false, type: "text" },
                { id: 6, title: "Confirm Password", placeholder: "password", value: "", active: false, type: "text" },
                {
                    id: 7, title: "Role", dbName: "role", placeholder: "Customer", value: "", active: false, type: "picker",
                    options: ["Admin", "Customer", "Developer"]
                },
                { id: 8, title: "isActive", dbName: "is_active", placeholder: "password", value: "", active: false, type: "checkbox" },

            ],
            loginButtonText: "Confirm changes",
            closeButtonText: "Close",
            editable: this.props?.route?.params?.editable === undefined ? this.props.editable : this.props?.route?.params?.editable,
            // modalVisible: false
            snackbarVisible: true,
            snackbarValue: "Hi"
        };
    }
    componentDidMount() {
        const field = this.props
        console.log("field ", field)
        field.form = this.state.form.map(form => {
            Object.keys(field.selectedTableRow).map(index => {
                if (form.dbName === index) {
                    form.placeholder = field.selectedTableRow[index]
                    form.value = field.selectedTableRow[index]
                }
            })
            return form
        })

        this.setState(field)
    }

    componentDidUpdate() {
        console.log("updated")
    }

    editFormValues = (field, value) => {
        this.state.form.forEach(formData => {
            if ((formData.id === field.id) && (formData.title === field.title)) {
                formData.value = value
            }
        })

        this.setState({ form: this.state.form })
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

        this.props.setModalVisible(false)
        this.setState({ modalVisible: false })
        console.log(this.state.form)
        this.props.onSubmit()
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

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    this.props.setModalVisible(false)
                    this.setState({ modalVisible: false })
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 20, paddingTop: 5 }}>Edit User</Text>
                        </View>

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
                            <View style={styles.loginButtonContainer}>
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={() => this.onSubmit()}
                                >
                                    <Text style={styles.loginButtonText}>{this.state.loginButtonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </> : null}

                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    this.props.setModalVisible(false)
                                    this.setState({ modalVisible: false })
                                }}
                            >
                                <Text style={styles.closeButtonText}>{this.state.closeButtonText}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal >
        );
    }
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 35,
        padding: 30
    },
    modalView: {
        flex: 1,
        // padding: 50,
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
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
        flex: 1,
        padding: 5,
        paddingHorizontal: 20
    },
    loginTextBoxSeperator: {
        padding: 15
    },
    loginButtonContainer: {
        flex: 10,
        width: "100%",
        padding: 20,
        paddingBottom: 0,
        // backgroundColor: "green",
        justifyContent: "center"
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#003399",
        padding: 20,
        borderRadius: 10
    },
    loginButtonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    },
    closeButtonContainer: {
        flex: 10,
        width: "100%",
        padding: 20,
        paddingTop: 10,
        // backgroundColor: "white",
        justifyContent: "center"
    },
    closeButton: {
        alignItems: "center",
        backgroundColor: "#ffcccb",
        borderWidth: 1,
        borderColor: "red",
        padding: 20,
        borderRadius: 10
    },
    closeButtonText: {
        color: "red",
        fontWeight: "500",
        fontSize: 16
    },
    footerSpace: {
        flex: 6,
    },
    checkbox: {
        margin: 8,
    },
});

export default ModelComponent;