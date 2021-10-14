<template>
  <div class="contain">

      <h-list 
        ref="list"
        :detailItems="detailItems" 
        :rowSelected="true"
        :pagination="pagination"
        :searchItems="searchItems" 
        :headerButtonItems="headerButtonItems"
        :dataSource="list"
        @headerBtnClick="handleListHeaderBtnClick"
        @searchBtnClick="handleListSearchBtnClick"
        @tableBtnClick="handleListTableBtnClick"
        @tableRowChange="handleListTableRowChange"
        @detailOk="handleListDetailOk"
        @delete="handleDelete"
        />

      <design 
        ref="design"
        @ok="handleDesignOk"
      />

      <generate 
        ref="generate"
      />

      <preview 
        ref="preview"
      />

  </div>
</template>

<script>
import { TYPE_ENUM, hList } from 'huibur-antd-vue'
import Design from './design.vue'
import Generate from './generate.vue'
import Preview from './preview.vue'
const headerButtonItems = [
  {
    title: '新建',
    value: 'add',
    icon: 'plus-circle'
  }
]

const detailItems = [
    {
        title: '模块名称',
        key: 'title',
        type: TYPE_ENUM.INPUT,
        required: true
    },
    {
        title: '模块标识',
        key: 'identity',
        type: TYPE_ENUM.INPUT,
        required: true,
    },
    {
        title: '接口',
        key: 'apiName',
        type: TYPE_ENUM.INPUT,
        required: true,
    },
    {
        title: '唯一标识字段',
        key: 'idKey',
        type: TYPE_ENUM.INPUT,
        placeholder: '为空默认为"id"'
    },
    {
        title: '是否分页',
        key: 'pagination',
        type: TYPE_ENUM.SELECT,
        dataType: TYPE_ENUM.CHANGE,
        selectItems: [
          {value: 1, label: '分页'},
          {value: 0, label: '不分页'}
        ],
    },
    {
        title: '列表项是否可选择',
        key: 'rowSelected',
        type: TYPE_ENUM.SELECT,
        dataType: TYPE_ENUM.CHANGE,
        selectItems: [
          {value: 1, label: '显示'},
          {value: 0, label: '不显示'}
        ],
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        selectItems: [
          {label: '操作', value: 'operation', selectItems: [{label: '编辑', value: 'edit', icon: 'edit'}, {label: '删除', value: 'delete', icon: 'delete'}]},
          {label: '设计', value: 'design', selectItems: [{label: '表单设计', value: 'formDesign', icon: 'form'}, {label: '搜索设计', value: 'searchDesign', icon: 'bg-colors'}]},
          {label: '生成JSON', value: 'generateJson', selectItems: [{label: '生成表单', value: 'generateForm', icon: 'generate'}, {label: '生成搜索', value: 'generateSearch', icon: 'generate'}]},
          {label: '预览', value: 'preview', icon: 'eye'}
        ],
        dataType: TYPE_ENUM.ACTION,
        hidden: true
    }
]

const searchItems = [

]

export default {
  components: {
    hList,
    Design,
    Generate,
    Preview
  },

  data() {
    return {
      TYPE_ENUM,
      searchItems,
      headerButtonItems,
      detailItems,
      pagination: { pageSize: 10, pageNum: 1, total: 0 },
      list: [
      ]
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
      console.log(info)
    },

    handleListSearchBtnClick(info) {
      console.log('handleListSearchBtnClick')
      console.log(info)
    },

    handleListTableBtnClick(info) {
      if (info.val.value == 'formDesign') {
        this.$refs.design._show(info.info)
      } else if (info.val.value == 'searchDesign') {
        this.$refs.design._show(info.info)
      } else if (info.val.value == 'generateForm') {
        console.log(info.info.formItems)
        this.$refs.generate._show(JSON.stringify(info.info.formItems))
      } else if (info.val.value == 'generateSearch') {
        console.log(info.info)
      } else if (info.val.value == 'preview') {
        this.$refs.preview._show(JSON.parse(JSON.stringify(info.info)))
      } 
    },

    handleListTableRowChange(info) {
   
    },

    handleDesignOk(info) {
      this.list.forEach(el => {
        if (el.identity == info.identity) {
          el.formItems = info.formItems
        }
      }) 
      console.log(this.list)
    },

    handleListDetailOk(info) {

      var item = this.list.find(el => el.identity == info.form.identity)
      if (item) { // 编辑
          var index = this.list.indexOf(item)
          this.list.splice(index,1, info.form);
      } else {
          this.list.push(info.form)
      }
      console.log(info)
    },

    handleDelete(info) {
      this.list = this.list.filter(el => el.identity != info.identity)
    }

  },
}
</script>
