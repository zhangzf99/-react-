import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'inventory',
  state:{
    productList:[],
    visible:false,
    // 删除数据的ids
    ids:[],
    // 存放一行数据
    product:{},
    loading:true
  },

  effects:{
    // 获取所有的商品
    *findAllProducts(action,{call,put}){
      let {data:payload} = yield call(axios.get,'/inventory/findAllWithRepository')
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
    // 保存商品
    *saveOrUpdate(action,{call,put}){
      // alert(1)
      yield call(axios.post,"/inventory/saveOrupdate",action.values)
      yield put({type:'findAllProducts'})
      yield put({type:'closeDialog'})
    },
    // 删除
    *delById(action,{call,put}){
      yield call(axios.get,"/inventory/deleteById",{params:{id:action.id}})
      yield put({type:'findAllProducts'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delByIds(action,{call,put}){
      yield call(axios.post,'/inventory/deleteById',{ids:action.ids})
      yield put({type:'findAllProducts'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    allProduct(state,action){
      return{
        ...state,
        productList:action.payload,
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