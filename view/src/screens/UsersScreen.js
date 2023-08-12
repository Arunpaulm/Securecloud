import React from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataTable } from 'react-native-paper';

import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

import ModelComponent from "../components/ModelComponent";

Icon.loadFont();

const UsersScreen = (props) => {

    const [clientList, setClientList] = React.useState([])
    const placeholder = "Search"
    const [searchBarActive, setSearchBarActive] = React.useState(false)
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([10, 15, 20]);
    const [itemsPerPage, setItemsPerPage] = React.useState(
        numberOfItemsPerPageList[0]
    );
    const [selectedTableRow, setSelectedTableRow] = React.useState([])
    const [selectedTableRowIndex, setSelectedTableRowIndex] = React.useState(0)

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, clientList.length);

    const allowedOuterTableHeadings = ["", "Name", "Role"]
    const tableWidthFlex = [2, 2, 1]
    const [modalVisible, setModalVisible] = React.useState(false)


    React.useEffect(() => {
        setPage(0);
        const dummyclientList = []
        for (let i = 1; i <= 44; i++) {
            dummyclientList.push({ id: i, "Name": "Timmy Marvel " + i, phoneNumber: "9876543210", "email": "example@gmail.com", Role: "Admin" })
        }

        setClientList(dummyclientList)
    }, [itemsPerPage]);


    function onSubmit() {
        console.log("clicked")
        // setSearchBarActive(false)
    }

    function onPressSearchBarRightButton() {
        if (searchBarActive) {
            // searchTextBox.blur()
            setSearchBarActive(false)
            return
        }
    }

    function _alertIndex(index, data) {
        setModalVisible(true)
        setSelectedTableRow(data)
        setSelectedTableRowIndex(index)
        // this.setState({ modalVisible: true, selectedTableRow: data, selectedTableRowIndex: index })
    }

    function generateButton(data, index) {
        return (
            <TouchableOpacity key={'button' + index} onPress={() => _alertIndex(index, data)}>
                <View key={'View' + index} style={styles.button}>
                    <Text key={'Text' + index} style={styles.buttonText}>Edit</Text>
                </View>
            </TouchableOpacity>
        )
    }

    function generateTableCells(item, index) {
        const uielements = []
        let cellIndex = 0
        for (const key in item) {
            const tdData = item[key]
            if (allowedOuterTableHeadings.indexOf(key) > -1)
                uielements.push(<DataTable.Cell key={index + "" + key + item.id} style={{ flex: tableWidthFlex[cellIndex] }}>{tdData?.toString()?.trim()}</DataTable.Cell>)
            cellIndex += 1
        }
        uielements.push(<DataTable.Cell key={index + "button" + item.id} style={{ flex: 0.8, justifyContent: "flex-end" }}>{generateButton(item, index)}</DataTable.Cell>)
        return uielements
    }

    function onItemsPerPageChange(value) {
        const to = Math.min(page * value, clientList.length)
        setItemsPerPage(value)
        // this.setState({ itemsPerPage: value, from: from * value, to: to > clientList.length ? clientList.length : to })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ flex: 0.2 }} />

            <View style={styles.clientListContainer}>
                {clientList.length > 0 ?
                    <DataTable style={{ flex: 1 }}>
                        <View style={{ flex: 15 }}>
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
                                            [...Object.keys(clientList[0])
                                                .map((listKey, index) => { if (allowedOuterTableHeadings.indexOf(listKey) > -1) return (<DataTable.Title key={index} style={{ flex: tableWidthFlex[index] }}>{listKey?.toString()?.trim()}</DataTable.Title>) })
                                                , <DataTable.Title key={"lastbutton"} style={{ flex: 0.8 }}> </DataTable.Title>]
                                        }
                                    </DataTable.Header>

                                    <FlatList
                                        style={styles.clientList}
                                        data={clientList.slice(from, to)}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item, index }) => (
                                            <DataTable.Row key={index}>
                                                {generateTableCells(item, index)}
                                            </DataTable.Row>
                                        )}
                                    />
                                </View>

                            </ScrollView>
                        </View>


                        <View style={{ flex: 6 }}>
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(clientList.length / itemsPerPage)}
                                onPageChange={(page) => {
                                    console.log("page - ", page)
                                    setPage(page)
                                }}
                                label={`${from + 1}-${to} of ${clientList.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                showFastPaginationControls
                                selectPageDropdownLabel={'Rows per page'}
                            />
                        </View>
                    </DataTable>
                    : null}
            </View>
            {
                modalVisible ?
                    <ModelComponent modalVisible={modalVisible} setModalVisible={(value) => { setModalVisible(value) }} editable={true} selectedTableRow={selectedTableRow} selectedTableRowIndex={selectedTableRowIndex} /> : null
            }
        </View>
    );
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