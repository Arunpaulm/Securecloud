import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as FileSystem from 'expo-file-system';

const SCREENWIDTH = Dimensions.get('window').width;

MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

class DocumentList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: "Search",
            searchTextBoxValue: "",
            directorydisplay: this.props?.directory || [],
            directory: this.props?.directory || [],
            refreshPage: 1,
            modalVisible: true
        };
    }

    componentDidMount() {

        console.log("---")

        // console.log(FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
        console.log("this.props - ", this.props)
        console.log("this.props?.directory - ", this.props?.directory)
        console.log()

        // let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);

        // dir.forEach(async (val) => {

        //     console.log("-  ", val)

        //     console.log(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val))

        //     // this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/' + val);

        //     // this.ensureDirExists()
        // })

    }

    componentDidUpdate() {
        const objectCompare = (prevProp, currentProp, callback = (a, b) => a.name === b.name && a.uri === b.uri) =>
            prevProp.filter(preValue =>
                !currentProp.some(currentValue =>
                    callback(preValue, currentValue)));

        const newProps = objectCompare(this.props?.directory, this.state.directory);

        if (newProps.length) {
            console.log(" not equal ")
            this.setState({ directory: this.props?.directory, directorydisplay: this.props?.directory })
        }
    }
    onSubmit() {
        console.log("clicked")
        this.setState({ searchBarActive: false })
    }

    onChangeInText(inputValue) {
        const regex = new RegExp(inputValue, "i")
        const filterDir = this.state.directory.filter(dir => dir?.name?.match(regex)?.length)
        this.setState({ searchTextBoxValue: inputValue, directorydisplay: filterDir })
    }


    onPressSearchBarRightButton() {
        if (this.state.searchBarActive) {
            this.searchTextBox.blur()
            this.setState({ searchBarActive: false })
            return
        }
    }

    generateIcon(item) {
        if (item.isDirectory) {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'folder'} size={71} color={"#00007b"} />
        } else {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'file'} size={71} color={"#00007b"} />
        }
    }

    refreshPage() {
        this.setState({ refreshPage: this.state.refreshPage + 1 })
    }

    render() {
        return (
            <View style={styles.container} onTouchStart={() => {
                console.log("hello")
            }}>
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons style={styles.searchIcon} name={'search-outline'} size={22} color={"#8E8E93"} />
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
                        style={{ flex: 1, width: SCREENWIDTH }}
                        data={this.state.directorydisplay}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({ item, index }) => (
                            <>
                                <TouchableOpacity style={{ zIndex: -1, height: 130, margin: 18, paddingVertical: 6, justifyContent: "center", alignItems: "center" }}
                                    onLongPress={() => {
                                        item.option = true
                                        this.refreshPage()
                                    }}>
                                    <View style={{ flex: 1 }}>{this.generateIcon(item)}</View>
                                    <Text style={{ flex: 0.4, height: 20, width: 65, textAlign: "center" }}
                                        adjustsFontSizeToFit={false}
                                        numberOfLines={2}
                                    >{item?.name?.trim()}</Text>
                                </TouchableOpacity>
                                {item.option ?
                                    <View style={{ position: "absolute", top: 100, backgroundColor: "#eee", borderWidth: 1, borderRadius: 5, borderColor: "#eee" }}>
                                        <TouchableOpacity style={styles.optionButtons}><Text style={{ fontSize: 17 }}>Rename</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.optionButtons}><Text style={{ fontSize: 17 }}>Get Info</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.bottomOptionButtons}><Text style={{ fontSize: 17, color: "red" }}>Delete</Text></TouchableOpacity>
                                    </View>
                                    : null}
                            </>
                        )}
                        numColumns={4}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setState({ modalVisible: false })
                    }}>
                    <View style={styles.centeredView}>

                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
        backgroundColor: 'white',
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
    },
    optionButtons: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderColor: "#888",
        zIndex: 1
    },
    bottomOptionButtons: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        zIndex: 100
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 35,
        padding: 30
    }
})


export default DocumentList;