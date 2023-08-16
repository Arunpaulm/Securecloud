import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions, Modal, Alert, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const SCREENWIDTH = Dimensions.get('window').width;
const SCREEHEIGHT = Dimensions.get('window').height;

MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

const cacheDir = FileSystem.cacheDirectory + "securecloud"

class DocumentList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: "Search",
            searchTextBoxValue: "",
            directorydisplay: this.props?.directory || [],
            directory: this.props?.directory || [],
            refreshPage: 1,
            modalVisible: false,
            selectedItem: {},
            isRootDir: true,
            currentPath: '/'
        };
    }

    componentDidMount() {

        console.log("---------------")

        // console.log(FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
        console.log("this.props - ", this.props)

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


    onChangeInText(inputValue) {
        const regex = new RegExp(inputValue, "i")
        const filterDir = this.state.directory.filter(dir => dir?.name?.match(regex)?.length)
        this.setState({ searchTextBoxValue: inputValue, directorydisplay: filterDir })
    }

    generateIcon(item) {
        if (item.isDirectory) {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'folder'} size={71} color={"#00007b"} />
        } else {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'file'} size={71} color={"#00007b"} />
        }
    }

    render() {
        return (
            <View style={styles.container} >
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
                            placeholder={this.state.placeholder}
                        />
                    </View>
                </View>

                <View style={styles.backButtonContainer}>
                    <View style={styles.backButton}>
                        <Ionicons style={styles.searchIcon} name={'search-outline'} size={22} color={"#8E8E93"} />
                        <TextInput
                            style={styles.searchField}
                            ref={(input) => { this.searchTextBox = input; }}
                            selectionColor={"black"}
                            onChangeText={(inputValue) => this.onChangeInText(inputValue)}
                            onPressIn={() => { this.setState({ searchBarActive: true }) }}
                            value={this.state.searchTextBoxValue}
                            placeholder={this.state.placeholder}
                        />
                    </View>
                </View>

                <View style={styles.folderContainer}>
                    <FlatList
                        style={{ flex: 1, width: SCREENWIDTH }}
                        data={this.state.directorydisplay}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({ item, index }) => (<TouchableOpacity style={{ height: 130, margin: 18, paddingVertical: 6, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                if (!item.isDirectory) {
                                    Sharing.shareAsync(item.uri)
                                } else {
                                    this.setState({ currentPath: item.uri })
                                    this.props.getDirectoryInfo(item.uri)
                                }
                            }}
                            onLongPress={() => { this.setState({ modalVisible: true, selectedItem: item }) }}>
                            <View style={{ flex: 1 }}>{this.generateIcon(item)}</View>
                            <Text style={{ flex: 0.4, height: 20, width: 65, textAlign: "center" }} adjustsFontSizeToFit={false} numberOfLines={2}
                            >{item?.name?.trim()}</Text>
                        </TouchableOpacity>
                        )}
                        numColumns={4}
                    />
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible} // this.state.modalVisible
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                        this.setState({ modalVisible: false })
                    }} style={{ backgroundColor: "red" }}>
                    <TouchableOpacity style={styles.centeredView} onPressIn={() => { this.setState({ modalVisible: false }) }}>
                        <View style={styles.modalView}>
                            <View style={{ height: 70 }}>{this.generateIcon(this.state.selectedItem)}</View>
                            <View style={styles.optionButtons}>
                                <Text style={{ fontSize: 18, textAlign: "center", paddingBottom: 10 }}
                                    adjustsFontSizeToFit={false}
                                    numberOfLines={2}
                                >{this.state.selectedItem?.name?.trim()}</Text>
                            </View>
                            <TouchableOpacity style={styles.optionButtons} onPress={() => { Sharing.shareAsync(this.state.selectedItem.uri); }}><Text style={{ fontSize: 17, textAlign: "center" }}>Open</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.optionButtons}><Text style={{ fontSize: 17, textAlign: "center" }}>Rename</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.optionButtons}><Text style={{ fontSize: 17, textAlign: "center" }}>Get Info</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.bottomOptionButtons}><Text style={{ fontSize: 17, color: "red", textAlign: "center" }}>Delete</Text></TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal >

            </View >
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
        zIndex: 1,
        width: "100%",
        textAlign: "center"
    },
    bottomOptionButtons: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        zIndex: 100,
        width: "100%"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 35,
        padding: 30
    },
    modalView: {
        // position: "absolute",
        // left: 10,
        // marginHorizontal: 30,
        // top: SCREEHEIGHT / 1.5,
        // padding: 50,
        // marginVertical: 20,
        width: "100%",
        height: "auto",
        backgroundColor: '#eee',
        borderRadius: 15,
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
        justifyContent: "center",
    },
    backButtonContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        width: "100%"
    },
    backButton: {

    }
})


export default DocumentList;