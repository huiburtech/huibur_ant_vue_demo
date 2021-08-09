<template>
  <div>
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
        :column-num="2"
        ref="form"
        ></h-form>
    </a-modal>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { TYPE_ENUM, hForm } from "huibur-antd-vue";
Vue.use(hForm);


const items = [
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
        type: TYPE_ENUM.SINGLE,
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
        ],
    },
]

export default {
  name: 'Detail',
  data() {
    return {
      TYPE_ENUM,
      items,
      form: {},
      visible: false,
      loading: false,
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
      this.visible = false
    },

    // 确认
    handleOk() {
      this.$refs.form._validate((valid, form) => {
        if (valid == true) {
            if (this.form.id) { // 编辑
            // 调用编辑接口
            this.requestAdd();
            } else { // 新增
            // 调用新增接口
            this.requestEdit();
            }
        }
      });
    },

    //-------------------------------------公共方法--------------------------------------
    _show(param) {
      this.visible = true

      if (param != null) {
        this.form = Object.assign({}, param)
      } else {
        this.form = {}
      }
    },

    //-------------------------------------私有方法--------------------------------------
   


    //-------------------------------------接口--------------------------------------
    // 网络请求-新增
    requestAdd() {

        this.$emit('addSucc', this.form)
    },

    // 网络请求-编辑
    requestEdit() {

        this.$emit('eidtSucc', this.form)
    }

  },
}
</script>

<style scoped lang="less">

</style>