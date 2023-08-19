import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { tabactive, tabinactive, textinputcaption, white } from "../../colorpalette"

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
            selectedValue: "Admin",
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

    render() {
        return (
            <View style={styles.textBox}>
                {this.state.title ? <Text style={[styles.textCaption, { color: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle }]}>{this.state.title}</Text> : null}
                <Picker
                    itemStyle={{ height: 60, width: "100%" }}
                    style={[styles.textInput, { color: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle, borderColor: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle }]}
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        console.log(itemValue)
                        this.props.getActiveTextBox(this.state.id)
                        this.setState({ active: true, selectedValue: itemValue })
                    }
                    }>
                    {this.state.options?.map(option => <Picker.Item label={option} value={option} />)}
                </Picker>
            </View >
        )
    }
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
        // height: 60,
        // height: 60,
        width: "100%",
        borderWidth: 1.3,
        borderRadius: 7,
        borderColor: textinputcaption
        // padding: 20,
    },
})


export default TextFieldComponent;