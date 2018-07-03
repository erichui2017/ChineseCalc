import { StyleSheet } from "react-native";
import { setSpText, scaleSize } from '../../util';

const styles = StyleSheet.create({
  question: {
    flex: 1,
    height: scaleSize(120),

    color: "#fafafa",
    fontSize: setSpText(48),
    textAlign: "right",
    textAlignVertical: "center",
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowColor: "#333333",
    textShadowRadius: 10,

    // backgroundColor: "black"
  }
});

export default styles;
