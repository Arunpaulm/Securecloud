import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

import { List, ProgressBar, MD3Colors } from 'react-native-paper';

Ionicons.loadFont();

class NotificationScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() { }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                    <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }}>
                        <List.Item
                            title={"Uploading file \"new file.md\""}
                            description={<ProgressBar style={{ marginVertical: 10, width: 310 }} progress={0.99} animatedValue={0.5} color={MD3Colors.error50} />}
                            left={props => <Ionicons name="cloud-upload-outline" style={{ paddingVertical: 20, paddingLeft: 20 }} size={25}></Ionicons>}
                        />
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }

})


export default NotificationScreen;