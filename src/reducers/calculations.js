import { handleActions, combineActions } from 'redux-actions';

import initialState from "../store/initialState";
import numToChinese from '../util/numToChinese';
import { calculate as calcUtil } from '../util';

// TODO：各种异常处理的文字提示
const OUTPUT_MAX_LENGTH = 20;

const aggregate = history => {
  return history.reduce((aggregate, current, index) => {
      let t1 = (typeof(current.input) == undefined)? "":current.input;
      let t2 = (typeof(current.operation) == undefined)? "":current.operation;

      return aggregate += t1+t2;
    },
    ""
  );
}

const getOutput = (currentInput, history) => {
  let output = "0";
  let chineseOutput = "";

  // 前面有表达式
  if(history.length !== 0){
    // 处理
    output = aggregate(history);
  }

  output === "0"
    ? output = currentInput.join('')
    : output += currentInput.join('');

  if(output.indexOf('+')=== -1 && output.indexOf('*')=== -1  && output.indexOf('/')=== -1){
    if(output.indexOf('-')=== -1 || output.indexOf('-')=== 0){
      chineseOutput = numToChinese(output);
    }
  } 
  if(output.length >= OUTPUT_MAX_LENGTH){
    output = "超出显示范围"
  }

  return {output, chineseOutput};
}

// 删除括号
const delBracket = (str) => {
  // 必须使用本地变量，否则会污染
  let currentInput = str.slice();

  // 先处理括号，这里没有括号操作符，所以简单处理
  if (currentInput[0] === '(') {
    currentInput.shift();
    currentInput.pop();
  } 

  return currentInput;
}

// 检查是否是除以0
const ifDivZero = (operation, input) => {
  // 必须使用本地变量，否则会污染
  let currentInput = input.slice();

  if( operation!=="/" ){
    return false;
  }

  // 处理括号
  currentInput = delBracket(currentInput);
  if( parseFloat(currentInput.join(''))===0 ){
    return true;
  } else {
    return false;
  }

  return true;
}

// 输入数字
const numberInput = (state, { payload: { value } }) => {
  let currentInput = state.currentInput.slice();

  // 处理第一个数字串的的情况
  if(state.history.length===0){

  }

  // 处理第一个数字为0的情况，如果再输数字，直接替换，把currentInput置空
  if( currentInput.length===1 && currentInput[0]==="0"){
    currentInput = [];
  }
  if( currentInput.length===2 && currentInput.join('')==="-0"){
    currentInput.pop();
  }
  if( currentInput.length===4 && currentInput.join('')==="(-0)"){
    currentInput.splice(-2, 1);
  }

  // 判断最后一个字符是不是），如果是括号，就把数字加到括号里
  if (currentInput[currentInput.length-1] === ')') {
    currentInput.splice(-1, 0, value);
  } else {  
    currentInput.push(value);
  }
  
  let {output, chineseOutput} = getOutput(currentInput, state.history);
  return {
    ...state,
    currentInput,
    output,
    chineseOutput
  };
}

// 正负处理
const numberSignedInput = state => {
  let currentInput = state.currentInput.slice();
  
  // 没有输入不允许变负值
  if (currentInput.length === 0) {
    return { ...state }
  } 

  // 处理括号
  currentInput = delBracket(currentInput);

  if (currentInput[0] === '-') {
    currentInput.shift();
  } else {
    // 前面没有表达式
    if (state.history.length === 0){
      currentInput.unshift('-');
    } else {
      currentInput.unshift('-');
      currentInput.unshift('(');
      currentInput.push(')');
    }
  }

  let {output, chineseOutput} = getOutput(currentInput, state.history);
  return {
    ...state,
    currentInput,
    output: output,
    chineseOutput: chineseOutput
  };
}

// 处理小数点
const decimalInput = state => {  
  let currentInput = state.currentInput.slice();
  // only allow one decimal
  if (currentInput.indexOf('.') > -1) {
    return { ...state };
  }

  // 如果直接输入. 自动在前面补0
  if (currentInput.length===0) {
    currentInput = ["0"];
  }
  
  // 判断最后一个字符是不是），如果是括号，就把数字加到括号里
  if (currentInput[currentInput.length-1] === ')') {
    currentInput.splice(-1, 0, '.');
  } else {  
    currentInput.push('.');
  }

  let {output, chineseOutput} = getOutput(currentInput, state.history);
  return {
    ...state,
    currentInput,
    output: output,
    chineseOutput: chineseOutput
  };
}

// 处理运算符
const operationInput =  (state, { payload: { operation } }) => {  
  // assign the current operation
  let currentInput = state.currentInput.slice();
  let history = state.history.slice();

  // 运算符不能出现在首位
  if ( currentInput.length === 0 )
    return {  ...state }

  // 处理不能除以0的情况
  if(ifDivZero(state.operation, currentInput)){
    return { 
      ...state,
      error: "不能除以0",
      toastVisible: true
    }
  }
  // TODO: 处理小数点在末尾的情况

  history.push({
      input: currentInput.join(''),
      operation: operation
  });
  
  currentInput = [];
  let {output, chineseOutput} = getOutput(currentInput, history);
  return {
    ...state,
    operation,
    currentInput,
    output,
    chineseOutput,
    history
  };
}

// 计算结果
const calculate = state => {  
  let currentInput = state.currentInput.slice();
  let history = state.history.slice();

  //  不能再输入一个计算符号后计算结果
  if (currentInput.length === 0) {
    // @TODO - apply the operation to the last item in the history to repeat the calculation
    return { ...state };
  }
  
  // 处理不能除以0的情况
  if(ifDivZero(state.operation, currentInput)){
    return { 
      ...state,
      error: "不能除以0",
      toastVisible: true
    }
  }

  // 所有运算都放到history中
  history.push({
    input: currentInput.join(''),
    // 不把=放到history中，要不eval会出错
    operation: ""
  })

  try {
    let expression = aggregate(history);
    // let result  = eval(expression);
    let result = calcUtil(expression);
    currentInput = result.toString().split('');
    history = [];
    let output = result;
    // numToChinese 只接受字符串，否则报错，对output进行显示转换
    let chineseOutput = numToChinese(output.toString());
    
    return {
      ...state,
      currentInput,
      expression,
      output,
      chineseOutput,
      history
    };
  } catch (e) {
  } finally {
  }

  return { ...state };
}

// undo
const undo = state => {  
  let lastInput = state.history.slice().pop();
  let currentInput = [];
  return {
    ...state,
    currentInput,
    history
  };
}

const timeTravel = (state, { payload: { index } }) => {  
  return {
    ...state,
    // toggle the offset to the selected offset of, if already selected, remove it
    offset: index === state.offset ? null : index
  };
}

// 归零
const clear = state => { 
  // 退到这一次计算的启示就不在回滚了 
  return initialState;
}

// 清理错误信息
const clearError = state => {
  return {
    ...state,
    error: "",
    toastVisible: false
  }
}

// const作用域问题，必须先声明再使用。
// 必须是与action type拼写一直的变量名，但是需要引入action和actiontype
export const calculationReducer = handleActions (
  {
    NUMBER_INPUT: numberInput,
    NUMBER_SIGNED_INPUT: numberSignedInput,
    DECIMAL_INPUT: decimalInput,
    OPERATION_INPUT: operationInput,
    CALCULATE: calculate,
    // UNDO: undo,
    CLEAR: clear,
    TIME_TRAVEL: timeTravel,
    CLEAR_ERROR: clearError
  },
  initialState
);