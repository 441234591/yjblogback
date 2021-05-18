var express = require('express');
var router = express.Router();
const querySql = require("../db/index");

/* GET users listing. */
router.post('/register', async function(req, res, next) {
  let{username,password,nickname} = req.body;
  console.log(username);
  let user = await querySql('select * from user where username = ?',[username])
  if(!user || user.length === 0){
    await querySql('insert into user(username,password,nickname) value(?,?,?)',[username,password,nickname])
    res.send({code:0,msg:'注册成功'})
  }else{
    res.send({code:-1,msg:'该账号已注册'})
  }
});

module.exports = router;
