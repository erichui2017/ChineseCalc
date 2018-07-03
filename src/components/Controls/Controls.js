import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { scaleSize } from '../../util';

import Box from "../Box/";
import styles from "./styles";

const Controls = props => (
  <View style={[styles.controls, {height: props.controlsHeight}]} >
    <View style={[styles.row, styles.rowTop]}>
      <Box
        style={[styles.box, styles.green]}
        styleFont={styles.styleFont}
        content="AC"
        onPress={()=>{
          props.clear();
          props.clearHistory();
        }}
      />
      <Box
        style={[styles.box, styles.green]}
        styleFont={styles.styleFont}
        content="+/-"
        onPress={props.numberSignedInput}
      />
      <TouchableOpacity style={[styles.box, styles.green]} activeOpacity={0.8} onPress={props.undo} >
        <Icon name="long-arrow-left" size={scaleSize(36)} color='#ed8e32' />
      </TouchableOpacity>
      <Box
        style={[styles.box, styles.boxRight, styles.green]}
        content="/"
        // onPress 需要一个函数，但是认为props.operationInput是对象，不是函数
        onPress={()=>props.operationInput("/")}
      />
    </View>
    <View style={styles.row}>
      <Box
        style={[styles.box, styles.black]}
        content="7"
        onPress={()=>props.numberInput("7")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="8"
        onPress={()=>props.numberInput("8")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="9"
        onPress={()=>props.numberInput("9")}
      />
      <Box
        style={[styles.box, styles.boxRight, styles.green]}
        content="*"
        onPress={()=>props.operationInput("*")}
      />
    </View>
    <View style={styles.row}>
      <Box
        style={[styles.box, styles.black]}
        content="4"
        onPress={()=>props.numberInput("4")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="5"
        onPress={()=>props.numberInput("5")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="6"
        onPress={()=>props.numberInput("6")}
      />
      <Box
        style={[styles.box, styles.boxRight, styles.green]}
        content="-"
        onPress={()=>props.operationInput("-")}
      />
    </View>
    <View style={styles.row}>
      <Box
        style={[styles.box, styles.black]}
        content="1"
        onPress={()=>props.numberInput("1")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="2"
        onPress={()=>props.numberInput("2")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="3"
        onPress={()=>props.numberInput("3")}
      />
      <Box
        style={[styles.box, styles.boxRight, styles.green]}
        content="+"
        onPress={()=>props.operationInput("+")}
      />
    </View>
    <View style={styles.row}>
      <Box
        style={[styles.box, styles.double, styles.black]}
        content="0"
        onPress={()=>props.numberInput("0")}
      />
      <Box
        style={[styles.box, styles.black]}
        content="."
        onPress={props.decimalInput}
      />
      <Box
        style={[styles.box, styles.boxRight, styles.orange]}
        content="="
        onPress={props.calculate}
      />
    </View>
  </View>
);

export default Controls;
