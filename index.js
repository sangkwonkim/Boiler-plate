const express = require('express') //express js를 이용할 수 있다. express 에 들어가서 초기 form 을 복사해서 갖고 온다.
const app = express()               // app에서 express를 실행한다.
const port = 5000
const bodyParser = require('body-parser'); // 이 dependency는 클라이언트(웹 브라우저)와 서버가 통신할 때, 예를 들어 유저가 회원가입을 위해 정보를 입력하면 서버가 받아야 되는데 그때 body 데이터를 분석(parser)해서 req.body로 출력해준다.
const { User } = require("./models/User"); // user 앱에서 user정보를 갖고온다.

const config = require('./config/key'); // key.js에서 정한 환경변수의 상태를 불러온다.

// application/x-www-form-urlendcoded 이렇게 된 데이터를 서버에서 클라이언트에서 보낸 정보를 분석해서 가져올 수 있도록 함,
app.use(bodyParser.urlencoded({extended: true})); //바디파서가 클라이언트에서 오는 정보를 서버에서 분석해서 가져갈 수 있도록 하는 것.
// application/json 로 된 데이터를 서버에서 클라이언트에서 보낸 정보를 분석해서 가져올 수 있도록 함,
app.use(bodyParser.json());
app.use(express.json());;
app.use(express.urlencoded({extended: true}));

// mongoose는 간단하게 몽고db를 편하게 쓸 수 있는 object modeling tool이다.
// user의 정보가 몽고db 저장된다.
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { // 데이터가 저장되는 몽고디비에 관한 사항이 기재된다. 
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...')) // 몽고db가 연결이 되면 출력
  .catch(err => console.log(err)) // 몽고db가 연결이 안되면 출력

app.get('/', (req, res) => res.send('hello world! what the hell is this')) // 루트 디렉토리에 해당 부분이 출력된다.

app.post('/register', (req, res) => { 

// 회원가입할 때 필요한 정보들을 클라이언트에서 가져오면
// 그 정보들을 데이터 베이스에 저장한다. 
    const user = new User(req.body) // user를 이용해서 인스턴스를 만들어 준다. 데이터 베이스 넣기 위함. req.body 안에는 json 형태로 유저 정보가 들어있음. - 바디파서의 기능
    user.save((err, userInfo) => { //save는 몽고db에서 오는 메소드.  req.body정보가 저장되어서 유저 모델에 저장이 됨.
        if(err) return res.json({ success: false, err}) //저장 중에 에러가 있다면, 제이슨 형식으로 클라이언트에게 전달.
        return res.status(200).json({ // 성공을 하면, status(200)은 성공했다는 표시로 제이슨 형식으로 전달.
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) //우리가 정한 port에서 실행한다.