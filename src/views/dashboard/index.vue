<template>
  <div class="contain">
    
    <h-search ref="search" :items="searchItems" :button-items="searchBtnItems" :column-num="4" @btnClick="handleSearchClick" @selectSearch="handleSelectSearch" @selectChange="handleSelectChange"></h-search>
    
    <a-card>
        <a-button @click="handleAdd">新增</a-button>
    </a-card>
    

    <h-table 
      ref="list" 
      :pageSize=5
      :total=10
      :isPagination=true
      :columns="columns"
      :list="list"
      :row-selection="rowSelection"
      @pageChange="handleListPageChange"
      @buttonClick="handleListButtonClick"
      ></h-table>

      <detail ref="detail" @addSucc="handleAddSucc" @editSucc="handleEditSucc"/>

      <h-confirm ref="confirm"/>
  </div>
</template>

<script>
import Vue from 'vue'
import {TYPE_ENUM, hSearch, hTable, hConfirm} from 'huibur-antd-vue'
import Detail from './detail.vue'
Vue.use(hSearch)
Vue.use(hTable)
Vue.use(hConfirm)

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    scopedSlots: { customRender: 'index' },
    selectItems: [],
  },
  {
    title: '状态标识项名称',
    dataIndex: 'identityName',
    key: 'identityName',
    align: 'center',
    selectItems: [],
    dataType: TYPE_ENUM.LINK,
  },
  {
    title: '状态标识项编号',
    dataIndex: 'identityCode',
    key: 'identityCode',
    align: 'center',
    selectItems: [],
  },
  {
    title: '状态标识项编号',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    selectItems: [],
    dataType: TYPE_ENUM.DATEPICKER,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'operation',
    selectItems: [{label: '删除', value: 'delete', icon: 'delete'}, {label: '编辑', value: 'edit'}],
    dataType: TYPE_ENUM.OPERATION,
  },
]

const searchItems = [
  {
    title: "省",
    key: "province",
    placeholder: "请选择省",
    type: TYPE_ENUM.SELECT_SEARCH,
    required: true,
    disabled: false,
    selectItems: [
      {
        label: '河北',
        value: 'hebei'
      },
      {
        label: '河南',
        value: 'henan'
      }
    ]   //下拉框才有
  },
  {
    title: "市",
    key: "city",
    placeholder: "请选择市",
    type: TYPE_ENUM.SELECT_SEARCH,
    required: true,
    disabled: false,
    selectItems: [
      {
        label: '保定',
        value: 'baoding'
      },
      {
        label: '张家口',
        value: 'zhangjiakou'
      }
    ]
  },
  {
    title: "区",
    value: "",
    key: "region",
    placeholder: "请选择区",
    type: TYPE_ENUM.SELECT_SEARCH,
    required: true,
    disabled: false,
    selectItems: [
      {
        label: '和平',
        value: 'heping'
      },
      {
        label: '河西',
        value: 'hexi'
      }
    ],
  }, 
]

const searchBtnItems = [
  {
    title: '搜索',
    icon: 'search',
    color: 'red'
  },
  {
    title: '重置',
    icon: 'search'
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  components: {
    hSearch,
    hTable,
    hConfirm,
    Detail
  },

  data() {
    return {
      TYPE_ENUM,
      columns,
      searchItems,
      searchBtnItems,
      rowSelection,
      list: [{identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
            {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'}]
    }
  },

  created() {
  },
  mounted() {
  },
  methods: {
    //-------------------------------------事件--------------------------------------
    // 添加方法
    handleAdd () {
      this.$refs.detail._show()
    },

    //-------------------------------------方法--------------------------------------
   

    //-------------------------------------网络轻轻--------------------------------------
    // 网络请求-删除
    requestDelete(val) {
      console.log(val)
    },  

    //-------------------------------------通知--------------------------------------
    // 搜索框-选择框进行搜索
    handleSelectSearch(info) {
      const {kw, item, form} = info

    },

    // 搜索框-选择框的进行选中事件
    handleSelectChange(info) {
      const {kw, item, form} = info

    },

    // 搜索框-搜索按钮点击事件
    handleSearchClick(info) {
      console.log(info)
    },

    // list 分页
    handleListPageChange(val) {
      this.$refs.list._startLoading()
      // 设置延迟执行
      setTimeout(() => {
        this.list = [
          { identityName: '状态标识项名称', identityCode: '状态标识项编号测试', id: '1'},
          { identityName: '状态标识项名称', identityCode: '状态标识项编号测试', id: '1'}]
        this.$refs.list._stopLoading()
      }, 1000)
    },

    // 按钮点击事件
    handleListButtonClick (val) {
      if (val.val.value == 'edit') {
        this.$refs.detail._show(val.info)
      } else if (val.val.value == 'delete') {
        this.$refs.confirm._show("确认删除？", '删除后不可恢复，请谨慎操作', (res) => {
          this.requestDelete(val.info)
        });

      }
    },

    // 详情页-新增成功
    handleAddSucc(info) {

    },

    // 详情页-编辑成功
    handleEditSucc(info) {

    }

  },
}
</script>
