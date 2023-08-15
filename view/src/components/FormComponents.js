import React, { } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';


const themeColorActive = "#003399"
const themeColorIdle = "#D9D9D9"


const textComponent = ({ editable, field, getActiveTextBox, editFormValues }) => {
    return <>
        {field.title ? <Text style={[styles.textCaption, { color: field.active || !editable ? themeColorActive : themeColorIdle }]}>{field.title}</Text> : null}
        <TextInput
            ref={ref => { field.ref = ref }}
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
            key={field.id + field.title}
            onPressIn={() => {
                field.active = true
                getActiveTextBox(field.id)
                // this.setState({ active: true })
            }}
        />
    </>
}

const pickerComponent = (field) => {
    return <>
        {field.title ? <Text style={[styles.textCaption, { color: field.active ? themeColorActive : themeColorIdle }]}>{field.title}</Text> : null}
        <Picker
            itemStyle={{ height: 60, width: "100%" }}
            style={[styles.textInput, { color: field.active ? themeColorActive : themeColorIdle, borderColor: field.active ? themeColorActive : themeColorIdle }]}
            selectedValue={field.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue)
                // this.props.getActiveTextBox(this.state.id)
                // this.setState({ active: true, selectedValue: itemValue })
            }
            }>
            {field.options?.map(option => <Picker.Item label={option} value={option} />)}
        </Picker>
    </>
}

const inputComponents = (config) => {

    switch (config.field.type) {
        case "picker":
            return pickerComponent(config)
        case "checkbox":
            return checkBoxComponents(config)
        default:
            return textComponent(config)
    }
}

const checkBoxComponents = (field) => {
    return <>
        <Checkbox
            style={[styles.checkBox, { color: field.active ? themeColorActive : themeColorIdle, borderColor: field.active ? themeColorActive : themeColorIdle }]}
            value={field.isChecked}
            onValueChange={() => { field.isChecked = !field.isChecked }}
            color={field.isChecked ? '#4630EB' : undefined}
        />
        {field.title ? <Text style={[styles.checkBoxCaption, { color: field.isChecked ? themeColorActive : themeColorIdle }]}>{field.title}</Text> : null}
    </>
}

export default function formComponents(field) {
    // console.log(field)
    return <View style={styles.textBox} key={field.id + field.title + field.value}>
        {inputComponents(field)}
    </View>
}


const styles = StyleSheet.create({
    textBox: {
        width: "100%",
    },
    textCaption: {
        position: "absolute",
        color: "#6A6EEE",
        fontWeight: "500",
        backgroundColor: "white",
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
        borderColor: "#6A6EEE",
        padding: 20,
    },
    pickerInput: {
        // height: 60,
        // height: 60,
        width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: "#6A6EEE",
        // padding: 20,
    },
    checkBox: {
        height: 5,
        // width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: "#6A6EEE",
        padding: 10,
    },
    checkBoxCaption: {
        // position: "absolute",
        color: "#6A6EEE",
        fontWeight: "500",
        backgroundColor: "white",
        // top: -10,
        // left: 15,
        // zIndex: 1,
        padding: 10,
    },
})
