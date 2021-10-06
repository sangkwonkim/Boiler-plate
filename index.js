const express = require('express') //express js를 이용할 수 있다. express 에 들어가서 초기 form 을 복사해서 갖고 온다.
const app = express()               // app에서 express를 실행한다.
const port = 5000
const bodyParser = require('body-parser'); // 이 dependency는 클라이언트(웹 브라우저)와 서버가 통신할 때, 예를 들어 유저가 회원가입을 위해 정보를 입력하면 서버가 받아야 되는데 그때 body 데이터를 분석(parser)해서 req.body로 출력해준다.
const { User } = require("./models/User"); // user 앱에서 user정보를 갖고온다.
const cookieParser = require("cookie-parser")
const config = require('./config/key'); // key.js에서 정한 환경변수의 상태를 불러온다.
const { auth } = require('./middleware/auth');

// application/x-www-form-urlendcoded 이렇게 된 데이터를 서버에서 클라이언트에서 보낸 정보를 분석해서 가져올 수 있도록 함,
app.use(bodyParser.urlencoded({extended: true})); //바디파서가 클라이언트에서 오는 정보를 서버에서 분석해서 가져갈 수 있도록 하는 것.
// application/json 로 된 데이터를 서버에서 클라이언트에서 보낸 정보를 분석해서 가져올 수 있도록 함,
app.use(bodyParser.json());
app.use(express.json());;
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// mongoose는 간단하게 몽고db를 편하게 쓸 수 있는 object modeling tool이다.
// user의 정보가 몽고db 저장된다.
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, { // 데이터가 저장되는 몽고디비에 관한 사항이 기재된다. 
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...')) // 몽고db가 연결이 되면 출력
  .catch(err => console.log(err)) // 몽고db가 연결이 안되면 출력

app.get('/', (req, res) => res.send('hello world! what the hell is this')) // 루트 디렉토리에 해당 부분이 출력된다.

app.post('api/users/register', (req, res) => { 

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

app.post('api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {  // 몽고스에서 findOne 메소드를 이용
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            
            // 비밀번호까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => { // user.js에서 만든 generateToken 을 통해서 에러나 유저의 정보가 입력된다.
                if(err) return res.status(400).send(err); // 유저.js에서 받은 정보가 에러면 출력한다.
                //토큰은 쿠키나 로컬 스토리지에 저장할 수 있다. 저장소에 대한 논란은 많다. 각기 장단점이 있다. 쿠키는 쿠키파서를 다운받아야한다.
                res
                .cookie("x_auth", user.token) // 쿠키에 x-auth 가 생겨서 토큰이 들어간다.
                .status(200) // 성공했다는 표시
                .json({ loginSuccess: true, userId: user._id}) // 메세지를 전달한다.
            })
        })
    })
})

// role 0 일반 유저, 0이 아니면 관리자 
//authentication auth 라우트 - 페이지에 따라서 이용 가능한 유저가 다르기 때문에, 해당 유저가 이용 가능한지 여부를 확인하기 위해서
// auth 미들웨어를 통해서 유저 쿠키에 저장된 토큰을 서버에 가져와서 복화화를 한다.
 app.get('/api/users/auth', auth, (req, res) => {  
    //미들웨어를 통과를 했다면, authentictation이 tru
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
    })
 })


// 로그아웃 기능 => 로그아웃하는 유저를 데이터 베이스에서 찾아서 로그아웃하면 해당 토큰을 지워준다.
// auth를 통해서 인증을 할 때,클라이언트의 쿠키에서 토큰을 인증을 하는데, 데이터 베이스에 토큰이 없기 때문에 인증이 안되서 로그인 기능이 풀리게 된다.

app.get('/api/users/logout', auth, (req, res) => { // 로그아웃을 할 때, 로그인 된 상태기 때문에 auth를 넣어준다.
    User.findOneAndUpdate({_id: req.user._id}, // auth를 이용해서 user._id로 유저 찾는다. findOneAndUpdate 이거는 찾아서 그 상태를 업데이트 해준다(로그아웃) 
        { token: ""}
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }) 
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) //우리가 정한 port에서 실행한다.