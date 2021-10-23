import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage(props) {


    useEffect( () => {
        axios.get('/api/hello') // get 리퀘스트를 엔드포인트가 /api/hello 인곳에다가 보내는데, 
        .then(response => {console.log(response.data)}) // 보냈다가, 서버에서 돌아오면(index.js) 리스폰스를 콘솔창에 보여준다.
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    props.history.push("/login")
                } else {
                    alert('로그아웃에 실패했습니다.')
                }
            }) 
    }
    
    return (
        <div style={{display: 'flex', justifyContent: ' center', alignItems: 'center', width: "100%", height: '100vh'}}>
            <h2>시작페이지</h2>
            <br />
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default LandingPage
