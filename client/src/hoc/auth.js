import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import { dispatch } from 'rxjs/internal/observable/range'
import { auth } from '../_actions/user_action'
import { response } from 'express'

export default function(SpecificComponent, option, adminRoute = null) {

    // option에서 null => 아무나 출입 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지
    // adminRoute admin 유저만 들어갈 수 있는 페이지는 true로 지정해줄 수 있다(아직은 구현x)
    
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        useEffect(() => { // 백엔드에 유저의 상태를 받는다. 로그인한 유저는 로그인페이지 방문x는 등 페이지 방문의 제한을 걸기 위해서 상태를 받음
            

            dispatch(auth()).then(response => { 
                // 로그인 한 사람은 로그인 페이지에 가려고 하면 분기시킨다.

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option) { // 로그인한 유저만 갈 수 있는 페이지를 가려고 할 때,
                        props.history.push('/login')
                    }
                } else { // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) { //admin 유저가 아닌데 admin 유저만 이용할 수 있는 페이지에 가려고 할때
                        props.history.push('/')
                    } else { // 로그인한 유저가 로그인 페이지나 레지스터 페이지에 가려고 할 때,
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }

            })
            
            Axios.get('/api/users/auth')
            
        }, [])

        return (
            <SpecificComponent />
        )
    }
    
    return AuthenticationCheck
}