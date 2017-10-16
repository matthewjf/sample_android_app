import { StyleSheet, StatusBar } from 'react-native'
import COLORS from './colors'

const Styles = StyleSheet.create({
  appBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.background
  },
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: COLORS.primary
  }
})

export default Styles
