import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'sale',
  state:{
    allSales:[],
    visible:false,
    ids:[],
    saleList:{},
    loading:true
  },

  effects:{
    // 获取所有的销售信息
    *findAllSales(action,{call,put}){
      let {data:payload} = yield call(axios.get,'/saleorder/findAllWithCustomer')
      yield put({type:'allSale',payload})
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
      yield call(axios.post,'/saleorder/saveOrupdate',action.values)
      yield put({type:'findAllSales'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delSaleById(action,{call,put}){
      yield call(axios.get,'/saleorder/deleteById',{params:{id:action.id}})
      yield put({type:'findAllSales'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delSaleByIds(action,{call,put}){
      yield call(axios.post,'/buyorder/batchDelete',{ids:action.values})
      yield put({type:'findAllSales'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    allSale(state,action){
      return{
        ...state,
        allSales:action.payload,
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