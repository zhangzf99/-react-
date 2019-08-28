import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'type',
  state:{
    typeList:[],
    visible:false,
    ids:[],
    rowTypeList:{},
    loading:true
  },

  effects:{
    // 获取所有的类型
    *findAllTypes(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/category/findAll")
      yield put({type:'allTypes',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存更新
    *saveOrUpdate(action,{call,put}){
      yield call(axios.post,"/category/saveOrupdate",action.values)
      yield put({type:'findAllTypes'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delTypeById(action,{call,put}){
      yield call(axios.get,'/category/deleteById',{params:{id:action.id}})
      yield put({type:'findAllTypes'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delTypeByIds(action,{call,put}){
      yield call(axios.post,'/category/batchDelete',{ids:action.values})
      yield put({type:'findAllTypes'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    allTypes(state,action){
      return{
        ...state,
        typeList:action.payload,
        loading:false
      }
    },
    openDialog(state,payload){
      return{
        ...state,
        visible:true
      }
    },
    closeDialog(state,payload){
      return{
        ...state,
        visible:false
      }
    }
  }
}