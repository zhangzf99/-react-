import axios from '../http/index'
import {connect} from 'dva'

export default{
  namespace:'role',
  state:{
    roleList:[],
    visible:false,
    title:'',
    ids:[],
    // 存放一行的数据
    role:{},
    loading:true
  },

  effects:{
    // 查询所有的角色
    *findAllRoles(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/role/findAll")
      yield put({type:'AllRoles',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialog',payload})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialog',payload})
    },
    // 保存角色
    *saveRoles(action,{call,put}){
      yield call(axios.post,"/role/saveOrupdate",action.values)
      yield put({type:'findAllRoles'})
      yield put({type:'closeDialog'})
    },
    // 删除角色
    *delRole(action,{call,put}){
      yield call(axios.get,'/role/deleteById',{params:{id:action.id}})
      yield put({type:'findAllRoles'})
      yield put({type:'closeDialog'})
    },
    // 批量删除
    *delRoles(action,{call,put}){
      yield call(axios.post,'/role/batchDelete',{ids:action.values})
      yield put({type:'findAllRoles'})
      yield put({type:'closeDialog'})
    }
  },

  reducers:{
    AllRoles(state,action){
      return{
        ...state,
        allRoles:action.payload,
        loading:false
      }
    },
    openDialog(state,action){
      return{
        ...state,
        visible:true,
        title:'新增'
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

