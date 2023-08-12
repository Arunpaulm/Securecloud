import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
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
            directory: this.props?.directory || []
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
    render() {
        return (
            <View style={styles.container}>
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
                        style={{
                            flex: 1,
                            width: SCREENWIDTH,
                        }}
                        data={this.state.directorydisplay}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({ item, index }) => (
                            <View style={{ height: 130, margin: 18, paddingVertical: 6, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ flex: 1 }}>{this.generateIcon(item)}</View>
                                <Text style={{ flex: 0.4, height: 20, width: 65, textAlign: "center" }}
                                    adjustsFontSizeToFit={false}
                                    numberOfLines={2}
                                >{item?.name?.trim()}</Text>
                            </View>
                        )}
                        numColumns={4}
                    />
                </View>
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
    }

})


export default DocumentList;