import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions, Modal, ActivityIndicator } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as mime from 'react-native-mime-types';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import axios from "../api/index"
import { background, filecolor, searchbarbg, searchicon, fileoptionsborder, black, fileoptionsbg, danger, babypowder } from "../../colorpalette"


const SCREENWIDTH = Dimensions.get('window').width;
const SCREEHEIGHT = Dimensions.get('window').height;

MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

const cacheDir = FileSystem.cacheDirectory + "securecloud"
class DocumentList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            onLoading: false,
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

        // console.log("---------------")

        // console.log(FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
        // console.log("this.props - ", this.props)

        // let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);

        // dir.forEach(async (val) => {

        //     console.log("-  ", val)

        //     console.log(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val))

        //     // this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/' + val);

        //     // this.ensureDirExists()
        // })
        if (!this.props.isRootDir) {
            let dir = this.props.currentPath?.split('/')?.filter(i => i)
            if (dir?.length) {
                dir.pop()
                dir = dir.join('/')
            }
            const goBack = {
                isDirectory: true,
                name: "Go Back",
                uri: dir
            }
            const directory = [goBack, ...this.props?.directory]
            this.setState({ directory: directory, directorydisplay: directory, currentPath: this.props.currentPath })
        } else {
            this.setState({ directory: this.props?.directory, directorydisplay: this.props?.directory, currentPath: this.props.currentPath })
        }

    }

    componentDidUpdate() {
        // console.log(this.state.newFileName)
        // console.log("updating")
        // console.log("this.state?.currentPath - ", this.state.currentPath)
        // console.log("this.state.isRootDir - ", this.state.isRootDir)

        // const objectCompare = (prevProp, currentProp, callback = (a, b) => a.name === b.name && a.uri === b.uri) =>
        //     prevProp.filter(preValue =>
        //         !currentProp.some(currentValue =>
        //             callback(preValue, currentValue)));

        // const newProps = objectCompare(this.props?.directory, this.state.directory);
        // const oldProps = objectCompare(this.state.directory, this.props?.directory);

        // console.log("newProps - ", newProps)
        // console.log(" this.props.currentPath - ", this.props.params.currentPath)
        // console.log(" this.state.isRootDir - ", this.state.isRootDir)

        // if ((this.props?.directory.length === 0 && oldProps.length) || newProps.length) {
        //     console.log(" not equal ")
        //     if (this.state?.currentPath?.toString().replace(cacheDir, "") !== "") {
        //         let dir = this.state.currentPath.split('/')?.filter(i => i)
        //         dir.pop()
        //         dir = dir.join('/')
        //         const goBack = {
        //             isDirectory: true,
        //             name: "Go Back",
        //             uri: dir
        //         }
        //         const directory = [goBack, ...this.props?.directory]
        //         this.setState({ directory: directory, directorydisplay: directory })
        //     } else {

        //     }
        // }
    }

    createLog({ id: fileId, filename, size, status = true, action, archivefileName, mimeType, encoding }) {
        axios.post("/log", { fileId, filename, size, status, action, archivefileName, mimeType, encoding }).then((response) => {

        }).catch(error => { console.log(error) })
    }

    async uploadFileDirApi() {

        const form = new FormData();
        const formData = {}

        async function addFileToFormData(uri) {
            const fileDetail = await FileSystem
                .getInfoAsync(uri)
                .catch(e => { })

            // console.log(fileDetail)
            if (fileDetail.isDirectory) {
                await addDirToFormData(uri)
                return
            }

            const fileName = fileDetail.uri.split("/").pop()
            const fileType = mime.contentType(fileName)
            if (fileDetail?.uri) {
                const cloudfiles = await AsyncStorage.getItem("cloudfiles") || "[]";
                console.log(cloudfiles)
                const hashtable = JSON.parse(cloudfiles)
                const hashTableCF = {}
                hashtable.map(htt => {
                    hashTableCF[htt.uri] = htt.id
                })

                const formFileId = hashTableCF[fileDetail?.uri] ? hashTableCF[fileDetail?.uri] : uuid.v4().toString()
                const formFileContent = {
                    uri: fileDetail?.uri,
                    type: fileType ? fileType : "",
                    name: fileName
                }

                const decimals = 2
                let size = fileDetail?.size

                if (size !== undefined) {
                    const convert = 1024
                    const nearDeci = decimals < 0 ? 0 : decimals
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

                    const i = Math.floor(Math.log(size) / Math.log(convert))

                    const sizeName = sizes[i]
                    const sizeConvert = size / Math.pow(convert, i)
                    const sizeConverted = parseFloat(sizeConvert).toFixed(nearDeci)

                    size = `${sizeConverted} ${sizeName}`
                } else {
                    size = '0 B'
                }

                formData[formFileId] = { ...formFileContent, id: formFileId, size }
                form.append(formFileId, formFileContent);
            }
        }

        async function addDirToFormData(uri) {
            const dir = await FileSystem.readDirectoryAsync(uri);
            // console.log(dir)
            for (const dirItem of dir) {
                const path = [uri, dirItem].join("/")
                await addFileToFormData(path)
            }
        }

        await addFileToFormData(this.state.selectedItem?.uri)

        axios.post("/file/upload", form).then(async (response) => {
            const cloudfiles = await AsyncStorage.getItem("cloudfiles") || "[]";
            let hashtable = JSON.parse(cloudfiles)
            const hashTableCF = {}
            hashtable.map(htt => { hashTableCF[htt.id] = htt.uri })
            response.data.encryptedKeys.map(enFiles => {
                const formFileLocalData = formData[enFiles.id]
                console.log("formFileLocalData - ", formFileLocalData)
                this.createLog({ ...enFiles, size: formFileLocalData.size, action: "upload" })
                if (hashTableCF[enFiles.id]) {
                    hashtable = hashtable.filter(fil => fil.id !== enFiles.id)
                    hashtable.push({ ...enFiles, uri: formFileLocalData?.uri })
                } else {
                    hashtable.push({ ...enFiles, uri: formFileLocalData?.uri })
                }
            })
            await AsyncStorage.setItem("cloudfiles", JSON.stringify(hashtable));
            this.props.onUpload()
            this.setState({ modalVisible: false })
        }).catch(error => { console.log(error) })
    }

    onChangeInText(inputValue) {
        const regex = new RegExp(inputValue, "i")
        const filterDir = this.state.directory.filter(dir => dir?.name?.match(regex)?.length)
        this.setState({ searchTextBoxValue: inputValue, directorydisplay: filterDir })
    }

    generateIcon(item) {
        if (item.name === "Go Back") {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'folder-upload'} size={71} color={filecolor} />
        }
        if (item.isDirectory) {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'folder'} size={71} color={filecolor} />
        } else {
            return <MaterialCommunityIcons style={styles.searchIcon} name={'file'} size={71} color={filecolor} />
        }
    }

    optionsModel() {
        return <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible} // this.state.modalVisible
            onRequestClose={() => {
                console.log('Modal has been closed.');
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
                                        console.log(inputValue)
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
                                        console.log(options)
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

                    <TouchableOpacity style={styles.optionButtons} onPress={() => {
                        if (!this.state.selectedItem?.isDirectory) {
                            Sharing.shareAsync(this.state.selectedItem?.uri)
                        } else {
                            this.setState({ currentPath: this.state.selectedItem?.uri })
                            this.props.getDirectoryInfo(this.state.selectedItem?.uri)
                        }
                    }}><Text style={{ fontSize: 17, textAlign: "center" }}>Open</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.optionButtons} onPress={() => {
                        this.uploadFileDirApi()
                    }}><Text style={{ fontSize: 17, textAlign: "center" }}>Upload</Text></TouchableOpacity>

                    <TouchableOpacity style={styles.optionButtons} onPress={() => {
                        if (!this.state.selectedItem?.isDirectory) {
                            Sharing.shareAsync(this.state.selectedItem?.uri)
                        } else {
                            this.setState({ currentPath: this.state.selectedItem?.uri })
                            this.props.getDirectoryInfo(this.state.selectedItem?.uri)
                        }
                    }}><Text style={{ fontSize: 17, textAlign: "center" }}>Share</Text></TouchableOpacity>

                    {this.state.selectedItem.isDirectory ? null :
                        <TouchableOpacity style={styles.optionButtons} onPress={() => {
                            this.setState({ renameOptionOn: true, newFileName: this.state.selectedItem?.name?.trim().toString() })
                        }} ><Text style={{ fontSize: 17, textAlign: "center" }}>Rename</Text></TouchableOpacity>
                    }

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
            visible={this.state.moreInfoModalVisible}
            onRequestClose={() => {
                console.log('Modal has been closed.');
                this.setState({ moreInfoModalVisible: false })
            }} style={{ backgroundColor: danger }}>
            <TouchableOpacity style={styles.centeredView} onPressIn={() => { this.setState({ moreInfoModalVisible: false }) }}>
                <View style={styles.modalView}>
                    <View style={{ height: 70 }}>{this.generateIcon(this.state.selectedItem)}</View>
                    <View style={styles.optionButtons}>
                        <Text style={{ fontSize: 18, textAlign: "center", paddingBottom: 10 }}
                            adjustsFontSizeToFit={false}
                            numberOfLines={2}
                        >{this.state.selectedItem?.name?.trim()}</Text>
                    </View>
                    <Text style={{ fontSize: 17, textAlign: "left", padding: 4 }}>Size: </Text>
                    <Text style={{ fontSize: 17, textAlign: "right", padding: 2 }}>{this.state.selectedItem.size}</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 4 }}>Last modified:</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 2 }}>{this.state.selectedItem.lastUpdated}</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 4 }}>Absolute path:</Text>
                    <Text style={{ fontSize: 17, textAlign: "center", padding: 2 }}>{decodeURI(this.state.selectedItem.uri || "")}</Text>
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
                        onRefresh={() => this.props.getDirectoryInfo(this.state.currentPath)}
                        renderItem={({ item, index }) => (<TouchableOpacity style={{ height: 150, justifyContent: "center", alignItems: "center" }}
                            onPress={() => {
                                if (!item.isDirectory) {
                                    Sharing.shareAsync(item.uri)
                                } else {
                                    this.setState({ currentPath: item.uri })
                                    this.props.getDirectoryInfo(item.uri)
                                }
                            }}
                            onLongPress={() => { if (item.name !== "Go Back") this.setState({ modalVisible: true, selectedItem: item }) }}>
                            <View style={{ flex: 6, margin: 18 }}>{this.generateIcon(item)}</View>
                            <Text style={{ flex: 4, width: 100, textAlign: "center" }} adjustsFontSizeToFit={false} numberOfLines={2} >{item?.name?.trim()}</Text>
                        </TouchableOpacity>
                        )}
                        numColumns={4}
                    />
                </View>

                {this.optionsModel()}
                {this.getInfoModel()}
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
        // height: "100%",
        backgroundColor: background,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
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


export default DocumentList;