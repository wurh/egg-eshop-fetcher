'use strict';
// app/controller/news.js
const Controller = require('egg').Controller;

class TmallController extends Controller {

    async list() {
        const ctx = this.ctx;
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'X-Requested-With');
        ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        ctx.set('X-Powered-By', ' 3.2.1');
        ctx.set('Content-Type', 'application/json;charset=utf-8');
        ctx.body = await ctx.service.tmall.list(ctx.query.page,ctx.query.size,ctx.query.name);
    }
}

module.exports = TmallController;
