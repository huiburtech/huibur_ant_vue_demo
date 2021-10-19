<template>
  <div>
    <a-modal
      v-model="visible"
      ok-text="确认"
      cancel-text="取消"
      centered
      width="80%"
      :closable="false"
      :maskClosable="false"
      :destroyOnClose="true"
      @cancel="handleCancel"
      @ok="handleOk"
    >

        <template slot="title">
            <div class="title">表单设计</div>
        </template>

        <h-list 
        ref="list"
        :detailItems="items" 
        :rowSelected="true"
        :dataSource="list"
        detailWidth="80%"
        dividerOrientation="center"
        @detailOk="handleDetailOK"
        @delete="handleDelete"
        />

    </a-modal>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { TYPE_ENUM, hList } from 'huibur-antd-vue'
Vue.use(hList)

const tableColumns = [
    {
        title: "标题",
        key: "title",
        placeholder: "请输入标题",
        type: TYPE_ENUM.INPUT,
        required: true,
    },
    {
        title: "标识字段",
        key: "key",
        placeholder: "请输入标识字段",
        type: TYPE_ENUM.INPUT,
        required: true,
    },
    {
        title: "表单控件类型",
        key: "type",
        type: TYPE_ENUM.SELECT,
        required: true,
    },
    {
        title: "是否必填",
        key: "required",
        type: TYPE_ENUM.SELECT,
        required: true,
        selectItems: [
            {label: '否', value: 0},
            {label: '是', value: 1}
        ]
    }
]

const formatItems = [
    {
        title: "日期格式",
        key: "format",
        type: TYPE_ENUM.INPUT,
    }
]

const uploadItems = [
    {
        title: "文件上传地址",
        key: "action",
        type: TYPE_ENUM.INPUT, 
        defaultValue: 'https://upload.qiniup.com',
        required: true
    },
    {   
        title: "七牛云Token API",
        key: "qnTokenApi",
        type: TYPE_ENUM.INPUT_TEXT_AREA,
        placeholder: "七牛云示例：{'method':'GET','url':'2323','params':{}}"
    },
    {
        title: "文件上传所需参数",
        key: "formData",
        type: TYPE_ENUM.INPUT_TEXT_AREA, 
        placeholder: "七牛云示例：{token: '', domain: '', region: '', uploadURL: ''}"
    },
    {
        title: "接受上传的文件类型",
        key: "accept",
        type: TYPE_ENUM.INPUT, 
    },
    {
        title: "文件数量",
        key: "fileNum",
        type: TYPE_ENUM.INPUT_NUMBER, 
        placeholder: '0: 表示不限数量',
        defaultValue: 0,
        min: 0
    },
    {
        title: "是否支持多文件选择",
        key: "multiple",
        placeholder: '开启后按住 ctrl 可选择多个文件。fileNum != 1时有效',
        type: TYPE_ENUM.SELECT,
        defaultValue: 0,
        selectItems: [
            {label: '否', value: 0},
            {label: '是', value: 1}
        ]
    },
    {
        title: "文件列表的内建样式",
        key: "listType",
        type: TYPE_ENUM.SELECT,
        defaultValue: 'text',
        selectItems: [
            {label: 'text', value: 'text'},
            {label: 'picture', value: 'picture'},
            {label: 'picture-card', value: 'picture-card'}
        ]
    },
    {
        title: "上传按钮的标题",
        key: "upload-title",
        type: TYPE_ENUM.INPUT, 
        defaultValue: '上传',
    },
    {
        title: "上传按钮的ICON",
        key: "icon",
        type: TYPE_ENUM.INPUT, 
        defaultValue: 'upload',
    },
]

