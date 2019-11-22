const path = require("path");
const fs = require("fs");
const argv = process.argv;
const sourceDir = "./src/template/entryTemp";
const desPath = "./src/entry";
const config = {
    //新建react模板路由
    newTpl: (from, to, newDirName) => {
        newDirName = config.wordCase(newDirName);
        fs.readdir(from, (err, files) => {
            if (err) {
                throw err;
            }
            //新建目标目录
            fs.mkdir(path.join(desPath, newDirName), (err) => {
                if (err) throw err;
                console.log("新建文件夹%s成功：", newDirName);
            })
            files.map(item => {
                let fPath = path.join(from, item);
                fs.readFile(fPath, (err, data) => {
                    let dataString = data.toString();
                    dataString = dataString.replace(/entryTemp/gi, newDirName);

                    item = item.replace(/entryTemp/gi, newDirName);
                    fs.writeFile(path.join(desPath, newDirName, item), dataString, (err) => {
                        if (err) throw err;
                        // config.router
                    })
                })

            })
        })
    },
    router: function (sourceDir="./src/entry", desPath="./src/router.tsx", temp="./src/template/router.tsx") {
        //遍历文件夹 
        fs.readdir(sourceDir, (err, files) => {
            if (err) {
                throw err;
            }
            // files = files.filter(item => {
            //     return item !== "Home"
            // })
            files = files.map(item => {
                return {
                    path: item=="Home"?"/":config.wordCase(item, false),
                    exact:true,
                    component: item
                }
            })
            fs.readFile(temp, (err, data) => {
                let dataString = data.toString();
                dataString = dataString.replace(/routerTemp/gi, JSON.stringify(files));
                fs.writeFile(desPath, dataString, (err) => {
                    if (err) throw err;
                })
            })

        })
    },
    /**
     * @param {*} str 要转换的字符串
     * @param {*} mode true:大写  false: 小写
     */
    wordCase: function (str, mode = true) {
        var reg = /\b(\w)/;
        return str.replace(reg, function (m) {
            return mode ? m.toUpperCase() : m.toLowerCase()
        })
    }
}

let newDirName,mode;


if(argv.length<=2){
    throw "请输入需要新建模板的名字";
}
else if(argv.length==3){
    newDirName=argv[2];
    mode="newTpl";
}else if(argv.length==4){
    mode=argv[2];
    newDirName=argv[3];
}
else {
    throw "请输入正确格式: node util.js [newTpl/] [name]" ;
}

config[mode](sourceDir, desPath, newDirName) ;



