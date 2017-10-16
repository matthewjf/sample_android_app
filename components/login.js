import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { TextField } from 'react-native-material-textfield'
import { RaisedTextButton } from 'react-native-material-buttons'

import { vw } from '../helpers/dimensions'
import COLORS from '../helpers/colors'
import Styles from '../helpers/styles'

import accounts from '../helpers/accounts'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.blur = this.blur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleFail = this.handleFail.bind(this)
    this.hideError = this.hideError.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.navigateToMain = this.navigateToMain.bind(this)
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.clearPassword = this.clearPassword.bind(this)

    this.state = {loginStatus: null, keyboardVisible: false}
  }

  componentWillMount() {
    this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove()
    this.keyboardHideListener.remove()
  }

  _keyboardDidShow() {
    this.setState({keyboardVisible: true})
  }

  _keyboardDidHide() {
    this.setState({keyboardVisible: false})
  }

  blur() {
    if (this._email) this._email.blur()
    if (this._password) this._password.blur()
  }

  clearPassword() {
    if (this._password) this._password.clear()
  }

  onSubmit() {
    let email = (this._email.value() || '').toLowerCase()
    let password = this._password.value()

    this.blur()

    if (password && accounts[email] === password) this.handleSuccess()
    else this.handleFail()
  }

  handleSuccess() {
    this.setState({loginStatus: 'success'})
    setTimeout(this.navigateToMain, 500)
  }

  navigateToMain() {
    this.setState({loginStatus: null})
    this._email.clear()
    this._password.clear()

    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Main'})]
    })
    this.props.navigation.dispatch(resetAction)
  }

  handleFail() {
    this.setState({loginStatus: 'failure'})
  }

  hideError() {
    this.setState({loginStatus: null})
  }

  renderMessage() {
    switch (this.state.loginStatus) {
      case 'success':
        return <Text style={styles.success}>Hang tight! Logging you in...</Text>
      case 'failure':
        return <Text style={styles.error}>Invalid login</Text>
      default:
        return <Text style={styles.error}>{' '}</Text>
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.blur}>
        <View style={[Styles.appBackground, styles.container]}>
          <View style={{flex: this.state.keyboardVisible ? 0.18 : 0.25}} />

          <Text style={styles.title}>
            Welcome!
          </Text>

          <View style={{flex: this.state.keyboardVisible ? 0.02 : 0.1}} />

          {this.renderMessage()}

          <View style={{width: 60*vw}}>
            <TextField
              ref={(c) => this._email = c}
              label='email'
              textColor='rgb(255,255,255)'
              tintColor={COLORS.primary}
              baseColor='gray'
              onChangeText={this.hideError} />

            <TextField
              secureTextEntry={true}
              ref={(c) => this._password = c}
              onFocus={this.clearPassword}
              label='password'
              textColor='rgb(255,255,255)'
              tintColor={COLORS.primary}
              baseColor='gray'
              onChangeText={this.hideError} />

            <View style={styles.spacer3} />

            <RaisedTextButton
              title="LET'S GO"
              color={COLORS.primary}
              titleColor='white'
              onPress={this.onSubmit}
              disabled={this.state.loginStatus === 'success'}
              disabledColor='rgba(255,255,255,0.5)' />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const TITLE_SIZE = 30

const styles = StyleSheet.create({
  container: {
    width: 100*vw,
  },
  error: {
    color: COLORS.error
  },
  success: {
    color: COLORS.success
  },
  spacer1: {
    flex: 0.25,
  },
  spacer2: {
    flex: 0.1,
  },
  spacer3: {
    marginTop: 36
  },
  title: {
    fontSize: TITLE_SIZE,
    color: 'white'
  }
});
