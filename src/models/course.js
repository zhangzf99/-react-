import axios from '../http/index'

export default{
  namespace:'course',
  state:{
    courseList:[],
    visible:false
  },

  effects:{
    // 查询所有的课程
    *getAllCourse(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/course/findAllCourse")
      yield put({type:'recordCourse',payload})
    },

    // 打开模态框
    *openDialog(action,{call,put}){
      yield put({type:'openDialogVis',payload})
    },

    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:'closeDialogVis',payload})
    },

    // 保存
    *saveLesson(action,{call,put}){
      yield call(axios.post,"/course/saveCourse",action.values)
      yield put({type:"getAllCourse"})
      yield put({type:"closeDialogVis"})
    }
  },

  reducers:{
    recordCourse(state,action){
      return{
        ...state,
        courseList:action.payload
      }
    },
    openDialogVis(state,action){
      return{
        ...state,
        visible:true
      }
    },
    closeDialogVis(state,action){
      return{
        ...state,
        visible:false
      }
    }
  }
}