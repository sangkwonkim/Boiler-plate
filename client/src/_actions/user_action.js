import axios from 'axios'
import {
    LOGIN_USER
} from './types'
// 로그인 페이지에서 보냈던 dispatch(loginUser(body))를 loginUser(dataToSubmit)로 받는다.
export function loginUser(dataToSubmit) {
    // 로그인 액션
    const request = axios.post('/api/users/login', dataToSubmit) // 서버에 클라이언트 입력 내용을 보낸다. index.js에서 만들어놓은 로그인 api에다가 보낸다.
    .then(response =>  response.data )// 리덕스를 이용 안하면 로그인페이지에서 이렇게 구현해서 서버로 바로 요청할 수 있다.
        // 서버에서 받은 데이터를 리퀘스트에 할당해준다.
    return { // 리듀서로 보내서 {previousState, action} => nextState 가 처리 될 수 있도록 한다. 단. action은 type과 response 이뤄진객체
        type: LOGIN_USER,
        payload: request
    }
}