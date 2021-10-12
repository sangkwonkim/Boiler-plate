import React, { useEffect } from 'react'
import axios from 'axios'
function LandingPage() {


    useEffect( () => {
        axios.get('/api/hello') // get 리퀘스트를 엔드포인트가 /api/hello 인곳에다가 보내는데, 
        .then(response => {console.log(response.data)}) // 보냈다가, 서버에서 돌아오면(index.js) 리스폰스를 콘솔창에 보여준다.
    }, [])
    

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
