const express = require('express')
const router = express.Router()
// app. listen(9999)
router.use(express.json())

let db = new Map()
var id = 1

router.post('/join', (req, res) => {

    if(req.body == {}) {
        res.status(400).json({
            message: `입력 확인 필요!!`
        })
    } else {
        const {userId} = req.body
        db.set(userId, req.body)
        res.status(201).json({
            message: `${db.get(userId).name} 님 환영합니다.`
        })
    }
})

router.post('/login', (req, res) => {
    // userId가 db에 저장되어있는가?
    const {userId, password} = req.body
    var loginInfo = {} // 중괄호 있으면 텅비어도 값있는거임.

    db.forEach(function(value, key) {
        console.log(value.userId)
        if(value.userId == userId) {
            loginInfo = value
        } 
    })
    
    //id 관련 
    if(existInfo(loginInfo)){
        if (loginInfo.password === password) {
            res.status(200).json({
                message : `${loginInfo.name}님 로그인 성공!`
            })
        } else {
            res.status(400).json({
                message : `비밀번호 확인해!`
            })
        }
    } else {
        res.status(404).json({
            message : `회원 정보가 없는디?`
        })
    }

    // id 객체 빈 객체 인지 아닌지 확인
    function existInfo(obj) {
        if(Object.keys(obj).length) {
            return true;
        } else {
            return false;
        }
    }

    // pw가 일치하는가?




})


router.get('/users', (req, res) => {
    let {userId} = req.body

    const userInfo = db.get(userId)

    if(userInfo){
        res.json({
            userId : userInfo.userId,
            name: userInfo.name
        })
    }else{
        res.status(404).json({
            message: "회원정보 없음."
        })
    }
})

router.delete('/users', (req, res) => {
    let {userId} = req.body

    const userInfo = db.get(userId)

    if(userInfo){
        res.status(404).json({
            message: "회원정보 없음."
        })
        db.delete(id)
        res.status(200).json({
            message: `다음에 또만나요 ${userInfo.name} 님!`
        })
    }else{
        res.status(404).json({
            message: "회원정보 없음."
        })
    }
})

module.exports = router
