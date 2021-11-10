/**
 * 关于post模块的测试用例
 */

//1. 新增功能
//正确的数据
exports.addCompleteCase = [
  {
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "title": "1simple title is ok",
    "content": "1this is a simple content hhhhhhh",
  },
  {
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "2ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "title": "2simple title is ok",
    "content": "2this is a simple content hhhhhhh",
  },
  {
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "3ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "title": "3simple title is ok",
    "content": "3this is a simple content hhhhhhh",
  },
  {
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "4ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "title": "4simple title is ok",
    "content": "4this is a simple content hhhhhhh",
  }
];

//错误数据
exports.addErrorCase = [
  {
    //缺少author必填项
    "title": "this is a error case",
    "content": "a error case ,is not should add in database"
  },
  {
    //缺少title必填项
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "4ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "content": "this is a error case"
  },
  {
    //title 4个字符的
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "4ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "title": "erro",
    "content": "a error case ,is not should add in database",
  },
  {
    //ttile超过100个字符的
    "author": {
      "uid": "google-oauth2|101384514038333635972",
      "name": "4ZhiHui CHEN",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
    }, 
    "title": "Acceptance criteria refers to a set of predefined requirements that must be met in order to mark a ufdf",
    "content": "error case",
  }
]

//2. 修改功能
//正确的数据
exports.updateCompleteCase = [
  {
    "title": "update simple title is ok",
    "content": "update this is a simple content hhhhhhh",
  },
  {
    "title": "simple title has some data ok?",
    "content": "clike me !",
    "views": 10,
  },
  {
    "title": "welcome to crm system",
    "content": "crm system is ok , clike me !",
    "views": 100,
    "followers": ["auth0|1110b5c4c61fd70077d2819d", "auth0|1110b5c4c61fd70077d2819d", "auth0|1110b5c4c61fd70077d2819d"],
    "solved": true,
    "comments": [
      {
        "author": {
          "uid": "google-oauth2|101384514038333635972",
          "name": "4ZhiHui CHEN",
          "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
        }, 
        "content": "first floor",
      },
      {
        "author": {
          "uid": "google-oauth2|101384514038333635972",
          "name": "4ZhiHui CHEN",
          "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
        },   
        "content": "second floor",
      },
      {
        "author": {
          "uid": "google-oauth2|101384514038333635972",
          "name": "4ZhiHui CHEN",
          "picture": "https://lh3.googleusercontent.com/a-/AOh14GhbWl3KJi5URAjmqdnuKSmmnz-lHiKTukSYONW1=s96-c"
        }, 
        "content": "third floor",
      }
    ]
  }
];

//错误数据
exports.updateErrorCase = [
  {
    "title": "this is a error case",
    "content": "a error case ,is not should add in database",
    "views": -1,
  },
  {
    "title": "this is a error case",
    "content": "a error case ,is not should add in database",
    "views": 10.5,
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
      },
    ]
  }
]
