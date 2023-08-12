import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';


class TextFieldComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: "",
            title: "E-Mail",
            placeholder: "example@gmail.com",
            active: true,
            themeColorActive: "#003399",
            themeColorIdle: "#D9D9D9",
            editable: this.props.editable
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
            <View style={styles.textBox} key={this.state.id + this.state.title + this.state.value}>
                {this.state.title ? <Text style={[styles.textCaption, { color: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle }]}>{this.state.title}</Text> : null}
                <TextInput
                    style={[styles.textInput, { color: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle, borderColor: this.state.active ? this.state.themeColorActive : this.state.themeColorIdle }]}
                    selectionColor={this.state.active ? this.state.themeColorActive : this.state.themeColorIdle}
                    onChangeText={(inputValue) => this.onChangeInText(inputValue)}
                    onPressIn={() => {
                        this.props.getActiveTextBox(this.state.id)
                        this.setState({ active: true })
                    }}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    editable={this.state.editable}
                    key={this.state.id + this.state.title + this.state.value}
                />
            </View>
        )
    }
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
})


export default TextFieldComponent;