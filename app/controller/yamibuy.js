'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;

class YamibuyController extends Controller {
  async save() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.yamibuy.save();
  }

  async list() {
    const ctx = this.ctx;
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    ctx.set('X-Powered-By', ' 3.2.1');
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    ctx.body = await ctx.service.goods.list(ctx.query);
  }
}

module.exports = YamibuyController;
