<template>
    <a-sub-menu :key="menuInfo.name" v-bind="$props" v-on="$listeners">
        <span slot="title">
            <a-icon :type="menuInfo.meta.icon"></a-icon>
            <span v-if="!collapsed">{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children.filter(el => el.hidden != true)">
            <a-menu-item v-if="!item.children || item.children.length == 0" :key="item.name" :title="item.mName">
                <a-icon :type="item.meta.icon"></a-icon>
                <span v-if="!collapsed">{{ item.meta.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.name" :menu-info="item" />
        </template>
    </a-sub-menu>
</template>
<script>
import { Menu } from 'ant-design-vue'
export default {
    name: 'SubMenu',
    isSubMenu: true,
    data () {
      return {
 
      }
    },
    props: {
        ...Menu.SubMenu.props,
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
        collapsed: {
            type: Boolean
        }
    },
}
</script>