---
title: Vue3+elementuiplus封装表单+表格组件
date: 2024-05-13
tags:
  - Vue
categories:
  - Vue3实例
  - table
publish: true
---

#### 1、先封装 table 组件

```vue
<template>
  <!-- 
    参数说明：
    tableData：表格中的数据，通过接口获取
    columns：表格列标题，及操作
    selection：多选
    index:序号
    getRowKey：添加row-key
    getDataWay 获取表格数据的方式，1.通过url方式2.通过数据数组方式3.请求方式type:"post"|"get",默认"post"
   -->
  <div class="tableDiv">
    <!-- :show-overflow-tooltip="true" -->
    <el-table
      :data="tableData"
      :row-key="getRowKey"
      element-loading-text="加载中"
      @select="select"
      v-bind="$attrs"
      @select-all="selectAll"
      :show-overflow-tooltip="true"
    >
      <template v-if="$attrs.selection">
        <el-table-column type="selection" width="55" />
      </template>
      <template v-if="$attrs.index">
        <el-table-column
          type="index"
          label="序号"
          width="65"
          :resizable="false"
        >
        </el-table-column>
      </template>

      <template v-for="item in columns">
        <el-table-column
          :label="item.label"
          :width="item.width"
          :prop="item.name"
          :formatter="item.formatter || null"
          v-if="!item.solt"
        />
        <el-table-column
          :label="item.label"
          :width="item.width"
          :prop="item.name"
          fixed="right"
          v-else
        >
          <template #default="scope">
            <slot name="group" v-bind="scope" style="max-width: 300px"></slot>
            <!-- <slot name="group" :row="scope.row" :$index="scope.$index"></slot> -->
          </template>
        </el-table-column>
      </template>
    </el-table>
    <tablePage
      :pagination="paginationObj"
      v-on:currentChange="handleCurrentChange"
      v-on:sizeChange="handleSizeChange"
      v-on:pageSizeChange="handlePageSizeChange"
    ></tablePage>
  </div>
</template>

<script setup lang="ts">
import tablePage from "../TablePage/index.vue";

const emit = defineEmits([
  "getTableListData",
  "handleCurrentChange",
  "handleSizeChange",
  "handlePageSizeChange",
]);

const props = defineProps({
  columns: {
    default: [],
    type: Array,
  },
  tableData: {
    default: [],
    type: Array,
  },
  // 是否能多选
  // selection: {
  //   default: false,
  //   type: Boolean,
  // },
  // // 是否有序号
  // index: {
  //   default: false,
  //   type: Boolean,
  // },
  // el-table添加row-key
  getRowKey: {
    default: function () {},
    type: Function,
  },
  getDataWay: {
    default: {},
    type: Object,
  },
  pagination: {
    // pageNum,pageSize必传
    default: {},
    type: Object,
  },
});

// 选中数据
const checkedData = ref([]);
// 当用户手动勾选数据行的 Checkbox 时触发的事件
const select = (selection: any, row: any) => {
  if (selection.indexOf(row) >= 0) {
    if (checkedData.value.indexOf(row) == -1) {
      checkedData.value.push(row);
    }
  } else {
    checkedData.value.forEach((item, index) => {
      if (JSON.stringify(item) == JSON.stringify(row)) {
        checkedData.value.splice(index, 1);
      }
    });
  }
};
// 用户点击全部选择
const selectAll = (selection: any) => {
  if (selection.length > 0) {
    selection.forEach((item) => {
      if (
        JSON.stringify(checkedData.value).indexOf(JSON.stringify(item)) == -1
      ) {
        checkedData.value.push(item);
      }
    });
  } else {
    props.tableData.forEach((row) => {
      if (JSON.stringify(checkedData.value).indexOf(JSON.stringify(row)) >= 0) {
        let num = -1;
        checkedData.value.forEach((obj, index) => {
          //获取下标
          if (JSON.stringify(obj).indexOf(JSON.stringify(row)) >= 0) {
            num = index;
          }
        });
        checkedData.value.splice(num, 1);
      }
    });
  }
};
const paginationObj = ref({
  // pages: 3,
  pageNum: 1, //当前页
  pageSize: 10, //每页显示条数
  pageSizes: [10, 20, 30, 40, 50, 100],
  position: "center",
  layout: "total,prev,pager,next",
  // layout: "total,sizes,prev,pager,jumper,next",
  totalCount: 1000,
  totalPage: 100,
});
// 页码变化
const handleCurrentChange = (val: any) => {
  paginationObj.value.pageNum = val;
  // loadData();
  emit("handleCurrentChange");
};
const handleSizeChange = (val: any) => {
  paginationObj.value.pageSize = val;
  // loadData();
  emit("handleSizeChange");
};
const handlePageSizeChange = (val: any) => {
  paginationObj.value.pageSize = val;
  // loadData();
  emit("handlePageSizeChange");
};
// searchParams:调用loaddata传过来的form表单参数
const loadData = (searchParams: any = {}) => {
  let dataParams: any = {};
  if (searchParams) {
    dataParams = Object.assign(searchParams, props.getDataWay.param);
  } else {
    dataParams = props.getDataWay.param || {};
  }
  if (props.getDataWay.dataType === "data") {
    // 已经获取到table数据,分页参数由props.getDataWay中定
    let tableData = props.getDataWay.data; //在父组件中通过接口获取到的数据
    paginationObj.value.pageNum = tableData.dt.pageNum;
    paginationObj.value.pageSize = tableData.dt.pageSize;
    paginationObj.value.totalPage = tableData.dt.totalPage; //总条数，目前分页组件中用不到这个参数
    paginationObj.value.totalCount = tableData.dt.totalCount;
    emit("getTableListData", tableData.dt.items); //将拿到的数据暴露出去，给父组件
  } else if (props.getDataWay.dataType === "url") {
    // 优先选择props.getDataWay.param 中的分页参数作为请求参数
    let pageParam: any = {};
    // pageParam.pageNum =
    //   dataParams.pageNum != null
    //     ? dataParams.pageNum
    //     : paginationObj.value.pageNum;
    // pageParam.pageSize =
    //   dataParams.pageSize != null
    //     ? dataParams.pageSize
    //     : paginationObj.value.pageSize;

    pageParam.pageNum = paginationObj.value.pageNum
      ? paginationObj.value.pageNum
      : dataParams.pageNum
      ? dataParams.pageNum
      : 1;
    pageParam.pageSize = paginationObj.value.pageSize
      ? paginationObj.value.pageSize
      : dataParams.pageSize
      ? dataParams.pageSize
      : 10;

    // 分页参数和form表单参数
    props.getDataWay
      .data(Object.assign(dataParams, pageParam))
      .then((res) => {
        if (res.cd === "2000") {
          emit("getTableListData", res.dt.items); //将获取到的数据暴露出去，给父组件
          if (paginationObj.value !== "") {
            paginationObj.value.pageNum = res.dt.pageNum;
            paginationObj.value.pageSize = res.dt.pageSize;
            paginationObj.value.totalPage = res.dt.totalPage;
            paginationObj.value.totalCount = res.dt.totalCount;
          }
        }
      })
      .catch((err: any) => {
        console.log(err, "获取列表报错，接口" + props.getDataWay.data);
      });
  }
};
onMounted(() => {
  // console.log(props.pagination);
  if (props.pagination.pageNum) {
    paginationObj.value.pageNum = props.pagination.pageNum;
  }
  if (props.pagination.pageSize) {
    paginationObj.value.pageSize = props.pagination.pageSize;
  }
  if (props.pagination.pageSizes) {
    paginationObj.value.pageSizes = props.pagination.pageSizes;
  }
  if (props.pagination.layout) {
    paginationObj.value.layout = props.pagination.layout;
  }

  // if (props.getDataWay.dataType.toLowerCase() === "url") {
  //   //   // 根据url发送请求获取table数据
  //   //   (this.getDataWay.tableRequest === undefined ||
  //   //     this.getDataWay.tableRequest) &&
  //   //     this.loadData(); //请求数据
  //   loadData(); //请求数据
  // }
  loadData(); //请求数据
});
defineExpose({ loadData });
</script>

<style scoped lang="scss">
.tableDiv {
  height: 100%;
  width: 100%;
  // flex: 1;
  display: flex;
  flex-direction: column;
}
:deep(.el-table) {
  width: calc(100% - 40px);
  margin: 20px;
  height: 100%;
  // flex: 1;
  td.el-table__cell div {
    max-height: 98px;
  }
  th.el-table__cell {
    font-size: 14px;
    font-family: PingFangSC, PingFang SC;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  td.el-table__cell div {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-family: MicrosoftYaHeiLight;
    color: #0f1824;
  }
  .el-table__body {
    overflow-x: auto;
  }
  .el-button {
    color: $themeBlue;
  }
}
</style>
```

