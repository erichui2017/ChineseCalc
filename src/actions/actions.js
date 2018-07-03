import {
    createActions
} from 'redux-actions';

// 输出的变量需要采用驼峰结构，需要和type一一对应
export const {
    numberInput,
    operationInput,
    timeTravel,
    numberSignedInput,
    decimalInput,
    // undo,
    clear,
    calculate,
    // output
    clearError
} = createActions({
        NUMBER_INPUT: value => ({
            value
        }),
        OPERATION_INPUT: operation => ({
            operation
        }),
        TIME_TRAVEL: index => ({
            index
        })
    },
    'NUMBER_SIGNED_INPUT',
    'DECIMAL_INPUT',
    // 'UNDO',
    'CLEAR',
    'CALCULATE',
    // 'OUTPUT'
    'CLEAR_ERROR'
);