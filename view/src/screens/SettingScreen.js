import React, { Component } from "react";
import { StyleSheet, Text, Platform, View, TouchableOpacity, Alert, Modal, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { DataTable, Avatar, TouchableRipple } from 'react-native-paper';
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { aliceblue, avatarSettingicon, black, blue, fileoptionsbg, grey, gunmetal, lightgrey, moonstone, oxfordblue, white } from "../../colorpalette"
import axios from "../api/index"

import { babypowder, primarybutton, primarybuttonbg, success, successBg, warning, warningBg, danger, dangerBg } from "../../colorpalette"
import { ScrollView } from "react-native-gesture-handler";

MaterialCommunityIcons.loadFont();
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
            screenLock: true,
            aboutUsModalVisible: false,
            aboutus: [
                {
                    key: "Student Number",
                    value: "1971435"
                },
                {
                    key: "Student Name",
                    value: "Arunpaul Muthupandian"
                },
                {
                    key: "Supervisor Name",
                    value: "Mahmoud Artemi"
                },
                {
                    key: "Course Name",
                    value: "MSc Software Engineering and Applications"
                },
            ]
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

    getAboutUsModel() {
        return <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.aboutUsModalVisible} // this.state.modalVisible
            onRequestClose={() => {
                // console.log('Modal has been closed.');
                this.setState({ aboutUsModalVisible: false })
            }}>
            {/* <TouchableOpacity style={styles.centeredView} onPressIn={() => { this.setState({ securityModalVisible: false }) }}> */}
            <View style={styles.centeredView} >
                <View style={{ ...styles.modalView, flex: 0.9 }}>
                    <View style={{
                        flex: 0.4,
                        width: "100%",
                        paddingBottom: 3,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        overflow: "hidden",
                        backgroundColor: oxfordblue
                    }}>
                        <TouchableRipple style={{
                            flexDirection: "row",
                            alignSelf: "flex-end",
                            padding: 4,
                            shadowColor: white,
                            shadowRadius: 10,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            elevation: 5,
                            justifyContent: "center",
                            alignItems: "center"
                        }} onPress={() => { this.setState({ aboutUsModalVisible: false }) }}>
                            <MaterialCommunityIcons style={{}} name={'close'} size={30} color={danger} />
                        </TouchableRipple>
                        <View style={{ flex: 0.7, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <MaterialCommunityIcons style={{ padding: 10, width: 70, height: 70, color: white }} name={'cloud-lock'} size={50} ></MaterialCommunityIcons>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 30, fontWeight: 700, fontFamily: 'Roboto', color: white }}>Secure</Text>
                                <Text style={{ fontSize: 30, fontWeight: 700, paddingLeft: 1, fontFamily: 'Roboto', color: white }}>cloud</Text>
                            </View>
                        </View>
                        <Text style={{ flex: 0.4, fontSize: 16, textAlign: "center", fontWeight: 700, paddingLeft: 1, fontFamily: 'Roboto', color: white }}>A Cross-Platform Encrypted File Sharing Solution with Forensic Imaging Capability</Text>
                    </View>

                    <View style={{ flex: 0.1, flexDirection: "row", padding: 4, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 17, textAlign: "left", paddingRight: 4, fontWeight: 500, color: success }}>Supervisor Verified</Text>
                        <MaterialCommunityIcons name={'check-decagram'} size={20} color={success} />
                    </View>


                    <View style={{ flex: 0.35 }}>
                        <ScrollView horizontal={true}>
                            <DataTable style={{ flex: 1 }}>
                                <FlatList
                                    style={{ flex: 1, width: 490 }}
                                    // horizontal={true}
                                    scrollEnabled={false}
                                    contentContainerStyle={{}}
                                    data={this.state.aboutus}
                                    keyExtractor={(item) => item?.key?.toString()}
                                    renderItem={({ item, index }) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell key={index + "report-database"} style={{ flex: 0.4 }}>{item.key}</DataTable.Cell>
                                            <DataTable.Cell key={index + "report-result"} style={{ flex: 0.8 }} ><Text style={{ flex: 1, flexWrap: "wrap" }} numberOfLines={2}>{item.value}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    )}
                                    numColumns={1}
                                />
                            </DataTable>
                        </ScrollView>
                    </View>

                    <View style={{
                        flex: 0.5,
                        width: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        backgroundColor: aliceblue,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        overflow: "hidden",
                    }}>
                        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 100, height: 100, objectFit: "contain", paddingHorizontal: 5 }} source={require('../assets/logos/reactnative.png')} />
                            <Image style={{ width: 200, height: 100, objectFit: "contain", paddingHorizontal: 5 }} source={require('../assets/logos/node.png')} />
                            <Image style={{ width: 200, height: 100, objectFit: "contain", paddingHorizontal: 5 }} source={require('../assets/logos/htmlcssjs.png')} />
                            <Image style={{ width: 100, height: 100, objectFit: "contain", paddingHorizontal: 5 }} source={require('../assets/logos/mysql.png')} />
                        </View>
                        <Text style={{ paddingBottom: 10 }}> Powered By</Text>
                    </View>

                </View>
            </View>
            {/* </TouchableOpacity> */}
        </Modal >
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
                                await AsyncStorage.setItem("screen_lock", String(!this.state.screenLock));
                                this.setState({ screenLock: !this.state.screenLock })
                            }}>
                                <Text style={{ fontSize: 15, fontWeight: 600, color: white }}>SCREEN LOCK - {this.state.screenLock ? "ON" : "OFF"}</Text>
                            </TouchableOpacity>
                        </View>}

                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={{ ...styles.buttonContainer, ...styles.primaryButton }} onPress={() => this.setState({ aboutUsModalVisible: true })}>
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
                {this.getAboutUsModel()}
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 35,
        padding: 30,
        backgroundColor: babypowder + "aa"
    },
    modalView: {
        width: "100%",
        height: "auto",
        backgroundColor: babypowder,
        borderRadius: 15,
        // padding: 35,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

})


export default SettingScreen;