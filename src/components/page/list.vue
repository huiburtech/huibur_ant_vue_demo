<template>
  <div class="contain">


    <a-card v-if="searchItems && searchItems.length > 0">
        <h-form
            ref="search"
            :button-items="searchBtnItems"
            :items="searchItems"
            :column-num="searchColumnNum"
            :form="searchForm"
            @btnClick="handleSearchClick">
        </h-form>
    </a-card>
    
    <header-from :items="headerButtonItems" :search-num="pagination.total" :select-num="selectedRowKeys.length" @btnClick="handleHeaderBtnClick"></header-from>

    <h-table
      ref="list"
      :pageNum="pagination.pageNum"
      :pageSize="pagination.pageSize"
      :total="pagination.total"
      :isPagination="isPagination"
      :columns="columns"
      :list="list"
      :row-selection="rowSelected ? { selectedRowKeys: selectedRowKeys, onChange: handleListRowChange } : null"
      @pageChange="handleListPageChange"
      @buttonClick="handleListButtonClick"
    ></h-table>

    <detail ref="detail" 
        :idKey="idKey"
        :apiName="apiName"
        :succCode="succCode"
        :items="selectDetailItems"
        :extParams="extParams"
        :column-num="detailColumnNum"
        :dividerOrientation="dividerOrientation"
        :requestDetail="requestDetail"
        :selectDict="selectDict"
        :convertData="convertData"
        @addSucc="handleAddSucc" 
        @editSucc="handleEditSucc"/>

    <h-confirm ref="confirm"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { TYPE_ENUM, hSearch, hTable, hConfirm } from 'huibur-antd-vue'
// import { TYPE_ENUM, hSearch, hTable, hConfirm } from '../HB/index'
import Detail from './detail.vue'
import HeaderFrom from '../HeaderFrom/index.vue' 
import {h_getList, h_delete, h_request} from '../api/index'

Vue.use(hSearch)
Vue.use(hTable)
Vue.use(hConfirm)


