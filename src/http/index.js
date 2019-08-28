import axios from 'axios'

import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:8888'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



// 请求拦截器，在请求发送之前进行拦截,作用是改变一些配置信息
axios.interceptors.request.use(function (config) {    
    // console.log('~~~',config);
    // 必须返回配置信息  
    qs.stringify()
    // 将对象序列化成URL的形式，以&进行拼接
    if(config.method==="post") {
         config.data =qs.stringify(config.data,{arrayFormat:"repeat"})
    }  
	return config;  
})

// 在响应刚刚回来，处理response

axios.interceptors.response.use(function (response) {
    //不懂时去看console.log(response);
    //console.log(response);
      
      response.status=response.data.status;
      response.statusText=response.data.message;
      response.data=response.data.data; //因为axios返回的数据还包着一层data
      return response;
})

export default axios;