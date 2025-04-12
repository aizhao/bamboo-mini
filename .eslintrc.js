module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "plugin:prettier/recommended", //这样写，让pettier的规则，放在eslint规则扩展中，于是会经由eslint报错
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    quotes: [2, "double"], //警告，必须双引号
    "no-compare-neg-zero": 2, //禁止与 -0 进行比较
    "no-cond-assign": [2, "except-parens"], //禁止条件语句中出现赋值操作符
    "no-console": 0, //允许出现console
    "no-constant-condition": 2, //禁止在条件中使用常量表达式
    "no-control-regex": 2, //禁止在正则表达式中使用控制字符
    "no-debugger": 0, //可以使用debugger
    "no-dupe-args": 2, //禁止 function 定义中出现重名参数
    "no-dupe-keys": 2, //禁止对象字面量中出现重复的 key
    "no-duplicate-case": 2, //禁止出现重复的 case 标签
    "no-empty": 2, //禁止出现空语句块
    "no-empty-character-class": 2, //禁止在正则表达式中使用空字符集
    "no-ex-assign": 2, //禁止对 catch 子句的参数重新赋值
    "no-extra-boolean-cast": 2, //禁止不必要的布尔转换
    "no-extra-parens": ["error", "functions"], //禁止不必要的括号
    "no-extra-semi": 2, //禁止不必要的分号
    "no-func-assign": 2, //禁止对 function 声明重新赋值
    "no-inner-declarations": 0, //禁止在嵌套的块中出现变量声明或 function 声明
    "no-invalid-regexp": 2, //禁止 RegExp 构造函数中存在无效的正则表达式字符串
    "no-irregular-whitespace": 2, //禁止不规则的空白
    "no-obj-calls": 2, //禁止把全局对象作为函数调用
    "no-prototype-builtins": 2, //禁止直接调用 Object.prototypes 的内置属性
    "no-regex-spaces": 2, //禁止正则表达式字面量中出现多个空格
    "no-sparse-arrays": 2, //禁用稀疏数组
    "no-template-curly-in-string": 0, //禁止在常规字符串中出现模板字面量占位符语法
    "no-unexpected-multiline": 2, //禁止出现令人困惑的多行表达式
    "no-unreachable": 2, //禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unsafe-finally": 2, //禁止在 finally 语句块中出现控制流语句
    "no-unsafe-negation": 2, //禁止对关系运算符的左操作数使用否定操作符
    "use-isnan": 2, //要求使用 isNaN() 检查 NaN
    "valid-jsdoc": "off", //
    "valid-typeof": 2, //强制 typeof 表达式与有效的字符串进行比较
 
    curly: 2, //强制所有控制语句使用一致的括号风格
    "consistent-return": [
      2,
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    "default-case": 2,
    eqeqeq: "off",
    "guard-for-in": 0,
    "no-case-declarations": 0,
    "no-empty-pattern": 2,
    "no-fallthrough": 2,
    "no-global-assign": [
      2,
      {
        exceptions: [],
      },
    ],
    "no-octal": 2,
    "no-redeclare": 2,
    "no-self-assign": 2,
    "no-unused-labels": 2,
    "no-useless-escape": 2,
 
    strict: 2,
 
    "no-delete-var": 2,
    "no-undefined": 0,
    "no-undef": 2,
    "no-use-before-define": 2,
 
    "array-bracket-spacing": [2, "never"],
    "block-spacing": [2, "always"],
    "brace-style": [2, "1tbs"],
    "comma-dangle": ["error", "never"],
    "comma-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ],
    "comma-style": [2, "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": [2, "always"],
    "func-call-spacing": ["error", "never"],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "new-cap": [
      "error",
      {
        newIsCap: true,
        capIsNewExceptionPattern: "(Type[a-zA-Z0-9]+|Deco[a-zA-Z0-9]+)+",
      },
    ],
    "new-parens": "error",
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-assign": "error",
    "no-multiple-empty-lines": "error",
 
    semi: [
      2,
      "always",
      {
        omitLastInOneLineBlock: true,
      },
    ],
 
    "constructor-super": 2,
    "no-class-assign": 0,
    "no-const-assign": 2,
    "no-this-before-super": 2,
    "no-var": 2,
    "no-dupe-class-members": 2,
    "no-new-symbol": 2,
    "require-yield": 2,
    "prefer-const": 0,
  },
};