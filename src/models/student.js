import axios from '../http'
import { connect } from 'dva';

export default {
  namespace:"student",
  state:{
    studentList:[],
    visible:false,
    title:''
  },

  effects:{
    // 查询所有的学生
    *getAllStudent(action,{call,put}){
      // ajax查询
      let {data:payload} = yield call(axios.get,"/student/findAllStudent")
      // 刷新
      yield put({type:'reloadList',payload})
    },
    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openAddDialog'})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeAddDialog'})
    },
    // 保存学生信息
    *saveStudent(action,{call,put}){
      // alert(JSON.stringify(action))
      yield call(axios.post,"/student/saveStudent",action.values)
      yield put({type:'getAllStudent'})
      yield put({type:'closeDialog'})
    },
    // 删除学生
    *delStudent(action,{call,put}){
      // alert(JSON.stringify(action.id))
      console.log(action.id)
      yield call(axios.post,"student/deleteStudentById",{id:action.id})
      yield put({type:'getAllStudent'})
    }
  },

  reducers:{
    reloadList(state,action){
      return{
        ...state,
        list:action.payload
      }
    },
    openAddDialog(state,action){
      return{
        ...state,
        visible:true,
        title:'新增模态框'
      }
    },
    closeAddDialog(state,action){
      return{
        ...state,
        visible:false
      }
    }
  }
}