/**
 * 关于post模块的测试用例
 */

//1. 新增功能
//正确的数据
exports.addCompleteCase = [
    {
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "simple title is ok",
        "content": "this is a simple content hhhhhhh",
    },
    {
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "simple title is ok",
        "content": "this is a simple content hhhhhhh",
    },
    {
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "simple title is ok",
        "content": "this is a simple content hhhhhhh",
    },
    {
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "simple title is ok",
        "content": "this is a simple content hhhhhhh",
    }
    // {
    //     //设置一些默认点赞数和浏览数
    //     "uid": "auth0|1110b5c4c61fd70077d2819d",
    //     "title": "simple title has some data ok?",
    //     "content": "clike me !",
    //     "numLikes": 10,
    //     "numViews": 10,
    // },
    // {
    //     //设置一些默认点赞数和浏览数，和有评论的数据
    //     "uid": "auth0|1110b5c4c61fd70077d2819d",
    //     "title": "welcome to crm system",
    //     "content": "crm system is ok , clike me !",
    //     "comments":[
    //         {
    //             "uid": "auth0|1110b5c4c61fd70077d2819d",
    //             "content": "first floor",
    //             "numLikes": 100
    //         },
    //         {
    //             "uid": "auth0|1110b5c4c61fd70077d2819d",
    //             "content": "second floor",
    //             "numLikes": 20
    //         },
    //         {
    //             "uid": "auth0|1110b5c4c61fd70077d2819d",
    //             "content": "third floor",
    //             "numLikes": 30
    //         }
    //     ]
    // }
];

//错误数据
exports.addErrorCase = [
    {
        //设置一些默认点赞数和浏览数为负数的
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "this is a error case",
        "content": "a error case ,is not should add in database",
        "numLikes": -1,
        "numViews": -10,
    },
    {
        ///设置一些默认点赞数和浏览数为小数的
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "this is a error case",
        "content": "a error case ,is not should add in database",
        "numLikes": 10.5,
        "numViews": 11.65,
    },
    {
        //缺少uid必填项
        "uid": "",
        "title": "this is a error case",
        "content": "a error case ,is not should add in database"
    },
    {
        //缺少title必填项
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "content": "this is a error case"
    },
    {
        //title 4个字符的
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "erro",
        "content": "a error case ,is not should add in database",
    },
    {
        //ttile超过100个字符的
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "Acceptance criteria refers to a set of predefined requirements that must be met in order to mark a ufdf",
        "content": "error case",
    },
    {
        //comments 格式不正确的
        "uid": "auth0|1110b5c4c61fd70077d2819d",
        "title": "error cese",
        "content": "refers to a set of predefined requirements that must be met in order to mark a usdfdsfds",
        "comments": [
            {
                "uid": "auth0|1110b5c4c61fd70077d2819d",
                "numLikes": 20
            },
        ]
    }
]

//2. 修改功能
//正确的数据
exports.updateCompleteCase = [
    {
        "title": "simple title is ok",
        "content": "this is a simple content hhhhhhh",
    },
    {
        //设置一些默认点赞数和浏览数
        "title": "simple title has some data ok?",
        "content": "clike me !",
        "numLikes": 10,
        "numViews": 10,
    },
    {
        //设置一些默认点赞数和浏览数，和有评论的数据
        "title": "welcome to crm system",
        "content": "crm system is ok , clike me !",
        "numLikes": 10,
        "numViews": 10,
        "solved": true,
        "comments":[
            {
                "uid": "auth0|1110b5c4c61fd70077d2819d",
                "content": "first floor",
                "numLikes": 100
            },
            {
                "uid": "auth0|1110b5c4c61fd70077d2819d",
                "content": "second floor",
                "numLikes": 20
            },
            {
                "uid": "auth0|1110b5c4c61fd70077d2819d",
                "content": "third floor",
                "numLikes": 30
            }
        ]
    }
];

//错误数据
exports.updateErrorCase = [
    {
        //设置一些默认点赞数和浏览数为负数的
        "title": "this is a error case",
        "content": "a error case ,is not should add in database",
        "numLikes": -1,
        "numViews": -10,
    },
    {
        ///设置一些默认点赞数和浏览数为小数的
        "title": "this is a error case",
        "content": "a error case ,is not should add in database",
        "numLikes": 10.5,
        "numViews": 11.65,
    },
    {
        //title 4个字符的
        "title": "erro",
        "content": "a error case ,is not should add in database",
    },
    {
        //ttile超过100个字符的
        "title": "Acceptance criteria refers to a set of predefined requirements that must be met in order to mark a ufdf",
        "content": "error case",
    },
    {
        //comments 格式不正确的
        "title": "error cese",
        "content": "refers to a set of predefined requirements that must be met in order to mark a usdfdsfds",
        "comments": [
            {
                "uid": "auth0|1110b5c4c61fd70077d2819d",
                "numLikes": 20
            },
        ]
    }
]
