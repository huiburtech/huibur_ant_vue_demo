<template>
  <a-layout id="basiclayout">
    <a-layout-sider
      width="200"
      v-model="collapsed"
      :trigger="null"
      collapsible
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo">
        <img src="@/assets/logo.jpg" />
        <h1 v-if="!collapsed">{{ UnitName }}</h1>
      </div>

      <a-menu
        theme="dark"
        mode="inline"
        :selected-keys="[current]"
        @click="handleMenuClick"
      >
        <template v-for="item in mainMenu">
          <a-menu-item
            v-if="!item.children || item.children.length == 0"
            :key="item.name"
            :title="item.meta.title"
          >
            <a-icon :type="item.meta.icon"></a-icon>
            <span v-if="!collapsed">{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu
            v-else
            :key="item.name"
            :menu-info="item"
            :collapsed="collapsed"
          />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '256px' }">
      <a-layout-header
        class="header"
        :style="{ background: '#fff', padding: '0 24px 0 0' }"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <h2>{{ deftitle }}</h2>
        <user-menu  :name="name"></user-menu>
      </a-layout-header>

      <a-layout-content
        :style="{ height: '100%', overflow: 'auto', margin: '24px 24px 0px' }"
      >
        <router-view />
      </a-layout-content>

      <a-layout-footer style="text-align: center;padding: 8px 50px;">
        {{ footer }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import UserMenu from "./UserMenu";
import SubMenu from "./SubMenu.vue";

export default {
  components: {
    UserMenu,
    SubMenu,
  },
  data() {
    return {
      collapsed: false,
      current: "Workplace",
      deftitle: "HUIBUR",
      UnitName: "HUIBUR",
      mainMenu: [
        {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/index',
        meta: { title: '首页', keepAlive: true, icon: 'pic-center', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/index',
            name: 'Workplace',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '列表', icon: 'pic-center', keepAlive: true, permission: ['dashboard'] }
          },
        ]
      },
      ],
      footer: "Copyright © Tianjin Huibur Technology Co., Ltd All Rights Reserved.",
      name: "HHHHH",
    };
  },
  props: {
    title: {
      type: String,
      default: "合同履行监管信息管理系统",
      required: false,
    },
  },
  computed: {


  },
  created() {
  
  },

  mounted() {

  },
  watch: {
    $route(to, from) {
      this.current = to.name;
    },
  },
  methods: {
  

    handleMenuClick({ item, key, keyPath }) {

      console.log(key)
      this.current = key;

      //左侧导航
      this.$router.replace({ name: key, query: { title: item.title } });
    },
  },
};
</script>
<style lang="less">
#basiclayout {
  height: 100vh;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    height: 32px;
    margin: 16px;
    display: flex;
    align-items: center;

    img {
      width: 34px;
    }

    h1 {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      margin-left: 10px;
    }
  }
}
</style>
