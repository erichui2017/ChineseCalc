const initialState = {
  expression: "",
  output: "0",
  chineseOutput: "零",
  error: "",
  toastVisible: false,
  
  offset: null,
  operation: 'MULTIPLY',
  currentInput: ["0"],
  history: []
};

export default initialState;