const items = [
    {
        title: '基本属性',
        children: [
            {
                title: "名称",
                key: "title",
                placeholder: "请输入标题",
                type: TYPE_ENUM.INPUT,
                dataType: TYPE_ENUM.TEXT,
                required: true,
            },
        ]
    }, 
    {
        title: '表单属性',
        children: [
            {
                title: "表单标识字段",
                key: "key",
                type: TYPE_ENUM.INPUT,
                dataType: TYPE_ENUM.TEXT,
                required: true,
            },
            {
                title: "表单控件类型",
                key: "type",
                type: TYPE_ENUM.SELECT,
                dataType: TYPE_ENUM.CHANGE,
                required: true,
                selectItems: [
                    {label: '文本输入框', value: TYPE_ENUM.INPUT, selectItems: [
                        {title: "前置标签",key: "before",type: TYPE_ENUM.INPUT_TEXT_AREA, placeholder: "{title:'标题',icon:'user',width:'5px',key:'before',selectItems:[{value: 'option1',label:'选项1'}]}"}, 
                        {title: "后置标签",key: "after",type: TYPE_ENUM.INPUT_TEXT_AREA, placeholder: "{title:'标题',icon:'user',width:'5px',key:'before',selectItems:[{value: 'option1',label:'选项1'}]}"}]
                    },
                    {label: '数字输入框', value: TYPE_ENUM.INPUT_NUMBER, selectItems: [
                        {title: "最小值",key: "min",type: TYPE_ENUM.INPUT_NUMBER}, 
                        {title: "最大值",key: "max",type: TYPE_ENUM.INPUT_NUMBER}]
                    },
                    {label: '多行输入框', value: TYPE_ENUM.INPUT_TEXT_AREA},
                    {label: '下拉框', value: TYPE_ENUM.SELECT, selectItems: [
                        {   
                            title: "下拉选项",
                            key: "selectItems",
                            placeholder: '示例: [{"value":"option","label":"选项"}]，如果有默认选项数据，则不再请求接口获取',
                            type: TYPE_ENUM.INPUT_TEXT_AREA,
                        },
                        {   
                            title: "下级联动接口",
                            key: "linkageApi",
                            placeholder: '示例: [{"value":"option","label":"选项"}]',
                            type: TYPE_ENUM.INPUT_TEXT_AREA,
                        },
                        {   
                            title: "测试API",
                            key: "testApi",
                            placeholder: "",
                            type: TYPE_ENUM.INPUT_TEXT_AREA,
                            linkageApi: {
                                url: 'http://www.baidu.com',
                                method: 'GET',
                                params: {},
                                valueKey: 'value',
                                labelKey: 'label',
                                kwKey: 'kw'
                            }
                        }
                        ]
                    },
                    {label: '下拉框(支持筛选)', value: TYPE_ENUM.SELECT_FILTER},
                    {label: '下拉框(支持搜索)', value: TYPE_ENUM.SELECT_SEARCH},
                    {label: '日期', value: TYPE_ENUM.DATEPICKER, selectItems: formatItems},
                    {label: '月度', value: TYPE_ENUM.MONTHPICKER, selectItems: formatItems},
                    {label: '范围日期', value: TYPE_ENUM.DATERANGEPICKER, selectItems: formatItems},
                    {label: '多选框（单一）', value: TYPE_ENUM.CHECKBOX},
                    {label: '多选框（一组）', value: TYPE_ENUM.CHECKBOX_GROUP},
                    {label: '图片上传', value: TYPE_ENUM.IMG, selectItems: uploadItems},
                ]
            },
            {
                title: "表单中隐藏该字段",
                key: "hidden",
                type: TYPE_ENUM.SELECT,
                defaultValue: 0,
                selectItems: [
                    {label: '否', value: 0},
                    {label: '是', value: 1}
                ],
                tableHidden: true
            },
            {
                title: "标题栅格",
                key: "labelCol",
                type: TYPE_ENUM.INPUT_NUMBER,
                defaultValue: 8,
                placeholder: '24 栅格',
                min: 0,
                max: 24,
                tableHidden: true
            },
            {
                title: "内容栅格",
                key: "wrapperCol",
                type: TYPE_ENUM.INPUT_NUMBER,
                defaultValue: 12,
                placeholder: '24 栅格',
                min: 0,
                max: 24,
                tableHidden: true
            },
        ]
    },
    {
        title: '列表属性',
        children: [
            {
                title: "列表标识字段",
                key: "dataIndex",
                placeholder: "为空时，默认会采用'表单标识字段'数据",
                type: TYPE_ENUM.INPUT,
                tableHidden: true
            },
             {
                title: "列表控件类型",
                key: "dataType",
                placeholder: "为空时，默认会采用'表单控件类型'数据",
                type: TYPE_ENUM.SELECT,
                selectItems: [],
                tableHidden: true
            },
            {
                title: "列表中隐藏该字段",
                key: "tableHidden",
                type: TYPE_ENUM.SELECT,
                defaultValue: 0,
                selectItems: [
                    {label: '否', value: 0},
                    {label: '是', value: 1}
                ],
                tableHidden: true
            },
        ]
    },
    {   
        title: '其他属性',
        children: [
            {
                title: "是否作为搜索项",
                key: "isSearch",
                type: TYPE_ENUM.SELECT,
                defaultValue: 0,
                selectItems: [
                    {label: '否', value: 0},
                    {label: '是', value: 1}
                ],
                tableHidden: true
            },
            {
                title: "是否必填",
                key: "required",
                type: TYPE_ENUM.SELECT,
                defaultValue: 0,
                selectItems: [
                    {label: '否', value: 0},
                    {label: '是', value: 1}
                ],
                tableHidden: true
            },
            {
                title: "是否禁用",
                key: "disabled",
                type: TYPE_ENUM.SELECT,
                defaultValue: 0,
                selectItems: [
                    {label: '否', value: 0},
                    {label: '是', value: 1}
                ],
                tableHidden: true
            },
            {
                title: "是否允许被清空",
                key: "allowClear",
                type: TYPE_ENUM.SELECT,
                defaultValue: 0,
                selectItems: [
                    {label: '否', value: 0},
                    {label: '是', value: 1}
                ],
                tableHidden: true
            },
            {
                title: "排序",
                key: "sort",
                type: TYPE_ENUM.INPUT_NUMBER,
                dataType: TYPE_ENUM.TEXT,
                defaultValue: 0,
                customRender: (text) => {return text || 0 },
                placeholder: '按照由小到大的顺序进行排序,为空则按0处理',
            },
        ]
    }
]

