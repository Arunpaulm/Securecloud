import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';

import { primarybutton, tabactive, tabinactive, textinputcaption } from "../../colorpalette"

class TextFieldComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: "",
            title: "E-Mail",
            placeholder: "example@gmail.com",
            active: true,
            themeColorActive: tabactive,
            themeColorIdle: tabinactive,
            editable: this.props.editable,
            isChecked: false
        };
    }
    componentDidMount() {
        const field = this.props.field
        this.setState(field)
    }

    componentDidUpdate() {
        if (this.props.field.active !== this.state.active) {
            this.setState(this.props.field)
        }
    }

    onTextBoxActive() {
        this.setState({ active: true })
    }

    onChangeInText(inputValue) {
        this.setState({ value: inputValue })
        this.props.field.value = inputValue
    }

    render() {
        return (
            <View style={styles.textBox}>
                <Checkbox
                    style={[styles.textInput, { color: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle, borderColor: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle }]}
                    // style={styles.checkbox}
                    value={this.state.isChecked}
                    onValueChange={() => { this.setState({ isChecked: !this.state.isChecked }) }}
                    color={this.state.isChecked ? this.state.themeColorActive : this.state.themeColorIdle}
                />
                {this.state.title ? <Text style={[styles.textCaption, { color: this.state.isChecked ? this.state.themeColorActive : this.state.themeColorIdle }]}>{this.state.title}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textBox: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textCaption: {
        // position: "absolute",
        color: textinputcaption,
        fontWeight: "500",
        backgroundColor: "white",
        // top: -10,
        // left: 15,
        // zIndex: 1,
        padding: 10,
    },
    textInput: {
        height: 5,
        // width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: textinputcaption,
        padding: 10,
    }
})


export default TextFieldComponent;