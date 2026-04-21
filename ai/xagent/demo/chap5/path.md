```js

function resolveWorkspacePath(filePath: string, cwd: string): string {
  // 1. 解析出绝对路径（支持 ~ 家目录）
  const resolvedPath = path.resolve(cwd, expandHome(filePath))
  
  // 2. 安全检查：必须在 cwd 内部，否则报错
  ensureInsideCwd(resolvedPath, cwd)
  
  // 3. 返回安全的绝对路径
  return resolvedPath
}

```

### 逐行解释
1. 参数
> filePath: string
> 要解析的路径，可以是相对路径、绝对路径、带～的路径。
> cwd: string
> 当前工作目录（一般是项目根目录）。
2. path.resolve(cwd, expandHome(filePath))
> 这行做了两件事：
> expandHome(filePath)把 ~/.npmrc 这种家目录路径展开成绝对路径
> ~ → /Users/xxx 或 /home/xxx
> path.resolve(cwd, 路径)Node.js 核心方法，基于 cwd 解析出最终绝对路径。例子：
```
cwd = /project
filePath = ./src/index.js
→ 解析成 /project/src/index.js
```
3. ensureInsideCwd(resolvedPath, cwd)
> 安全校验函数
> 检查解析后的路径 是否在 cwd 目录内部
> 如果跑到外面去了（例如 ../../etc/passwd）
> → 直接抛出错误，阻止访问
> → 防止路径穿越攻击
> 这是后端 / CLI 工具必备的安全防护。
4. 返回值
> 返回一个安全、合法、绝对路径。
> 最简单的一句话总结
> 这个函数的作用就是：安全地把任意路径解析成基于项目根目录的绝对路径，绝不允许访问项目目录之外的文件。
### 典型使用场景
> CLI 工具读取配置文件
> 项目工作区路径校验
> 防止用户输入恶意路径（如 ../../etc）
> VSCode 插件、工程化工具