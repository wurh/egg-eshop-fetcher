'use strict';
// app/service/news.js
const Service = require('egg').Service;
const cheerio = require('cheerio');
const superagent = require('superagent');

class TmallService extends Service {

     //查询天猫搜索
    async list(page, size, name) {
        let tmallListUrl = 'https://list.tmall.com/m/search_items.htm'
        let params = {
            page_size:size,
            page_no:page,
            spm:'875.7931836%2FB.a2227oh.d100',
            from:'mallfp..pc_1_searchbutton',
            q:name,
            type:'pc',
            vmarket:''
        }
        console.log(params)
        let resultData = await getTmallListData(tmallListUrl)

        function getTmallListData(url){
            return new Promise(function(resolve, reject) {
                superagent.get(url)
                    .send(params)
                    .set('Accept', 'application/json')
                    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
                    .end(function(err, response) {
                        if (err || !response.ok) {
                            resolve({
                                'code': '101',
                                'msg': '获取数据失败!'
                            });
                        } else {
                            resolve(response.body);
                        }
                    });
            })
        }

        return resultData;
    }


}

module.exports = TmallService;
