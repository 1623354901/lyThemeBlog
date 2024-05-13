---
title: 解决Vue pdf预览无法展示后端插入的甲方名称
date: 2024-05-13
tags:
  - Vue
categories:
  - Vue实例
  - Vue pdf
publish: true
---

> 情况：后端返回文件流，前端通过 vue-pdf 组件实现文件的预览。
> 问题：后端的源文件中，协议甲方的名称是后端通过 canvas 绘图，然后插入到占位符的位置，但是前端使用了两种 pdf 组件，都无法使插入的甲方名称渲染出来

#### vue-pdf 实现方法

```vue
<div v-show="loaded">
  <pdf v-for="index in numPages" :key="index" :src="pdfUrl" :page="index" />
</div>
```

```js
  numPages: null,
  fileType: 'pdf', // 文件类型
  pdfUrl: location.href.split('#')[0]+ 'wordContent.pdf'
  import pdf from 'vue-pdf'
loadPdf() {
      // setTimeout(function () {
      this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)
      this.pdfUrl.promise.then(pdf => {
        this.$nextTick(() => {
          this.numPages = pdf.numPages // pdf总页数
          this.loaded = true
          var timer = setInterval(() => {
            this.currentNum += 1
            if (this.currentNum === this.numPages) {
              clearInterval(timer)
            }
          }, 500)
        })
      })
      // }, 1000)
    },
```

#### vue-pdf-signature

```vue
<div class="agreementContent">
 <pdf v-for="i in numPages" :key="i" :src="src" :page="i" ref="myPdfComponent"></pdf>
</div>
```

```js
import pdf from "vue-pdf-signature";
watch: {
    agreementShow: {
      handler(val) {
        this.signShow = val
      }
    },
    protocolContext: {
      handler(val) {
        this.context = val
        this.src = pdf.createLoadingTask({ url: this.context, CMapReaderFactory, cMapPacked: true })
        this.src.promise.then(pdf => {
          this.numPages = pdf.numPages
        })
      }
    }
  }
```

vue-pdf 组件：头部甲方名称和后面的盖章，签名都无法显示
vue-pdf-signature：能显示后面的盖章和签名，甲方名称依然无法显示

> 解决方案：最后通过将 pdf 文档流转化为 canvas，再转化为图片，内容正常显示
> 参考：https://blog.csdn.net/Jw_1201/article/details/129840593

```vue
//页面显示转换后的图片
<img v-for="(item, i) in imageBase64" :key="i" :src="item.url" />
imageBase64: [], // 附件预览
```

根据后端返回的 base64 我这没有返回前缀 所以手动加上

```js
import { pdf_img } from '@/components/test/FileTypeConversion.js';
querytest(tab) {
      // 预览附件
        this.imageBase64 = [];
        querytest(obj)
          .then((res) => {
            if (res.data.code == '0') {
              const arr = res.data.data;
                  const a = pdf_img(
                    'data:application/pdf;base64,' + arr[i].imageBase64,
                    'pdf',
                    'base64',
                  );
                  a.Callback = (obg) => {
                    for (let i = 0; i < obg.length; i++) {
                      let obj = {};
                      obj.url = obg[i];
                      this.imageBase64.push(obj);
                    }
                  };
            }
          })
    },
```

封装好的工具类 FileTypeConversion.js

