'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    // 持久化数据  第一次启动需要
      //await app.model.sync({force: true});
    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    // await app.runSchedule('yami_task');
  });
};
