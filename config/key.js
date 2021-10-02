if(process.env.NODE_ENV === 'production') { //process.env.NODE_ENV 환경 변수인데, 이 환경 변수가 production (배포)라면.
    module.exports = require('./prod'); //  배포한 경우에는 prod에서 모듈을 exports한다.
} else {
    module.exports = require('./dev'); // 배포하지 않은 상황이라면 dev에서 모듈을 exports한다.
}