#### 2、再封装分页组件

```vue
import { emit } from 'process';
<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="pagination.pageNum"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :layout="pagination.layout"
      :total="pagination.totalCount"
      prev-text="上一页"
      next-text="下一页"
      @update:page-size="pageSizeChange"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 分页对象
  pagination: Object,
});
const emit = defineEmits(["sizeChange", "currentChange", "pageSizeChange"]);
// 每页显示条数变化 -page-size 改变时触发
const handleSizeChange = (val: any) => {
  emit("sizeChange", val);
};
//current-page变化时-页码变化时
const handleCurrentChange = (val: any) => {
  emit("currentChange", val);
};
// 每页条数变更时的函数
const pageSizeChange = (val: any) => {
  console.log(val);
  emit("pageSizeChange", val);
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
}
</style>
```

#### 3、封装表单组件

```vue
<template>
  <div>
    <el-row>
      <el-form label-width="110px" :model="form">
        <el-col
          v-for="(item, colIndex) in formList"
          :md="8"
          :sm="24"
          :xl="(colIndex + 1) % 5 === 0 ? 5 : 5"
          :xxl="(colIndex + 1) % 5 === 0 ? 5 : 5"
        >
          <el-form-item :label="item.label" v-if="item.type === 'input'">
            <el-input
              v-model="form[item.name]"
              :placeholder="item.placeholder"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="item.label"
            v-if="item.type === 'select' && item.selectObj"
          >
            <c-select
              v-model="form[item.name]"
              :placeholder="item.placeholder"
              :selectObj="item.selectObj"
            ></c-select>
          </el-form-item>

          <el-form-item :label="item.label" v-if="item.type === 'dateRange'">
            <el-date-picker
              v-model="form[item.name]"
              type="daterange"
              :start-placeholder="item.startPlaceHolder || ''"
              :end-placeholder="item.endPlaceholder || ''"
              :default-value="item.defaultValue"
              @change="dateRangeChange(item)"
              format="YYYY-MM-DD"
              value-format="YYYYMMDDHHmmsssss"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="24" :xl="5" :xxl="5">
          <div class="buttonls">
            <el-button @click="refreshTable" class="button searchButton"
              >查 询</el-button
            >
            <el-button
              @click="clearAllDefaultBtn"
              style="margin-left: 0.8rem"
              class="button resetButton"
              >重 置</el-button
            >
          </div>
        </el-col>
      </el-form>
    </el-row>
    <el-row> <slot name="otherList" class="otherButton"></slot></el-row>
  </div>
</template>

<script setup lang="ts">
import CSelect from "../CSelect/index.vue";
const emits = defineEmits(["searchTable"]);
const props = defineProps({
  formList: {
    default: [],
    type: Array,
    required: true,
  },
});
const form: any = ref({});
/* 查询按钮查询方法 */
const refreshTable = () => {
  emits("searchTable", form.value);
};
const clearAllDefaultBtn = () => {
  form.value = {};
};
const dateRangeChange = (item) => {
  console.log(item);

  if (form.value[item.name] && form.value[item.name].length > 0) {
    form.value[item.startName] = form.value[item.name][0];
    form.value[item.endName] = form.value[item.name][1];
  } else if (
    !form.value[item.name] ||
    form.value[item.name] === null ||
    form.value[item.name].length === 0
  ) {
    form.value[item.startName] = "";
    form.value[item.endName] = "";
  }
};
const init = () => {
  props.formList.forEach((item: any) => {
    if (item.type === "dateRange" && item.defaultValue) {
      form.value[item.name] = item.defaultValue;
      form.value[item.startName] = item.defaultValue[0];
      form.value[item.endName] = item.defaultValue[1];
      // dateRangeChange(item);
    } else if (item.defaultValue) {
      form.value[item.name] = item.defaultValue;
    }
  });
};
// onMounted(() => {
//   init();
// });
watch(
  () => props.formList,
  (newVal) => {
    if (newVal) {
      init();
    }
  },
  { immediate: true, deep: true }
);
//向外暴露参数
const exposeData = () => {
  return form.value;
};
defineExpose({ exposeData, refreshTable });
</script>

<style scoped lang="scss">
:deep(.el-form) {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.main {
  .buttonls {
    display: flex;
    justify-content: center;
    .button {
      width: 100px;
      height: 34px;
      border-radius: 2px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
    }
    .searchButton {
      background-color: $themeBlue;
      color: #ffffff;
    }
  }
  .otherButton {
  }
}
</style>
```

