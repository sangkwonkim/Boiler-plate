import {
    LOGIN_USER
} from '../_actions/types'

// 리듀서를 만든다.
export default function (state, action) { // state는 previoustate, action은 user_action에서 보낸 것
    switch (action.type) { // type 종류가 많은데, 다른 타입별로 취할 조치를 정해준다.
        case LOGIN_USER:
            
            break;
    
        default:
            break;
    }
} 