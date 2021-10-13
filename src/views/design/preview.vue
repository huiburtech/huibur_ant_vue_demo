<template>
  <div>
    <a-modal
      v-model="visible"
      ok-text="确认"
      cancel-text="取消"
      centered
      width="100%"
      :closable="false"
      :maskClosable="false"
      :destroyOnClose="true"
      @cancel="handleCancel"
      @ok="handleOk"

    >

        <template slot="title">
            <div class="title">{{form ? form.name : '预览'}}</div>
        </template>


        <h-list
            ref="list"
            :detailItems="form.formItems ? form.formItems : []" 
            :rowSelected="true"
            :searchItems="form.searchItems ? form.searchItems : []" 
        />

    </a-modal>
    
  </div>
</template>

<script>

import { TYPE_ENUM, hList } from 'huibur-antd-vue'

export default {
  name: 'Preview',
  components: {
    hList
  },
  data() {
    return {
      visible: false,
      form: null,
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
  

      this.visible = false
    },

    //-------------------------------------公共方法--------------------------------------
    _show(form) {
        this.visible = true
        this.form = form 
    },


  },
}
</script>

<style scoped lang="less">

</style>