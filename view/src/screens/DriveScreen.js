import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/Ionicons";

import RNFS from 'react-native-fs';

import TextFieldComponent from '../components/TextFieldComponent';

Icon.loadFont();

class DriveScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: "Search",
            searchTextBoxValue: "",
            directory: [
                { id: 1, type: "dir", name: "subject" },
                { id: 2, type: "dir", name: "project" },
                { id: 3, type: "dir", name: "session" },
                { id: 4, type: "dir", name: "folder" },
                { id: 5, type: "dir", name: "notes" },
                { id: 6, type: "dir", name: "picture" },
                { id: 7, type: "dir", name: "documents" },
                { id: 8, type: "dir", name: "music" },
                { id: 9, type: "dir", name: "downloads" },
                { id: 10, type: "dir", name: "videos" },
                { id: 11, type: "file", name: "note.md" },
                { id: 12, type: "file", name: "resume.docx" },
                { id: 13, type: "file", name: "report.docx" },
                { id: 14, type: "file", name: "photo.jpeg" },
                { id: 15, type: "file", name: "image" },

            ]
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
    onSubmit() {
        console.log("clicked")
        this.setState({ searchBarActive: false })
    }

    onChangeInText(inputValue) {
        this.setState({ searchTextBoxValue: inputValue })
    }


    onPressSearchBarRightButton() {
        if (this.state.searchBarActive) {
            this.searchTextBox.blur()
            this.setState({ searchBarActive: false })
            return
        }
    }

    generateIcon(item) {
        switch (item.type) {
            case "dir":
                return <Icon style={styles.searchIcon} name={'folder'} size={70} color={"#00007b"} />
            case "file":
                return <Icon style={styles.searchIcon} name={'document'} size={70} color={"#00007b"} />
            default:
                return <Icon style={styles.searchIcon} name={'folder-outline'} size={70} color={"#00007b"} />
        }
    }
    render() {
        return (
            <SafeAreaView flex>
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    <View style={styles.searchBarContainer}>
                        <View style={styles.searchBar}>
                            <Icon style={styles.searchIcon} name={'search-outline'} size={22} color={"#8E8E93"} />
                            <TextInput
                                style={styles.searchField}
                                ref={(input) => { this.searchTextBox = input; }}
                                selectionColor={"black"}
                                onChangeText={(inputValue) => this.onChangeInText(inputValue)}
                                onPressIn={() => { this.setState({ searchBarActive: true }) }}
                                value={this.state.searchTextBoxValue}
                                onSubmitEditing={() => this.onSubmit}
                                placeholder={this.state.placeholder}
                            />
                        </View>
                    </View>

                    <View style={styles.folderContainer}>
                        <FlatList
                            style={{
                                // flex: 1,
                                // width: "100%",
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                            data={this.state.directory}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <View style={{ height: 130, margin: 14, padding: 20, alignItems: "center" }}>
                                    {this.generateIcon(item)}
                                    <Text>{item.name}</Text>
                                </View>
                            )}
                            numColumns={3}
                        />

                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
        // backgroundColor: 'blue',
        alignItems: 'center',
    },
    searchIcon: {
        flex: 1,
        alignSelf: "center",
    },
    micIcon: {
        flex: 1,
        alignSelf: "flex-end"
    },
    searchField: {
        flex: 11,
        fontWeight: "500",
        fontSize: 15
    },
    searchBar: {
        padding: 10,
        backgroundColor: "#EBEBEF",
        borderRadius: 10,
        flexDirection: "row",
    },
    searchBarContainer: {
        // flex: 2,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        width: "100%"
    },
    folderContainer: {
        flex: 1
    }

})


export default DriveScreen;