import { StyleSheet, StatusBar } from "react-native";
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: Platform.OS === "ios"? StatusBar.currentHeight :0,
    backgroundColor: "#FF5151"
  },
  show: {
    justifyContent: 'flex-start',
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "green"
  },
  content: {
    flex: 1
  },
  expression: {
    flex: 1
  },
  result: {
    flex: 2,
  },
  chineseResult: {
    flex: 1
  }
});

export default styles;

