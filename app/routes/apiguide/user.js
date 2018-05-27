
/**
  @apiGroup User
  @apiVersion 0.1.0
  @api {post} /users/sendCode   验证码
  
  @apiParam {String} email   
  @apiParam {Number} type  1-注册 2-重置密码 3-绑定手机 4-绑定邮箱 
  @apiParamExample {json} Request-Example:
    {
      type:1, 
      phone:"18818216454",
      countryCode:'86'
    }
    or
    {
      "email": "947375565@qq.com",
      type: 1
    }
 
 
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
  {
    msg:"success",
    "code": 200
}  


  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 
 */



/**
  @apiGroup User
  @apiVersion 0.1.0
  @api {post} /users/register     用户注册
  
  @apiParam {String} email    email phone 2 选 1
  @apiParam {String} phone
  @apiParam {Number} password    密码
  @apiParam {String} code    验证码
  @apiParam {String} uuid    分享人的标识,点分享注册时需要带上(如果没有, 可不传)
  @apiParamExample {json} Request-Example:
    {
         email:'995332120@qq.com',
         password: 'abc123',
         code: "2342",
         uuid:"2345jcnsaicba"
    }
 
 
 
  @apiSuccess {Number} id                  用户编号
  @apiSuccess {String} name                用户注册名
  @apiSuccess {String} email               注册邮箱
  @apiSuccess {Number} phone              用户状态
  @apiSuccess {String} gender              性别
  @apiSuccess {String} photo               照片
  @apiSuccess {Number} userTypeID          用户类型编号
  @apiSuccess {String} userType            用户类型
  @apiSuccess {Number} roleID              角色编号
  @apiSuccess {Number} roleName            角色名称
  @apiSuccess {String} countryCode         国家代码
  @apiSuccess {String} countryCodeName     国家名称
  @apiSuccess {String} createdAt          注册日期
  @apiSuccess {String} updatedAt           修改日期
  @apiSuccess {String} lastEditUserName     修改人
 
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
  {
        "data": {
            "id": 1,
            "name": "tim",
            "email": "995332120@qq.com",
            "phone": "18818216454",
            "age": 24,
            "address": "上海市浦东新区                                                                                                                                                                                                                                                                                                     ",
            "token": 'qwexsdcasddc.casdcasdca.cascadca',
            "password": null,
            "createdAt": "2018-04-27T16:00:00.000Z",
            "updatedAt": "2018-04-27T16:00:00.000Z",
            "usertype": 1,
            "roleName": "普通用户                                                                                                ",
            "countryCode": "86                                                                                                  ",
            "countryCodeName": "中国                                                                                                  ",
            "roleID": null
        }
    "code": 200
}
 
  @apiError code   错误代码
  @apiError msg   错误描述
  @apiError values   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误.",
        values:{left:1,right:2}
      }
 
 */



/**
  @apiGroup User
  @apiVersion 0.1.0
  @api {post} /users/login     用户登录
  
  @apiParam {String} phone    email phone 2 选 1
  @apiParam {String} email    
  @apiParam {Number} password    密码
  @apiParamExample {json} Request-Example:
    {
       email:'995332120@qq.com',
         password: 'abc123'
    }
 
 
 
  @apiSuccess {Number} id                  用户编号
  @apiSuccess {String} name                用户注册名
  @apiSuccess {String} email               注册邮箱
  @apiSuccess {Number} phone              用户状态
  @apiSuccess {String} gender              性别
  @apiSuccess {String} photo               照片
  @apiSuccess {Number} userTypeID          用户类型编号
  @apiSuccess {String} userType            用户类型
  @apiSuccess {Number} roleID              角色编号
  @apiSuccess {Number} roleName            角色名称
  @apiSuccess {String} countryCode         国家代码
  @apiSuccess {String} countryCodeName     国家名称
  @apiSuccess {String} createdAt          注册日期
  @apiSuccess {String} updatedAt           修改日期
  @apiSuccess {String} lastEditUserName     修改人
 
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
  {
    "data": {
            "id": 1,
            "name": "tim",
            "email": "995332120@qq.com",
            "phone": "18818216454",
            "age": 24,
            "address": "上海市浦东新区                                                                                                                                                                                                                                                                                                     ",
            "token": 'qwexsdcasddc.casdcasdca.cascadca',
            "password": null,
            "createdAt": "2018-04-27T16:00:00.000Z",
            "updatedAt": "2018-04-27T16:00:00.000Z",
            "usertype": 1,
            "roleName": "普通用户                                                                                                ",
            "countryCode": "86                                                                                                  ",
            "countryCodeName": "中国                                                                                                  ",
            "roleID": null
    },
    "code": 200
}
 
  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 */



