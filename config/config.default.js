'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511333951448_6503';

  // add your config here
  config.middleware = [];

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // add middleware robot  增加中间件经过机器人服务
  config.middleware = [
    'robot',
  ];

  // robot's configurations
  config.robot = {
    ua: [
      /curl/i,
      /Baiduspider/i,
    ],
  };

  // 配置数据库
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg_eshop',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '12345678',
  };

  // web csrf 安全配置
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  // 日志配置
  config.logger = {
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };

  // bloglovin 网站分析配置
  config.sites = {
    yamibuy: {
      category: {
        snacks: { // 食品
          penghua: '17', // 膨化食品
          binggan: '16', // 饼干 糕点
          tangguo: '18', // 糖果 软糖 巧克力
          roulei: '19', // 肉类 海味 坚果 蜜饯
          chapin: '20', // 茶品
          fangbianmian: '21', // 方便面速食
        },
        beauty: { // 美妆
          mianmo: '59', // 面膜
          mianmotie: '134', // 面膜贴
          shuimianmianmo: '1280', // 睡眠面膜
          shuiximianmo: '135', // 水洗面膜
          fendi: '142', // BB CC霜 粉底 散粉
          meibi: '145', // 眉笔 眉粉 染眉膏
          yanying: '148', // 眼影彩妆组合
          mianbuhufu: '22', // 面部护肤
          caizhaung: '23', // 彩妆
          xihumeifa: '24', // 洗护美发
          shentihufu: '25', // 身体护肤
        },
        health: { // 中西健康
          baojian: '30', // 保健品 医疗
          jiankangtiaoli: '26', // 健康调理
          chengrenyongpin: '31', // 成人用品
        },
        home: { // 生活电器
          chufangyongpin: '29', // 厨房用品
          jiajurichang: '28', // 家具日常
          chaoliuwupin: '179', // 潮流物品
          shenghuoyongpin: '1231', // 生活用品
          fuzhuang: '77', // 服装
          muyingwanju: '27', // 母婴玩具
          weiyu: '1230', // 卫浴用品
          peishi: '127', // 配饰
          siwa: '133', // 丝袜 裤袜
          piaowuliquan: '98', // 票务礼券
        },
      },
      serverUrl: 'https://m.yamibuy.com/api/search/searchResults',
      detailUrl: 'https://m.yamibuy.com/item/',
    },
  };

  return config;
};
