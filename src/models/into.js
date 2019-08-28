// 入库
import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'into',
  state:{
    importList:[],
    visible:false,
    ids:[],
    // 存放一行数据
    intoList:{},
    loading:true
  },
  effects:{
    // 获取入库商品
    *findAllIntoList(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/import/findAllWithRepository")
      yield put({type:'IntoList',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存
    *saveOrUpdate(action,{call,put}){
      yield call(axios.post,"/import/saveOrupdate",action.values)
      yield put({type:'findAllIntoList'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delRepositoryById(action,{call,put}){
      yield call(axios.get,"/import/deleteById",{params:{id:action.id}})
      yield put({type:'findAllIntoList'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delRepositoryByIds(action,{call,put}){
      yield call(axios.post,"/import/batchDelete",{ids:action.values})
      yield put({type:'findAllIntoList'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    IntoList(state,action){
      return{
        ...state,
        importList:action.payload,
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