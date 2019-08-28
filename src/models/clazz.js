import axios from '../http/index'

export default{
  namespace:"clazz",
  state:{
    clazzList:[],
    clazzListById:[]
  },

  effects:{
    // 查询所有的班级
    *getAllClazz(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/clazz/findAllClazz")
      yield put({type:'reloadClazzList',payload})
    },
    // 根据年级id查询该年级下的班级
    *getClazzById(action,{call,put}){
      // alert(JSON.stringify(action.value))
      // console(action)
      // console(action.id)
      let {data:payload} = yield call(axios.get,"/clazz/findClazzById",{params:{id:action.value}})
      yield put({type:'reloadClazzById',payload})
    }
  },

  reducers:{
    reloadClazzList(state,action){
      return{
        ...state,
        clazzList:action.payload
      }
    },
    reloadClazzById(state,action){
      return{
        ...state,
        clazzListById:action.payload
      }
    }
  }
}