'use strict';

const Controller = require('egg').Controller;
let Base64 = require('js-base64').Base64;
var HTMLHint  = require("htmlhint").default;
const path =require('path');
class EditorController extends Controller {
  async edit() {
    //编辑代码实时处理
    const { ctx } = this;
    let query = ctx.request.body;//获取数据{codeTree:代码集合,codeKey:存入缓存的key值}
    let codeTree=query.codeTree;
    let {html,less,js}=codeTree;
    let css=await ctx.helper.util.less2css(less);
    if(query.codeKey!=''){
      // 每次修改代码删除之前存入redis，并插入一条新的redis
      await this.app.redis.del(query.codeKey);
    }
    const keyValue=Base64.encode(JSON.stringify(codeTree));
    let newRandom=ctx.helper.util.randomn(12);//生成一个预存入redis的key随机数
    await this.app.redis.set(`keys_${newRandom}`,keyValue);
    let showView=await ctx.renderView('show',{
      'html':html,
      'css':`<style type="text/css" id="preview_css">${css}</style>`,
      'js':`<script id="preview_js">window.onload=function(){${js}}</script>`,
    });
    ctx.body={"domValue":showView,
              "key":`keys_${newRandom}` 
              };
  }

  async display() {
    let {ctx}=this;
    let {key}=ctx.query;
    let keyValue=await this.app.redis.get(key);
    let {html,less,js} = !!keyValue?JSON.parse(Base64.decode(keyValue)):{'html':'','less':'','js':'',};
    let css=await ctx.helper.util.less2css(less);//代码集合中的less代码转css代码
    await ctx.render('display',{
      'html':html,
      'css':`<style type="text/css" id="preview_css">${css}</style>`,
      'js':`<script id="preview_js">window.onload=function(){${js}}</script>`,
    });
  }
  async save() { 
    let {ctx}=this;
    let {html,less,js}=ctx.request.body;
    let css=await ctx.helper.util.less2css(less);//代码集合中的less代码转css代码
    var htmlMsg = HTMLHint.verify(html, {"tagname-lowercase": false,"attr-lowercase": false,'tag-pair': true,"title-require": false,"id-unique": false});
    if(htmlMsg.length){
      ctx.body={
        code:'900001',
        msg:'html代码格式不正确！'
      };
      return;
    }
    if(css===-1){
      ctx.body={
        code:'900002',
        msg:'less格式不正确！' 
      };
      return;
    }
    const res = await ctx.service.editor.save({
      code:JSON.stringify(ctx.request.body)
    });
    console.log('res:',res);
    ctx.body={
      code:'100000',
      msg:'success'
    };
   
  }
}

module.exports = EditorController;
