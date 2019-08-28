import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'product',
  state:{
    allProduct:[],
    visible:false,
    ids:[],
    // 一行数据
    productList:{},
    loading:true
  },

  effects:{
    // 获取所有的产品
    *findAllProduct(action,{call,put}){
      let {data:payload} = yield call(axios.get,'/product/findAllWithCategory')
      yield put({type:'allProduct',payload})
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
      yield call(axios.post,"/product/saveOrUpdate",action.values)
      yield put({type:'findAllProduct'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delProductById(action,{call,put}){
      yield call(axios.get,'/product/deleteById',{params:{id:action.id}})
      yield put({type:'findAllProduct'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delProductByIds(action,{call,put}){
      yield call(axios.post,'/product/batchDelete',{ids:action.values})
      yield put({type:'findAllProduct'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    allProduct(state,action){
      return{
        ...state,
        allProduct:action.payload,
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
    },
  }
}