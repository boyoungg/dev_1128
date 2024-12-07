const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

router.post('/join', (req, res) => {
    if(req.body == {}) {
        res.status(400).json({
            message: `입력 확인 필요!!`
        })
    } else {
        const {email, name, password, contact} = req.body

        let sql =   `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
        let infovalues = [email, name, password, contact]   
        conn.query(
            sql , infovalues, 
            function (err, results) {
                res.status(201).json(results)
            }
        );
    }
})

router.post('/login', (req, res) => {
    const {email, password} = req.body

    let sql =  `SELECT * FROM users WHERE email = ?`
    conn.query(
        sql, email,
        function (err, results) {
            var  loginInfo = results[0]

            if(loginInfo && loginInfo.password === password) {
                res.status(200).json({
                    message : `로그인 성공!`
                })
            }
            else{
                res.status(400).json({
                    message : `이메일 또는 비밀번호 확인해!`
                })
            }
        }
    );
})


router
    .route('/users')
    .get((req, res) => {
        let {email} = req.body

        let sql =  `SELECT * FROM users WHERE email = ?`
        conn.query(
            sql , email,
            function (err, results) {
                if(results.length) {
                    res.status(200).json(results)
                }else {
                    res.status(404).json({
                        message: "회원정보 없음."
                    })
                }
            }
        );

    })
    .delete((req, res) => {
        let {email} = req.body
        
        let sql = `DELETE FROM users WHERE email = ?`
        conn.query(
            sql, email, 
            function (err, results) {
                res.status(200).json({
                    message: '회원삭제 성공'
                })
            }
        );

    })



module.exports = router
