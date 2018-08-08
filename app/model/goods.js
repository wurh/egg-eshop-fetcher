'use strict';

/**
 *  商品model对象
 **/

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Goods = app.model.define('goods', {
    id: { // 数据ID
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    goods_id: STRING(50), // 商品ID
    goods_ename: STRING(100), // 商品英文名
    goods_brand: STRING(100), // 商品品牌
    goods_name: STRING(100), // 商品中文名
    goods_category: STRING(100), // 商品分类
    goods_category_cn: STRING(100), // 商品分类中文
    goods_sm_category: STRING(100), // 商品二级分类
    goods_sm_category_cn: STRING(100), // 商品二级分类中文
    goods_img: STRING(100), // 商品图片
    goods_source: STRING(50), // 商品所属网站
    goods_href: STRING(100), // 商品原地址
    goods_vip_href: STRING(100), // 商品唯品地址
    comment_count: STRING(50), // 评论数
    market_price: STRING(50), // 商品市场价
    promote_price: STRING(50), // 商品推销价
    goods_rate: STRING(50), // 商品评分
    shop_price: STRING(50), // 商品普通价
    is_vip_brand: {
      type: INTEGER, // 是否唯品的品牌 0：不是 1：是
    },
    is_vip_good: {
      type: INTEGER, // 是否唯品的品牌 0：不是 1：是
    },
    vip_price: STRING(50), // 唯品销售价
    created_at: DATE, // 数据创建时间
    updated_at: DATE, // 数据更新时间
  });


  return Goods;
};
