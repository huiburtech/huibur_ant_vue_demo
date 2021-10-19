
# HUIBUR_ANTD-VUE说明文档
[TOC]
## 前言
### 基本说明
huibur-antd-vue是天津汇柏科技有限公司基于Ant Design Vue 框架进行开发，旨在简化开发过程中大量无意义的重复代码工作。该组件是根据公司项目场景中出现的各类问题，进行统一规范化封装处理，以减少非必要的一些编码及BUG修改工作。如果不能满足现有需求的话，可以关注公众号进行留言以便于进行组件扩展。
演示demo地址：http://antd.vue.huibur.com
demo源码地址：https://github.com/huiburtech/huibur_ant_vue_demo.git
### 核心原理
数据驱动页面, 即所有页面的渲染均是通过数据参数的配置完成，几乎不需要写html、css以及一些紧要且耽误功夫的重复性逻辑校验代码
### 使用说明
* 组件包下载方式：npm i huibur-antd-vue
* npm导入方式：import {hSearch, hList} from 'huibur-antd-vue'   Vue.use(hSearch); Vue.use(hList);
* 禁止外部组件直接操作组件中data的属性值，所有data属性均通过方法进行驱动
* 外部组件仅可调用props的属性，以及公共部分的方法，禁止调用非公共部分的方法。
* 所有的公共方法均以  “_” 开头,即父组件禁止调用非  “_” 开头的方法
* 组件统一入口为@/components/HB/index.js
* const.js 中放置组件中使用的常量数据
* 该组件的构建文件中，未进行Ant Design of Vue组件的引入操作，需自行引入

## const.js
### TYPE_ENUM
组件中控件的枚举值
<span id="TYPE_ENUM"></span>

|  参数   | 说明    |  版本   |
|  ----  | ----  |  ----  |
|  INPUT   | 输入框   |  1.0   |
|  INPUT_NUMBER   | 数字输入框   |  1.0   |
|  INPUT_TEXT_AREA   | 输入框   |  1.0   |
|  SELECT   | 选择框   |  1.0   |
|  SELECT_FILTER   | 选择框—本地过滤   |  1.0   |
|  SELECT_SEARCH   | 选择框—搜索   |  1.0   |
|  DATEPICKER   | 日期   |  1.0   |
|  MONTHPICKER   | 月度日期   |  1.0.16   |
|  LINK   | 超链接,即a标签   |  1.0   |
|  TEXT   | 文本   |  1.0   |
|  CHECKBOX   | CHECKBOX   |  1.0   |
|  CHECKBOX_GROUP   | CHECKBOX_GROUP   |  1.1.0   |
|  CHANGE   | 需要转换的数据   |  1.0   |
|  OPERATION   | 操作   |  1.0   |
|  IMG   | 单图片   |  1.0   |
|  IMG_MULTI   | 多图片   |  1.2.14   |
|  FILE   | 文件   |  1.2.14   |
|  FILE_MULTI   | 多文件   |  1.2.14   |
|  BUTTON   | 按钮   |  1.0.14   |
|  BUTTONGROUP   | 按钮组   |  1.0.14   |
|  DROPDOWN   | 下拉框   |  1.0.14    |
|  ACTION   | 组合操作:    selectItems: [{ value: OPERATION_ENUM.DETAIL, label: '查看详情 ' }, { value: 1, label: ' 操作',  selectItems: [{ value: OPERATION_ENUM.MILK_STATION, label: '分配' }, { value: OPERATION_ENUM.REFUND, label: '退款 ' }]}],  |  1.0.14   |
|  RADIO   | 单选   |  1.1.0   |
|  SWITCH   | 开关   |  1.1.8   |
|  TIMESTAMP   | 时间戳   |  1.3.9   |
|  DATERANGEPICKER   | 日期区间选择   |  1.3.9   |

## 组件
### Confirm

#### 公共方法
|  事件名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  _show   | 显示  | (title, content, cb)；title：标题，content：描述内容, cb：点确认的回调函数 |  1.0   |

