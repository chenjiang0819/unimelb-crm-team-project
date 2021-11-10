/**
 * 关于survey模块的测试用例
 */

//1. 新增功能
//正确的数据
exports.addCompleteCase = [
  {
    "creator": "auth0|6110b5c4c61fd70077d2819d",
    "title": "survey_1 test case",
    "description": "a description",
    "questions": [
      {
        "name": "why the sky is blue",
        "title": "this is a title",
        "type": "text",
        "inputType": "url",
        "isRequired": true,
      },
      {
        "name": "upload a picture url",
        "title": "this is a title",
        "isRequired": true,
        "type": "comment",
        "placeHolder": "please select",
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "checkbox",
        "choices": ["red", "green", "blue"],
        "colCount": 1
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "dropdown",
        "choices": ["red", "green", "blue"],
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "boolean",
        "label": "please select",
        "labelTrue": "right",
        "labelFalse": "false",
        "showTitle": true,
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "rating",
        "rateMin": "40",
        "rateMax": "90",
        "minRateDescription": "a min rate description",
        "maxRateDescription": "a max rate description",
        "rateStep": 2,
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "html",
        "html": "<p>this is a p lable</p>",
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "image",
        "imageFit": "cover",
        "imageHeight": "90",
        "imageWidth": "90",
        "imageLink": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=2&spn=0&di=140940&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3720181670%2C558228719&os=4083749329%2C2797144916&simid=3321868309%2C413809310&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0820%252F0142054dp00qy3hyz0019d200u0015dg00u0015d.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg%26refer%3Dhttp%3A%2F%2Fnimg.ws.126.net%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1634202056%26t%3D13847ca9fdaea3d6b48b28c9144d3235&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mn_z%26e3Bv54AzdH3F1yAzdH3Fw6ptvsjAzdH3FGHQbHd0GacdclQMR_z%26e3Bip4s&gsm=3&islist=&querylist="
      },
    ]
  },
  {
    "creator": "auth0|6110b5c4c61fd70077d2819d",
    "title": "survey_1 test case",
    "description": "a description",
    "questions": [
      {
        "name": "why the sky is blue",
        "title": "this is a title",
        "type": "text",
        "inputType": "url",
        "isRequired": true,
      },
      {
        "name": "upload a picture url",
        "title": "this is a title",
        "isRequired": true,
        "type": "comment",
        "placeHolder": "please select",
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "checkbox",
        "choices": ["red", "green", "blue"],
        "colCount": 1
      },
    ]
  },
  {
    "creator": "auth0|6110b5c4c61fd70077d2819d",
    "title": "survey_1 test case",
    "description": "a description",
    "questions": [
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "dropdown",
        "choices": ["red", "green", "blue"],
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "boolean",
        "label": "please select",
        "labelTrue": "right",
        "labelFalse": "false",
        "showTitle": true,
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "rating",
        "rateMin": "40",
        "rateMax": "90",
        "minRateDescription": "a min rate description",
        "maxRateDescription": "a max rate description",
        "rateStep": 2,
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",

        "isRequired": true,
        "type": "html",
        "html": "<p>this is a p lable</p>",
      },
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "image",
        "imageFit": "cover",
        "imageHeight": "90",
        "imageWidth": "90",
        "imageLink": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=2&spn=0&di=140940&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3720181670%2C558228719&os=4083749329%2C2797144916&simid=3321868309%2C413809310&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0820%252F0142054dp00qy3hyz0019d200u0015dg00u0015d.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg%26refer%3Dhttp%3A%2F%2Fnimg.ws.126.net%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1634202056%26t%3D13847ca9fdaea3d6b48b28c9144d3235&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mn_z%26e3Bv54AzdH3F1yAzdH3Fw6ptvsjAzdH3FGHQbHd0GacdclQMR_z%26e3Bip4s&gsm=3&islist=&querylist="
      },
    ]
  },
  {
    "creator": "auth0|6110b5c4c61fd70077d2819d",
    "title": "a text survey to front-end test",
    "description": "a description",
    "questions": [
      {
        "name": "why the sky is blue",
        "title": "this is a title",
        "type": "text",
        "inputType": "url",
        "isRequired": true,
      }
    ]
  },
]

