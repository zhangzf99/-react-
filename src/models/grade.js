import axios from '../http/index'

export default{
  namespace:'grade',
  state:{
    gradeList:[],
    gradeLes:[],
    visible:false
  },

  effects:{
    // 查询所有的年级
    *getAllGrade(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/grade/findAllGrade")
      yield put({type:'reloadGrade',payload})
    },
    // 查询年级页面的所有的数据
    *findAll(action,{call,put}){
      // alert(1)
      let {data:payload} = yield call(axios.get,"/grade/findGradeLesson")
      // console.log(action)
      yield put({type:'reloadGradeLes',payload})
    },
    // 新增模态框
    *openDialog(action,{call,put}){
      // alert(2)
      yield put({type:'openAddDialog'})
    },
    // 关闭模态框
    *closeDialog(action,{call,put}){
      yield put({type:"closeAddDialog"})
    },
    // 保存年级
    *saveGrade(action,{call,put}){
      // alert(JSON.stringify(action.values))
      yield call(axios.post,"/grade/saveGrade",action.values)
      yield put({type:'closeDialog'})
      yield put({type:'findAll'})
    }
  },

  reducers:{
    reloadGrade(state,action){
      return{
        ...state,
        gradeList:action.payload
      }
    },
    reloadGradeLes(state,action){
      return{
        ...state,
        gradeLes:action.payload
      }
    },
    openAddDialog(state,action){
      return{
        ...state,
        visible:true,
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