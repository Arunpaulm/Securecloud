import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import DocumentList from "../components/DocumentList";


const cacheDir = FileSystem.cacheDirectory + "securecloud/"

MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

class VaultScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            directory: []
        };
    }

    async componentDidMount() {

        console.log(FileSystem.cacheDirectory)
        console.log("---")

        // console.log(FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
        console.log()
        console.log()

        // let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);

        // dir.forEach(async (val) => {

        //     console.log("-  ", val)

        //     console.log(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val))

        //     // this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/' + val);

        //     // this.ensureDirExists()
        // })

        await this.getDirectoryInfo()
    }

    async ensureDirExists() {
        const dirInfo = await FileSystem.getInfoAsync(cacheDir);
        if (!dirInfo.exists) {
            console.log("Gif directory doesn't exist, creating...");
            await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
        }
    }

    async getDirectoryInfo() {
        const dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);
        const dirInfo = []
        for (const drr in dir) {
            const val = dir[drr]
            // console.log("-  ", drr)

            const drin = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val)

            dirInfo.push({ name: val, id: drr, ...drin })

            dirInfo.sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            }).sort((a, b) => b.isDirectory - a.isDirectory)



            this.setState({
                directory: dirInfo
            })

            // console.log(dirInfo)
        }
        // dir.forEach(async (val) => {

        //     console.log("-  ", val)

        //     console.log(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + val))

        //     // this.state.docsList.push(FileSystem.documentDirectory + 'app_docs/' + val);

        //     // this.ensureDirExists()
        // })
    }

    render() {
        return (
            <View style={styles.container}>
                <DocumentList directory={this.state.directory} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export default VaultScreen;