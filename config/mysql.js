'use strict';
module.exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '172.17.3.250',
        // 端口号
        port: '3306',
        // 用户名
        user: 'smart',
        // 密码
        password: 'smart',
        // 数据库名
        database: 'phoenix_online_dev',
        insecureAuth: true
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
}
