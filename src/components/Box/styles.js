import { StyleSheet } from "react-native";
import { setSpText } from '../../util';

const styles = StyleSheet.create({
  text: {
    // fontFamily: "sans-serif",
    color: "black",
    fontSize: setSpText(48),
    // textShadowOffset: {
    //   width: 1,
    //   height: 1
    // },
    // textShadowColor: "#cacaca",
    // textShadowRadius: 1
  },
  box: {
    // backgroundColor: "#333E00"
    backgroundColor: "#c9cace"

  }
});

export default styles;
