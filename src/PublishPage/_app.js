const page = {"_id":"5d3010fa7cf585963a72879a","name":"2","description":"1","project":"1","config":{"properties":{"script":{"title":"内联脚本","type":"string"},"scripts":{"items":{"properties":{"src":{"type":"string"}},"title":"脚本地址"},"title":"外链脚本","type":"array"},"style":{"title":"内联样式","type":"string"},"links":{"items":{"properties":{"href":{"title":"href","type":"string"}},"title":"样式表地址"},"title":"外链样式","type":"array"},"metas":{"default":[{"content":"","type":"","name":"name"}],"items":{"properties":{"content":{"type":"string"},"type":{"type":"string"},"name":{"default":"name","enum":["name","http-equiv","itemprop"],"type":"string"}},"title":"meta 标签","type":"object"},"title":"额外的 meta 标签","type":"array"},"author":{"title":"作者","type":"string"},"keywords":{"items":{"title":"关键字","type":"string"},"title":"关键字","type":"array"},"description":{"title":"页面描述","type":"string"},"title":{"title":"页面标题","type":"string"}}},"__v":0,"owner":null,"components":[{"key":0,"_id":"5d3011267cf585963a72879b","name":"mianxi418_page","config":{"properties":{"imgs":{"items":{"properties":{"title":{"default":"11111","description":"文案","type":"string"},"src":{"default":"https://s-media-cache-ak0.pinimg.com/736x/f5/c3/95/f5c39586fa787a5b1f210ada6f584b24.jpg","description":"头像地址","type":"string"},"link":{"default":"http://qq.com/","description":"跳转链接","type":"string"}},"title":"卡片","type":"object"},"format":"table","title":"卡片列表","type":"array"},"imgCountsPerLine":{"default":4,"title":"每行几个卡片","type":"number"},"imgHeight":{"default":"60px","title":"头像高度","type":"string"},"imgWidth":{"default":"60px","title":"头像宽度","type":"string"}},"props":{"imgs":[{"title":"名字","src":"https://s-media-cache-ak0.pinimg.com/736x/f5/c3/95/f5c39586fa787a5b1f210ada6f584b24.jpg","link":"http://11.332.com"},{"title":"名字","src":"https://s-media-cache-ak0.pinimg.com/736x/f5/c3/95/f5c39586fa787a5b1f210ada6f584b24.jpg","link":"http://11.332.com"},{"title":"名字","src":"https://s-media-cache-ak0.pinimg.com/736x/f5/c3/95/f5c39586fa787a5b1f210ada6f584b24.jpg","link":"http://11.332.com"},{"title":"名字","src":"https://s-media-cache-ak0.pinimg.com/736x/f5/c3/95/f5c39586fa787a5b1f210ada6f584b24.jpg","link":"http://11.332.com"}],"imgCountsPerLine":4,"imgHeight":"60px","imgWidth":"60px"},"main":"./Main.js","private":true,"version":"0.0.0","description":"头像卡片列表"},"project":"activity"}]};

const Coms = [require("../resources/activity/components/mianxi418_page/Main.js")]


import React from "react";
import { canUseDOM } from "fbjs/lib/ExecutionEnvironment";
import ReactDOM from "react-dom";
import Body from "./body";

if (canUseDOM) {
  ReactDOM.render(
    <Body page={page} Coms={Coms} />,
    document.getElementById("publishApp"),
    () => {
      console.log("ReactDOM.render");
    }
  );
}