//错误数据
exports.addErrorCase = [
  {
    // type=checkbox, colCount > 5
    "questions": [
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "checkbox",
        "choices": ["red", "green", "blue"],
        "colCount": 6
      },
    ]
  },
  {
    // type=checkbox, choices < 2
    "questions": [
      {
        "name": "How many colors does RGB have",
        "title": "this is a title",
        "isRequired": true,
        "type": "checkbox",
        "choices": ["red"],
        "colCount": 1
      },
    ]
  },
  {
    //type=boolean, label is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "boolean",
    "labelTrue": "right",
    "labelFalse": "false",
    "showTitle": true,
  },
  {
    //type=boolean, labelTrue/labelFalse is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "boolean",
    "label": "simple label",
    "labelFalse": "false",
    "showTitle": true,
  },
  {
    //type=rating, rateMin is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "rating",
    "rateMax": "90",
    "minRateDescription": "a min rate description",
    "maxRateDescription": "a max rate description",
    "rateStep": 2,
  },
  {
    //type=rating, rateMin > rateMax
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "rating",
    "rateMin": "100",
    "rateMax": "90",
    "minRateDescription": "a min rate description",
    "maxRateDescription": "a max rate description",
    "rateStep": 2,
  },
  {
    //type=rating, minRateDescription is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "rating",
    "rateMin": "50",
    "rateMax": "90",
    "maxRateDescription": "a max rate description",
    "rateStep": 2,
  },
  {
    //type=rating, minRateDescription > 50字符
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "rating",
    "rateMin": "50",
    "rateMax": "90",
    "minRateDescription": "a min rate descriptiona min rate descriptiona min rate descriptiona min rate descriptiona min rate descriptiona min rate descriptiona min rate description",
    "maxRateDescription": "a max rate description",
    "rateStep": 2,
  },
  {
    //type=rating, rateStep <= 1字符
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "rating",
    "rateMin": "50",
    "rateMax": "90",
    "minRateDescription": "a min rate descriptiona",
    "maxRateDescription": "a max rate description",
    "rateStep": 0,
  },
  {
    //type=html, html is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",

    "isRequired": true,
    "type": "html",
  },
  {
    //type=image imageHeight is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "image",
    "imageFit": "cover",
    "imageWidth": "90",
    "imageLink": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=2&spn=0&di=140940&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3720181670%2C558228719&os=4083749329%2C2797144916&simid=3321868309%2C413809310&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0820%252F0142054dp00qy3hyz0019d200u0015dg00u0015d.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg%26refer%3Dhttp%3A%2F%2Fnimg.ws.126.net%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1634202056%26t%3D13847ca9fdaea3d6b48b28c9144d3235&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mn_z%26e3Bv54AzdH3F1yAzdH3Fw6ptvsjAzdH3FGHQbHd0GacdclQMR_z%26e3Bip4s&gsm=3&islist=&querylist="
  },
  {
    //type=image imageWidth is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "image",
    "imageFit": "cover",
    "imageHeight": "90",
    "imageWidth": "90",
    "imageLink": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=2&spn=0&di=140940&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3720181670%2C558228719&os=4083749329%2C2797144916&simid=3321868309%2C413809310&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0820%252F0142054dp00qy3hyz0019d200u0015dg00u0015d.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg%26refer%3Dhttp%3A%2F%2Fnimg.ws.126.net%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1634202056%26t%3D13847ca9fdaea3d6b48b28c9144d3235&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mn_z%26e3Bv54AzdH3F1yAzdH3Fw6ptvsjAzdH3FGHQbHd0GacdclQMR_z%26e3Bip4s&gsm=3&islist=&querylist="
  },
  {
    //type=image imageLink is empty
    "name": "How many colors does RGB have",
    "title": "this is a title",
    "isRequired": true,
    "type": "image",
    "imageFit": "cover",
    "imageHeight": "90",
    "imageWidth": "90",
    "imageLink": "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=2&spn=0&di=140940&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3720181670%2C558228719&os=4083749329%2C2797144916&simid=3321868309%2C413809310&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=%E5%9B%BE%E7%89%87&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0820%252F0142054dp00qy3hyz0019d200u0015dg00u0015d.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg%26refer%3Dhttp%3A%2F%2Fnimg.ws.126.net%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1634202056%26t%3D13847ca9fdaea3d6b48b28c9144d3235&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mn_z%26e3Bv54AzdH3F1yAzdH3Fw6ptvsjAzdH3FGHQbHd0GacdclQMR_z%26e3Bip4s&gsm=3&islist=&querylist="
  },
]