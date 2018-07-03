import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import Toast from 'react-native-root-toast';

import { actions } from "../../actions";
import { Expression } from "../Expression/";
import { Result } from "../Result/";
import { ChineseResult } from "../ChineseResult/";
import Controls from "../Controls/";

import styles from "./styles";

/**
 *
 *
 * @class Root
 * @extends {Component}
 */
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlsHeight: 0,
    };
  };

  // 测量显示view尺寸
  measureContent = e => {
    const { width, height } = e.nativeEvent.layout;
    // 控件区域要是5的倍数,除以5以后的商还必须是偶数，取高的5/9
    let controlsHeight = Math.ceil(height / 18) * 10;
    this.setState({ controlsHeight: controlsHeight });
  };

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.content} onLayout={this.measureContent}>
          <View style={styles.show} >
            <Expression content={this.props.expression} style={styles.expression} />
            <Result content={this.props.output} style={styles.result} />
            <ChineseResult content={this.props.chineseOutput} style={styles.chineseResult}/>
          </View>
          <Controls
            {...this.props}
            // 根据屏幕宽设置控件高度
            controlsHeight={this.state.controlsHeight}
            // boxHeight={this.state.boxHeight}
          />
          <View>
            <Toast
                visible={this.props.toastVisible}
                position={0}
                shadow={false}
                animation={false}
                hideOnPress={true}
                onShown = {()=>{
                  setTimeout(this.props.clearError, 2000); // hide toast after 2s
                }}
                onHidden = {this.props.clearError}
            >{this.props.error}
            </Toast>
          </View>
        </View>
      </View>
    );
  };
}

// const mapStateToProps = ({ expression, result, chineseResult }) => ({ expression, result, chineseResult });
const mapStateToProps = state => ({
  expression: state.present.expression,
  output: state.present.output,
  chineseOutput: state.present.chineseOutput,
  error: state.present.error,
  toastVisible: state.present.toastVisible
});
const mapDispatchToProps = (dispatch) => (bindActionCreators(actions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Root);