export default {
name: 'hList',
  components: {
    Detail,
    HeaderFrom
  },
props: {
    apiName: {
      type: String,
    },
    listApi: {
      type: Object,
      default: () => {
          return {}
      }
    },
    succCode: {
      type: String,
      default: '200'
    },
    idKey: {
        type: String,
        default: 'id'
    },
    headerButtonItems: {
        type: Array,
        default: () => {
            return []
        }
    },
    searchItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchBtnItems: {
      type: Array,
      default: () => {
        return [
            {
                title: '查询',
                icon: 'search',
                value: 'search'
            },
            {
                title: '重置',
                icon: 'reload',
                value: 'reset'
            }
        ]
      }
    },
    searchColumnNum: {
        type: Number,
        default: 4
    },
    detailColumnNum: {
        type: Number,
        default: 1
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    isPagination: {
        type: Boolean,
        default: false
    },
    pagination: {
      type: Object,
      default: () => {
        return {pageNum: 1, pageSize: 10, total: 10}
      }
    },
    rowSelected: {
        type: Boolean,
        default: false
    },
    detailItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    batchAddItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    extParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dividerOrientation: {
      type: String,
      default: null
    },
    requestDetail: {
      type: Boolean,
      default: false
    },
    convertData: {
      type: Array,
      default: () => {
        return []
      }
    },
    dictApi: {
      type: Array,
      default: () => {
        return []
      }
    }
},
  data () {
    return {
      TYPE_ENUM,
      searchForm: {},
      list: [],
      selectedRowKeys: [],
      selectDict: {},
      selectDetailItems: this.detailItems  
    }
  },

  created () {
  },
  mounted () {
      // 获取数据列表
      this.requestGetList()
    
       // 获取字典对应的数据
      this.dictApi.forEach(el => {
        this.requestGetDict(el)
      })
  },
  methods: {
    // -------------------------------------事件--------------------------------------
    // 添加方法
    handleAdd () {
      this.$refs.detail._show()
    },

    // -------------------------------------方法--------------------------------------
    // 刷新数据
    _refreshTable(item) {
        if (item) {
            this.list.forEach(element => {
                if (element[this.idKey] == item[this.idKey]) {
                    element = item
                }
            });
        } else {
            this.requestGetList()
        }
    },


    // -------------------------网络请求------------------------------------
    // 网络请求-获取下拉选项字典数据
    requestGetDict (dictApi) {

        h_request(dictApi.method, dictApi.url, dictApi.params, dictApi.data).then((res) => {
          if (String(res.code) === this.succCode) {
            var valueKey = dictApi.valueKey || 'value'
            var labelKey = dictApi.labelKey || 'label'

            var items = []

            res.data.forEach(el => {
              var item = {value: '', label: ''}
              if ((typeof el) == 'object') {
                item.label = el[labelKey]
                item.value = el[valueKey]
              } else if ((typeof el) == 'string') {
                item.label = el
                item.value = el
              }

              items.push(item)
            })

            this.$set(this.selectDict, dictApi.key, items)

            this.columns.forEach(el => {
                if (el.key == dictApi.key) {
                    el.selectItems = items
                }
            })

            this.searchItems.forEach(el => {
                if (el.key == dictApi.key) {
                    el.selectItems = items
                }
            })
          
          } else {
            // 4:失败-弹框提示（注：message还是msg、或者其他具体需要根据服务器返回确定）
            this.$message.warn(res.message)
          }
        })
        .finally(() => {
        })
    },

    // 网络请求-获取工程列表
    requestGetList () {
        // 1:组织参数
        const params = {}

        if (this.isPagination) {
            this.$set(params, 'pageNum', this.pagination.pageNum)
            this.$set(params, 'pageSize', this.pagination.pageSize)
        }

        Object.assign(params, this.searchForm)
        Object.assign(params, this.extParams)

        // 2:设置loading加载
        this.$refs.list._startLoading()
        h_getList(this.apiName, params).then((res) => {
            // 3:成功-进行业务操作（注：200还是'200'具体需要根据服务器返回确定）
            if (String(res.code) === this.succCode) {
                if (res.data.list) {
                    this.list = res.data.list
                    this.$set(this.pagination, 'total', res.data.total)
                } else {
                    this.list = res.data
                    this.$set(this.pagination, 'total', res.data.length)
                }
               
              
            } else {
              // 4:失败-弹框提示（注：message还是msg、或者其他具体需要根据服务器返回确定）
              this.$message.warn(res.message)
            }
        })
        .finally(() => {
        // 5:结束加载
        this.$refs.list._stopLoading()
        })

    },

    // 网络删除
    requestDelete (val) {

      // 2:设置loading加载
      this.loading = true
      h_delete(this.apiName, val[this.idKey])
          .then((res) => {
            // 3:成功-进行业务操作（注：200还是'200'具体需要根据服务器返回确定）
            if (String(res.code) === this.succCode) {
                this.$message.success('删除成功')
                this.requestGetList()
            } else {
              // 4:失败-弹框提示（注：message还是msg、或者其他具体需要根据服务器返回确定）
              this.$message.warn(res.message)
            }
          })
          .finally(() => {
            // 5:结束加载
            this.loading = false
          })
    },


    // -------------------------------------通知--------------------------------------
    handleHeaderBtnClick(info) {
        if (info.value == 'add') {
            this.selectDetailItems = this.detailItems
            this.$refs.detail._show()
        } else if (info.value == 'batchAdd') { // 批量新建
            this.selectDetailItems = this.batchAddItems
            this.$refs.detail._show()
        }

        this.$emit('headerBtnClick', info)
    },

    // 搜索框-选择框进行搜索
    handleSelectSearch (info) {
      const { kw, item, form } = info
    },

    // 搜索框-选择框的进行选中事件
    handleSelectChange (info) {
      const { kw, item, form } = info
    },

    // 搜索框-搜索按钮点击事件
    handleSearchClick (info) {
      if (info.item.value == 'search') { // 搜索
        this.pagination.pageNum = 1
        this.requestGetList()
      } else if (info.item.value == 'reset') {// 重置
        this.searchItems.forEach(el => {
            this.$set(this.searchForm, el.key, '')
        })
        this.pagination.pageNum = 1
        this.requestGetList()
      }
      
      this.$emit('searchBtnClick', info)
    },

    // list 分页
    handleListPageChange (val) {
      
        this.selectedRowKeys = []
        this.pagination.pageNum = val.current
        this.requestGetList()

        // 通知选中项变化
        if(this.rowSelected) {
            this.$emit('tableRowChange', {selectedRowKeys: [], selectedRows: []})
        }
      
    },

    handleListRowChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('tableRowChange', {selectedRowKeys, selectedRows})
    },

    // 按钮点击事件
    handleListButtonClick (val) {
      if (val.val.value == 'edit') {
        this.selectDetailItems = this.detailItems
        this.$refs.detail._show(val.info)
      } else if (val.val.value == 'copy') {

        // 拷贝数据重组：删除ID，创建新的copyId作为查询详情关键字
        var params = Object.assign({}, val.info)
        params.copyId = params[this.idKey]
        params[this.idKey] = null
        console.log(params)

        this.selectDetailItems = this.detailItems
        this.$refs.detail._show(params)
      } else if (val.val.value == 'delete') {
        this.$refs.confirm._show('确认删除？', '删除后不可恢复，请谨慎操作', (res) => {
          this.requestDelete(val.info)
        })
      }

      this.$emit('tableBtnClick', val)
    },

    // 详情页-新增成功
    handleAddSucc (info) {
        this.requestGetList()
    },

    // 详情页-编辑成功
    handleEditSucc (info) {
        this.requestGetList()
    }

  },
}
</script>
