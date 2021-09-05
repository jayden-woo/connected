/**
 * 关于submissions模块的测试用例
 */

//1. 新增功能
//正确的数据
exports.addCompleteCase =
{
    "responses": [
        {
            "index": 0,
            "response": "because the sky is blue"
        },
        {
            "index": 1,
            "response": "red, green, blue"
        },
        {
            "index": 2,
            "response": "apple"
        }
    ]
}
    ;

//错误数据
exports.addErrorCase = [
    {
        //回答为空
        "responses": []
    },
    {
        //回答缺少index必填项
        "responses": [
            {
                "response": "error response"
            }
        ]
    },
    {
        //回答缺少response必填项
        "responses": [
            {
                "index": 0,
            }
        ]
    }
]