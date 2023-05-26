---
title: vue+antDesignVue实现穿梭框及父子级联动
date: 2023-04-20
tags:
    - Vue
categories:
    - Vue实例
    - 中金
publish: true
---

1、穿梭框代码：

```
<a-transfer
        class="tree-transfer"
        :data-source="transferDataSource"
        :target-keys="targetKeys"
        :render="(item) => item.title"
        :show-select-all="true"
        @change="onChange"
      >
        <template slot="children" slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }">
          <a-tree
            v-if="direction === 'left'"
            blockNode
            checkable
            defaultExpandAll
            :checkedKeys="[...selectedKeys, ...targetKeys]"
            :treeData="treeData"
            @check="
              (_, props) => {
                onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect)
              }
            "
            @select="
              (_, props) => {
                onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect)
              }
            "
          />
        </template>
</a-transfer>
```

2、data 数据

```
	  visible: false,
      targetKeys: [],
      // dataSource: transferDataSource,
      transferDataSource: [],
      // treeData: [],
      rightTreeData: [],
      roleName: '',
      roleID: '',
      selectedRowKeys: [], // 选中的行的key值
      selectedRows: [], // 选中行的row
      totalChecked: '',
```

3、方法：

```
open(item) {
      this.visible = true
      const _this = this
      if (item) {
        this.roleName = item.roleName
        this.roleID = item.roleID
      }
      getInstitutionRightTree({}).then((res) => {
        if (res.code === '2000') {
        //获取数据并处理数据
          _this.rightTreeData = res.data.rightTree
          this.flatten(JSON.parse(JSON.stringify(this.rightTreeData)))
        } else {
          _this.$message.error(res.message)
        }
      })
    },
    //弹框确认，调用父组件方法
	handleOk() {
      if (this.roleID) {
        this.$emit('setRights', this.targetKeys, this.roleID)
      } else {
        this.$emit('setRights', this.targetKeys)
      }
      this.visible = false
    },
    //弹窗取消
    handleCancel() {
      this.visible = false
    },
    //监听穿梭框左右移动的事件
    onChange(targetKeys, direction) {
      // console.log('Target Keys:', targetKeys)
      // this.targetKeys = targetKeys
      this.targetKeys = targetKeys // 如果仅仅这样写是穿梭不到右边的，所以
      if (direction === 'right') {
        this.targetKeys = this.totalChecked
        // 如果你还要有其他需求，在里面可以再判断
      }
      // 但是，想要穿梭到左边来，得这样写
      if (direction === 'left') {
        this.targetKeys = targetKeys
      }
    },
   	//监听选中的数据
    onChecked(_, e, checkedKeys, itemSelect) {
      // _这个下划线，就是你勾的key值，全选时，它就是所有的key值
      this.totalChecked = _ // 所以初始化一个状态赋
      const { eventKey } = e.node
      itemSelect(eventKey, !this.isChecked(checkedKeys, eventKey))
    },
    isChecked(selectedKeys, eventKey) {
      return selectedKeys.indexOf(eventKey) !== -1
    },
    // 将选中的数据置灰并选中
    handleTreeData(data, targetKeys = []) {
      data.forEach((item) => {
        item['disabled'] = targetKeys.includes(item.key)
        if (item.children) {
          this.handleTreeData(item.children, targetKeys)
        }
      })
      return data
    },
    //树形结构转成拉平的数据
    flatten(list) {
      if (list) {
        list.forEach((item) => {
          this.transferDataSource.push(item)
          this.flatten(item.children)
        })
      }
      // console.log(this.transferDataSource)
    },
```

4、计算属性计算

```
treeData() {
//计算左侧树形结构的样式
      return this.handleTreeData(this.rightTreeData, this.targetKeys)
 },
```
