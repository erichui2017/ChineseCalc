import { StyleSheet, Platform } from "react-native";
import { setSpText, scaleSize } from '../../util';

const styles = StyleSheet.create({
  chineseResult: {
    flex: 1,
    height: scaleSize(120),

    color: "white",
    fontSize: setSpText(48),
    // fontWeight: "300",
    // padding: Platform.OS === "ios" ? 50 : 4,
    textAlign: "right",
    textAlignVertical: "center",
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowColor: "#333333",
    textShadowRadius: 10,
    
    // backgroundColor: "white"
  }
});

export default styles;
