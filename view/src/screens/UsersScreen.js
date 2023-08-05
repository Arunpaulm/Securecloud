import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataTable } from 'react-native-paper';

import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

import ModelComponent from "../components/ModelComponent";

Icon.loadFont();

class UsersScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            clientList: [
                { id: 1, "Name": "Ken Brown", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 2, "Name": "Martin Charteris frfwefw", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 3, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 4, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 5, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 6, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 7, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 8, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 9, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
                { id: 10, "Name": "Timmy Marvel", phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" },
            ],
            placeholder: "Search",
            searchBarActive: false,
            from: 0,
            to: 1,
            itemsPerPage: 15,
            page: 0,
            numberOfItemsPerPageList: [2, 3, 4],
            allowedOuterTableHeadings: ["", "Name", "Role"],
            tableWidthFlex: [2, 2, 1],
            modalVisible: false
        };
    }

    componentDidMount() {
        // this.searchTextBox.focus()
        this.setState({ from: (this.state.page * this.state.itemsPerPage), to: Math.min((this.state.page + 1) * this.state.itemsPerPage, this.state.clientList.length) })
    }

    componentDidUpdate() {
        console.log(this.state.searchBarActive)
    }

    onChangeInText(inputValue) {
        this.setState({ searchTextBoxValue: inputValue })
    }

    onSubmit() {
        console.log("clicked")
        this.setState({ searchBarActive: false })
    }

    onPressSearchBarRightButton() {
        if (this.state.searchBarActive) {
            this.searchTextBox.blur()
            this.setState({ searchBarActive: false })
            return
        }
    }

    _alertIndex(index, data) {
        this.setState({ modalVisible: true, selectedTableRow: data, selectedTableRowIndex: index })
    }

    generateButton(data, index) {
        return (
            <TouchableOpacity onPress={() => this._alertIndex(index, data)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Edit</Text>
                </View>
            </TouchableOpacity>
        )
    }

    generateTableCells(item, index) {
        const uielements = []
        let cellIndex = 0
        for (const key in item) {
            const tdData = item[key]
            if (this.state.allowedOuterTableHeadings.indexOf(key) > -1)
                uielements.push(<DataTable.Cell key={index + "" + key + item.id} style={{ flex: this.state.tableWidthFlex[cellIndex] }}>{tdData?.toString()?.trim()}</DataTable.Cell>)
            cellIndex += 1
        }
        uielements.push(<DataTable.Cell key={index + "button" + item.id} style={{ flex: 0.8, justifyContent: "flex-end" }}>{this.generateButton.call(this, item, index)}</DataTable.Cell>)
        return uielements
    }

    selectedTableRow() {

    }

    onItemsPerPageChange(value) {
        this.setState({ itemsPerPage: value })
    }

    render() {
        return (
            <SafeAreaView flex>
                <View style={styles.container}>
                    <StatusBar style="auto" />

                    <View style={{ flex: 0.2 }} />

                    <View style={styles.clientListContainer}>
                        <DataTable style={{ flex: 1 }}>
                            <View style={{ flex: 18 }}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        flex: 1,
                                        flexGrow: 1,
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}
                                >

                                    <View style={{ flex: 1 }}>
                                        <DataTable.Header style={styles.tableHeader}>
                                            {
                                                [...Object.keys(this.state.clientList[0])
                                                    .map((listKey, index) => { if (this.state.allowedOuterTableHeadings.indexOf(listKey) > -1) return (<DataTable.Title key={index} style={{ flex: this.state.tableWidthFlex[index] }}>{listKey?.toString()?.trim()}</DataTable.Title>) })
                                                    , <DataTable.Title key={"lastbutton"} style={{ flex: 0.8 }}> </DataTable.Title>]
                                            }
                                        </DataTable.Header>

                                        <FlatList
                                            style={styles.clientList}
                                            data={this.state.clientList.slice(this.state.from, this.state.to)}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={({ item, index }) => (
                                                <DataTable.Row key={index}>
                                                    {this.generateTableCells.call(this, item, index)}
                                                </DataTable.Row>
                                            )}
                                        />
                                    </View>

                                </ScrollView>
                            </View>


                            <View style={{ flex: 3 }}>
                                <DataTable.Pagination
                                    page={this.state.page}
                                    numberOfPages={Math.ceil(this.state.clientList.length / this.state.itemsPerPage)}
                                    onPageChange={(page) => { this.setState({ page }) }}
                                    label={`${this.state.from + 1}-${this.state.to} of ${this.state.clientList.length}`}
                                    numberOfItemsPerPageList={this.state.numberOfItemsPerPageList}
                                    numberOfItemsPerPage={this.state.itemsPerPage}
                                    onItemsPerPageChange={this.onItemsPerPageChange}
                                    showFastPaginationControls
                                    selectPageDropdownLabel={'Rows per page'}
                                />
                            </View>
                        </DataTable>
                    </View>
                </View>
                {
                    this.state.modalVisible ?
                        <ModelComponent modalVisible={this.state.modalVisible} setModalVisible={(value) => { this.setState({ modalVisible: value }) }} editable={true} selectedTableRow={this.state.selectedTableRow} selectedTableRowIndex={this.state.selectedTableRowIndex} /> : null
                }
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    clientListContainer: {
        flex: 20,
        paddingHorizontal: 20,
        width: "100%"
    },
    clientList: {
    },
    clientItem: {
        paddingTop: 20,
        paddingBottom: 2,
        fontSize: 15,
        fontWeight: "500"
    },
    footerSpace: {
        // flex: 6,
    },
    tableHeader: { height: 50, backgroundColor: '#D9D9D9' },
    row: { flexDirection: 'row', height: 40 },
    text: { margin: 6, justifyContent: "center", alignContent: "center", alignItems: "center" },
    button: { width: 58, height: 25, backgroundColor: '#003399', borderRadius: 4, justifyContent: "center" },
    buttonText: { textAlign: 'center', color: '#fff' }

})


export default UsersScreen;