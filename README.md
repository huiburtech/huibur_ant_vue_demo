
# HUIBUR_VUE_ANT_PRO说明文档
[TOC]
## 前言
### 基本说明
 该组件库是基于Ant Design Vue 框架进行开发，旨在简化开发过程中大量无意义的重复代码工作。该组件的demo地址为：https://github.com/huiburtech/huibur_ant_vue_demo.git，该组件如果不能满足现有需求的话，可以关注公众号进行留言
### 使用说明
* 组件包下载方式：npm i huibur-antd-vue
* npm导入方式：import {hSearch, hList} from 'huibur-antd-vue'   Vue.use(hSearch); Vue.use(hList);
* 禁止外部组件直接操作组件中data的属性值，所有data属性均通过方法进行驱动
* 外部组件仅可调用props的属性，以及公共部分的方法，禁止调用非公共部分的方法。
* 所有的公共方法均以  “_” 开头,即父组件禁止调用非  “_” 开头的方法
* 组件统一入口为@/components/HB/index.js
* const.js 中放置组件中使用的常量数据
* demo账号： admin, 密码：admin

## const.js
### TYPE_ENUM
组件中控件的枚举值
<span id="TYPE_ENUM"></span>

|  参数   | 说明    |  版本   |
|  ----  | ----  |  ----  |
|  INPUT   | 输入框   |  1.0   |
|  INPUT_NUMBER   | 数字输入框   |  1.0   |
|  SELECT   | 选择框   |  1.0   |
|  SELECT_FILTER   | 选择框—本地过滤   |  1.0   |
|  SELECT_SEARCH   | 选择框—搜索   |  1.0   |
|  SELECT_MULIT   | 选择框—多选 |  1.0   |
|  SELECT_MULIT_FILTER   | 选择框—多选-本地过滤   |  1.0   |
|  SELECT_MULIT_SEARCH   | 选择框—多选-搜索   |  1.0   |
|  SELECT_INPUT   | 选择框-搜索即输入   |  1.0   |
|  DATEPICKER   | 日期   |  1.0   |
|  MONTHPICKER   | 月度日期   |  1.0.16   |
|  LINK   | 超链接,即a标签   |  1.0   |
|  TEXT   | 文本   |  1.0   |
|  CHECKBOX   | CHECKBOX   |  1.0   |
|  CHECKBOX_GROUP   | CHECKBOX_GROUP   |  1.1.0   |
|  CHANGE   | 需要转换的数据   |  1.0   |
|  OPERATION   | 操作   |  1.0   |
|  IMG   | 图片   |  1.0   |
|  BUTTON   | 按钮   |  1.0.14   |
|  BUTTONGROUP   | 按钮组   |  1.0.14   |
|  DROPDOWN   | 下拉框   |  1.0.14    |
|  ACTION   | 组合操作:    selectItems: [{ value: OPERATION_ENUM.DETAIL, label: '查看详情 ' }, { value: 1, label: ' 操作',  selectItems: [{ value: OPERATION_ENUM.MILK_STATION, label: '分配' }, { value: OPERATION_ENUM.REFUND, label: '退款 ' }]}],  |  1.0.14   |
|  RADIO   | 单选   |  1.1.0   |
## 组件
### Confirm

#### 公共方法
|  事件名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  _show   | 显示  | (title, content, cb)；title：标题，content：描述内容, cb：点确认的回调函数 |  1.0   |

### Header

