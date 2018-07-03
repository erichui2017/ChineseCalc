import React from "react";
import { Text } from "react-native";

import styles from "./styles";

const Expression = ({ content }) => (
  <Text numberOfLines={2} style={styles.question}>
    {content}
  </Text>
);

export default Expression;
