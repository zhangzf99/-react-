import axios from '../http/index'
import { connect } from 'dva'

export default{
  namespace:'repository',
  state:{
    repositoryList:[]
  },

  effects:{
    // 获取所有的仓库及产品
    *findAllRepository(action,{call,put}){
      let {data:payload} = yield call(axios.get,"/repository/findAll")
      // console.log(payload)
      yield put({type:'allRepository',payload})
    }
  },

  reducers:{
    allRepository(state,action){
      return{
        ...state,
        repositoryList:action.payload
      }
    }
  }
}