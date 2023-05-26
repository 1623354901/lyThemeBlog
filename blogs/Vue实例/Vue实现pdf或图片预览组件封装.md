---
title: Vue实现pdf或图片预览组件封装
date: 2023-05-16
tags:
    - Vue
categories:
    - Vue实例
    - 中金
publish: true
---

# PDF || Image 预览组件说明

组件内 pdf 预览使用 iframe，同时注释掉了 vue-pdf-signature pdf 插件，需要可解除注释使用

Image 预览采用了 最常见的 image 插入到弹框中

使用方法：
在父组件中

```vue
<!-- 通过后缀名判断文档类，调用openPdf or openImage方法调用预览组件的open方法并传参 -->
<a-button
    type="link"
    v-if="item.fileName.split('.')[1] === 'pdf'"
    style="width: 90%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;text-align:left;color:#52AAFC"
    @click="openPdf(item)"
>{{ item.fileName }}</a-button>
<a-button
    type="link"
    v-else
    style="width: 90%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;text-align:left;color:#52AAFC"
    @click="openImage(item)"
>{{ item.fileName }}</a-button>
```

引用组件

```js
<Cview ref="preview"></Cview>

import Cview from '@/components/Preview/index.vue'
components: {
    Cview
},
```

需要往预览组件传参说明：
file:{
fileName:"",
fileID:""
}
预览类型:'pdf' 或者 image

```js
 // 文件浏览
openPdf(value) {
    var fileNameSplit = value.fileName.split('.')
    var fileType = fileNameSplit[1]
    if (fileType === 'pdf') {
    this.$refs.preview.open(value, 'pdf')
    }
},
openImage(file) {
    this.$refs.preview.open(file, 'image')
},
```

具体案例可参考 src\views\merchantInspection\merchantAudit\module\detailTemplate.vue

### 组件封装代码

```vue
<template>
    <div>
        <a-modal
            v-model="visible"
            :title="title"
            mask
            :maskClosable="false"
            :width="1200"
            :height="1200"
        >
            <a-spin
                :spinning="detailLoading"
                style="with:1200px;height:1200px"
                v-if="flag == 'pdf'"
            >
                <iframe
                    :src="Url"
                    frameborder="0"
                    style="width: 100%; height:1200px"
                ></iframe>
                <!-- <pdf :src="pdfUrl"></pdf> -->
            </a-spin>
            <a-spin
                :spinning="detailLoading"
                style="text-align: center;with:1200px;height:1200px"
                v-if="flag == 'image'"
            >
                <img
                    width="80%"
                    :data-pswp-uid="Math.random()"
                    style="max-height: 100%"
                    :src="this.Url"
                    :preview="Math.random()"
                />
            </a-spin>
        </a-modal>
    </div>
</template>
<script>
// import pdf from 'vue-pdf-signature'
import { getPdfFile } from '@/api/merchantInspection/merchantAudit.js'
// import CMapReaderFactory from 'vue-pdf-signature/src/CMapReaderFactory.js'
export default {
    props: {},
    data() {
        return {
            Url: '',
            detailLoading: false,
            visible: false,
            title: '',
            flag: '',
        }
    },
    created() {
        // console.log(111)
    },
    methods: {
        open(file, flag) {
            this.flag = flag
            this.file = file
            this.title = file.fileName.split('.')[0]
            this.queryFile(file, flag)
        },
        queryFile(file, flag) {
            this.detailLoading = true
            if (flag === 'pdf') {
                this.hz = 'application/pdf'
            } else if (flag === 'image') {
                this.hz = 'image/png'
            }
            console.log(file)
            getPdfFile(file, this.hz).then((response) => {
                this.visible = true
                this.detailLoading = false
                this.Url = response
            })
        },
    },
}
</script>
```
