import React, { } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

import { inputActive, inputInActive, textinputcaption, white } from "../../colorpalette"


const themeColorActive = inputActive
const themeColorIdle = inputInActive


const textComponent = ({ editable, field, getActiveTextBox, editFormValues }) => {
    return <View style={styles.textBox} key={field.id + field.title + "text"}>
        {field.title ? <Text style={[styles.textCaption, { color: field.active || !editable ? themeColorActive : themeColorIdle }]}>{field.title}</Text> : null}
        <TextInput
            ref={ref => { field.ref = ref }}
            key={field.id + field.title + "text"}
            style={[styles.textInput, { color: field.active || !editable ? themeColorActive : themeColorIdle, borderColor: field.active || !editable ? themeColorActive : themeColorIdle }]}
            selectionColor={field.active || !editable ? themeColorActive : themeColorIdle}
            onChangeText={(inputValue) => {
                console.log("inputValue ", inputValue)
                // field.value = inputValue
                editFormValues(field, inputValue)
            }}
            // autoFocus={field.id == 0}
            value={field.value}
            placeholder={field.placeholder}
            editable={editable}
            onPressIn={() => {
                field.active = true
                getActiveTextBox(field.id)
                // this.setState({ active: true })
            }}
        />
    </View >
}

const pickerComponent = ({ editable, field, getActiveTextBox, editFormValues }) => {
    return <View style={styles.pickerBox} key={field.id + field.title + "picker"}>
        {field.title ? <Text style={[styles.pickerCaption, { color: field.active ? themeColorActive : themeColorIdle }]}>{field.title}</Text> : null}
        <Picker
            key={field.id + field.title + "picker"}
            itemStyle={{ height: 150, width: "100%" }}
            style={[styles.pickerInput, { color: field.active ? themeColorActive : themeColorIdle, borderColor: field.active ? themeColorActive : themeColorIdle }]}
            selectedValue={field.value}
            onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue)
                getActiveTextBox(field.id)
                editFormValues(field, itemValue)
                // this.setState({active: true, selectedValue: itemValue })
            }
            }>
            {field.options?.map(option => <Picker.Item label={option} value={option} />)}
        </Picker>
    </View >
}

const checkBoxComponents = ({ editable, field, getActiveTextBox, editFormValues }) => {
    return <View style={styles.checkBox} key={field.id + field.title + "checkbox"}>
        <Checkbox
            key={field.id + field.title + "check"}
            style={[styles.checkBoxInput, { color: field.active ? themeColorActive : themeColorIdle, borderColor: field.active ? themeColorActive : themeColorIdle }]}
            value={field.value}
            onValueChange={() => {
                field.value = !field.value
                editFormValues(field, field.value)
            }}
            color={field.value ? themeColorActive : themeColorIdle}
        />
        {field.title ? <Text style={[styles.checkBoxCaption, { color: field.value ? themeColorActive : themeColorIdle }]}>{field.title}</Text> : null}
    </View>
}

const inputComponents = (config) => {
    switch (config.field.type) {
        case "picker":
            return pickerComponent(config)
        case "checkbox":
            return checkBoxComponents(config)
        case "text":
            return textComponent(config)
    }
}

export default function formComponents(field) {
    // console.log(field)
    return inputComponents(field)

}


const styles = StyleSheet.create({
    textBox: {
        width: "100%",
    },
    textCaption: {
        position: "absolute",
        color: textinputcaption,
        fontWeight: "500",
        backgroundColor: white,
        top: -10,
        left: 15,
        zIndex: 1,
        padding: 2,
    },
    textInput: {
        height: 60,
        width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: textinputcaption,
        padding: 20,
    },
    checkBox: {
        // flex: 1,
        // height: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20
    },
    checkBoxCaption: {
        // position: "absolute",
        color: textinputcaption,
        fontWeight: "500",
        backgroundColor: white,
        // top: -10,
        // left: 15,
        // zIndex: 1,
        padding: 10,
    },
    checkBoxInput: {
        height: 5,
        // width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: textinputcaption,
        padding: 10,
    },
    pickerBox: {
        height: 150,
        width: "100%",
    },
    pickerCaption: {
        position: "absolute",
        color: textinputcaption,
        fontWeight: "500",
        backgroundColor: white,
        top: -10,
        left: 15,
        zIndex: 1,
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 0
    },
    pickerInput: {
        paddingTop: 2,
        height: 150,
        // height: 60,
        width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: textinputcaption,
        // padding: 20,
    }
})
