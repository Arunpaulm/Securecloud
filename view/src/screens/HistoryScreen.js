import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment"
import { List, ProgressBar, MD3Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../api/index'

import { babypowder, success } from "../../colorpalette"
import { FlatList } from "react-native-gesture-handler";

Ionicons.loadFont();

const SCREENWIDTH = Dimensions.get('window').width;
const SCREEHEIGHT = Dimensions.get('window').height;
class HistoryScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            onLoading: true,
            logs: []

        };
    }

    componentDidMount() {
        this.loadApi()
    }

    async loadApi() {
        this.setState({ isRefreshing: true, onLoading: true })
        axios.get("/log").then((response) => {
            console.log(response.data)
            const field = { logs: response.data?.logs || {} }
            console.log("field before", field)
            this.setState(field)
            this.setState({ isRefreshing: false, onLoading: false })
        }).catch(error => { console.log(error) })
    }


    componentDidUpdate() { }

    // {"archivefileName": "newfile%20copy%203.md[31ce2464-be07-48c3-9099-b33f6fac426f].arc", "createdAt": "2023-08-26T06:11:48.000Z", "encoding": "7bit", "file_id": "31ce2464-be07-48c3-9099-b33f6fac426f", "filename": "newfile%20copy%203.md", "log_id": "70837e64-9ea7-4731-b10a-52f6aa4f90ac", "mimeType": "text/x-markdown", "size": "11.00 Bytes", "status": true, "updatedAt": "2023-08-26T06:11:48.000Z", "userUserId": null, "user_id": "d4084131-7b0c-4196-9803-a59b47c58853"}

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    style={{ flex: 1, width: SCREENWIDTH }}
                    data={this.state.logs}
                    keyExtractor={(item) => item?.id?.toString()}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.loadApi()}
                    renderItem={({ item, index }) => (
                        <View style={{ flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                            <List.Item
                                key={"log list" + index}
                                title={item.filename}
                                description={
                                    <View style={{ height: 50, padding: 5 }}>
                                        <Text style={{}}>Size: {item.size}</Text>
                                        {item.action === "upload" ?
                                            <Text style={{}}>Upload on : {moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss a")}</Text> :
                                            <Text style={{}}>Download on : {moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss a")}</Text>
                                        }

                                        <Text style={{}}>Status: Completed</Text>
                                        <ProgressBar style={{ position: "absolute", top: 8, left: -60, width: 417 }} progress={5} color={success} />
                                    </View>
                                }
                                left={props => {
                                    if (item.action === "upload") {
                                        return <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25} />
                                    } else if (item.action === "download") {
                                        return <Ionicons name="cloud-download-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25} />
                                    }
                                }}
                            />
                        </View>
                    )}
                    ListEmptyComponent={() => (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 20 }}><Text>No History found</Text></View>)}
                    numColumns={1}
                />

                {this.state.onLoading ? <View style={{ flex: 1, height: "100%", width: "100%", position: "absolute", backgroundColor: babypowder, justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator size="large" />
                </View> : null}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }

})


export default HistoryScreen;