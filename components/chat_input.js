import React, {Component} from 'react'
import { View, TextInput, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'

import COLORS from '../helpers/colors'

export default class ChatInput extends Component {
  constructor(props) {
    super(props)

    this.blur = this.blur.bind(this)
    this._onSend = this._onSend.bind(this)

    this.state = {text: null}
  }

  blur() {
    this.input.blur()
  }

  _onSend() {
    this.props.sendMessage(this.state.text)
    this.setState({text: null})
    this.blur()
  }

  render() {
    return (
      <View style={localStyles.container}>
        <TextInput
          style={localStyles.input}
          ref={(c) => {this.input = c}}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this._onSend}
          returnKeyLabel='send'
          placeholder='Send a message'
          placeholderTextColor='#fff'
          selectionColor={COLORS.secondary}
          underlineColorAndroid='transparent' />

        <TouchableNativeFeedback
            onPress={this._onSend}>
          <View style={localStyles.sendWrapper}>
            <Text style={localStyles.send}>SEND</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.lightBackground,
  },
  input: {
    color: 'white',
    flexGrow: 1
  },
  sendWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  send: {
    textAlignVertical: 'center',
    padding: 5,
    color: COLORS.secondary
  }
})
