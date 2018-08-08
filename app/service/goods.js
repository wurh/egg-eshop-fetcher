'use strict';
// app/service/news.js
const Service = require('egg').Service;

class GoodsService extends Service {
  async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
    return this.ctx.model.Goods.findAndCountAll({
      offset,
      limit,
      order: [[ order_by, order.toUpperCase() ]],
    });
  }

  // 根据ID查询商品数据
  async find(id) {
    const goods = await this.ctx.model.Goods.findById(id);
    if (!goods) {
      this.ctx.throw(404, 'goods not found');
    }
    return {
      status: 'success',
      code: 0,
      data: goods,
    };
  }

  // 寻找根据ID找数据
  async findByGoodsId(goods_id) {
    const options = {
      attributes: [ 'id', 'goods_id', 'created_at', 'updated_at' ],
      order: [[ 'created_at', 'desc' ]],
    };
    if (goods_id) {
      options.where = {
        goods_id,
      };
    }
    return this.ctx.model.Goods.findAndCountAll(options);
  }

  // 创建商品方法
  async create(goods) {
    return this.ctx.model.Goods.create(goods);
  }

  // 更新商品数据
  async update(updates) {
    const goods = await this.ctx.model.Goods.findById(updates.id);
    if (!goods) {
      this.ctx.throw(404, 'goods not found');
    }
    console.log(goods.goods_id + '--' + updates.goods_id);
    if (goods.goods_id !== updates.goods_id) {
      this.ctx.throw(403, 'not allowed to modify others goods');
    }
    return goods.update(updates);
  }

  // 根据ID删除商品数据
  async del(id) {
    const goods = await this.ctx.model.Goods.findById(id);
    if (!goods) {
      return {
        code: '404',
        msg: 'goods not found',
      };
    }
    return goods.destroy();
  }


}

module.exports = GoodsService;

