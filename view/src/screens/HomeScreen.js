import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Snackbar } from 'react-native-paper'

import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CloudDirectory from "../components/CloudDirectory";
import axios from "../api/index"

import { logocolor, homeusernamebg, success, danger, warning, oxfordblue, babypowder, avatarHomeicon } from "../../colorpalette"

MaterialIcons.loadFont();
Ionicons.loadFont();

class HomeScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            color: logocolor,
            internetIcon: "wifi",
            uploadIcon: "cloud-upload",
            internetIconColors: { disconnected: danger, warning: warning, connected: success },
            intervalID: "",
            snackbarVisible: false
        };
    }

    componentDidMount() {
        this.loadApi()
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

    onDownload() {
        this.setState({ snackbarVisible: true, snackbarValue: "File downloaded successfully. saved to Download folder." })
    }

    onFileDelete() {
        this.setState({ snackbarVisible: true, snackbarValue: "File deleted successfully" })
    }

    async loadApi() {
        this.setState({ onLoading: true })
        // const userId = await SecureStore.getItemAsync("user_id");
        const userId = await AsyncStorage.getItem("user_id");
        axios.get("/user/" + userId).then((response) => {
            const field = { form: response.data?.data?.user || {} }
            console.log("field before", field)
            this.setState(field)
            console.log("this.state.form ", this.state.form)
        }).catch(error => { console.log(error) })
    }

    handleViewRef = ref => { this.setState({ pulseAnimateRef: ref }) }

    pulse = () => this.state.pulseAnimateRef.pulse();

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons style={{ padding: 10, width: 70, height: 70, color: this.state.color }} name={'cloud-lock'} size={50} ></MaterialIcons>
                    <View style={{ flex: 1, marginLeft: 8, flexDirection: "row" }}>
                        <Text style={{ color: this.state.color, fontSize: 20, fontWeight: 700, fontFamily: 'Roboto' }}>Secure</Text>
                        <Text style={{ fontSize: 20, fontWeight: 700, paddingLeft: 1, fontFamily: 'Roboto', color: babypowder }}>cloud</Text>
                    </View>
                    <Animatable.View ref={this.handleViewRef}
                        duration={1100}>
                        <Ionicons style={{ padding: 20, fontWeight: 300, color: this.state.internetIconColors["connected"] }} name={this.state.internetIcon} size={25} ></Ionicons>
                    </Animatable.View>
                </View>

                <View style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", backgroundColor: homeusernamebg }}>
                    <Text style={{ flex: 0.06, fontSize: 18, fontWeight: 600, color: babypowder, paddingRight: 7 }}>Hi</Text>
                    <Text style={{ flex: 1, fontSize: 18, fontWeight: 600, color: babypowder }}>{this.state?.form?.username}</Text>
                    <Avatar.Text style={{ marginRight: 10, backgroundColor: avatarHomeicon, borderRadius: 20 }} size={50} label={this.state.form?.username?.split("")[0]?.toUpperCase()} />
                </View>

                {/* <View style={{ flex: 1, padding: 20 }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row", backgroundColor: uploadiconbg, borderWidth: 1, borderRadius: 10, borderColor: grey, justifyContent: "center", alignItems: "center" }}>
                        <MaterialIcons style={{ paddingRight: 5, fontWeight: 300, color: uploadicontext }} name={this.state.uploadIcon} size={25} ></MaterialIcons>
                        <Text style={{ fontWeight: 500, color: uploadicontext }} >Upload files</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{ flex: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: "hidden" }}>
                    <CloudDirectory onDownload={this.onDownload.bind(this)} onFileDelete={this.onFileDelete.bind(this)} />
                </View>

                <Snackbar
                    visible={this.state.snackbarVisible}
                    onDismiss={() => { this.setState({ snackbarVisible: false }) }}
                    duration={2000}>
                    {this.state.snackbarValue}
                </Snackbar>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: oxfordblue
    }
})


export default HomeScreen;