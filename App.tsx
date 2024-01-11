import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={{
        color: "#fafafa",
        fontSize: 18
      }}>
        Welcome to my first app
      </Text>
      <Text style={styles.title}>TaskMaster</Text>
    </View>
  )
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff'
  }
})
