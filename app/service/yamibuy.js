'use strict';
// app/service/news.js
const Service = require('egg').Service;
const cheerio = require('cheerio');
const superagent = require('superagent');

class YamibyService extends Service {


  // 代理请求yaimibuy接口方法
  async list(page, tab, cat) {
    const pageSize = 20;
    const start = 1 + (pageSize * parseInt(page) - pageSize);
    const {
      serverUrl, category,
    } = this.config.sites.yamibuy;
    // const yamibuyConf = this.config.sites.yamibuy;
    const catId = category[tab][cat];
    const url = serverUrl;
    const params = {
      cat_id: catId,
      input: '',
      is_promote: '0',
      is_yami: '0',
      lang: 'cn',
      pageIndex: start,
      page_size: pageSize,
      sort_by: '2',
      sort_order: '0',
      type: '4',
    };
    const result = await getLinkDatas(url, params);

    function getLinkDatas(url, params, cookieArray) {
      return new Promise(function(resolve, reject) {
        superagent.post(url)
          .send(params)
          .set('Accept', 'application/json')
          .end(function(err, response) {
            if (err || !response.ok) {
              resolve({
                code: '101',
                msg: '获取数据失败!',
              });
            } else {
              resolve(response.body);
            }
          });
      });
    }
    return result;
  }

  // 转化入口模型数据
  async changToModel(item, catobj) {
    const {
      detailUrl,
    } = this.config.sites.yamibuy;
    const brand_name = await this.getGoodsDetailBrand(item.goods_id);
    let is_vip_brand = 0;
    const isVipBrand = false;
    if (isVipBrand) {
      is_vip_brand = 1;
    }
    const data = {
      goods_id: item.goods_id,
      goods_ename: item.goods_ename,
      goods_brand: brand_name,
      goods_name: item.goods_name,
      goods_category: catobj.catName,
      goods_category_cn: catobj.catNameCn,
      goods_sm_category: catobj.catChildName,
      goods_sm_category_cn: catobj.catChildNameCn,
      goods_img: item.image,
      goods_source: 'yamibuy',
      goods_href: detailUrl + item.goods_id,
      goods_vip_href: '',
      comment_count: item.comment_count,
      market_price: item.market_price,
      promote_price: item.promote_price,
      goods_rate: item.rate,
      shop_price: item.shop_price,
      is_vip_brand,
      is_vip_good: 0,
      vip_price: '',
    };
    return data;
  }

  async update(item) {
    const resObj = await this.ctx.service.goods.update(item);
    return resObj;
  }

  // 数据持久化
  async save(page, tab, cat) {
    const resObj = await this.list(page, tab, cat);
    let catName = '';
    let catNameCn = '';
    let catChildName = '';
    let catChildNameCn = '';
    if (resObj.data && resObj.data.Category && resObj.data.Category[0]) {
      catName = resObj.data.Category[0].cat_ename;
      catNameCn = resObj.data.Category[0].cat_name;
      if (resObj.data.Category[0].children && resObj.data.Category[0].children[0]) {
        catChildName = resObj.data.Category[0].children[0].cat_ename;
        catChildNameCn = resObj.data.Category[0].children[0].cat_name;
      }
    }
    const catObj = {
      catName,
      catNameCn,
      catChildName,
      catChildNameCn,
    };

    let itemList = [];
    if (resObj.data && resObj.data.items) {
      itemList = resObj.data.items;
    }

    for (let i = 0; i < itemList.length; i++) {
      const item = await this.changToModel(itemList[i], catObj);
      const resObj = await this.ctx.service.goods.findByGoodsId(item.goods_id);
      if (resObj.count === 0) {
        await this.ctx.service.goods.create(item);
        console.log(item.goods_id + '持久化成功');
      }
    }
  }

  // 根据ID删除数据
  async del(id) {
    return this.ctx.service.goods.del(id);
  }

  async getFliterType(type) {
    type = parseInt(type);
    console.log('type: ' + type);
    if (type === 1) {
      return [ 'goods_rate', 'desc' ];
    } else if (type === 2) {
      return [ 'goods_rate', 'asc' ];
    } else if (type === 3) {
      return [ 'promote_price', 'desc' ];
    } else if (type === 4) {
      return [ 'promote_price', 'asc' ];
    }
    return [ 'created_at', 'desc' ];

  }

  // 查询商品列表数据 -- 支持分页
  async queryGoods(page, size, category, brandname, isvipbrand, fliterType) {
    const offset = (parseInt(page) * parseInt(size)) - parseInt(size);
    const limit = parseInt(size);
    const orders = await this.getFliterType(fliterType);
    console.log(orders);
    console.log('offset:' + offset + ' - limit:' + limit + '- category:' + category + '- brandname:' + brandname + '- isvipbrand' + isvipbrand);
    const options = {
      offset,
      limit,
      // attributes: [ 'id', 'title', 'user_id', 'created_at', 'updated_at' ],
      order: [
        orders,
      ],
    };
    const params = {};

    if (category && category != 'undefined' && category != '') {
      params.goods_category = category;
    }
    if (brandname && brandname != 'undefined' && brandname != '') {
      params.goods_brand = brandname;
    }
    if (isvipbrand && isvipbrand != 'undefined' && isvipbrand != '') {
      params.is_vip_brand = isvipbrand;
    }
    options.where = params;
    let category_val = '';
    const items = await this.ctx.model.Goods.findAndCountAll(options);
    if (category && category != 'undefined') {
      category_val = category;
    }
    return {
      status: 'success',
      code: 0,
      data: {
        page: page[0],
        size: size[0],
        category: category_val,
        items,
      },
    };
  }

  // 获取商品详情品牌数据
  async getGoodsDetailBrand(item_id) {
    const {
      detailUrl,
    } = this.config.sites.yamibuy;
    const url = detailUrl + item_id;
    const resultText = await getLinkText(url);

    function getLinkText(url) {
      return new Promise(function(resolve, reject) {
        superagent.get(url)
          .set('Content-Type', 'application/json;charset=UTF-8')
          .end(function(err, response) {
            if (err || !response.ok) {
              resolve({
                code: '101',
                msg: '获取数据失败!',
              });
            } else {
              resolve(response.text);
            }
          });
      });
    }
    const resultHtml = resultText;
    // console.log(resultHtml);
    const $ = cheerio.load(resultHtml);
    const metas = $('meta');
    let keywords = '';
    for (let i = 0; i < metas.length; i++) {
      if ($(metas[i]).attr('name') == 'keywords') {
        keywords = $(metas[i]).attr('content');
      }
    }
    let barndName = '';
    if (keywords != '') {
      barndName = keywords.split('，')[0];
    }
    return barndName;
  }

}

module.exports = YamibyService;
