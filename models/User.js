const mongoose = require('mongoose'); // 몽구스 모듈을 가져온다.
const bcrypt = require('bcrypt'); // 비밀번호를 암호화 하기 위해 다운받은 비크립트를 가져온다.
const saltRounds = 10; // 비크립트에서는 salt를 이용해서 비밀번호를 암호화하기 때문에서 salt를 먼저 생성해야한다(아래에 gensalt). saltrounds는 salt의 글자수를 정한다.
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
        type: String,
        maxlength: 50
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
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    }
})

const User = mongoose.model('User', userSchema) // 모델은 스키마를 감싸주는 역할.

module.exports = { User }