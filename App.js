import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'

import Login from './components/login'
import Main from './components/main'

const routes = {
  Home: {screen: Login},
  Main: {screen: Main}
}

const options = {
  // initialRouteName: 'Home',
  initialRouteName: 'Main',
  headerMode: 'none'
}

const Nav = StackNavigator(routes, options)

export default class App extends React.Component {
  render() {
    return <Nav ref={nav => {this.navigator = nav}}/>
  }
}
