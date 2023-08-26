import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment"
import { List, ProgressBar, MD3Colors } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

import axios from '../api/index'

import { babypowder, success } from "../../colorpalette"
import { FlatList } from "react-native-gesture-handler";

Ionicons.loadFont();

const SCREENWIDTH = Dimensions.get('window').width;
const SCREEHEIGHT = Dimensions.get('window').height;
class NewsScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            onLoading: true,
        };
    }

    componentDidMount() {
        this.loadApi()
    }

    async loadApi() {
        this.setState({ isRefreshing: true, onLoading: true })
        axios.get("/news").then((response) => {
            console.log(response.data)
            const field = { articles: response.data?.articles, isRefreshing: false, onLoading: false }
            this.setState(field)
        }).catch(error => { console.log(error) })
    }


    componentDidUpdate() { }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1, width: SCREENWIDTH }}
                    data={this.state.articles}
                    keyExtractor={(item) => item?.title?.toString()}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.loadApi()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}
                            onPress={async () => {
                                let result = await WebBrowser.openBrowserAsync(item.url);
                            }}>
                            <List.Item
                                style={{ height: 150 }}
                                key={"log list" + index}
                                title={item.title}
                                titleNumberOfLines={3}
                                description={
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ paddingTop: 15 }}>Source: {item.source.Name}</Text>
                                        <Text style={{ paddingTop: 5 }}>Upload on : {moment(item.publishedAt).format("DD/MM/YYYY hh:mm:ss a")}</Text>

                                        <Text style={{ paddingTop: 15, alignSelf: "center", fontSize: 10 }}>click to view</Text>
                                    </View>
                                }
                                left={props => {
                                    return <Ionicons name="newspaper-outline" style={{ paddingVertical: 30, paddingLeft: 10 }} size={30} />
                                }}
                            />
                        </TouchableOpacity>
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

export default NewsScreen;