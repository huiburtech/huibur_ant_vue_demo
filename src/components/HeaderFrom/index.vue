<template>
  <a-card>
    <div class="btn">
      <span v-if="searchNum">共搜索到{{ searchNum }}条数据</span>
      <div>
        <template v-for="item in items">
          <a-button style="margin: 3px" @click="btnClick(item)">{{ item.title }}</a-button>
        </template>
      </div>
    </div>
    <div
      v-if="selectNum"
      style="border: 1px solid white;margin-top: 10px;background-color: #E6F3FC;display: flex;align-items: center;border-radius:5px;height: 40px">
      <a-icon type="info-circle" style="margin-left: 10px;color: #00A0E9"/>
      <span style="margin-left: 15px;height: 21px">已选择<span style="color: #00A0E9">{{ selectNum }}</span>项数据</span>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'HeaderFrom',
  components: {},
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchNum: {
      type: Number,
    },
    selectNum: {
      type: Number,
    }
  },
  data () {
    return {}
  },

  methods: {
    //  --------------------------事件----------------------------
    btnClick (item) {
      this.$emit('btnClick', item)
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: space-between;
  align-items: center
}
</style>
