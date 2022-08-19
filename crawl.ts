const scheduler = require('node-schedule');
const cheerio = require('cheerio');
const request = require('request');

const kakaoTalk = require('./kakaoTalk');

function restock(productId: number, size: string) {
   const schedule = scheduler.scheduleJob('*/2 * * * * *', () => {
      const url = 'https://store.musinsa.com/app/goods/' + productId;
      request(url, (error: Error, _response: Response, html: string) => {
         if (error) throw error;

         const $ = cheerio.load(html);
         const productName = $('.product_title em').text();
         const option = $('.option1 option');

         const map = new Map();
         console.log(productName);

         const optionLength = option.length;
         for (let i = 1; i < optionLength; i++) {
            map.set(option[i].attribs.value, option[i].attribs.jaego_yn);
         }

         console.log('사이즈: ' + size);
         console.log('재고: ' + map.get(size));

         if (map.get(size) === 'Y') {
            const msg = `${productName} ${size} 재고있음`;
            console.log(msg);
            kakaoTalk.sendMessage(msg);
            schedule.cancel();
         }
      });
   });
}

module.exports = {
   restock,
};
