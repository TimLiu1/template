
/**
  @apiGroup Charts
  @apiVersion 0.1.0
  @api {post} /charts/balances  图表数据
  
  @apiParam {String} coinId   
  @apiParam {Number} top   
  @apiParamExample {json} Request-Example:
    {
        "coinId":"z7XGKXBD",
        "top":10
    }

  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
  {
    "data": [
        {
            "key": "0xde5a57b9ba909c332cb7be7133ec29e228fb0286",
            "ratio": 0.4216696863636246,
            "value": 5313038047.76
        },
        {
            "key": "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
            "ratio": 0.07620989212351621,
            "value": 960244640.6800944
        }
    ],
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
  @apiGroup Charts
  @apiVersion 0.1.0
  @api {post} /charts/chartdata  单图数据请求
  
  @apiParam {Number} interval   
  @apiParam {Boolean} isTrend   
  @apiParam {Number} limit 
  @apiParam {Array} metrics 
  @apiParamExample {json} Request-Example:
    {
    "interval":54000000,
    "isTrend":true,
    "limit":5,
    "metrics":[
        {
            "compareTo":2592000001,
            "expression":"M_CR_[index:0]",
            "isRate":true,
            "hide":true,
            "name":"Diff"
        },
        {
            "expression":"M_CR_[index:0]",
            "isRate":true,
            "name":"Controlling"
        }
    ],
    "orderBy":{
        "metricIndex":0,
        "orderType":"DESC"
    },
    "timeRange":[
        1524219911655,
        1526811911655
    ]
}

  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
{
    "data": {
        "data": [
            [
                [
                    [
                        "r5XmpJlY",
                        1524219911655,
                        0.6110488265489538
                    ],
                    [
                        "r5XmpJlY",
                        1524273911655,
                        0.6110488265489538
                    ]
                ],
            ]
        ],
        "metrics": [
            {
                "name": "Diff",
                "expression": "M_CR_[index:0]"
            },
            {
                "name": "Controlling",
                "expression": "M_CR_[index:0]"
            }
        ],
        "coins": [
            "r5XmpJlY",
            "z7XGKXBD",
            "97X50JQP",
            "OV14wkE4",
            "v31Z9kda"
        ]
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
  @apiGroup Charts
  @apiVersion 0.1.0
  @api {get} /charts/coins  获取代币 (包括代币所包含的配置项)

  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
  {
    "data": [
        {
            "id": "GjXdqwkv",
            "type": "Token",
            "platform": "ETH",
            "name": "Augur",
            "symbol": "REP",
            "contractAddress": null,
            "circulatingSupply": 11000000,
            "maxSupply": 11000000,
            "decimals": 18,
            "crawlerConfigs": [
                {
                    "id": "qVkOZ5Xr",
                    "type": "data_coin_market_stat",
                    "config": {
                        "processAt": 0
                    },
                    "enable": true
                }
            ]
        },
        {
            "id": "E813pEJ6",
            "type": "Coin",
            "platform": "XZC",
            "name": "ZCoin",
            "symbol": "XZC",
            "contractAddress": null,
            "circulatingSupply": 4789955,
            "maxSupply": 21400000,
            "decimals": 18,
            "crawlerConfigs": [
                {
                    "id": "A7kR2lk3",
                    "type": "data_coin_market_stat",
                    "config": {
                        "processAt": 0
                    },
                    "enable": true
                },
                {
                    "id": "xKJK7wJr",
                    "type": "exchange_coin_market_sync",
                    "config": {
                        "pairSymbol": "XZC/BTC",
                        "startSyncAt": 0,
                        "lastSyncAt": 0
                    },
                    "enable": false
                }
            ]
        }
    ],
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
  @apiGroup Charts
  @apiVersion 0.1.0
  @api {get} /charts/coins/:coinId  获取单个代币信息
    
  
  @apiParam {String} coinId    
  @apiParamExample {json} Request-Example:
    /charts/coins/zmkewJ2a

  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
  {
    "data": {
        "id": "zmkewJ2a",
        "type": "Token",
        "platform": "ETH",
        "name": "Kyber Network",
        "symbol": "KNC",
        "contractAddress": "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
        "circulatingSupply": 134132697,
        "maxSupply": 215625349,
        "decimals": 18,
        "crawlerConfigs": [
            {
                "id": "EOkbnVkm",
                "type": "exchange_coin_market_sync",
                "config": {
                    "pairSymbol": "KNC/BTC",
                    "startSyncAt": 1506398400000,
                    "lastSyncAt": 1526819700000
                },
                "enable": true
            },
            {
                "id": "v31ZNW1d",
                "type": "eth_coin_transfer",
                "config": {
                    "lastSyncAt": 1508000100000,
                    "startAt": 1505194280000
                },
                "enable": true
            },
            {
                "id": "BQ1p6rXW",
                "type": "data_coin_market_stat",
                "config": {
                    "processAt": 1526819100000
                },
                "enable": true
            },
            {
                "id": "Do1rzj1g",
                "type": "exchange_coin_market_stat_process",
                "config": {
                    "processAt": 1526819100000
                },
                "enable": false
            }
        ]
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

