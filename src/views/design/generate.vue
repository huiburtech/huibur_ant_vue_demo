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
            <div class="title">生成JSON</div>
        </template>

        <a-textarea
          :disabled="true"
          v-model="text"
          :placeholder="text"
          :auto-size="{ minRows: 10, maxRows: 20 }"
        />


    </a-modal>
    
  </div>
</template>

<script>

export default {
  name: 'Design',
  data() {
    return {
      visible: false,
      text: null,
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
    _show(text) {
      this.visible = true

      this.text = text
    },


  },
}
</script>

<style scoped lang="less">

</style>