<!-- #### 示例

	<template>
	  <div class="contain">
		  <button @click="handleDeleteClick">删除</button>
		  
	      <h-confirm ref="confirm"/>
	  </div>
	</template>
	
	<script>
	import Vue from 'vue'
	import {hConfirm} from 'huibur-antd-vue'
	Vue.use(hConfirm)
	
	export default {
	  components: {
	    hForm,
	    hTable, 
	    hConfirm,
	    Detail
	  },

	  methods: {
		  handleDeleteClick() {
			   this.$refs.confirm._show("确认删除？", '删除后不可恢复，请谨慎操作', (res) => {
				// 执行删除操作
			  });
		  }
		  
	  }
	
	 -->

### Header

### Form
#### 属性
|  参数   | 说明  |  类型   | 默认值 | 必须 |  版本   | 
|  ----  | ----  |  ----  | ----  |  ----  | ----  | 
|  items   |  控件组  |  \[[Form-Item](#Form-Item)\]   |    |  是  |  1.0   | 
|  columnNum |  列的数量  |  Number  | 1  |  |  1.0.19   | 
|  buttonItems |  按钮组  |  \[[Form-Button-Item](#Form-Button-Item)\]   |  |  |  1.0.20   |
|  form |  数据源对象  |  Object  |   |  |  1.2   |


<span id="Form-Item"></span>
#### Form-Item
|  参数   | 说明  |  类型   | 默认值 | 必须  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  | ----  |
|  title   | 标题  |  String   | - | |  1.0   |
|  key   | 唯一标识，字段键值  |  String   | - | 是 | 1.0   |
|  defaultValue   |  默认值  |  String   | '请选择'  | | 1.0   |
|  placeholder   |  默认文字  |  String   | '请选择'  | | 1.0   |
|  type   |  控件类型  | [TYPE_ENUM](#TYPE_ENUM)   | -  | 是 | 1.0   |
|  dataType   |  页面对应表格配置列；不填写时，默认为type  | [TYPE_ENUM](#TYPE_ENUM)   | -  | 否 | 1.0   |
|  sort   |  表单排序  | Number  | -  | 0 | 1.0   |
|  required   |  是否必须  |  Boolean  | false  | | 1.0   |
|  disabled   |  是否禁用  |  Boolean  | false  | | 1.0   |
|  format   |  日期格式  |  String  | "YYYY-MM-DD HH:mm:ss"  | | 1.0   |
|  selectItems   |  选择项  |  \[[SelectItem](#SelectItem)]   |   | | 1.0   |
|  linkageApi   |  下级联动接口API  |  \[[DictApiItem](#DictApiItem)]    |   | | 1.0   |
|  allowClear   |  允许被清空  |  Boolean  | false  | | 1.0.15   |
|  labelCol   |  标题列宽  |  Number  | 8  | | 1.0.16   |
|  wrapperCol   |  内容列宽  |  Number  | 12  | | 1.0.16   |
|  before   |  前置标签(INPUT有效)  |  [Input-Label-Item](#Input-Label-Item)  |   | | 1.1.0   |
|  after   |  后置标签(INPUT有效)  |  [Input-Label-Item](#Input-Label-Item)  |   | | 1.1.0   |
|  hidden   |  详情页隐藏该字段  |  Boolean  | false | | 1.3.12   |
|  tableHidden   |  table中隐藏该字段  |  Boolean  | false | | 1.3.12   |
|  ...   |  文件上传部分的参数（注：upload中的参数与以上参数同级追加即可） [Upload](#Upload)   |  Object  |  | | 1.2.13   |


<span id="SelectItem"></span>
#### SelectItem
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  icon   | 图标  |  String  | -  |  1.0   |
|  label   | 显示内容  |  String \| Number   | -  |  1.0   |
|  value   | 唯一标识  |  String \| Number   | -  |  1.0   |
|  disabled   | 是否禁用  |  String    | -  |  1.0   |
|  color   | 字体颜色  |  String   | -  |  1.0.21   |
|  background   | 背景色  |  String   | -  |  1.0.21   |



<span id="Form-Button-Item"></span>
#### Form-Button-Item
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  title   | 标题  |  String   | - |  1.0.20   |
|  icon   | 图标  |  String   | - |  1.0.20   |
|  value   | 唯一标识，字段键值  |  String   | - |  1.0.20   |
|  background   | 背景色  |  String   | - |  1.0.20   |
|  color   | 字体颜色  |  String   | - |  1.0.20   |


<span id="Input-Label-Item"></span>
#### Input-Label-Item
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  title   | 标题  |  String   | - |  1.1.0   |
|  icon   | 图标  |  String   | - |  1.1.0   |
|  width   | 宽度（px）  |  String   | - |  1.1.0   |
|  key   | 唯一标识，字段键值   |  String   | - |  1.1.0  |
| selectItems   |  选择项  |  \[[SelectItem](#SelectItem)]   | -  |  1.1.0   |



#### 回调事件
|  事件名称   | 说明  |  回调参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  selectSearch   | 选择框Search事件  |  Function(info); info:{kw, item, form}; kw:关键字，item: 被执行的控件信息；form：设置的表单模型数据  |  1.0   |
|  selectChange   | 选择框Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：被选中的value  |  1.0   |
|  selectSelect   | 选择框Select事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：被选中的value  |  1.0   |
|  btnClick   | 按钮点击回调  |  Function(info); info:{item, val}; item: 被执行的控件信息；val：设置的表单模型数据  |  1.0   |
|  inputChange   | input的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：value数据  |  1.0   |
|  inputNumChange   | inputNumber的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：value数据  |  1.0   |
|  dateChange   | date的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：value数据  |  1.0   |
|  checkboxChange   | checkbox的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：value数据  |  1.0   |
|  textareaChange   | textarea的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：value数据  |  1.0   |
|  radioChange   | radio的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：被选中的value  |  1.0   |
|  switchChange   | switch的Change事件  |  Function(info); info:{item, text}; item: 被执行的控件信息；text：被选中的value  |  1.0   |
|  btnClick   | 按钮点击回调  |  Function(info); info: 被执行的控件信息；form：设置的表单模型数据  |  1.1.0   |


#### 公共方法
|  事件名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  _validate   | 校验/数据获取  |  res:(valid: 是否校验通过，form:表单模型数据)  |  1.0.20   |
|  _setFormItem   | 设置form中的键值  |  (key, value);key:需要被设置的键，value：需要被设置的值  |  1.0   |
|  _refresh  | 刷新表单 |     |  1.2.2   |
|  _assignSelectItems  | 为selectItems赋值(针对items)  |  (target, key, selectItems) ; target即items， key， 被设置的项的key，selectItems：选项   |  1.2.8   |

    

<!-- #### 示例

##### form表单示例
	<template>
	  <a-modal
	      v-model="visible"
	      ok-text="确认"
	      cancel-text="取消"
	      centered
	      :closable="false"
	      :maskClosable="false"
	      :destroyOnClose="true"
	      @cancel="handleCancel"
	      @ok="handleOk"
	    >
	
	     <template slot="title">
	            <div class="title">{{ form.id == null || form.id == '' ? '新增' : '编辑' }}</div>
	     </template>
	
	    <h-form
	      :items="items"
	      ref="hForm"
	      :form="form"
	    ></h-form>
	  </a-modal>
	</template>

	<script>
	import Vue from "vue";
	import { TYPE_ENUM, hForm } from "huibur-antd-vue";
	
	Vue.use(hForm);
	
	const items = 
	[{
	    title: "姓名",
	    key: "name",
	    placeholder: "请输入姓名",
	    type: TYPE_ENUM.INPUT,
	    required: true,
	    disabled: false,
	    length: 20,
	    before: {
	      key: 'beforeName',
	      width: '80px',
	      icon: 'user'
	    },
	  },
	  {
	    title: "省/市",
	    key: "city",
	    placeholder: "请选择住址",
	    type: TYPE_ENUM.SELECT,
	    required: true,
	    disabled: false,
	    selectItems: [
	      {
	        value: 0,
	        label: "天津",
	        selectItems: [
	          {
	            title: "区",
	            key: "region",
	            required: true,
	            disabled: false,
	            type: TYPE_ENUM.INPUT,
	          }
	        ]
	      },
	      {
	        value: 1,
	        label: "北京",
	      }
	    ]
	  },
	]
	
	export default {
	  components: {
	  },
	
	  data() {
	    return {
	      visible: false,
	      items,
	      form: {}
	    };
	  },
	
	  methods: {
	    //---------------事件----------------
	    // 取消
	    handleCancel() {
	      this.visible = false
	    },
	
	    // 确认
	    handleOk() {
	      this.$refs.hForm._validate((valid, form) => {
	        console.log(valid);
	        console.log(form);
	      });
	    },    
	  },
	};
	</script>
	
##### Search搜索示例
	<template>
	  <div class="contain">
	
	    <h-form ref="search" :items="searchItems" :column-num=3 :button-items="btnItems" @btnClick="handleSearchClick"></h-form> 
	  </div>
	</template>
	
	<script>
	import Vue from 'vue'
	import {TYPE_ENUM, hForm} from 'huibur-antd-vue'
	Vue.use(hForm)
	
	const btnItems = [
	  {
	    title: '搜索',
	    icon: 'search',
	    color: 'red',
	    value: 'search'
	  },
	  {
	    title: '重置',
	    value: 'reset'
	  }
	]
	
	const searchItems =
	[{
	  title: "关键字",
	  key: "kw",
	  type: TYPE_ENUM.INPUT,
	  required: false,
	},
	{
	  title: "省",
	  key: "province",
	  placeholder: "请选择省",
	  type: TYPE_ENUM.SELECT,
	  required: false,
	  selectItems: [
		{
		  label: '河北',
		  value: 'hebei'
		},
		{
		  label: '河南',
		  value: 'henan'
		}
	  ]  
	},
	
	
	export default {
	  components: {
	
	  },
	
	  data() {
	    return {
	      TYPE_ENUM,
	      btnItems,
	      searchItems
	  },
	
	  methods: {
	

	    //-------------------------------------回调通知--------------------------------------
	
	    // 搜索框-搜索按钮点击事件
	    handleSearchClick(info) {
			if (info.item.value == 'search') { // 搜索按钮点击
	      
			} else if (info.item.value == 'reset') { // 重置按钮点击
			  
			}
	    },
		
	  },
	}
	</script>
	


 -->

### Table
#### 属性
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  columns   | 表格列的配置描述，具体项见[下表](#column)  |  \[[column](#column)]   | -  |  1.0   |
|  pageSize   | 页大小  |  Number   | 10  |  1.0   |
|  total   | 数据总数  |  Number   | 10  |  1.0   |
|  isPagination   | 是否需要分页  |  Boolean   | true  |  1.0   |
|  list   | 数据数组  |  Array   | -  |  1.0   |
|  rowSelection   | 列表项是否可选择，配置项  |  Object   | null |  1.0.19   |
|  expandedRowItems   | 扩展行操作项  |  \[[SelectItem](#SelectItem)]   | null |  1.1.5   |


#### 回调事件
|  事件名称   | 说明  |  回调参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  pageChange   | 分页事件触发  |  Function(current) ；current：被选中的页码 |  1.0   |


#### 公共方法
|  事件名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  _startLoading   | 开始页面加载中动画  |  -  |  1.0   |
|  _stopLoading   | 停止页面加载中动画  |  -  |  1.0   |


<span id="column"></span>
#### column
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  title   | 标题  |  array   | -  |  1.0   |
|  dataIndex   | 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法  |  string   | -  |  1.0   |
|  align   | 设置列内容的对齐方式  |  'left' \| 'right' \| 'center'   | 'left'  |  1.0   |
|  customRender   | 生成复杂数据的渲染函数，同AntDesign，dataIndex='index'，时， 该值默认为index + 1  |  Function(text, record, index) {}\|slot-scope  | -  |  1.0   |
|  dataType   |  数据展示类型  |  [TYPE_ENUM](#TYPE_ENUM)   |  TEXT  |  1.0   |
|  selectItems   |  选择项数据  |  \[[SelectItem](#SelectItem)]  |  -  |  1.0   |
|  format   | 日期格式  |  String  |  | | 1.2.13   |
|  imgW   | 图片宽度  |  String  | 60px | | 1.2.13   |

<!-- #### 示例
	
	<template>
	  <div class="contain">
	
	    <h-Table 
	      ref="list" 
	      :pageSize=5
	      :total=10
	      :isPagination=true
	      :columns="columns"
	      :list="list"
	      :rowSelection="rowSelection"
	      :expandedRowItems="expandedRowItems"
	      @pageChange="handleListPageChange"
	      @buttonClick="handleListButtonClick"
	      ></h-Table>
	  </div>
	</template>
	
	<script>
	import Vue from 'vue'
	import {TYPE_ENUM, hTable} from 'huibur-antd-vue'
	Vue.use(hTable)
	
	const columns = [
	  {
	    title: '序号',
	    dataIndex: 'index',
	    key: 'index',
	    align: 'center'
	  },
	  {
	    title: '姓名',
	    dataIndex: 'name',
	    key: 'name',
	    align: 'center',
	  },
	  {
	    title: '年龄',
	    dataIndex: 'age',
	    key: 'age',
	    align: 'center'
	  },
	  {
	    title: '性别',
	    dataIndex: 'gender',
	    key: 'gender',
	    align: 'center',
	    selectItems: [
			{label: '男', value: 0},
			{label: '女', value: 1}
		],
	  },
	  {
	    title: '操作',
	    dataIndex: 'operation',
	    key: 'operation',
	    align: 'center',
	    selectItems: [{label: '删除', value: 'delete', icon: 'delete', background: 'red', color: 'yellow'}, {label: '编辑', value: 'edit'}, {label: '操作', value: 'operat', selectItems: [{label: '删除', value: 'delete', icon: 'delete'}, {label: '编辑', value: 'edit', icon: 'delete'}]}],
	    dataType: TYPE_ENUM.ACTION,
	  }
	]
	
	const expandedRowItems = [{label: '删除', value: 'delete', icon: 'delete'}, {label: '编辑', icon: 'edit', value: 'edit'}]
	
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
	
	const list = 
		[{name: '张三', age: 18, gender: 0},
		{name: '李四', age: 19, gender: 1}]
	
	export default {
	  data() {
	    return {
	      rowSelection,
	      expandedRowItems,
	      TYPE_ENUM,
	      columns,
	     
	    }
	  },
	
	  created() {
	  },
	  mounted() {
	  },
	  methods: {
	   
	    // ------------------------------回调通知----------------------------------
	    // list 分页
	    handleListPageChange(val) {
	
	      this.$refs.list._startLoading()
	      setTimeout(()=>{   //设置延迟执行
	        this.list = [{name: '张三2', age: 18, gender: 0},
						{name: '李四2', age: 19, gender: 1}]
	        this.$refs.list._stopLoading()
	      }, 1000)
	    },
	
	    // 按钮点击事件
	    handleListButtonClick (val) {
	      if (val.val.value == 'edit') {
	   
	      } else if (val.val.value == 'delete') {
	     
	      }
	    },
	
	  },
	}
	</script>

<span id="Upload"></span> -->
### Upload
#### 属性
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  fileData   | 文件数据  |  [String, Object, Array]   | -  |  1.2.14   |
|  fileNum   | 文件数量(0: 表示不限制)  |  Number  | 1  |  1.2.14   |
|  multiple   | 是否支持多选文件，开启后按住 ctrl 可选择多个文件。fileNum != 1时有效 |  Boolean   | false  |  1.2.14   |
|  listType   | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card |  String   | text  |  1.2.14   |
|  action   | 上传的地址 |  String   | 'https://upload.qiniup.com''  |  1.2.14   |
|  accept   | 接受上传的文件类型 |  String   |   |  1.2.14   |
|  formData   | 上传所需参数或返回上传参数的方法 |  Object   | {token: '', domain: '', region: '', uploadURL: ''}  |  1.2.14   |
|  qnTokenApi   | 七牛云请求的API。 |  Object   |  {method: 'GET',url: 'qnToken', params: {}, data: {}} |  1.2.14   |
|  title   | 上传按钮的标题 |  String   |  上传 |  1.2.14   |
|  icon   | 上传按钮的图标 |  String   |  upload |  1.2.14   |

#### 回调事件
|  事件名称   | 说明  |  回调参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  change   | 文件上传事件回调处理：返回文件列表  |  |  1.2.14   |
|  ok   | 确认事件  |   |  1.0   |

### List
#### 组件描述
该组件封装了中后台页面基本的常规操作，主要由表头、搜索、列表、详情组件构成，该组件涵盖列表的网络请求，增、删、改、查等基本操作。在此之上也开放了一些回调事件，来支持一些组件无法支持的一些操作。支持：（add、edit、copy）操作
#### 属性
|  参数   | 说明  |  类型   | 默认值 | 必须  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  | ----  |
|  header   |  请求头  | Object   |    |    |  1.2.16
|  apiName   |  基于ResetFul 接口风格的统一资源名称（若没有对网络请求进行封装处理，此处为接口全路径）；（该字段为空则需要自己手动处理API接口请求及逻辑）  |  String   |  -  |  不建议为空  |  1.2.10
|  extParams   |  API请求时的扩展参数  | Object   |    |    |  1.2.10
|  succCode   |  接口返回的成功状态码  |  String   |  "200"  |    |  1.2.10
|  idKey   |  模型对象对应的唯一标识字段  |  String   |  "id"  |    |  1.2.10
|  headerButtonItems   |  header组件中按钮组  |  \[[BtnItem](#BtnItem)]   |    |    |  1.2.10
|  searchItems   |  搜索控件组（为空，不显示搜索组件）  |  \[[Form-Item](#Form-Item)\]    |    |    |  1.2.10
|  searchBtnItems   |  搜索按钮组  | \[[BtnItem](#BtnItem)]   |  [{title: '查询',icon: 'search',value: 'search'},{title: '重置',icon: 'reload',value: 'reset'}]  |    |  1.2.10
|  searchColumnNum   |  搜索组件中每行显示的组件数   |  Number  |   4  |  |  1.2.10
|  columns   |  table上列的配置项  |  \[[column](#column)]； 为空时与detailItems数据一致    |    |  否  |  1.2.10
|  isPagination   |  table是否支持分页  |  Boolean   |  false  |    |  1.2.10
|  pagination   |  table分页配置（isPagination=true 时有效）  |  Object   |  {pageNum: 1, pageSize: 10, total: 10}  |    |  1.2.10
|  rowSelected   |  table是否支持行选择  |  Boolean   |  false  |    |  1.2.10
|  detailItems   |  详情页控件配置项目  |  \[[DetailItem](#DetailItem)]   |    |  是  |  1.2.10
|  dividerOrientation   |  详情页一级控件组所在分割线 enum:left righ center ;为空不显示分割头  | 
 String  |  null   |  是  |  1.2.10
 |  requestDetail   |  详情页面是否需要请求详情接口获取数据  |  Boolean   |  false  |    |  1.2.10
 |  dictApi   |  需要通过接口获取的选择项数据或者字典数据接口（用于下拉框，列表反显等）  |  \[[DictApiItem](#DictApiItem)]    |    |    |  1.2.10
 <!-- |  convertData   |  需要将业务模型中数据与详情配置中所对应的模型数据进行转换的字段  |  \[[ConvertData](#ConvertData)]    |    |    |  1.2.10 -->

<span id="BtnItem"></span>
#### BtnItem
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  title   | 显示的名称  |  String   | -  |  1.2.0   |
|  icon   | 显示的图标  |  String   | -  |  1.2.0   |
|  value   | 唯一标识项  |  String   | -  |  1.2.0   |

<span id="DetailItem"></span>
#### DetailItem
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  title   | 当前组的名称  |  String   | -  |  1.2.0   |
|  children   | 该组下对应的子项  |  \[[Form-Item](#Form-Item)]    | -  |  1.2.0   |

<span id="DictApiItem"></span>
#### DictApiItem
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  header   |  请求头  | Object   |    |    |  1.2.16
|  key   | 需要进行结果数据渲染的配置项中的KEY  |  String   | -  |  1.2.0   |
|  url   | URL地址  |  String    | -  |  1.2.0   |
|  method   | 请求方式 enum: GET POST  |  String    | -  |  1.2.0   |
|  params   | params参数  |  Object    | -  |  1.2.0   |
|  valueKey   |  选项数据中的唯一标识字段 |  String    | -  |  1.2.0   |
|  labelKey   | 选项中用来显示的标识字段  |  String    | -  |  1.2.0   |
|  kwKey   | 关键字搜索时，关键字对应的标识字段  |  String    | -  |  1.2.0   |

<!-- 
<span id="ConvertData"></span>
#### ConvertData
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  formKey   | type=Object 时表，单配置中对应的key字段； type=Array 时， 业务模型中数组项内对象中唯一标识  |  String   | -  |  1.2.0   |
|  type   | 业务模型字段类型 enum： Object Array String  |   String   | -  |  1.2.0   |
|  modelKey   | 业务模型数据中对应的唯一标识字段； type=Object时，该字段为对象，type=Array时，该字段为数组  |  String    | -  |  1.2.0   |
|  parent   |  type=Array有效；表单配置中对应的联动上级选项的KEY字段，与联动选配合使用  |  String    | -  |  1.2.0   | -->


#### 回调事件
|  事件名称   | 说明  |  回调参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  tableRowChange   | table的行选中事件  |   |  1.0   |
|  tableBtnClick   | table的按钮点击事件  |   |  1.0   |
|  searchBtnClick   | 搜索框的按钮点击事件  |   |  1.0   |
|  delete   | 被删除时间（api为空的情况下）  |   |  1.0   |
|  detailOk   | 详情确认事件  |   |  1.0   |


### API
#### 组件描述
封装了常用的接口接口方式，基于resetFul。

#### 引入方式
	import { h_getList, h_getDetail, h_add, h_edit, h_delete, h_request } from 'huibur-antd-vue'
#### 接口
|  方法名   |  描述  | 
|  ----  | ----  | 
|  h_add (url, data, header)   |  增加  |  
|  h_edit (url, data, id, header)   |  修改  | 
|  h_delete (url, id, header)  |  删除  | Object   | 
|  h_getList (url, params, header)   |  获取列表  |  
|  h_getDetail (url, id, header)   |  获取数据详情  
|  h_request (method, url, params, data, header, id)   |  其他通用网络请求  
|  h_download (method, url, params, data, header, filename, id)   |  下载  


#### 参数说明
|  名称 |  参数类型  |  描述  | 
|  ----  | ----  | ----  | 
|  method   | String |  请求方式（POST、GET、PUT、DETETE）  |  
|  url   | String |  网络请求地址全路径（注：可以拼接参数，效果与params、id参数相同）  |  
|  params   |  Object  | 添加到url的请求字符串中的，用于get请求
|  data   |  Object  | 添加到请求体（body）中的， 用于post请求
|  header   | Object | 请求头  | 
|  id   | String | 拼接在路径之后的参数，即restful中的/{id}  | 
|  filename   | String | 下载的文件名称 | 
## 接口规范

### 说明

	所有接口规范需严格遵循resetFul风格规范，即面向资源。列表、详情、新增、编辑等模型必须保持一致。

	以User为例

### 列表

|  名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  url   | /users  |  -  |  1.2.10   |
|  method   | GET  |  -  |  1.2.10   |
|  参数   | params {pageNum: 1, pageSize: 10}  |  -  |  1.2.10   |
|  返回数据   | {total: 10, pageNum: 1, list: \[[User](#User)]} 或 \[[User](#User)]  |  -  |  1.2.10   |


### 详情

|  名称   | 说明    |  版本   |
|  ----  | ----    | ----  |
|  url   | /users/{id}  |  1.2.10   |
|  method   | GET  |  1.2.10   |
|  参数   | path |   1.2.10   |
|  返回数据   | [User](#User) |  1.2.10   |


### 增加

|  名称   | 说明  |   版本   |
|  ----  | ----  |   ----  |
|  url   | /users  |    1.2.10   |
|  method   | POST  |   1.2.10   |
|  参数   | body ([User](#User))  |    1.2.10   |
|  返回数据   | [User](#User)  |   1.2.10   |


### 修改

|  名称   | 说明    |  版本   |
|  ----  | ----    | ----  |
|  url   | /users  |    1.2.10   |
|  method   | PUT  |  1.2.10   |
|  参数   | body([User](#User) ) |    1.2.10   |
|  返回数据   | [User](#User)  |   1.2.10   |


### 删除

|  名称   | 说明  |    版本   |
|  ----  | ----  |  ----  |
|  url   | /users/{id}  |   1.2.10   |
|  method   | DELETE  |    1.2.10   |
|  参数   | path |   1.2.10   |


## 关注我们
![](https://statics.huibur.com/huibur/web/qrcode.png)
