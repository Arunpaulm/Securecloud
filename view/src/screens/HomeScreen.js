import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Avatar, List, ProgressBar, MD3Colors } from 'react-native-paper';

import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import DocumentList from "../components/DocumentList";

import Logo from "../assets/logo.png"

MaterialIcons.loadFont();
Ionicons.loadFont();

class HomeScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            color: "#0077B5",
            internetIcon: "wifi",
            uploadIcon: "cloud-upload",
            internetIconColors: { disconnected: "red", warning: "orange", connected: "green" },
            intervalID: "",
            directory: [
                { "exists": true, "id": "1", "isDirectory": false, "modificationTime": 1691592905.7390752, "name": "ExponentAsset-9456fa40117c9472546b15f9e7e91a19.otf", "size": 186664, "uri": "file:///Users/Hash/Library/Developer/CoreSimulator/Devices/AE282950-5ADC-4AD2-8BFD-67903F95387C/data/Containers/Data/Application/4859E6D1-6B7A-405B-B92D-24D85C75DBE5/Library/Caches/ExponentExperienceData/%2540anonymous%252FSecureCloud-bc0aa9c2-df66-4895-be03-d191a79471f4/ExponentAsset-9456fa40117c9472546b15f9e7e91a19.otf" },
                { "exists": true, "id": "0", "isDirectory": false, "modificationTime": 1691592718.068173, "name": "ExponentAsset-b3263095df30cb7db78c613e73f9499a.ttf", "size": 247192, "uri": "file:///Users/Hash/Library/Developer/CoreSimulator/Devices/AE282950-5ADC-4AD2-8BFD-67903F95387C/data/Containers/Data/Application/4859E6D1-6B7A-405B-B92D-24D85C75DBE5/Library/Caches/ExponentExperienceData/%2540anonymous%252FSecureCloud-bc0aa9c2-df66-4895-be03-d191a79471f4/ExponentAsset-b3263095df30cb7db78c613e73f9499a.ttf" }
            ]
        };
    }

    componentDidMount() {
        let turn = 0
        const intervalID = setInterval(() => {
            const state = {}
            if (this.state.internetIcon?.match("-outline")) {
                state.internetIcon = this.state.internetIcon?.replace("-outline", "")
                this.pulse()
            } else {
                state.internetIcon = `${this.state.internetIcon}-outline`
                this.pulse()
            }

            if (turn && this.state.uploadIcon?.match("-outline")) {
                state.uploadIcon = this.state.uploadIcon?.replace("-outline", "")
            } else if (turn) {
                state.uploadIcon = `${this.state.uploadIcon}-outline`
            }

            turn = 1
            this.setState(state)
        }, 500)
        this.setState({ intervalID })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

    componentDidUpdate() {

    }

    handleViewRef = ref => { this.setState({ pulseAnimateRef: ref }) }

    pulse = () => this.state.pulseAnimateRef.pulse();

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons style={{ padding: 10, width: 70, height: 70, color: this.state.color }} name={'cloud-lock'} size={50} ></MaterialIcons>
                    <View style={{ flex: 1, marginLeft: 8, flexDirection: "row" }}>
                        <Text style={{ color: this.state.color, fontSize: 20, fontWeight: 700 }}>Secure</Text>
                        <Text style={{ fontSize: 20, fontWeight: 500, paddingLeft: 1, fontFamily: 'Roboto' }}>cloud</Text>
                    </View>
                    <Animatable.View ref={this.handleViewRef}
                        duration={1100}>
                        <Ionicons style={{ padding: 20, fontWeight: 300, color: this.state.internetIconColors["disconnected"] }} name={this.state.internetIcon} size={25} ></Ionicons>
                    </Animatable.View>
                </View>

                <View style={{ flex: 1, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", backgroundColor: "lightgrey" }}>
                    <Text style={{ flex: 0.06, fontSize: 18 }}>Hi</Text>
                    <Text style={{ flex: 1, fontSize: 18 }}>"UserName"</Text>
                    <Avatar.Text size={40} label="UN" style={{ backgroundColor: "grey" }} />
                </View>

                <View style={{ flex: 1, padding: 20 }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", backgroundColor: "#eee", borderWidth: 1, borderRadius: 5, borderColor: "grey", justifyContent: "center", alignItems: "center" }}>
                        <MaterialIcons style={{ paddingRight: 5, fontWeight: 300, color: "#555" }} name={this.state.uploadIcon} size={25} ></MaterialIcons>
                        <Text style={{ fontWeight: 500, color: "#555" }} >Upload files</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 10, backgroundColor: "blue" }}>
                    <DocumentList directory={this.state.directory} />
                </View>


            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})


export default HomeScreen;