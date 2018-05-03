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

let person = { name: "Hsu Wai", age: "24" };

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  //For testing crash data
  testCrash = () => {
    var obj = undefined;
    alert(obj.name.first);
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
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 5
          }}
          onPress={() => this.testCrash()}
        >
          <Text>Click ME!!!</Text>
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
