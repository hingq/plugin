## 一个杂乱的插件录

### auto_import

这个一个自动导出组件的库

写组件库的时候不在手动导出!

这需要你的目录结构每个组件都在一个目录下面

因为导出是会新建一个index.js，每个目录都有

结构如下：

```json
my-vue-project/
├── src/
│   ├── components/
│   │   ├── MyComponent
|   |   |------MyComponent.vue
│   │   ├── AnotherComponent
|   |   |-------AnotherComponetn.vue
│   │   └── index.js (自动生成的文件)
│   ├── App.vue
│   ├── main.js
│   └── export.config.json
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts

```



export.config.json文件用于配置，不配置，默认src/componetns

```json
{
    "path": "./src/components", 
    "output": "./src/components/index.js",
    //输出路径
    "regexp":"/.*/",
    //匹配文件，默认vue/jsx
    "prefix":"h"
    //组件前缀
}
```

