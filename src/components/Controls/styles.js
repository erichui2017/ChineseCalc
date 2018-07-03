import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  controls: {
    justifyContent: 'flex-end',
    backgroundColor: "red",
  },
  
  row: {
    // 不知道自动扩展的算法是什么，但是会出现误差，还是用height更好一些。
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    borderTopWidth: 1,
    borderColor: "#878788",
    height: "20%",
  },
  rowTop: {
    borderTopWidth: 0,
  },

  box: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    borderRightWidth: 1,
    borderColor: "#878788"
  },
  boxRight: {
    borderRightWidth: 0,
  },

  double: {
    width: "50%"
  },
  black: {
    // backgroundColor: "#414758"
    backgroundColor: "#c9cace"
  },
  green: {
    // backgroundColor: "#73DB6D"
    backgroundColor: "#c4c5c7"
  },
  orange: {
    // backgroundColor: "#F5A623"
    backgroundColor: "#ed8e32"
  },
  styleFont: {
    color: "#ed8e32"
  }
});

export default styles;
