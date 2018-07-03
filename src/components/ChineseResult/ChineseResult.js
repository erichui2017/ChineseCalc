import React from "react";
import { Text } from "react-native";

import styles from "./styles";

const ChineseResult = ({ content }) => (
  <Text numberOfLines={2} style={styles.chineseResult}>
    {content}
  </Text>
);

export default ChineseResult;
