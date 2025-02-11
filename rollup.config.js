// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

const name = "Tiny-CodeMd"


export default {
  input: 'dist/plugin.js', // 入口文件
  output: {
    file: 'dist/codemd/plugin.min.js', // 输出文件路径和文件名
    format: 'umd', // 输出格式为 UMD
    name, // UMD 格式需要的全局变量名称
    // globals: {
    //   turndown: 'TurndownService', // 如果需要在全局命名空间中访问 turndown
    //   markdownit: 'markdownit' // 如果需要在全局命名空间中访问 markdown-it
    // },
    // sourcemap: true // 生成 source map 文件，方便调试
  },
  plugins: [
    resolve(), // 解析外部模块
    commonjs(), // 转换 CommonJS 模块
    // 去除注释等
    cleanup(),
    // terser(), // 生产环境压缩代码
  ]
};

