import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions, Modal, Share, ActivityIndicator } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ReactNativeBlobUtil from 'react-native-blob-util'

import axios from "../api/index"

import { background, filecolor, searchbarbg, searchicon, fileoptionsborder, black, fileoptionsbg, danger, babypowder } from "../../colorpalette"

const SCREENWIDTH = Dimensions.get('window').width;
const SCREEHEIGHT = Dimensions.get('window').height;

MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

const downloadDir = FileSystem.cacheDirectory + "securecloud/Download"

class CloudDirectory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: "Search",
            searchTextBoxValue: "",
            directorydisplay: this.props?.directory || [],
            directory: this.props?.directory || [],
            modalVisible: false,
            moreInfoModalVisible: false,
            selectedItem: {},
            isRootDir: true,
            currentPath: '/',
            isRefreshing: false,
            newFileName: "",
            renameOptionOn: false
        };
    }


    componentDidMount() {
        // console.log(FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
        // console.log("this.props - ", this.props)

        // let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);

        // dir.forEach(async (val) => {
        //     console.log("-  ", val)
        //     console.log(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val))
        //     // this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/' + val);
        //     // this.ensureDirExists()
        // })
        this.loadDirApi()
        // this.setState({ directory: this.props?.directory, directorydisplay: this.props?.directory })
    }

    componentDidUpdate() {
        // console.log(this.state.newFileName)
    }

    createLog({ id: fileId, filename, size, status = true, action, archivefileName, mimeType, encoding }) {
        axios.post("/log", { fileId, filename, size, status, action, archivefileName, mimeType, encoding }).then((response) => {

        }).catch(error => { console.log(error) })
    }

    async loadDirApi() {
        this.setState({ onLoading: true })
        axios.get("/file").then((response) => {
            const field = { directory: response.data?.data || {}, directorydisplay: response.data?.data || {} }
            // console.log("field before", field)
            this.setState(field)
            // console.log("this.state.form ", this.state.form)
            this.setState({ onLoading: false })
        }).catch(error => { console.log(error) })
    }

    async downloadFileApi() {
        const cloudfiles = await AsyncStorage.getItem("cloudfiles") || "[]";
        const hashtable = JSON.parse(cloudfiles)

        const [formData] = hashtable.filter(fData => fData.archivefileName === this.state.selectedItem?.name) || []

        console.log("formData - ", formData)
        if (formData?.id) {
            axios.post("/file/download", formData, { responseType: 'blob' }).then((response) => {
                this.createLog({ ...formData, size: this.state.selectedItem.size, action: "download" })
                const fr = new FileReader();
                fr.onload = async () => {
                    const fileUri = `${downloadDir}/${formData.filename}`;
                    await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                };
                fr.readAsDataURL(response.data);
                this.props.onDownload()
                this.setState({ modalVisible: false })
            }).catch(error => { console.log(error) })
        } else {
            console.log("file not found")
        }
    }

    onChangeInText(inputValue) {
        const regex = new RegExp(inputValue, "i")
        const filterDir = this.state.directory.filter(dir => dir?.name?.match(regex)?.length)
        this.setState({ searchTextBoxValue: inputValue, directorydisplay: filterDir })
    }

    generateIcon(item) {
        if (item.isDirectory) {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'folder'} size={71} color={filecolor} />
        } else {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'archive-lock'} size={71} color={filecolor} />
        }
    }

    async onShare() {
        try {
            const cloudfiles = await AsyncStorage.getItem("cloudfiles") || "[]";
            const docId = this.state.selectedItem.name.replace(/.*\[(.*)\].*/, "$1")
            console.log("docId - ", docId)
            const documentDetails = JSON.parse(cloudfiles).filter(file => file.id === docId).pop()

            console.log("documentDetails - ", documentDetails)
            console.log("key - ", documentDetails.key)
            const result = await Share.share({ message: documentDetails.key });
            this.setState({ modalVisible: false })
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    optionsModel() {
        return <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible} // this.state.modalVisible
            onRequestClose={() => {
                // console.log('Modal has been closed.');
                this.setState({ modalVisible: false })
            }}>
            <TouchableOpacity style={styles.centeredView} onPressIn={() => { this.setState({ modalVisible: false, renameOptionOn: false, newFileName: "" }) }}>
                <View style={styles.modalView}>
                    <View style={{ height: 70 }}>{this.generateIcon(this.state?.selectedItem)}</View>

                    <View style={styles.optionButtons}>
                        {this.state.renameOptionOn ?
                            <>
                                <TextInput autoFocus style={{ fontSize: 18, textAlign: "center", paddingBottom: 10 }}
                                    numberOfLines={2} value={this.state.newFileName}
                                    onChange={(inputValue) => {
                                        // console.log(inputValue)
                                        this.setState({
                                            newFileName: inputValue.nativeEvent.text.toString()
                                        })

                                    }}
                                    returnKeyType='done'
                                    onSubmitEditing={() => {
                                        const currentFile = this.state.selectedItem?.uri
                                        const currentDir = currentFile.split('/').filter(i => i)
                                        currentDir.pop()
                                        const toFile = currentDir.join("/") + "/" + this.state.newFileName.replace(" ", "%20")
                                        const options = { from: this.state.selectedItem?.uri, to: toFile }
                                        // console.log(options)
                                        FileSystem.moveAsync(options)
                                        this.setState({ modalVisible: false, renameOptionOn: false, newFileName: "" })
                                        this.props.getDirectoryInfo(this.state.currentPath)
                                    }}
                                ></TextInput>
                            </>
                            :
                            <Text style={{ fontSize: 18, textAlign: "center", paddingBottom: 10 }}
                                adjustsFontSizeToFit={false}
                                numberOfLines={2}
                            >{this.state.selectedItem?.name?.trim()}</Text>
                        }
                    </View>

                    {/* <TouchableOpacity style={styles.optionButtons} onPress={() => {
                        if (!this.state.selectedItem?.isDirectory) {
                            Sharing.shareAsync(this.state.selectedItem?.uri)
                        } else {
                            this.setState({ currentPath: this.state.selectedItem?.uri })
                            this.props.getDirectoryInfo(this.state.selectedItem?.uri)
                        }
                    }}><Text style={{ fontSize: 17, textAlign: "center" }}>Open</Text></TouchableOpacity> */}

                    {this.state.selectedItem.isDirectory ? null :
                        <TouchableOpacity style={styles.optionButtons} onPress={() => {
                            this.downloadFileApi()
                        }} ><Text style={{ fontSize: 17, textAlign: "center" }}>Download</Text></TouchableOpacity>
                    }

                    {/* {this.state.selectedItem.isDirectory ? null :
                        <TouchableOpacity style={styles.optionButtons} onPress={() => {
                            this.setState({ renameOptionOn: true, newFileName: this.state.selectedItem?.name?.trim().toString() })
                        }} ><Text style={{ fontSize: 17, textAlign: "center" }}>Rename</Text></TouchableOpacity>
                    } */}

                    <TouchableOpacity style={styles.optionButtons}
                        onPress={() => {
                            Sharing.shareAsync(this.state.selectedItem?.uri)
                            this.setState({ modalVisible: false })
                        }}
                    ><Text style={{ fontSize: 17, textAlign: "center" }}>Share Encrypted File</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.optionButtons}
                        onPress={this.onShare.bind(this)}
                    ><Text style={{ fontSize: 17, textAlign: "center" }}>Share Decryption key</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.optionButtons}
                        onPress={() => { this.setState({ modalVisible: false, moreInfoModalVisible: true }) }}
                    ><Text style={{ fontSize: 17, textAlign: "center" }}>Get Info</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.bottomOptionButtons} onPress={() => {
                        FileSystem.deleteAsync(this.state.selectedItem?.uri)
                        this.setState({ modalVisible: false })
                        this.props.getDirectoryInfo(this.state.currentPath)
                    }}><Text style={{ fontSize: 17, color: danger, textAlign: "center" }}>Delete</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal >

    }

    getInfoModel() {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.moreInfoModalVisible} // this.state.modalVisible
            onRequestClose={() => {
                // console.log('Modal has been closed.');
                this.setState({ moreInfoModalVisible: false })
            }} style={{ backgroundColor: danger }}>
            <TouchableOpacity style={styles.centeredView} onPressIn={() => { this.setState({ moreInfoModalVisible: false }) }}>
                <View style={styles.modalView}>
                    <View style={{ height: 70 }}>{this.generateIcon(this.state.selectedItem)}</View>
                    <View style={styles.optionButtons}>
                        <Text style={{ fontSize: 18, textAlign: "center", paddingBottom: 10 }}
                            adjustsFontSizeToFit={false}
                            numberOfLines={2}
                        >{
                                this.state.selectedItem?.name?.trim()

                            }</Text>
                    </View>
                    <Text style={{ fontSize: 17, textAlign: "left", padding: 4 }}>Size: </Text>
                    <Text style={{ fontSize: 17, textAlign: "right", padding: 2 }}>{this.state.selectedItem.size}</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 4 }}>Last modified:</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 2 }}>{this.state.selectedItem.modifiedAt}</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 4 }}>Created At:</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 2 }}>{this.state.selectedItem.createdAt}</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 4 }}>Absolute path:</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 2 }}>{this.state.selectedItem.uri}</Text>
                </View>
            </TouchableOpacity>
        </Modal >
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons style={styles.searchIcon} name={'search-outline'} size={22} color={searchicon} />
                        <TextInput
                            style={styles.searchField}
                            ref={(input) => { this.searchTextBox = input; }}
                            selectionColor={black}
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
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.loadDirApi()}
                        renderItem={({ item, index }) => (<TouchableOpacity style={{ height: 150, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                if (!item.isDirectory) {
                                    this.setState({ selectedItem: item, currentPath: item.uri, modalVisible: true })
                                    // Sharing.shareAsync(item.uri)
                                } else {
                                    this.setState({ currentPath: item.uri })
                                    this.props.getDirectoryInfo(item.uri)
                                }
                            }}
                            onLongPress={() => {
                                this.setState({ selectedItem: item, currentPath: item.uri, modalVisible: true })
                                if (item.name !== "Go Back") this.setState({ modalVisible: true, selectedItem: item })
                            }}>
                            <View style={{ flex: 6, margin: 18 }}>{this.generateIcon(item)}</View>
                            <Text style={{ flex: 4, width: 90, textAlign: "center" }} adjustsFontSizeToFit={false} numberOfLines={2} >{item?.name?.trim()}</Text>
                        </TouchableOpacity>
                        )}
                        numColumns={4}
                    />
                </View>

                {this.state.onLoading ? <View style={{ flex: 1, height: "100%", width: "100%", position: "absolute", backgroundColor: babypowder, justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator size="large" />
                </View> : null}

                {this.optionsModel()}
                {this.getInfoModel()}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
        backgroundColor: background,
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
        backgroundColor: searchbarbg,
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
        borderColor: fileoptionsborder,
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
        backgroundColor: fileoptionsbg,
        borderRadius: 15,
        // padding: 35,
        alignItems: 'center',
        shadowColor: black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center",
    }
})


export default CloudDirectory;