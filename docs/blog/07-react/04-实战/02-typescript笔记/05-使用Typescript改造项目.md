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

# utils工具函数改造

## history.js

不需要改造，直接把js改成ts即可

## storage.js

+ 讲js改成ts
+ 修改getTokenInfo

```jsx
/**
 * 从本地缓存中获取 Token 信息
 * JSON.parse() 要求参数必须是字符串
 * localStorage.getItem() 返回值可能是字符串，也可能是null，所以会报错
 */
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}
```

### 非空断言

[Non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)

- TS 中提供一个运算符：`!` `非空断言`
  - 如果一个值，它的类型可能是 null 或 undefined，但是，我们在使用时又很确定它的值一定不是 null 或 unde，此时，就可以通过 `非空断言` 来告诉 TS 听哥的，哥很确定它的不是 null 或 undefined
- 注意：**这个操作是风险的**，非空断言，仅仅是让 TS 中的类型检查不再校验 null 或 undefined，但是，如果它的值真的是 null 或 undefined，代码会在运行时报错！！！

### 整体修改

```jsx
// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast-21'
const CHANNEL_KEY = 'geek-itcast-21-channels'
type Token = {
  token: string
  refresh_token: string
}
type Channels = {
  id: number
  name: string
}[]
/**
 * 从本地缓存中获取 Token 信息
 * JSON.parse() 要求参数必须是字符串
 * localStorage.getItem() 返回值可能是字符串，也可能是null，所以会报错
 */
export const getTokenInfo = (): Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = (): boolean => {
  return !!getTokenInfo().token
}

/**
 * 保存频道数据到本地
 * @param {*} channels
 */
export const setLocalChannels = (channels: Channels): void => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 获取本地的频道数据，，，，，，，如果没有数据，不要默认为空数组
 * @returns
 */
export const getLocalChannels = (): Channels => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY)!)
}

/**
 * 删除本地的频道数据
 */
export const removeLocalChannels = (): void => {
  localStorage.removeItem(CHANNEL_KEY)
}

```



# 通用组件改造

## svg组件修改

```jsx
import classNames from 'classnames'
type Props = {
  type: string
  className?: string
  onClick?: () => void
}
function Icon({ type, className, onClick }: Props) {
  return (
    <svg
      className={classNames('icon', className)}
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default Icon

```

## typescript中ref的使用

```jsx
const imgRef = useRef<HTMLImageElement>(null)

const current = imgRef.current!
```



## Img懒加载组件修改

```jsx
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'
type Props = {
  src: string
  className?: string
  alt?: string
}
const Image = ({ className, src, alt }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  // 控制是否在加载
  const [loading, setLoading] = useState(true)
  // 控制是否加载失败
  const [error, setError] = useState(false)

  // 加载成功
  const onLoad = () => {
    setError(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setError(true)
  }
  useEffect(() => {
    // 监听图片
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片在可视区
        const current = imgRef.current!
        current.src = current.dataset.src!
        // 取消监听
        observer.unobserve(current)
      }
    })
    observer.observe(imgRef.current!)
  }, [])
  return (
    <div className={classnames(styles.root, className)}>
      {/* 加载中 */}
      {loading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}

      <img
        alt={alt}
        ref={imgRef}
        data-src={src}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}

export default Image

```

## Input组件修改

+ 基本改造

```jsx
import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
interface Props {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
}
export default function Input({
  extra,
  onExtraClick,
  className,
  autoFocus,
  ...rest
}: Props) {
  // focus
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        className={classNames('input', className)}
        {...rest}
      />
      {extra ? (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      ) : null}
    </div>
  )
}

```

+ 剩余参数的支持

> InputHTMLAttributes中包含了Input框所有能够支持的属性

```jsx
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
}
```

+ 使用type替代interface

```jsx
type Props = {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
  type?: 'input' | 'password'
} & InputHTMLAttributes<HTMLInputElement>
```

TS 中的 &（交叉类型）

- 交叉类型：`&`
  - 作用：可以理解为取多个类型的并集
- 联想到了，另一个类型：`|` 联合类型

```ts
// | 在 TS 中表示： number 和 string 两者中出现哪一个都行
type NumStr = number | string

type InputProps = {
  extra?: string
  onExtraClick?: () => void
  className?: string
  dom?: React.RefObject<HTMLInputElement>
}

// & 在 TS 中表示： 最终的类型两者都有
type Props = InputProps & InputHTMLAttributes<HTMLInputElement>
```

交叉类型需要注意的地方：同名的属性容易冲突

使用omit优化

```tsx
type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'autoFocus'
> & {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
  type?: 'text' | 'password'
}
```

