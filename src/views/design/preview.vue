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
            v-if="form"
            ref="list"
            :apiName="form.apiName"
            :header="form.header ? JSON.parse(form.header) : null"
            :detailItems="form.detailItems ? form.detailItems : []" 
            :isPagination="form.isPagination || false"
            :rowSelected="true"
            :searchItems="form.searchItems ? form.searchItems : []" 
             @detailOk="handleListDetailOk"
            :dataSource="list"
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
      list: []
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
        this.list = []
    },

    //-------------------------------------通知--------------------------------------
    handleListDetailOk(info) {
      if (this.form.apiName) {
        return
      }
      var item = this.list.find(el => el[this.form.idKey] == info.form[this.form.idKey])
      if (item) { // 编辑
          var index = this.list.indexOf(item)
          this.list.splice(index,1, info.form);
      } else {
          this.list.push(info.form)
      }
    }


  },
}
</script>

<style scoped lang="less">

</style>