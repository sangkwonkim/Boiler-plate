const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증처리를 하는 곳.

    // 클라이언트 쿠키에서 토큰을 가져온다. 쿠키 파서
    let token = req.cookie.x_auth;

    // 토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => { // token을 찾는 메소드를 만든다.
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true }) //유저가 없으면 인증 실패
        req.token = token;  //유저가 있으면 인증 완료 // 인덱스에서 req.token, req.user을 하게 되면. token과 user정보를 이용할 수 있다.
        req.user = user;
        next()
    })
    

    

}

module.exports = { auth };