### Form
#### 属性
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  form   | 表单对象数据  |  Object   |  |  1.0   |
|  items   |  控件组  |  \[[Search-Item](#Search-Item)\]   | 10  |  1.0   |
|  columnNum |  列的数量  |  Number  | 1  |  1.0.19    |

### Search
#### 属性
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  ~~btnIcon~~  | 按钮ICON  |  String   | 'search' |  1.0（已废弃）  |
|  ~~btnTitle~~   | 按钮标题  |  String   | '搜索' |  1.0（已废弃）   |
|  items   |  控件组  |  \[[Search-Item](#Search-Item)\]   | 10  |  1.0   |
|  columnNum |  列的数量  |  Number  | 4  |  1.0.19   |
|  buttonItems |  按钮组  |  \[Search-Button-Item(#Search-Button-Item)\]   |   |  1.0.20   |


<span id="Search-Item"></span>
#### Search-Item
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  title   | 标题  |  String   | - |  1.0   |
|  key   | 唯一标识，字段键值  |  String   | - |  1.0   |
|  placeholder   |  默认文字  |  String   | '请选择'  |  1.0   |
|  type   |  控件类型  | [TYPE_ENUM](#TYPE_ENUM)   | -  |  1.0   |
|  required   |  是否必须  |  Boolean  | false  |  1.0   |
|  disabled   |  是否禁用  |  Boolean  | false  |  1.0   |
|  format   |  日期格式  |  String  | "YYYY-MM-DD HH:mm:ss"  |  1.0   |
|  selectItems   |  选择项  |  \[[SelectItem](#SelectItem)]   | 10  |  1.0   |
|  allowClear   |  允许被清空  |  Boolean  | false  |  1.0.15   |
|  labelCol   |  标题列宽  |  Number  | 8  |  1.0.16   |
|  wrapperCol   |  内容列宽  |  Number  | 12  |  1.0.16   |
|  before   |  前置标签(INPUT有效)  |  [Input-Label-Item](#Input-Label-Item)  | null  |  1.1.0   |
|  after   |  后置标签(INPUT有效)  |  [Input-Label-Item](#Input-Label-Item)  | null  |  1.1.0   |

<span id="Search-Button-Item"></span>
#### Search-Button-Item
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
|  widht   | 宽度（px）  |  String   | - |  1.1.0   |
| selectItems   |  选择项  |  \[[SelectItem](#SelectItem)]   | -  |  1.1.0   |
|  key   | 唯一标识，字段键值   |  String   | - |  1.1.0  |



#### 回调事件
|  事件名称   | 说明  |  回调参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  ~~searchClick~~   | 搜索按钮点击  |  Function(form);form: 被设置的表单模型值  |  1.0（已废弃）   |
|  selectSearch   | 选择框搜索事件  |  Function(info); info:{kw, item, form}; kw:关键字，item: 被执行的控件信息；form：设置的表单模型数据  |  1.0   |
|  selectChange   | 选择框选择事件  |  Function(info); info:{item, form}; item: 被执行的控件信息；form：设置的表单模型数据  |  1.0   |
|  btnClick   | 按钮点击回调  |  Function(info); info: 被执行的控件信息；form：设置的表单模型数据  |  1.0.20   |


#### 公共方法
|  事件名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  _validate   | 校验/数据获取  |  res:(valid: 是否校验通过，form:表单模型数据)  |  1.0.20   |
|  _setFormItem   | 设置form中的键值  |  (key, value);key:需要被设置的键，value：需要被设置的值  |  1.0   |


### Table
#### 属性
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  columns   | 表格列的配置描述，具体项见[下表](#column)  |  array   | -  |  1.0   |
|  pageSize   | 页大小  |  Number   | 10  |  1.0   |
|  total   | 数据总数  |  Number   | 10  |  1.0   |
|  isPagination   | 是否需要分页  |  Boolean   | true  |  1.0   |
|  list   | 数据数组  |  Array   | -  |  1.0   |
|  rowSelection   | 列表项是否可选择，配置项  |  Object   | null |  1.0.19   |


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



<span id="SelectItem"></span>
#### SelectItem
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  label   | 显示内容  |  String \| Number   | -  |  1.0   |
|  value   | 唯一标识  |  String \| Number   | -  |  1.0   |
|  disabled   | 是否禁用  |  String    | -  |  1.0   |
|  color   | 字体颜色  |  String   | -  |  1.0.21   |
|  background   | 背景色  |  String   | -  |  1.0.21   |



---
### UploadImg
#### 属性
|  参数   | 说明  |  类型   | 默认值  |  版本   |
|  ----  | ----  |  ----  | ----  |  ----  |
|  ref   | 需被注册  |  String   |- |  1.0   |
|  imgSize   | 上传的数量  |  String   | '1' |  1.0   |
|  accept |  上传的图片类型  |  String   | 'image/jpeg'  |  1.0   |

#### 公共方法
|  事件名称   | 说明  |  参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  _dataProcessing   | 设置fileList中的键值  | [{url:xxxxx}]  |  1.0   |

#### 回调事件
|  事件名称   | 说明  |  回调参数   |  版本   |
|  ----  | ----  |  ----  | ----  |
|  uploadSucc   | 上传成功后或者删除成功后触发  |   Function(info); info:[fileList]; fileList：返回的图片模型数据 |  1.0   |


## 关注我们
![](https://statics.huibur.com/huibur/web/qrcode.png)