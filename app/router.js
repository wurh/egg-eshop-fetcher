'use strict';

module.exports = app => {
    app.get('/', app.controller.home.index);

    app.get('/tmall/list', app.controller.tmall.list);

    // // yamibuy爬虫
    // app.get('/yamibuy/save', app.controller.yamibuy.save);
    // app.get('/yamibuy/query', app.controller.yamibuy.list);
    //
    // // 读取本地配置
    // app.get('/base/getCategories', app.controller.base.getCategories);
    //
    // // 获取用户列表数据
    // app.router.get('/users', 'user.users');
    // // 根据ID 获取用户数据
    // app.router.get('/users/:id', 'user.user');
    // // 创建用户数据
    // app.router.post('/users', 'user.create');
    // // 更新用户数据
    // app.router.put('/users/:id', 'user.update');
    // // 删除用数据
    // app.del('/users/:id', 'user.del');
    //
    // app.router.get('/posts', 'post.posts');
    // app.router.get('/posts/:id', 'post.post');
    // app.router.post('/users/:user_id/posts', 'post.create');
    // app.router.put('/users/:user_id/posts/:id', 'post.update');
    // app.del('/users/:user_id/posts/:id', 'post.del');


};
