// 全部引入到一个对象，不用一个一个添加
import * as actions from  "./actions.js"
import { ActionCreators } from 'redux-undo';

Object.assign(actions, ActionCreators)

export { actions }