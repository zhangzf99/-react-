import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'customer',
  state:{
    customerList:[],
    visible:false,
    // 批量删除ids
    ids:[],
    // 存放一行数据
    customerInfo:{},
    loading:true
  },

  effects:{
    // 获取所有的用户
    *findAllCustomer(action,{call,put}){
      let {data:payload} = yield call(axios.get,'/customer/findAll')
      // console.log(payload)
      yield put({type:'AllCustomer',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存顾客信息
    *saveOrUpdate(action,{call,put}){
      yield call(axios.post,"/customer/saveOrupdate",action.values)
      yield put({type:'findAllCustomer'})
      yield put({type:'closeDialog'})
    },
    // 删除顾客
    *delCustomerById(action,{call,put}){
      yield call(axios.get,"/customer/deleteById",{params:{id:action.id}})
      yield put({type:'findAllCustomer'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delCustomerByIds(action,{call,put}){
      yield call(axios.post,'/customer/batchDelete',{ids:action.values})
      yield put({type:'findAllCustomer'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    AllCustomer(state,action){
      return{
        ...state,
        customerList:action.payload,
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