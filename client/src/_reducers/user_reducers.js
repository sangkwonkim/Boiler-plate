import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types' // 타입을 액션에서 저장하고 타입을 불러와서 활용한다.

// 리듀서를 만든다.
export default function (state = {}, action) { // state는 previoustate, action은 user_action에서 보낸 것
    switch (action.type) { // type 종류가 많은데, 다른 타입별로 취할 조치를 정해준다.
        case LOGIN_USER:
            return { ...state, loginSucess: action.payload} // user_action에서 payload를 갖고온다.
            break;
        case REGISTER_USER:
            return {...state, register: action.payload}
            break;
        case AUTH_USER:
            return {...state, userData: action.payload}
            break;
        default:
            return state;
    }
} 