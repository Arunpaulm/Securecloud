import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

import TextFieldComponent from '../components/TextFieldComponent';




const ModelComponent = ({ modalVisible, setModalVisible, selectedTableRow, selectedTableRowIndex }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    const editable = [
        { id: 1, title: "Name", placeholder: "Enter your name", value: "", active: false },
        { id: 2, title: "Date of birth", placeholder: "Date of birth", value: "", active: false },
        { id: 3, title: "Phone number", placeholder: "Enter your phone number", value: "", active: false },
        { id: 4, title: "E-Mail", placeholder: "example@mail.com", value: "", active: false },
        { id: 5, title: "Password", placeholder: "password", value: "", active: false },
        { id: 6, title: "Confirm Password", placeholder: "password", value: "", active: false },
        { id: 7, title: "Role", placeholder: "Customer", value: "", active: false },
        { id: 8, title: "isActive", placeholder: "password", value: "", active: false },

    ]
    const loginButtonText = "Save"
    const [selectedLanguage, setSelectedLanguage] = useState("java");
    const [isChecked, setChecked] = useState(false);

    function onSubmit() {
        setModalVisible(false)
    }

    function getActiveTextBox() {

    }

    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }} >
                                <Text>Edit User</Text>
                            </View>


                            <View style={styles.loginTextBoxContainer}>
                                <Picker
                                    style={{ flex: 1, height: 1 }}
                                    selectedValue={selectedLanguage}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedLanguage(itemValue)
                                    }>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>

                                <Checkbox
                                    style={styles.checkbox}
                                    value={isChecked}
                                    onValueChange={setChecked}
                                    color={isChecked ? '#4630EB' : undefined}
                                />

                                {/* <FlatList
                                    style={styles.loginTextBox}
                                    data={editable}
                                    // scrollEnabled={false}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item, index }) => <TextFieldComponent field={item} getActiveTextBox={getActiveTextBox.bind(this)} editable={true} />}
                                    ItemSeparatorComponent={() => (<View style={styles.loginTextBoxSeperator}></View>)}
                                /> */}


                            </View>


                            {/* {editable ? <>
                                <View style={{ flex: 0.2 }} />
                                <View style={styles.loginButtonContainer}>
                                    <TouchableOpacity
                                        style={styles.loginButton}
                                        onPress={() => onSubmit()}
                                    >
                                        <Text style={styles.loginButtonText}>{loginButtonText}</Text>
                                    </TouchableOpacity>
                                </View>
                            </> : null} */}

                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 35,
        padding: 50
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
        flex: 6,
    },
    checkbox: {
        margin: 8,
    },
});

export default ModelComponent;