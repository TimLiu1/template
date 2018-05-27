/**
  @apiGroup point
  @apiVersion 0.1.0
  @api {post} /point/getPointRecords   分裂邀请收益明细
  

  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
{
    "data": {
        "data": [
            {
                "id": 27,
                "userId": 16,
                "type": 1,
                "point": 2000,
                "createdAt": "2018-05-23T16:26:57.324Z",
                "updatedAt": "2018-05-23T16:26:57.324Z",
                "remark": "注册奖励",
                "level": null
            }
        ],
        "count": 1
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