#### 4、最后封装 form+table 组件

```vue
<template>
  <div class="main">
    <c-form
      :formList="formList"
      @searchTable="searchTable"
      ref="formRef"
    ></c-form>
    <slot name="operation"></slot>
    <s-table
      :columns="columns"
      :tableData="tableData"
      :getDataWay="getDataWay"
      @getTableListData="getTableListData1"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @handlePageSizeChange="handlePageSizeChange"
      v-bind="$attrs"
      ref="stable"
    >
      <template #group="scope">
        <slot name="setting" v-bind="scope"></slot>
        <!-- <slot name="operation" :row="scope.row" :$index="scope.$index"></slot> -->
      </template>
    </s-table>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["getTableListData"]);
import STable from "../Table/index.vue";
import CForm from "../CForm/index.vue";
const stable = ref();
const props = defineProps({
  formList: {
    default: [],
    type: Array,
  },
  columns: {
    default: [],
    type: Array,
  },
  tableData: {
    default: [],
    type: Array,
  },
  // 是否能多选
  // selection: {
  //   default: false,
  //   type: Boolean,
  // },
  // // 是否有序号
  // index: {
  //   default: false,
  //   type: Boolean,
  // },
  // el-table添加row-key
  getRowKey: {
    default: function () {},
    type: Function,
  },
  getDataWay: {
    default: {},
    type: Object,
  },
  pagination: {
    // pageNum,pageSize必传
    default: {},
    type: Object,
  },
});

const getTableListData1 = (data: any) => {
  emit("getTableListData", data);
};
const formRef = ref();

const groupRefreshTable = () => {
  formRef.value.refreshTable();
};
const searchTable = (data: any) => {
  stable.value.loadData(data);
};
const init = () => {
  const exposeData = formRef.value.exposeData();
  // console.log(exposeData);
  stable.value.loadData(exposeData);
};
defineExpose({ searchTable, groupRefreshTable });
onMounted(() => {
  init();
});
const handleCurrentChange = () => {
  init();
};
const handleSizeChange = () => {
  init();
};
const handlePageSizeChange = () => {
  init();
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
```

