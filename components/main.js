import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { TabNavigator, TabBarBottom } from "react-navigation"

import Styles from '../helpers/styles'
import COLORS from '../helpers/colors'

import Chat from './chat'
import Analytics from './analytics'

const routes = {
  Chat: {screen: Chat},
  Analytics: {screen: Analytics}
}

const options = {
  initialRouteName: 'Chat',
  tabBarOptions: {
    style: {
      backgroundColor: COLORS.primary,
    },
    indicatorStyle: {
      backgroundColor: COLORS.secondary,
    }
  }
}

const MainScreenNavigator = TabNavigator(routes, options)

export default class Main extends Component {
  render() {
    return <View style={{flex: 1}}>
      <View style={Styles.statusBar} />
      <MainScreenNavigator />
    </View>
  }
}
