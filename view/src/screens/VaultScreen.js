import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import moment from 'moment'

import * as DocumentPicker from 'expo-document-picker';


import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import DocumentList from "../components/DocumentList";


const cacheDir = FileSystem.cacheDirectory + "securecloud"

MaterialIcons.loadFont();
Ionicons.loadFont();

const decimals = 2

class VaultScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            directory: [],
            uploadIcon: "cloud-upload",
            fontColor: "#555",
            currentPath: cacheDir,
            reloadPage: 0,
            reloadDocumentView: true,
            isRootDir: true,
            refreshPage: 0
        };
    }

    async componentDidMount() {

        console.log(FileSystem.cacheDirectory)
        console.log("---")

        console.log(FileSystem.readDirectoryAsync(FileSystem.cacheDirectory))
        console.log()
        console.log()

        await this.getDirectoryInfo(this.state.currentPath)
    }

    async ensureDirExists() {
        const dirInfo = await FileSystem.getInfoAsync(cacheDir);
        if (!dirInfo.exists) {
            console.log("Gif directory doesn't exist, creating...");
            await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
        }
    }

    async getDirectoryInfo(path) {
        console.log()
        console.log()
        console.log()
        console.log()
        console.log()
        this.setState({ reloadDocumentView: false })
        console.log("path - ", path)
        console.log("cacheDir - ", cacheDir)
        // const fileDir = path ? cacheDir + path : cacheDir
        const dir = await FileSystem.readDirectoryAsync(path);
        const dirInfo = []
        console.log(dir)
        for (const drr in dir) {
            const val = dir[drr]
            // console.log("-  ", drr)

            const drin = await FileSystem.getInfoAsync(path + "/" + val)

            // console.log(drin)

            let size = drin?.size

            if (size !== undefined) {
                const convert = 1024
                const nearDeci = decimals < 0 ? 0 : decimals
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

                const i = Math.floor(Math.log(size) / Math.log(convert))

                const sizeName = sizes[i]
                const sizeConvert = size / Math.pow(convert, i)
                const sizeConverted = parseFloat(sizeConvert).toFixed(nearDeci)

                drin.size = `${sizeConverted} ${sizeName}`
            } else {
                drin.size = '0 B'
            }

            if (drin.modificationTime) {
                const dd = drin.modificationTime.toString()?.split('.')?.[0]
                console.log(dd)
                var date = moment(Number(dd + "000"));
                drin.lastUpdated = date.format("MMM DD YYYY h:mm A")
            }

            dirInfo.push({ name: val, id: drr, ...drin })
        }

        dirInfo.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        }).sort((a, b) => b.isDirectory - a.isDirectory)

        let isRootDir = true
        const ifConditionForRootDir = path?.toString().replace(cacheDir.replace(/\/+/, "/"), "")
        console.log("this.state?.currentPath?.toString().replace(cacheDir,) - ", ifConditionForRootDir)
        if (ifConditionForRootDir !== "") {
            isRootDir = false
        }
        console.log("isRootDir - ", isRootDir)
        this.setState({
            currentPath: path,
            directory: dirInfo,
            reloadPage: this.state.reloadPage + 1,
            isRootDir
        })

        this.setState({ reloadDocumentView: true })

        // console.log("dirInfo - ", dirInfo)
        // dir.forEach(async (val) => {

        //     console.log("-  ", val)

        //     console.log(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val))

        //     // this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/' + val);

        //     // this.ensureDirExists()
        // })
    }

    async handleDocumentSelection() {
        console.log("called")
        try {
            const response = await DocumentPicker.getDocumentAsync()
            console.log(response)
            if (response.canceled !== true) {
                const [document] = response.assets || []
                const options = { from: document?.uri, to: this.state.currentPath + "/" + document.name }
                console.log(options)
                FileSystem.copyAsync(options)
                this.setState({ documentPicked: document })
                this.getDirectoryInfo(this.state.currentPath)
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 0.1, padding: 20 }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: "row", backgroundColor: "#eee", borderWidth: 1, borderRadius: 5, borderColor: this.state.fontColor, justifyContent: "center", alignItems: "center" }}
                        onPress={this.handleDocumentSelection.bind(this)}
                    >
                        <MaterialIcons style={{ paddingRight: 5, color: this.state.fontColor }} name={this.state.uploadIcon} size={25} />
                        <Text style={{ color: this.state.fontColor }} >Add files</Text>
                    </TouchableOpacity>
                </View>

                {this.state.reloadDocumentView ? <DocumentList isRootDir={this.state.isRootDir} currentPath={this.state.currentPath} directory={this.state.directory} getDirectoryInfo={this.getDirectoryInfo.bind(this)} /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})


export default VaultScreen;