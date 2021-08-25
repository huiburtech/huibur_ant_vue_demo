<template>
  <div class="contain">
    <!-- <h-search ref="search" :items="searchItems" :button-items="searchBtnItems" :column-num="4" @btnClick="handleSearchClick" @selectSearch="handleSelectSearch" @selectChange="handleSelectChange"></h-search>
    
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
      :expanded-row-items="expandedRowItems"
      @pageChange="handleListPageChange"
      @buttonClick="handleListButtonClick"
      ></h-table>

      <detail ref="detail" @addSucc="handleAddSucc" @editSucc="handleEditSucc"/>

      <h-confirm ref="confirm"/> -->

      <h-list 
        ref="list"
        apiName="apps"
        idKey = "appId"
        :columns="columns" 
        :rowSelected="true"
        :pagination="pagination"
        :searchItems="searchItems" 
        :headerButtonItems="headerButtonItems"
        :detailItems="detailItems"
        :extParams="extParams"
        @headerBtnClick="handleListHeaderBtnClick"
        @searchBtnClick="handleListSearchBtnClick"
        @tableBtnClick="handleListTableBtnClick"
        @tableRowChange="handleListTableRowChange"
        >
      </h-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { TYPE_ENUM } from 'huibur-antd-vue'
import hList from '../../components/page/list.vue'

const headerButtonItems = [
  {
    title: '新建',
    value: 'add'
  }
]

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
    align: 'center',
    selectItems: [{label: '删除', value: 'delete', icon: 'delete', background: 'red', color: 'yellow'}, {label: '编辑', value: 'edit'}, {label: '操作', value: 'operat', selectItems: [{label: '删除', value: 'delete', icon: 'delete'}, {label: '编辑', value: 'edit', icon: 'delete'}]}],
    dataType: TYPE_ENUM.ACTION,
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

const detailItems = [
  {
    title: '标题',
    children: [
      {
        title: "姓名",
        value: "name",
        key: "name",
        placeholder: "请输入姓名",
        type: TYPE_ENUM.INPUT,
        required: true,
        disabled: false,
        length: 20,
    },
    {
        title: "年龄",
        value: "age",
        key: "age",
        placeholder: "请输入年龄",
        type: TYPE_ENUM.INPUT_NUMBER,
        required: true,
        disabled: false,
        max: 150,
        min: 0,
    },
    {
        title: "性别",
        value: "gender",
        key: "gender",
        placeholder: "请选择性别",
        type: TYPE_ENUM.SELECT,
        required: true,
        disabled: false,
        selectItems: [
        {
            value: 0,
            label: "男",
        },
        {
            value: 1,
            label: "女",
        },
        ],
    },
    {
        title: "体重",
        value: "weight",
        key: "weight",
        placeholder: "请输入体重",
        type: TYPE_ENUM.INPUT,
        required: true,
        disabled: false,
        after: {
            key: 'beforeName',
            width: '60px',
            selectItems: [
                {
                value: 0,
                label: "公斤",
                },
                {
                value: 1,
                label: "斤",
                },
            ]
        }
    },
    {
        title: "住址",
        value: "address",
        key: "address",
        placeholder: "请选择住址",
        type: TYPE_ENUM.SELECT_FILTER,
        required: true,
        disabled: false,
        selectItems: [
        {
            value: 0,
            label: "天津",
        },
        {
            value: 1,
            label: "北京",
        },
        {
            value: 2,
            label: "上海",
        },
        {
            value: 3,
            label: "重庆",
        },
        ],
    },
    {
        title: "时间",
        value: "date",
        key: "date",
        placeholder: "请选择时间",
        type: TYPE_ENUM.DATEPICKER,
        required: true,
        disabled: false,
        showTime: false,
    },
    {
        title: "选择",
        value: "check",
        key: "check",
        placeholder: "请选择",
        type: TYPE_ENUM.CHECKBOX,
        required: true,
        disabled: false,
        selectItems: [
        {
            value: 0,
            label: "选择1",
        },
        {
            value: 1,
            label: "选择2",
        },
        {
            value: 2,
            label: "选择3",
        },
        {
            value: 3,
            label: "选择4",
        },
        ],
    },
    {
        title: "备注",
        value: "textArea",
        key: "textArea",
        placeholder: "请输入备注",
        type: TYPE_ENUM.INPUT_TEXT_AREA,
        required: true,
        disabled: false,
        length: 200,
    },
    {
        title: "单个选择",
        value: "singleCheck",
        key: "singleCheck",
        placeholder: "请选择",
        type: TYPE_ENUM.RADIO,
        required: true,
        selectItems: [
        {
            value: 0,
            label: "选择1",
        },
        {
            value: 1,
            label: "选择2",
        },
        {
            value: 2,
            label: "选择3",
        },
        {
            value: 3,
            label: "选择4",
        },
        ]
    }]
  }
]

export default {
  components: {
    hList
  },

  data() {
    return {
      TYPE_ENUM,
      headerButtonItems,
      searchItems,
      searchBtnItems,
      columns,
      extParams: { projectId: this.$route.params.projectId },
      pagination: { pageSize: 10, pageNum: 1, total: 10 },
      detailItems
    //   list: [{identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'},
    //         {identityName: '状态标识项名称', identityCode: '状态标识项编号', id: '1'}]
    }
  },

  created() {
  },
  mounted() {
  },
  methods: {
    //-------------------------------------事件--------------------------------------



    //-------------------------------------通知回调--------------------------------------
    handleListHeaderBtnClick(info) {
      console.log('handleListHeaderBtnClick')
      console.log(info)
    },

    handleListSearchBtnClick(info) {
      console.log('handleListSearchBtnClick')
      console.log(info)
    },

    handleListTableBtnClick(info) {
      // console.log('handleListTableBtnClick')
      // console.log(info)

      // this.$refs.list._refreshTable(info.info)


      if (info.val.value === 'device') {
        this.$router.push({ name: 'DevicesManagement', params: info.info })
      }  else if (info.val.value === 'variable') {
        this.$router.push({ name: 'Index2', params: info.info })
      } else if (info.val.value === 'run') {
        this.$router.push({ name: 'DataDiagnosis', params: info.info })
      }
    },

    handleListTableRowChange(info) {
      console.log('handleListTableRowChange')
      console.log(info)
    }

  },
}
</script>
