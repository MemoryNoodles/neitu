import fetch from '../utils/fetch';
import * as C from './interface';
 
const handleFetch = (
  url: string, //请求路径
  params: object = {}, //请求参数
  method: string = 'GET', //请求方式  GET or POST
  useToken: boolean = false, //是否需要token
) => {
 
  return fetch({
    method,
    useToken,
    url: url,
    data: params,
  });
};

const apiFun: any = {
  testApi: (params: object = {}) => handleFetch(C.TEST_API, params), //示例接口调用函数
   
};
export default apiFun;
