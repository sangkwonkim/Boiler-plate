const mongoose = require('mongoose'); // 몽구스 모듈을 가져온다.
const bcrypt = require('bcrypt'); // 비밀번호를 암호화 하기 위해 다운받은 비크립트를 가져온다.
const saltRounds = 10; // 비크립트에서는 salt를 이용해서 비밀번호를 암호화하기 때문에서 salt를 먼저 생성해야한다(아래에 gensalt). saltrounds는 salt의 글자수를 정한다.
const jwt = require('jsonwebtoken'); // 토큰을 만드는 라이브러리

// 스키마를 이용해서 user의 정보에 대해서 지정을 한다.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 이메일 상에 스페이스 공란이 있을 경우 없애준다.
        unique: 1 // 동일한 이메일을 쓸 수 없도록 유니크하게 해준다.
    },
    password: {
        type: String
    },
    role: { // 유저가 관리자가 될 수도 있기 떄문에 만들어 놓는다.
        type: Number,
        default: 0 // 롤을 따로 지정하지 않을 경우 기본값으로 0이 된다.
    },
    image: String,

    token: { // 이 토큰을 이용해서 유효성을 관리 할 수 있다.
        type:String
    },
    tokenExp: { // 토큰의 유효기간 
        type: Number
    }
})

userSchema.pre('save', function( next ){ //몽구스에서 pre라는 메소드를 가져오는데, 이거는 파라미터로 받는 save를 하기 전에 유저 스키마에 함수를 진행을 한다.
    //비밀번호를 암호화 시킨다.
    var user = this;

    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) { //비크립트에서는 salt를 이용해서 비밀번호를 암호화하기 때문에서 gensalt를 이용해서 salt를 먼저 생성해야한다.
            if(err) return next(err) // 만약에 에러가 발생하면 세이브 다음 넥스트가 가는 부분에서 에러를 호출한다.

            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err)
                user.password = hash // 입력된 패스워드를 해쉬로 암호화 해준다.
                next() // 해쉬한 후 넥스트로 넘어간다.
            });
        });
    } else {
        next() // 다른 걸 바꿀 때에는 바로 넥스트를 걸어준다.
    }
})




userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainpassword와 데이터 베이스에 암호화된 비밀번호와 같은 지 확인.
    // 플레인 페스워드를 암호화해서 확인한다.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) { //plainpassword는 유저가 입력한 비번, this는 저장된 비밀번호
        if (err) return cb(err) // 에러라면은 콜백함수도 에러로 리턴
        cb(null, isMatch) // 아니면 에러는 널값, ismatch하다는 걸 알려준다.
    }) 
}
//토큰 만드는 메소드 생성
userSchema.methods.generateToken = function(cb) {

    var user = this;
    //jsonwebtoken을 이용해서 토큰을 생성하기.
    var token  = jwt.sign(user._id.toHexString(), 'secretToken') //jsonwebtoken의 사인이라는 메소드를 이용해서 토큰을 만든다. user._id는 몽고디비에서 저장된 아이디, secretToken 값을 이용해서 토큰을 생성한다. secretToken를 이용하면 토큰에서 유저 아이디를 확인할 수 있다.
    
    // 생성해서 유저의 토큰 부분에 넣어준다.
    user.token = token

    user.save(function(err, user) {
        if(err) return cb(err) // 에러가 뜨면 index 의 gererateToken에 에러를 전달한다. 
        cb(null, user) // 정상적으로 저장이 되면 에러는 널이고, 유저의 정보만 전달한다.
    })

    //user._id + 'secretToken' = token
    //->
    //secretToken -> user._id
}


// 클라이언트에서 가져온 토큰을 복호화 한다.
userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // 토큰 복호화.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는 지 확인.
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
    
}


const User = mongoose.model('User', userSchema) // 모델은 스키마를 감싸주는 역할.

module.exports = { User }