案例

```vue
<group-table
  :formList="formList"
  :columns="columns"
  :tableData="tableData"
  :getDataWay="getDataWay"
  ref="groupTableRef"
  @getTableListData="getTableListData"
>
      <template #operation>
        <el-button class="createBtn" size="small" @click="createApplication"
          >创 建</el-button
        >
      </template>
      <template #setting="scope">
        <!-- {{ scope.column }}111 -->
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClick(scope.row)"
          >查看</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="downloadProtocol(scope.row)"
          v-if="[60, 70].includes(scope.row.applysts)"
          >下载协议</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          v-if="![50, 60, 70, 80, 90].includes(scope.row.applysts)"
          @click="withdrawApplication(scope.row)"
          >撤销申请</el-button
        >
      </template>
    </group-table>
```

```js
import { formList, columns } from "./data";
const getDataWay = {
  dataType: "url",
  data: settleApplyManagementQuery,
  param: {
    pageNum: 1, //当前页码
    pageSize: 10, // 每页展示数量
  },
  tableRequest: false,
};
```

```js
import { formatTimeStr } from "@/utils/util";
export const formList = [
  {
    type: "dateRange",
    label: "申请时间",
    name: "ctm",
    startPlaceHolder: "",
    endPlaceholder: "",
    startName: "ctmstart",
    endName: "ctmend",
    defaultValue: [
      moment().subtract(7, "days").startOf("day").format("YYYYMMDDHHmmsssss"),
      moment().subtract(-1, "days").startOf("day").format("YYYYMMDDHHmmsssss"),
    ],
    // defaultValue:{
    //   startName:moment().subtract(7, 'days').format('YYYYMMDD'),
    //   endName:moment().subtract(0, 'days').format('YYYYMMDD')
    // }
  },
  {
    type: "select",
    label: "渠道商户名称",
    name: "merinfno",
    placeholder: "请选择渠道商户名称",
    selectObj: {
      category: "20",
      boxName: "distrc*srlist",
    },
  },
  {
    type: "select",
    label: "入驻状态",
    name: "applysts",
    placeholder: "请选择入驻状态",
    selectObj: {
      category: "10",
      boxName: "applystsenum",
    },
  },
  {
    type: "select",
    label: "审核状态",
    name: "audsts",
    placeholder: "请选择审核状态",
    selectObj: {
      category: "10",
      boxName: "audstsenum",
    },
  },
  {
    type: "select",
    label: "协议签署方式",
    name: "signcat",
    placeholder: "请选择协议签署方式",
    selectObj: {
      category: "10",
      boxName: "signcatenum",
    },
  },
  {
    type: "select",
    label: "业务经理",
    name: "tkid",
    placeholder: "请选择业务经理",
    selectObj: {
      category: "20",
      boxName: "tkidlist",
    },
  },
  {
    type: "input",
    label: "入驻申请单",
    name: "applno",
    placeholder: "请输入入驻申请单",
    defaultValue: "",
  },
];
export const columns = [
  {
    label: "入驻申请单号",
    name: "applno",
    width: "200",
  },
  {
    label: "入驻申请时间",
    name: "ctm",
    width: "180",
    formatter: (row: any, column: any) => {
      return formatTimeStr(row.ctm);
    },
  },
  {
    label: "渠道商户名称",
    name: "mernm",
    width: "200",
  },
  {
    label: "入驻状态",
    name: "_applysts",
    width: "150",
  },
  {
    label: "内部审核状态",
    name: "_audsts",
    width: "250",
  },
  {
    label: "审核意见",
    name: "ckrsn",
    width: "150",
  },
  {
    label: "入驻更新时间",
    name: "utm",
    width: "180",
    formatter: (row: any, column: any) => {
      return formatTimeStr(row.utm);
    },
  },
  {
    label: "入驻关单方式",
    name: "_clsts",
    width: "180",
  },
  {
    label: "详情",
    name: "action",
    solt: "operation",
    btnList: [{ title: "操作", id: "action" }],
    width: "250",
  },
];
```
