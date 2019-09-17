'use strict';

const Controller = require('egg').Controller;
let Base64 = require('js-base64').Base64;
const path =require('path');
class ShowController extends Controller {
  async index() {
    const { ctx } = this;
    let query = ctx.request.body;
    
    let codeTree=query.codeTree;
    let {html,css,js}=codeTree;
    console.log('query:',codeTree);
    if(query.codeKey!=''){
      ctx.cookies.set(query.codeKey,null);
    }
    const keyValue=Base64.encode(JSON.stringify(codeTree));
    let newRandom=ctx.helper.util.randomn(12);
    ctx.cookies.set(`keys_${newRandom}`,keyValue,{
      domain: '127.0.0.1',
      httpOnly: false,
      signed: false,
    });
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
    let keyValue=ctx.cookies.get(key,{
      domain: '127.0.0.1',
      httpOnly: false,
      signed: false,
    });
    console.log('getCookies:',key);
    if(!!keyValue){
      var {html,css,js} = JSON.parse(Base64.decode(keyValue));
    }else{
      var {html,css,js} ={
        'html':'',
        'css':'',
        'js':'',
      }
    }
    // var {html,css,js} ={
    //   'html':'',
    //   'css':'',
    //   'js':'',
    // }
    let showView=await ctx.render('display',{
      'html':html,
      'css':`<style type="text/css" id="preview_css">${css}</style>`,
      'js':`<script id="preview_js">window.onload=function(){${js}}</script>`,
    });
  }
}

module.exports = ShowController;
