// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

const name = "Tiny-CodeMd"


export default {
  input: 'src/index.ts', // 入口文件
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
    typescript({tsconfig: './tsconfig.json'}),
    resolve(),    // 解析外部模块
    commonjs(),   // 转换 CommonJS 模块

    // cleanup(),    // 去除注释等, src 为 ts 代码时貌似无效

    terser({
      compress: true,   // 代码压缩
      mangle: true,     // 变量名混淆
      output: {
        comments: false,    // 去除注释
        beautify: true,     // 保持代码格式化，不压缩为一行
        indent_level: 2     // 设置缩进级别，可选
      }
    })
  ]
};

