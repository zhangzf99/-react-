import axios from '../http/index'

export default{
  namespace:'teacher',
  state:{
    teacherList:[],
    visible:false
  },

  effects:{
    // 查询所有的教师
    *getAllTeachers(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/teacher/findAllTeacher")
      yield put({type:"reloadTeacher",payload})
    },

    // 打开模态框
    *openTeacherModel(action,{call,put}){
      yield put({type:"openDialog"})
    },

    // 关闭模态框
    *closeTeacherDialog(action,{call,put}){
      yield put({type:"closeDialog"})
    },

    // 保存教师
    *saveTeacher(action,{call,put}){
      yield call(axios.post,"/teacher/saveTeacher",action.values)
      yield put({type:"closeTeacherDialog"})
      yield put({type:"getAllTeachers"})
    }
  },

  reducers:{
    reloadTeacher(state,action){
      return{
        ...state,
        teacherList:action.payload
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