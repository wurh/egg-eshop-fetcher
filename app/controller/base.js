'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;

// 基础通用控制器
class BaseController extends Controller {

  // 获取导航
  async getCategories() {
    const ctx = this.ctx;
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    ctx.set('X-Powered-By', ' 3.2.1');
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    ctx.body = await ctx.service.base.getCategories(ctx.queries.source);
  }

}

module.exports = BaseController;
