'use strict';

const Service = require('egg').Service;
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['app/mybatis_sql_map/BlockOperateMapper.xml']);
class editorService extends Service {
    async save(params) {
        const { ctx } = this;
        const query = mybatisMapper.getStatement('BlockOperateMapper', 'saveCode', params);  
        const result = await this.app.mysql.query(query);
        return result;
    } 
}
module.exports = editorService;