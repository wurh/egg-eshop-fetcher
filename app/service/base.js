'use strict';
// app/service/news.js
const Service = require('egg').Service;
const cheerio = require('cheerio');
const superagent = require('superagent');

class BaseService extends Service {

  async getCategories(source) {
    source = source ? source : 'yamibuy';
    const { category } = this.config.sites[source];
    const resArr = [];
    for (const i in category) {
      resArr.push(i);
    }
    return {
		      status: 'success',
		      code: 0,
		      data: resArr,
    };

  }
}
module.exports = BaseService;