/**
  @apiGroup User
  @apiVersion 0.1.0
  @api {post} /users/forgotPassword 忘记密码
  
  @apiParam {Number} email    email
  @apiParam {Number} code     认证code
  @apiParam {Number} phone    电话
  @apiParam {Number} newPassword    新密码
  @apiParamExample {json} Request-Example:
{
	"email": "947375565@qq.com",
	"code": "498681",
	"newPassword": "Ljq123123"
}
 
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
  {
    "data": {
        "address": null,
        "token": null,
        "password": "a977d90d97dd7cff62efc57b20baf35b",
        "createdAt": "2018-05-10T13:07:38.818Z",
        "updatedAt": "2018-05-10T13:14:05.378Z",
        "usertype": null,
        "roleName": null,
        "countryCode": null,
        "countryCodeName": null,
        "roles": null,
        "id": 10,
        "name": null,
        "phone": null,
        "age": null,
        "email": "947375565@qq.com                                                                                    "
    },
    "code": 200
}
 
  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 */




/**
  @apiGroup User
  @apiVersion 0.1.0 
  @api {post} /users/changeEmailOrPhone      修改email或则phone
  
  @apiParam {Number} email    email
  @apiParam {Number} code     认证code
  @apiParam {Number} phone    电话
  @apiParam {Number} type     1-注册 2-重置密码 3-绑定手机 4-绑定邮箱 
  @apiParamExample {json} Request-Example:
 {
   code:"213233",
   email:"995332120@qq.com"
   type: 4
 }

  @apiSuccess {Number} id                  用户编号
  @apiSuccess {String} name                用户注册名
  @apiSuccess {String} email               注册邮箱
  @apiSuccess {Number} phone              用户状态
  @apiSuccess {String} gender              性别
  @apiSuccess {String} photo               照片
  @apiSuccess {Number} userTypeID          用户类型编号
  @apiSuccess {String} userType            用户类型
  @apiSuccess {Number} roleID              角色编号
  @apiSuccess {Number} roleName            角色名称
  @apiSuccess {String} countryCode         国家代码
  @apiSuccess {String} countryCodeName     国家名称
  @apiSuccess {String} createdAt          注册日期
  @apiSuccess {String} updatedAt           修改日期
  @apiSuccess {String} lastEditUserName     修改人
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
  {
    "data": {
            "id": 1,
            "name": "tim",
            "email": "995332120@qq.com",
            "phone": "18818216454",
            "age": 24,
            "address": "上海市浦东新区                                                                                                                                                                                                                                                                                                     ",
            "token": 'qwexsdcasddc.casdcasdca.cascadca',
            "password": null,
            "createdAt": "2018-04-27T16:00:00.000Z",
            "updatedAt": "2018-04-27T16:00:00.000Z",
            "usertype": 1,
            "roleName": "普通用户                                                                                                ",
            "countryCode": "86                                                                                                  ",
            "countryCodeName": "中国                                                                                                  ",
            "roleID": null
    },
    "code": 200
}
 
  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 */


/**
  @apiGroup User
  @apiVersion 0.1.0 
  @api {get} /users/shareInfo      获取分享信息
  
  @apiSuccess {Number} shareUrl            分享url 
  @apiSuccess {String} qrCode              分享二维码
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
  {
    "data": {
        "shareUrl": "http://d.blocktrending.com/register?uuid=ad4eb5fdc7148023a6f4bde3e972e15c",
        "qrCode": "http://d.blocktrending.com/public/user/ad4eb5fdc7148023a6f4bde3e972e15c/ad4eb5fdc7148023a6f4bde3e972e15c.png"
    },
    "code": 200
}
 
  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 */


/**
  @apiGroup User
  @apiVersion 0.1.0 
  @api {post} /users/inviteList     获取邀请日志

  @apiParamExample {json} Request-Example:
  {
    
  }

 
  @apiSuccess {Number} inviteId            邀请人id 
  @apiSuccess {Number} invitedId            被邀请人id 
  @apiSuccess {String} id                    id
  @apiSuccess {String} createdAt              注册时间
  @apiSuccess {String} updatedAt              更新时间
  @apiSuccess {String} point                  bt奖励
  @apiSuccess {String} type                  1-邀请奖励
  @apiSuccess {String} invitedName              被邀请人
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
 {
    "data": {
        "data": [
            {
                "inviteId": 20,
                "invitedId": 21,
                "id": 2,
                "createdAt": "2018-05-15T16:00:00.000Z",
                "updatedAt": "2018-05-15T16:00:00.000Z",
                "point": 20,
                "type": 1,
                "registerType": 2,
                "invitedName": "18818***@163.com                                                                                    "
            },
            {
                "inviteId": 20,
                "invitedId": 22,
                "id": 3,
                "createdAt": "2018-05-15T16:00:00.000Z",
                "updatedAt": "2018-05-15T16:00:00.000Z",
                "point": 20,
                "type": 1,
                "registerType": 1,
                "invitedName": "188******59                                                                                         "
            }
        ],
        totalPoints:120,
        "count": "2"
    },
    "code": 200
}
 
  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 */


/**
  @apiGroup User
  @apiVersion 0.1.0
  @api {post} /users/resetPassword   重置密码
  
  @apiParam {String} oldPassword 原先的密码   
  @apiParam {String} newPassword  新密码
  @apiParamExample {json} Request-Example:
    {
      'oldPassword': 'qq123123',
      'newPassword': 'Ljq123123'
    }
 
 
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
  {
    msg:"success",
    "code": 200
}  


  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 
 */
