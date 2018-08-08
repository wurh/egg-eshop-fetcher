'use strict';

const Subscription = require('egg').Subscription;

class YamiTask extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '200m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const ctx = this.ctx;
    for (let i = 1; i < 10; i++) {
      await ctx.service.yamibuy.save(i, 'snacks', 'penghua');
      await ctx.service.yamibuy.save(i, 'snacks', 'binggan');
      await ctx.service.yamibuy.save(i, 'snacks', 'tangguo');
      await ctx.service.yamibuy.save(i, 'snacks', 'roulei');
      await ctx.service.yamibuy.save(i, 'snacks', 'chapin');
      await ctx.service.yamibuy.save(i, 'snacks', 'fangbianmian');

      await ctx.service.yamibuy.save(i, 'beauty', 'mianmo');
      await ctx.service.yamibuy.save(i, 'beauty', 'mianmotie');
      await ctx.service.yamibuy.save(i, 'beauty', 'shuimianmianmo');
      await ctx.service.yamibuy.save(i, 'beauty', 'shuiximianmo');
      await ctx.service.yamibuy.save(i, 'beauty', 'fendi');
      await ctx.service.yamibuy.save(i, 'beauty', 'meibi');
      await ctx.service.yamibuy.save(i, 'beauty', 'yanying');
      await ctx.service.yamibuy.save(i, 'beauty', 'mianbuhufu');
      await ctx.service.yamibuy.save(i, 'beauty', 'caizhaung');
      await ctx.service.yamibuy.save(i, 'beauty', 'xihumeifa');
      await ctx.service.yamibuy.save(i, 'beauty', 'shentihufu');

      await ctx.service.yamibuy.save(i, 'health', 'baojian');
      await ctx.service.yamibuy.save(i, 'health', 'jiankangtiaoli');
      await ctx.service.yamibuy.save(i, 'health', 'chengrenyongpin');

      await ctx.service.yamibuy.save(i, 'home', 'chaoliuwupin');
      await ctx.service.yamibuy.save(i, 'home', 'jiajurichang');
      await ctx.service.yamibuy.save(i, 'home', 'shenghuoyongpin');
      await ctx.service.yamibuy.save(i, 'home', 'fuzhuang');
      await ctx.service.yamibuy.save(i, 'home', 'muyingwanju');
      await ctx.service.yamibuy.save(i, 'home', 'piaowuliquan');
      await ctx.service.yamibuy.save(i, 'home', 'weiyu');
      await ctx.service.yamibuy.save(i, 'home', 'chufangyongpin');
      await ctx.service.yamibuy.save(i, 'home', 'peishi');
      await ctx.service.yamibuy.save(i, 'home', 'siwa');
    }
  }
}

module.exports = YamiTask;
