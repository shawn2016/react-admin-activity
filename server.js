/** 用于开发环境的服务启动 **/
const path = require("path"); // 获取绝对路径有用
const express = require("express"); // express服务器端框架
const bodyParser = require("body-parser");
const env = process.env.NODE_ENV; // 模式（dev开发环境，production生产环境）
const webpack = require("webpack"); // webpack核心
const webpackDevMiddleware = require("webpack-dev-middleware"); // webpack服务器
const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
const webpackConfig = require("./webpack.dev.config.js"); // webpack开发环境的配置文件
const proxy = require("http-proxy-middleware");
import mongoose from "mongoose";

const mock = require("./mock/app-data"); // mock模拟数据，模拟后台业务

const app = express(); // 实例化express服务
const DIST_DIR = webpackConfig.output.path; // webpack配置中设置的文件输出路径，所有文件存放在内存中
const PORT = 8889; // 服务启动端口号

//重点在这一句，赋值一个全局Promise
mongoose.Promise = global.Promise;
// todo: move to config/database.js
const dbHost = process.env["MONGODB_PORT_27017_TCP_ADDR"] || "localhost";
const dbPort = process.env["MONGODB_PORT_27017_TCP_PORT"] || 27017;
const dbName = process.env["MONGODB_INSTANCE_NAME"] || "pager";
const dbUsername = process.env["MONGODB_USERNAME"] || "pager";
const dbPassword = process.env["MONGODB_PASSWORD"] || "pass4pager";
const dbUri = "mongodb://" + dbHost + ":" + dbPort + "/" + dbName;
const dbOptions = {
  user: dbUsername,
  pass: dbPassword
};
const dbConnection = mongoose.connection.openUri(dbUri, dbOptions);
dbConnection.on("error", error => {
  throw error;
});
dbConnection.once("open", () => {
  console.log("database connected: ", dbUri);
});
// app.use(express.static("dll"));
app.use(express.static(path.join(__dirname, "./src/public")));
app.use(express.static(path.join(__dirname, "./publish")));
app.use(bodyParser.json({ limit: "10000 kB" }));
app.use(bodyParser.urlencoded({ extended: true }));

if (env === "production") {
  // 如果是生产环境，则运行build文件夹中的代码
  app.use(express.static("build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  const compiler = webpack(webpackConfig); // 实例化webpack
  app.use(
    webpackDevMiddleware(compiler, {
      // 挂载webpack小型服务器
      publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
      quiet: true, // 是否不输出启动时的相关信息
      stats: {
        colors: true, // 不同信息不同颜色
        timings: true // 输出各步骤消耗的时间
      }
    })
  );
  // 挂载HMR热更新中间件
  app.use(webpackHotMiddleware(compiler));
  app.use("/api/projects", require("./src/api/projects"));
//   app.use("/api/generate", require("./src/api/generate"));
  app.use("/api/components", require("./src/api/components"));
  app.use("/api/sync", require("./src/api/sync"));
  app.use("/api/pages", require("./src/api/pages"));
  app.use("/api/preview", require("./src/api/pages"));
  app.use(
    proxy("/wap", {
      target: "https://lns-wap-test.vbillbank.com/wap", //跨域地址
      pathRewrite: { "^/wap": "" }, //重写接口
      changeOrigin: true
    })
  );
  // 所有请求都返回index.html
  app.get("*", (req, res, next) => {
    const filename = path.join(DIST_DIR, "index.html");

    // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
}

/** 监听POST请求，返回MOCK模拟数据 **/
app.post("*", (req, res, next) => {
  const result = mock.mockApi(req.originalUrl, req.body);
  res.send(result);
});

/** 启动服务 **/
app.listen(PORT, () => {
  console.log("本地服务启动地址: http://localhost:%s", PORT);
});