```js
import pdf from "vue-pdf";
import JsPDF from "jspdf";
import { changeUrl } from "./appendix.js";
export function pdf_canvas(file, type, fileForm) {
  // pdf转canvas
  const onloadFile = {};
  const canvasArr = [];
  let numPages = 0;
  changeUrl(file, type, fileForm + "_url").then((perfix64) => {
    const CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
    const src = pdf.createLoadingTask({
      url: perfix64,
      withCredentials: false,
      cMapUrl: CMAP_URL,
      cMapPacked: true,
    });
    src.promise
      .then((pdf) => {
        for (let i = 1, l = pdf.numPages; i <= l; i++) {
          numPages = pdf.numPages;
          pdf.getPage(i).then((page) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.style.width = viewport.width + "px";
            canvas.style.height = viewport.height + "px";
            page.render({
              canvasContext: ctx,
              viewport,
            });
            canvasArr.push(canvas);
            if (numPages == i) {
              onloadFile.Callback ? onloadFile.Callback(canvasArr) : "";
            }
          });
        }
      })
      .catch((err) => {
        console.error("pdf 加载失败", err);
      });
  });
  return onloadFile;
}
export function canvas_img(canvas) {
  // canvas转img
  return canvas.toDataURL("image/png");
}
export function pdf_img(file, type, fileForm) {
  // pdf转img
  const onloadFile = {};
  const imgList = [];
  const canvas = pdf_canvas(file, type, fileForm);
  canvas.Callback = function (canvasArr) {
    setTimeout(() => {
      for (let i = 0; i < canvasArr.length; i++) {
        imgList.push(canvasArr[i].toDataURL("image/png"));
      }
      onloadFile.Callback ? onloadFile.Callback(imgList) : "";
    }, 1000 + 150 * canvasArr.length);
  };
  return onloadFile;
}

export function img_canvas(file, fileForm) {
  // img转canvas
  const onloadFile = {};
  changeUrl(file, fileForm, fileForm + "_url").then((url) => {
    const img = new Image(); //创建一个临时存储
    img.src = url; //将图片数据赋值即可
    img.onload = function () {
      //定义加载图片后弹出显示
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      this.ctx = canvas.getContext("2d");
      this.ctx.drawImage(img, 0, 0, img.width, img.height);
      onloadFile.Callback ? onloadFile.Callback(canvas) : "";
      img.remove();
    };
  });
  return onloadFile;
}

export function img_pdf(file, fileForm) {
  // img转pdf
  const onloadFile = {};
  const canvas = img_canvas(file, fileForm);
  canvas.Callback = function (canvas) {
    const base64pdf = canvas_pdf(canvas);
    onloadFile.Callback ? onloadFile.Callback(base64pdf) : "";
  };
  return onloadFile;
}

export function canvas_pdf(canvas) {
  // canvas转pdf
  const canvasUrl = canvas.toDataURL("image/jpeg");
  const pdf = new JsPDF("x", "px", [canvas.width, canvas.height]);
  pdf.addImage(canvasUrl, "PNG", 0, 0, canvas.width, canvas.height);
  let base64pdf = pdf.output("datauristring");
  base64pdf = base64pdf.replace(
    "data:application/pdf;filename=generated.pdf;base64,",
    "data:application/pdf;base64,"
  );
  return base64pdf;
}
```

changURl-->appendix.js

```js
const fileType = {
  pdf: {
    type: "application/pdf;charset=utf-8", // 文件转换类型
    base64Type: "data:application/pdf;base64,", // base64前缀
  },
  img: {
    // img适用所有通用图片格式
    type: "image/png",
    base64Type: "data:image/png;base64,",
  },
  gif: {
    type: "image/gif",
    base64Type: "data:image/gif;base64,",
  },
  doc: {
    type: "application/msword",
    base64Type: "data:application/msword;base64,",
  },
  docx: {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    base64Type:
      "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
  },
  xls: {
    type: "application/vnd.ms-excel",
    base64Type: "data:application/vnd.ms-excel;base64,",
  },
  xlsx: {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    base64Type:
      "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
  },
  ppt: {
    type: "application/vnd.ms-powerpoint",
    base64Type: "data:application/vnd.ms-powerpoint;base64,",
  },
  pptx: {
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    base64Type:
      "data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,",
  },
  txt: {
    type: "text/plain",
    base64Type: "data:text/plain;base64,",
  },
};
let files, types, changeTypes;

// file 附件
// type 文件类型(img,pdf)
// changeType 附件转换类型(base64 blob url),三者互转(列如:base64_url)
export async function changeUrl(file, type, changeType) {
  if (!file || !type || !changeType || !fileFun[changeType]) {
    return file;
  }
  files = file;
  types = type;
  changeTypes = changeType;
  const fileWj = await fileFun[changeType](file);
  return fileWj;
}
function base64_url(file) {
  // base64转url
  const blob = base64_blob(file);
  return window.URL.createObjectURL(blob);
}
function base64_blob(file) {
  // base64转blob
  const arr = file.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
function blob_url(file) {
  // blob转url
  const blob = new Blob([file], { type: fileType[types].type });
  return URL.createObjectURL(blob);
}
function blob_base64(file) {
  // blob转base64
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const arr = reader.result.split(",");
      resolve(fileType[types].base64Type + arr[1]);
    };
  });
}
async function url_blob(url) {
  // url转blob
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      const myBlob = this.response;
      // let files = new window.File([myBlob], myBlob.type, {type:myBlob.type}) // myBlob.type 自定义文件名
      resolve(myBlob);
    };
    xhr.send();
  });
}
async function url_base64(url) {
  // url转base64
  const blob = await url_blob(url);
  return new Promise((resolve) => {
    blob_base64(blob).then((res) => {
      resolve(res);
    });
  });
}

const fileFun = {
  base64_url: base64_url,
  blob_url: blob_url,
  base64_blob: base64_blob,
  blob_base64: blob_base64,
  url_blob: url_blob,
  url_base64: url_base64,
};
```

通过这种转化，最终成功展示
