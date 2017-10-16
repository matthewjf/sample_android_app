import React, { Component } from 'react'
import { Keyboard, Animated } from 'react-native'

import COLORS from '../helpers/colors'

export default class KeyboardSpacer extends Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0)
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this))
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this))
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow(event) {
    Animated.timing(this.keyboardHeight, {
      duration: 0,
      toValue: event.endCoordinates.height,
    }).start()
  }

  keyboardWillHide(event) {
    Animated.timing(this.keyboardHeight, {
      duration: 0,
      toValue: 0,
    }).start()
  }

  render() {
    return (
      <Animated.View style={{height: this.keyboardHeight}} />
    )
  }
}
