import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'buy',
  state:{
    allBuys:[],
    visible:false,
    ids:[],
    buyList:{},
    loading:true
  },

  effects:{
    // 获取所有的采购信息
    *findAllBuy(action,{call,put}){
      let {data:payload} = yield call(axios.get,'/buyorder/ findAllWithProvider')
      yield put({type:'allBuy',payload})
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
      yield call(axios.post,'/buyorder/saveOrupdate',action.values)
      yield put({type:'findAllBuy'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delBuysById(action,{call,put}){
      yield call(axios.get,'/buyorder/deleteById',{params:{id:action.id}})
      yield put({type:'findAllBuy'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delBuyByIds(action,{call,put}){
      yield call(axios.post,'/buyorder/batchDelete',{ids:action.values})
      yield put({type:'findAllBuy'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    allBuy(state,action){
      return{
        ...state,
        allBuys:action.payload,
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