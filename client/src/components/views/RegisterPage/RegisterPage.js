import React, {useState} from 'react'
import { useDispatch } from 'react-redux' // 리덕스에서 디스패치로 액션이 취해지고 스테이트가 변경된다. 먼저 디스패치를 보낸다.
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.target.value)
    }
    const onNameHandler = (event) => {
        setName(event.target.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.target.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value)
    }

    const onsubmitHandler = (event) => {
        event.preventDefault(); // 이게 없으면 버튼을 눌럿을 때 리프레쉬가 된다. => 추가적인 작업들이 진행이 안된다.
        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body = {
            email: Email,
            password: Password,
            name: Name,
        }
        dispatch(registerUser(body)) // 로그인 유저라는 액션을 진행하기 위해서 작업
            .then(response => {
                if(response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }



    return (
        <div style={{display: 'flex', justifyContent: ' center', alignItems: 'center', width: "100%", height: '100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onsubmitHandler}>
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}></input>
                <label>Name</label>
                <input type='text' value={Name} onChange={onNameHandler}></input>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}></input>
                <label>Confirm Password</label>
                <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br />
                <button type='submit'>
                    회원 가입
                </button>
            </form>
        </div>
    )
}


export default RegisterPage