import { Response } from 'request';
import { response } from 'express';

const request = require('request');

const token = 'kjyBZBjWGbV2j5Rqw-xrmP2TpmPXgItEuZIK8uCxCj10EQAAAYK1PRaH';
const headers = {
   'Content-Type': 'application/x-www-form-urlencoded',
   Authorization: `Bearer ${token}`,
};

function sendMessage(message: string) {
   const body = `template_object={
      "object_type": "text",
      "text": "${message}",
      "link": {
         "web_url": "https://developers.kakao.com",
         "mobile_web_url": "https://developers.kakao.com"
      },
      "button_title": "바로 확인"
   }`;

   const options = {
      url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
      method: 'POST',
      headers,
      body,
   };

   request(options, (error: Error, res: Response) => {
      console.log(res.statusCode);
      if (error) throw error;
      if (response.statusCode === 200) console.log('메세지 전송 완료');
   });
}

module.exports = {
   sendMessage,
};
