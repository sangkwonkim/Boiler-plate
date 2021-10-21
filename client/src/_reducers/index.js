import { combineReducers } from "redux"; // 리덕스 스토어에서 다양한 리듀서를 콤바인리듀서를 통해서 관리한다.
import user from './user_reducers';

const rootReducer = combineReducers({
    user 
})

export default rootReducer;