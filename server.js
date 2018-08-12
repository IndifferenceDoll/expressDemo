const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.static(path.resolve(__dirname)));
var sessionId = 'connected.id'
app.use(require('cookie-parser')())
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var user = []

function createCookie(){
    sessionId = Math.random().toString().substring(2,10)
    return sessionId
}

app.post('/login',(req,res)=>{
    if(req.body.username && req.body.password){
        let isExsis = user.some((val)=>{
            return val.username === req.body.username && val.password === req.body.password
        })
        if(isExsis){
            res.cookie('connected.id', createCookie())
            res.json({code:1})
        }else{
            res.json({code:0,info:'该账户未注册'})
        }
    }else{
        res.json({code:0,info:'账户及密码不可为空'})
    }
})

app.post('/register',(req,res)=>{
    if(req.body.username && req.body.password){
        let isRename = user.some((val)=>{
            return val.username === req.body.username
        })
        if(isRename){
            res.json({code:0,info:'该用户已注册'})
        }else{
            user.push(req.body)
            res.json({code:1})
        }
    }else{
        res.json({code:0,info:'账户及密码不可为空'})
    }
})

const server = app.listen('3000',()=>{
    console.log('服务已启动')
})