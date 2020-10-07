#!/usr/bin/env node
// node cli 入口文件必须要有的文件头

const fs = require('fs')  // 读取文件
const path = require('path')
const inquirer = require('inquirer');  // 命令行交互插件
const ejs = require('ejs')  // 模板引擎

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  },
  {
    type: 'input',
    name: 'desc',
    message: 'Project description?'
  }
])
.then(answers => {
  // 模板目录
  const tmpDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd();

  // 将模板下的文件全部转换到目标目录
  fs.readdir(tmpDir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmpDir, file), answers, (err, result) => {
        if (err) throw err

        // 将结果写入目标文件
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})