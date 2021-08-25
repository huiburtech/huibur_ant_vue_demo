<template>

    <a-modal
      v-model="visible"
      ok-text="确认"
      cancel-text="取消"
      centered
      :closable="false"
      :maskClosable="false"
      :destroyOnClose="true"
      :confirmLoading="loading"
      :width="width"
      @cancel="handleCancel"
      @ok="handleOk"
    >  
      <template slot="title">
        <div class="title">{{ form[idKey] == null || form[idKey] == '' ? '新增' : '编辑' }}</div>
      </template>

      <div class="detail">
        <div v-for="(item, index) in items" :key="index">
          <a-divider :orientation="dividerOrientation" v-if="dividerOrientation">{{item.title}}</a-divider>
          <h-form
            :items="item.children"
            :column-num="columnNum"
            :form="form"
            @selectChange="handleFormSelectChange"
            ref="form"
          ></h-form>
        </div>
      </div>
    </a-modal>

</template>

<script>
import Vue from 'vue'
import { TYPE_ENUM, hForm } from 'huibur-antd-vue'
// import { TYPE_ENUM, hForm } from '../HB/index'
import { h_getDetail, h_add, h_edit, h_request} from '../api/index'

Vue.use(hForm)

export default {
  name: 'Detail',
  props: {
    width: {
      type: String,
      default: '50%'
    },
    apiName: {
      type: String,
    },
    succCode: {
      type: String,
      default: '200'
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    columnNum: {
      type: Number,
      default: 1
    },
    requestDetail: {
      type: Boolean,
      default: false
    },
    idKey: {
      type: String,
      default: 'id'
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
    dictApi: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectDict: {
      type: Object,
      default: () => {
        return {}
      }
    },
    convertData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      TYPE_ENUM,
      
      form: {},
      visible: false,
      loading: false,
    }
  },
  watch:{
    selectDict:function(val){
      this.items.forEach(item => {
          item.children.forEach(itemEl => {
            itemEl.selectItems = val[itemEl.key]
          })
        })

    }
  },
  mounted() {
    if (this.dictApi) {
      this.dictApi.forEach(el => {
        this.requestGetDict(el)
      })
    }
  },
  methods: {
    // -------------------------------------事件--------------------------------------
    // 取消
    handleCancel () {
      this.visible = false
    },
    // 确认
    handleOk () {

      var valueValid = true
      this.items.forEach((el, index) => {
        this.$refs.form[index]._validate((valid, form) => {
          Object.assign(this.form, form)
          if (valid === false) {
            valueValid = false
          }
        })
      })

      if (valueValid == false) {
        return
      }

      this.convertFormToData()

      if (this.form[this.idKey]) {
            // 调用编辑接口
        this.requestEdit()
      } else {
        // 调用新增接口
        this.requestAdd()
      }
    },



    // -----------------------b --------------公共方法--------------------------------------
    _show (params) {
      this.visible = true
      if (params != null) { // 编辑
        this.form = Object.assign({}, params)
        if (this.requestDetail == true) {
          // 获取详情接口
          this.requestGetDetail()
        } else {
          this.convertDataToForm()
        }

        this.items.forEach(el => {
          el.children.forEach(item => {
            if (item.linkageApi) {
              this.requestLinkageItem(item, this.form[item.key])
            }
          })
        })

      } else {

        this.form = Object.assign({}, this.extParams)

        this.items.forEach((el, index) => {
          el.children.forEach(item => {
            if (item.linkage) {
              // 设置延迟执行
              setTimeout(() => {
                this.$refs.form[index]._refreshLinkage(item)
              }, 50)

            }
          })
        })
      }
    },
    // -------------------------------------私有方法--------------------------------------
    // 将复杂模型数据转换为单一Form对象
    convertDataToForm() {
      if (this.convertData.length == 0) {
        return
      }

      this.convertData.forEach(el => {
        if (el.type == Object) {
          this.$set(this.form, el.formKey, this.form[el.modelKey][el.formKey])
        } else if (el.type === Array) {
          this.form[el.modelKey].forEach(item => {
            this.$set(this.form, item[el.formKey], item.data)
          })
        } else if (el.type == String) {
          this.$set(this.form, el.formKey, this.form[el.modelKey])
        }
        
      })

    },

    // 将单一Form对象转换为模型对象
    convertFormToData() {
      if (this.convertData.length == 0) {
        return
      }

      this.convertData.forEach(el => {
        if (el.type == Object) {
          if (!this.form[el.modelKey]) {
            this.$set(this.form, el.modelKey, {})
          }
          this.$set(this.form[el.modelKey], el.formKey, this.form[el.formKey] || '')
        } else if (el.type === Array) {

          var items = []
          this.items.forEach(item => {
            item.children.forEach(itemEl => {
              if (itemEl.parent === el.parent) { // 放入模型对象
                var obj = {}
                this.$set(obj, el.formKey, itemEl.key)
                this.$set(obj, 'data', this.form[itemEl.key] || '')
                items.push(obj)
              }
            })
          })
          this.$set(this.form, el.modelKey, items)
        } else if (el.type == String) {
          this.$set(this.form, el.modelKey, this.form[el.formKey])
        }
        
      })
    },

    // -------------------------------------网络请求--------------------------------------
    // 网络请求-新增
    requestGetDetail () {
      if (this.loading) {
        return
      }

      var id = this.form[this.idKey] || this.form.copyId

      // 2:设置loading加载
      this.loading = true
      h_getDetail(this.apiName, id)
          .then((res) => {
            console.log(res)
            // 3:成功-进行业务操作（注：200还是'200'具体需要根据服务器返回确定）
            if (String(res.code) === this.succCode) {
              if (res.data) {
                this.$set(this, 'form', res.data)
              }
              this.convertDataToForm()
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

    // 网络请求-新增
    requestAdd () {
      if (this.loading) {
        this.$message.warn('正在添加中')
        return
      }

      // 2:设置loading加载
      this.loading = true
      h_add(this.apiName, this.form)
          .then((res) => {
            // 3:成功-进行业务操作（注：200还是'200'具体需要根据服务器返回确定）
            if (String(res.code) === this.succCode) {
              this.$message.success('新增成功')
              this.$emit('addSucc', this.form)
              this.visible = false
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

    // 网络请求-编辑
    requestEdit () {
      if (this.loading) {
        this.$message.warn('正在编辑中')
        return
      }

      // 2:设置loading加载
      this.loading = true
      h_edit(this.apiName, this.form).then((res) => {
            // 3:成功-进行业务操作（注：200还是'200'具体需要根据服务器返回确定）
            if (String(res.code) === this.succCode) {
              this.$message.success('编辑成功')
              this.$emit('editSucc', this.form)
              this.visible = false
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

            this.items.forEach(item => {
              item.children.forEach(itemEl => {
                if (itemEl.key == dictApi.key) {
                  itemEl.selectItems = items
                }
              })
            })
          
          } else {
            // 4:失败-弹框提示（注：message还是msg、或者其他具体需要根据服务器返回确定）
            this.$message.warn(res.message)
          }
        })
        .finally(() => {
        })
    },

    // 网络请求-获取某通讯方式下参数信息
    requestLinkageItem (linkageItem, value) {
    
        var valueKey = linkageItem.linkageApi.valueKey || 'value'
        var labelKey = linkageItem.linkageApi.labelKey || 'title'
  
        // 2:设置loading加载
        h_request(linkageItem.linkageApi.method, linkageItem.linkageApi.url, linkageItem.linkageApi.params, linkageItem.linkageApi.data, value).then((res) => {
              // 3:成功-进行业务操作（注：200还是'200'具体需要根据服务器返回确定）
              if (String(res.code) === '200') {
                // 重组模型，与form的模型保持一致
                res.data.forEach(el => {
                  el.title = el[labelKey]
                  el.key = String(el[valueKey])
                  el.value = el[valueKey]
                  el.required = true
                  el.type = TYPE_ENUM.INPUT
                })

                this.items.forEach((item, index) => {
                  item.children.forEach(itemEl => {
                    if (itemEl.key == linkageItem.key) {
                      itemEl.selectItems.forEach( itemElEl => {
                        if (itemElEl.value == value) {
                          itemElEl.selectItems = res.data
                        }
                      })
                      // 刷新
                      this.$refs.form[index]._refreshLinkage(itemEl)
                    }
                  })
                })
              }
            })
            .finally(() => {
              // 5:结束加载
            })

  
    },

    // -------------------------------------通知回调--------------------------------------
    handleFormSelectChange(e) {
      console.log(e)
      if (e.item.linkage == true) {
        // this.
        var selectData = e.item.selectItems.find(el => el.value == e.text) 
        if(selectData.selectItems == null || selectData.selectItems.length == 0) {

          this.requestLinkageItem(e.item, e.text)
        }
      }
    }


  }
}
</script>


<style scoped>
.detail {
  width: 100%;
  max-height: 70vh;
  overflow: auto;
}
</style>