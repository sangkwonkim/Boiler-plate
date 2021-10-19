import React, {useState} from 'react'

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.target.value)
    }
    const onsubmitHandler = (event) => {

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

export default LoginPage
