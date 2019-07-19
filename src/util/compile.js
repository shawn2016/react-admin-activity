import path from "path";
import webpack from "webpack";
import fs from "fs";
import ncp from "ncp";
const TerserPlugin = require('terser-webpack-plugin'); // 优化js

const AUTOPREFIXER_BROWSERS = [
  "Android 2.3",
  "Android >= 4",
  "Chrome >= 35",
  "Firefox >= 31",
  "Explorer >= 9",
  "iOS >= 7",
  "Opera >= 12",
  "Safari >= 7.1"
];

const rules = [
  //   {
  //     test: /\.js$/,
  //     exclude: /node_modules/,
  //     loader: "babel-loader",
  //     options: {
  //       plugins: [
  //         ["import", { style: true, libraryName: "antd-mobile" }],
  //         "transform-decorators-legacy",
  //         "transform-class-properties"
  //       ]
  //     }
  //   },
  //   { test: /\.json$/, loader: "json-loader" },
  //   //   { test: /\.txt$/, loader: "raw-loader" },
  //   {
  //     test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
  //     loader: "url-loader?limit=1024"
  //   },
  //   { test: /\.(eot|ttf|wav|mp3)$/, loader: "file-loader" },
  //   {
  //     test: /\.scss$/,
  //     loader: "style-loader/useable!css-loader!sass-loader!postcss-loader"
  //   },
  //   {
  //     test: /\.less$/,

  //     use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
  //   },
  //   { test: /\.css$/, loader: "style-loader/useable!css-loader!postcss-loader" }

  //   {
  //     // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
  //     test: /\.js?$/,
  //     enforce: 'pre',
  //     use: ['eslint-loader'],
  //     include: path.resolve(__dirname, 'src'),
  //   },
//   {
//     // .js .jsx用babel解析
//     test: /\.js?$/,
//     use: ["happypack/loader"],
//     include: path.resolve(__dirname, "../../src")
//   },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      plugins: [
        ["import", { style: true, libraryName: "antd-mobile" }],
        "transform-decorators-legacy",
        "transform-class-properties"
      ]
    }
  },
  {
    // .css 解析
    test: /\.css$/,
    use: ["style-loader", "css-loader", "postcss-loader"]
  },
  {
    // .scss 解析
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
  },
  {
    // .less 解析
    test: /\.less$/,
    use: [
      "style-loader",
      "css-loader",
      "postcss-loader",
      { loader: "less-loader", options: { javascriptEnabled: true } }
    ]
  },
  {
    // 文件解析
    test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
    include: path.resolve(__dirname, "src"),
    use: ["file-loader?name=assets/[name].[hash:4].[ext]"]
  },
  {
    // 图片解析
    test: /\.(png|jpg|gif)(\?|$)/,
    include: path.resolve(__dirname, "../../src"),
    use: ["url-loader?limit=8192&name=assets/[name].[hash:4].[ext]"]
  },
  {
    // wasm文件解析
    test: /\.wasm$/,
    include: path.resolve(__dirname, "../../src"),
    type: "webassembly/experimental"
  },
  {
    // xml文件解析
    test: /\.xml$/,
    include: path.resolve(__dirname, "../../src"),
    use: ["xml-loader"]
  }
];

const plugins = [];
async function compileComponent(project, name, optimize) {
  console.log("start to compile component: ", project, name);
  const projectPrefix = project + "/components";
  const outputFileName = "Main.js";
  const entryPath = path.join(
    __dirname,
    "../resources",
    projectPrefix,
    name,
    outputFileName
  );
  console.log("----------3");
  const outputPath = path.join(
    __dirname,
    "../../publish/",
    projectPrefix,
    name
  );
  console.log("----------0");
  var config = {
    mode: "development",
    entry: entryPath,
    output: {
      path: outputPath,
      filename: outputFileName
    },
    optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: true, // 多线程并行构建
            terserOptions: {
              output: {
                comments: false, // 不保留注释
              },
            },
          }),
        ],
      },
    module: {
      rules: rules
    },
    plugins: optimize ? plugins : []
  };

  var compiler = webpack(config);
  console.log("----------1");
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.log("----------2");
        reject(err);
      } else {
        const fileContent = fs.readFileSync(
          path.join(outputPath, outputFileName)
        );
        // todo 这么写太丑了
        ncp(outputPath, path.join(__dirname, "../public"), function(err) {
          if (err) {
            reject(err);
          }
          resolve({
            stats: stats,
            fileContent: fileContent,
            outputPath: outputPath,
            outputFileName: outputFileName
          });
          console.log("end compile component: ", project, name);
        });
      }
    });
  });
}

const compileTemplate = async page => {
  const project = page.project;
  const pageId = page._id;
  const pageName = page.name;
  console.log("start to compile template: ", project, pageId);
  const inputPath = path.join(__dirname, "../PublishPage/");
  const inputFileName = "_app.js";
  const outputPath = path.join(
    __dirname,
    "../../publish/",
    project,
    "pages/" + pageName
  );
  const outputFileName = "app.bundle.js";
  var config = {
    entry: inputPath + inputFileName,
    output: {
      path: outputPath,
      filename: outputFileName
    },
    module: {
      rules: rules
    },
    plugins: plugins
  };

  let Coms = [];
  page.components.forEach(component => {
    const componentPath =
      "../resources/" +
      component.project +
      "/components/" +
      component.name +
      "/Main.js";
    Coms.push('require("' + componentPath + '")');
    // delete pre compiled content
    delete component.fileContent;
  });

  const pageToString = JSON.stringify(page);
  const varScripts =
    "const page = " +
    pageToString +
    ";\n\n" +
    "const Coms = [" +
    Coms +
    "]\n\n\n";
  const appScript = fs
    .readFileSync(path.join(inputPath, "_app_template.js"))
    .toString();
  const allScript = varScripts + appScript;
  fs.writeFileSync(path.join(inputPath, inputFileName), allScript);
  var compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        const outputFilePath = path.join(outputPath, outputFileName);
        const jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0) {
          console.log(jsonStats.errors);
          reject(jsonStats.errors);
        }
        const fileContent = fs.readFileSync(outputFilePath);
        resolve({
          stats: stats,
          fileContent: fileContent,
          outputPath: outputPath,
          outputFileName: outputFileName
        });
        console.log("end compile template: ", project, pageId);
      }
    });
  });
};

export default { compileComponent, compileTemplate };
