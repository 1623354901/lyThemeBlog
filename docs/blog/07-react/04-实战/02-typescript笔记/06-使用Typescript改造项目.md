# 项目改造

## 改造建议

1. 项目中使用 TS 时，既可以包含 js 文件，又可以包含 ts 文件

  - `.js`、`.jsx`（使用 JS 时，React 组件对应的文件后缀）
  - `.ts`、`.tsx`（使用 TS 时，React 组件对应的文件后缀）、`.d.ts`

2. 在已有项目中，添加 TS 时的推荐模式

  - 新的功能用 TS
  - 已实现的功能，可以继续保持 JS 文件，慢慢修改为 TS 即可

3. React 组件对应的文件后缀，修改为：`.tsx`
4. 工具函数对应的文件后缀，修改为：`.ts` 或者为其添加类型声明文件 `.d.ts`

## 修改入口文件

### index.ts

- 直接将文件后缀修改为 index.tsx 即可
- 需要重启项目

## 修改App.js

+ 讲App.js 改成app.tsx即可
+ 需要安装react-router-dom的类型

```tsx
yarn add @types/react-router-dom
```

+ 重启

## 修改Icon组件

```tsx
import React from 'react'
import classNames from 'classnames'
type Props = {
  type: string
  className?: string
}
function Icon({ type, className, ...rest }: Props) {
  return (
    <svg {...rest} className={classNames('icon', className)} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default Icon

```

## 修改Input组件

