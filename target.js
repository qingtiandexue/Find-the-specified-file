const fs = require('fs');
const path = require('path');
function readFileList(target,zyr) {
    const files = fs.readdirSync(target);//此目录所有文件名称的数组对象
    files.forEach((itm, index) => {
        let paths = path.join(target, itm);//拼接文件路径
        let stats = fs.statSync(paths);//读取指定路径的文件信息
        if (stats.isFile()) {//判断是否为文件
            // if (path.basename(paths) === zyr) {//是否为所查找文件名
            if (itm === zyr) {//是否为所查找文件名
                let data = fs.readFileSync(paths, 'utf8');//读取文件内容
                fs.writeFile(__dirname + '/copy/zyr.txt', data, (err) => {
                    if (err) return console.log('添加失败' + err.message);
                    console.log('ok');
                })
            }
        }
        if (stats.isDirectory()) {//如果是文件夹，递归调用
            readFileList(paths,zyr);
        }
    });
}
readFileList(__dirname + '/target','9.txt');//传入文件路径和找寻文件名