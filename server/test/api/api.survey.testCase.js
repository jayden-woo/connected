/**
 * 关于survey模块的测试用例
 */

//1. 新增功能
//正确的数据
exports.addCompleteCase = [
    {
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            },
            {
                "index": 1,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
                "choices": ["red", "green", "blue"]
            },
            {
                "index": 2,
                "questionType": "multiple answer",
                "question": "How many fruits does hava",
                "choices": ["apple", "banana"]
            },
        ]
    },
    {
        //不可见
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            },
            {
                "index": 1,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
                "choices": ["red", "green", "blue"]
            },
            {
                "index": 2,
                "questionType": "multiple answer",
                "question": "How many fruits does hava",
                "choices": ["apple", "banana"]
            },
        ],
        "visible": false,
    }
]

//错误数据
exports.addErrorCase = [
    {
        //缺少creator必填项
        "title": "this is a error case",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            },
            {
                "index": 1,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
                "choices": ["red", "green", "blue"]
            },
            {
                "index": 2,
                "questionType": "multiple answer",
                "question": "How many fruits does hava",
                "choices": ["apple", "banana"]
            },
        ]
    },
    {
        //缺少title 必填项
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            },
            {
                "index": 1,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
                "choices": ["red", "green", "blue"]
            },
            {
                "index": 2,
                "questionType": "multiple answer",
                "question": "How many fruits does hava",
                "choices": ["apple", "banana"]
            },
        ]
    },
    {
        //缺少 questions 必填项
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "this is a error case",
    },
    {
        //title 4个字符的
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "erro",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            }
        ]
    },
    {
        //title 超过100个字符的
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "Acceptance criteria refers to a set of predefined requirements that must be met in order to mark a u",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            }
        ]
    },
    {
        //questions 的选项个数错误
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue",
                "choices": ['red']
            },
        ]
    },
    {
        //questions 的选项个数错误
        "creator": "auth0|6110b5c4c61fd70077d2819d",
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
            },
        ]
    }
]
//1. 更新功能
//正确的数据
exports.updateCompleteCase = [
    {
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            },
            {
                "index": 1,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
                "choices": ["red", "green", "blue"]
            },
            {
                "index": 2,
                "questionType": "multiple answer",
                "question": "How many fruits does hava",
                "choices": ["apple", "banana"]
            },
        ]
    },
    {
        //不可见
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            },
            {
                "index": 1,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
                "choices": ["red", "green", "blue"]
            },
            {
                "index": 2,
                "questionType": "multiple answer",
                "question": "How many fruits does hava",
                "choices": ["apple", "banana"]
            },
        ],
        "visible": false,
    }
]

//错误数据
exports.updateErrorCase = [
    {
        //title 4个字符的
        "title": "erro",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            }
        ]
    },
    {
        //title 超过100个字符的
        "title": "Acceptance criteria refers to a set of predefined requirements that must be met in order to mark a u",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue"
            }
        ]
    },
    {
        //questions 的选项个数错误
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "short answer",
                "question": "why the sky is blue",
                "choices": ['red']
            },
        ]
    },
    {
        //questions 的选项个数错误
        "title": "survey_1 test case",
        "subTitle": "survey1",
        "questions": [
            {
                "index": 0,
                "questionType": "multiple choice",
                "question": "How many colors does RGB have",
            },
        ]
    }
]