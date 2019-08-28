import axios from '../http/index'
import {connect} from 'dva'

export default {
  namespace:'user1',
  state:{
    userList:[],
    visible:false,
    title:'',
    // 批量删除ids
    ids:[],
    // 修改时用户信息存放
    userInfo:{},
    loading:true
  },

  effects:{
    // 查询所有的学生
    *getAllUser(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/user/findAllWithRole")
      // console.log('=====',payload),
      yield put({type:'reloadUserList',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存用户
    *saveUser(action,{call,put}){
      yield call(axios.post,"/user/saveOrupdate",action.values)
      yield put({type:'getAllUser'})
      yield put({type:'closeDialog'})
    },
    // 删除用户
    *delUser(action,{call,put}){
      // console.log('=====',action.values)
      yield call(axios.get,"/user/deleteById",{params:{id:action.values}})
      yield put({type:'getAllUser'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delUsers(action,{call,put}){
      yield call(axios.post,"/user/batchDelete",{ids:action.values})
      yield put({type:'getAllUser'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    reloadUserList(state,action){
      return{
        ...state,
        userList:action.payload,
        loading:false
      }
    },
    openDialog(state,action){
      return{
        ...state,
        visible:true,
        title:'新增用户'
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