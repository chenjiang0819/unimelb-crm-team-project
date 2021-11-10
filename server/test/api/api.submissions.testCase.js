/**
 * 关于submissions模块的测试用例
 */

//1. 新增功能
//正确的数据
exports.addCompleteCase =
{
  "responses": [
    {
      "name": '1',
      "response": "https://www.google.cn/"
    },
    {
      "name": '2',
      "response": "hhhhh"
    },
    {
      "name": '3',
      "response": "0,1"
    },
    {
      "name": '4',
      "response": "0"
    },
    {
      "name": '5',
      "response": "labelTrue"
    },
    {
      "name": '6',
      "response": "80"
    },
    {
      "name": '7',
      "response": "<h2>this is h2/h2>"
    },
    {
      "name": '8',
      "response": "this is a image question"
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
    //回答缺少name必填项
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
        "name": "name1",
      }
    ]
  }
]