import React, { Component } from 'react'
import { Keyboard, FlatList, View, Text, TextInput, StyleSheet } from 'react-native'

import ChatInput from './chat_input'
import KeyboardSpacer from './keyboard_spacer'

import COLORS from '../helpers/colors'
import Styles from '../helpers/styles'
import {vw, vh} from '../helpers/dimensions'

import getResponse from '../helpers/get_response'
import Message from '../helpers/message'

export default class Chat extends Component {
  sendMessage(str) {
    this.messageList.addMessage(str)
  }

  render() {
    return <View style={[Styles.appBackground, localStyles.container]}>
      <MessageList ref={(c) => this.messageList = c}/>
      <ChatInput sendMessage={this.sendMessage.bind(this)} />
      <KeyboardSpacer />
    </View>
  }
}

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.addmessage = this.addMessage.bind(this)
    this.getResponse = this.getResponse.bind(this)
    this.addResponse = this.addResponse.bind(this)

    this.scrollToEnd = this.scrollToEnd.bind(this)

    this._keyExtractor = this._keyExtractor.bind(this)
    this._renderItem = this._renderItem.bind(this)

    this.state = {list: []}
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.scrollToEnd)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.scrollToEnd)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  addMessage(str) {
    if (!str) return

    let msg = new Message(str, 'self')
    this.setState({list: this.state.list.concat([msg])}) // new object ensures re-render
    this.scrollToEnd()

    this.getResponse()
  }

  getResponse() {
    getResponse().then(res => res.json()).then(resJson => {
      this.addResponse(resJson.value)
    })
  }

  addResponse(str) {
    if (!str) return
    let msg = new Message(str, 'chuck')
    this.setState({list: this.state.list.concat([msg])})

    this.scrollToEnd()
  }

  scrollToEnd() {
    this.refs.list.scrollToEnd()
  }

  _keyExtractor(item, idx) {
    return item.id
  }

  _renderItem({item}) {
    return <MessageView msg={item} key={item.id} />
  }

  render() {
    return <View style={localStyles.listWrapper}>
      <FlatList
        ref='list'
        style={localStyles.list}
        contentContainerStyle={localStyles.listContent}
        data={this.state.list}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem} />
    </View>
  }
}

class MessageView extends Component {
  constructor(props) {
    super(props)

    this.messageStyle = this.messageStyle.bind(this)

    this.state = {style: this.messageStyle(props.msg)}
  }

  messageStyle(msg) {
    let st = msg.sender === 'self' ? localStyles.ownMessage : localStyles.chuckMessage

    return [localStyles.message, st]
  }

  render() {
    let {msg} = this.props
    return <View style={this.state.style}>
      <Text style={localStyles.text}>{msg.text}</Text>
    </View>
  }
}

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  listWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  list: {
    maxHeight: 84*vh,
    flexGrow: 1
  },
  listContent: {
    padding: 10
  },
  text: {
    color: 'white'
  },
  message: {
    margin: 8,
    borderRadius: 2,
    padding: 10,
    maxWidth: 75*vw
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.dark,
  },
  chuckMessage: {
    backgroundColor: COLORS.lightBackground
  }
})
