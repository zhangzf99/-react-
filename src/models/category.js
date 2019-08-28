import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'category',
  state:{
    allCategory:[],
    visible:false
  },

  effects:{
    // 获取所有的品种
    *findAllCategory(action,{call,put}){
      let {data:payload} = yield call(axios.get,'/category/findAll')
      yield put({type:'allCategory',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
  },

  reducers:{
    allCategory(state,action){
      return{
        ...state,
        allCategory:action.payload
      }
    },
    openDialog(state,action){
      return{
        ...state,
        visible:true
      }
    },
    closeDialog(state,action){
      return{
        ...state,
        visible:false
      }
    }
  }
}