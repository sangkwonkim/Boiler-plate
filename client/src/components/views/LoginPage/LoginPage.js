import React, {useState} from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux' // 리덕스에서 디스패치로 액션이 취해지고 스테이트가 변경된다. 먼저 디스패치를 보낸다.
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {

    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.target.value)
    }
    const onsubmitHandler = (event) => {
        event.preventDefault(); // 이게 없으면 버튼을 눌럿을 때 리프레쉬가 된다. => 추가적인 작업들이 진행이 안된다.
        
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) // 로그인 유저라는 액션을 진행하기 위해서 작업
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push("/") //리액트에서 페이지 이동에 이렇게 사용
                } else {
                    alert('Error')
                }
            })

    }
    return (
        <div style={{display: 'flex', justifyContent: ' center', alignItems: 'center', width: "100%", height: '100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onsubmitHandler}>
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}></input>
                <br />
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
// email:sangkwon2406@naver.com
// password:1234