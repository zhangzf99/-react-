// 供应商信息
import axios from '../http/index'
import { connect } from 'dva'

export default {
  namespace:'merchants',
  state:{
    merchantsList:[],
    visible:false,
    // 批量删除ids
    ids:[],
    // 存放一行数据
    merchantsInfo:{},
    loading:true
  },

  effects:{
    // 获取所有的供应商信息
    *findAllMerchants(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/provider/findAll")
      // console.log(payload)
      yield put({type:'AllMerchants',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({tyep:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存
    *saveOrUpdate(action,{call,put}){
      yield call(axios.post,"/provider/saveOrupdate",action.values)
      yield put({type:'findAllMerchants'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delById(action,{call,put}){
      yield call(axios.get,'/provider/deleteById',{params:{id:action.id}})
      yield put({type:'findAllMerchants'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delByIds(action,{call,put}){
      yield call(axios.post,"/provider/batchDelete",{ids:action.values})
      yield put({type:'findAllMerchants'})
    }
  },

  reducers:{
    AllMerchants(state,action){
      return{
        ...state,
        merchantsList:action.payload,
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