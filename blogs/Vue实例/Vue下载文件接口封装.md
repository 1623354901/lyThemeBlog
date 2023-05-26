---
title: Vue实现tabs左右可切换，自适应宽度
date: 2023-04-25
tags:
    - 下载文件
categories:
    - Vue实例
    - 中金
publish: true
---

responseType: 'blob',和 new blob(....)是重点

```js
export async function exportFile(url, parameter, downloadName, type, method) {
    const result = await axios({
        method: method !== undefined ? method : 'post',
        url: url,
        // params: parameter,
        data: parameter,
        responseType: 'blob',
        timeout: 60000,
    })
    // const res = await judgeErrorByResponseType(result)
    const dom = document.createElement('a')
    const binaryData = []
    binaryData.push(result)
    console.log(result)
    const downloadUrl = window.URL.createObjectURL(
        new Blob([result], { type: type })
    )
    dom.href = downloadUrl
    dom.download = downloadName
    dom.style.display = 'none'
    document.body.appendChild(dom)
    dom.click()
    dom.parentNode.removeChild(dom)
    window.URL.revokeObjectURL(downloadUrl)
}
```

使用：

```js
import { exportFile } from '@/utils/helper/commonUtil'
export function tradeDownload(parameter, fileName, type) {
    exportFile(url, parameter, fileName, type)
}


download() {
  const params = Object.assign(this.pagination, this.queryParam)
  console.log(params)
  tradeDownload(
    params,
    '商户用户账户结算表_起始日期' + this.queryParam.systemTimeStart + '_截止日期' + this.queryParam.systemTimeEnd,
    'application/vnd.ms-excel'
  )
},
```