export default {
  name: 'Design',
  data() {
    return {
      TYPE_ENUM,
      tableColumns,
      items,
      visible: false,
      loading: false,
      type: null, // ‘form’, 表单 // search，搜索
      identify: '',
      list: [],
    }
  },

  mounted() {},

  props: {

  },
  components: {

  },
  methods: {
    //-------------------------------------事件--------------------------------------
    // 取消
    handleCancel() {

        this.list.forEach(element => {
            if (element.selectItems) {
                element.selectItems = JSON.parse(element.selectItems)
            }
        })
    
        
    },

    // 确认
    handleOk() {
        this.list.forEach(el => {
            if (el.selectItems) {
                el.selectItems = JSON.parse(el.selectItems)
            }
        })

        var info = {
            identify: this.identify,
            type: this.type,
            list: this.list
        }
        this.$emit('ok', info)

        this.visible = false
    },

    //-------------------------------------公共方法--------------------------------------
    _show(identify, type, list) {
        this.visible = true
        
        this.identify = identify
        this.type = type
        this.list = Object.assign([], list) || []

        this.list.forEach(el => {
            if (el.selectItems) {
                    el.selectItems = JSON.stringify(el.selectItems)
            }
        })
    },

    //-------------------------------------私有方法--------------------------------------
   


    //-------------------------------------接口请求--------------------------------------
    
    //-------------------------------------回调通知--------------------------------------
    handleDetailOK(info) {

        if (info.valid == false) {
            return
        }

        if (!this.list) {
            this.list = []
        }   

        var item = this.list.find(el => el.key == info.form.key)
        if (item) { // 编辑
            var index = this.list.indexOf(item)
            this.list[index] = info.form
        } else {
            this.list.push(info.form)
        }

        // 排序
        this.list.sort(function(a, b) {
            return (a.sort || 0) - (b.sort || 0)
        })
        
        this.$forceUpdate()
    },

    handleDelete(info) {
        this.list = this.list.filter(el => el.key != info.key)
        this.$forceUpdate()
    }

  },
}
</script>

<style scoped lang="less">

</style>