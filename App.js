/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import codePush from "react-native-code-push";
import Crashes from "appcenter-crashes";

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class App extends Component {
  testCrash = () => {
    //Crashes.generateTestCrash();
    throw new Error("This is a test javascript crash!");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My Code Push Testing via Code Push CLI
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            padding: 10,
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 5
          }}
          onPress={() => this.testCrash()}
        >
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
App = codePush(codePushOptions)(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
