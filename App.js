/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from "react-redux";
import store from "./src/store/";
import Root from "./src/components/Root/";

// 控制横屏 
import Orientation from 'react-native-orientation';
import codePush from 'react-native-code-push'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }

  componentWillMount() {
  // The getOrientation method is async. It happens sometimes that
  // you need the orientation at the moment the JS runtime starts running on device.
  // `getInitialOrientation` returns directly because its a constant set at the
  // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }

    // 只允许竖屏
    Orientation.lockToPortrait();
    //只允许横屏
    // Orientation.lockToLandscape();
  }

  componentDidMount() {
    // this locks the view to Portrait Mode
    Orientation.lockToPortrait();

    // this locks the view to Landscape Mode
    // Orientation.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // Orientation.unlockAllOrientations();

    Orientation.addOrientationListener(this._orientationDidChange);

  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {    
    if(__DEV__){
      Orientation.getOrientation((err, orientation) => {
        console.log(`Current Device Orientation: ${orientation}`);
      });
    }

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
}

export default App = codePush(App);