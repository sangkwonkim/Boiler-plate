module.exports = {
    mongoURI: process.env.MONGO_URI // 클라우드 서비스에 db에 관한 정보를 넣어줄 때 사용한다. 
}

// 클라우드 서비스를 이용해서 배포한 후에 개발을 할 때, 클라우드에 몽고디비에 관한 정보를 줘야한다. 클라우드에서 직접 몽고디비의 정보를 처리해준다.