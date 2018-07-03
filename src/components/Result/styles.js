import { StyleSheet, Platform } from "react-native";
import { setSpText, scaleSize } from '../../util';

const styles = StyleSheet.create({
  result: {
    flex: 2,
    height: scaleSize(240),
    // padding: Platform.OS === "ios" ? 50 : 4,

    color: "white",
    fontSize: setSpText(96),
    fontWeight: "300",
    textAlign: "right",
    textAlignVertical: "center",
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowColor: "#333333",
    textShadowRadius: 10,
    
    // backgroundColor: "blue"
  }
});

export default styles;
