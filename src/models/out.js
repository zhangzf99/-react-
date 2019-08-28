import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'out',
  state:{
    outMes:[],
    visible:false,
    ids:[],
    // 存放一行数据
    outList:{},
    loading:true
  },

  effects:{
    // 获取销售产品信息
    *findOutMes(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/export/findAllWithRepository")
      yield put({type:'setOut',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存或更新
    *saveOrUpdate(action,{call,put}){
      yield call(axios.post,"/export/saveOrupdate",action.values)
      yield put({type:'findOutMes'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delProductById(action,{call,put}){
      yield call(axios.get,'/export/deleteById',{params:{id:action.id}})
      yield put({type:'findOutMes'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delProductByIds(action,{call,put}){
      yield call(axios.post,'/export/batchDelete',{ids:action.values})
      yield put({type:'findOutMes'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    setOut(state,action){
      return{
        ...state,
        outMes:action.payload,
        loading:false
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