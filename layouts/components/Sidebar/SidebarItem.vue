<template>
  <div v-if="!item.hidden" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item) && !onlyOneChild&&!item.alwaysShow">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path,$event)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':true}">
          <item v-if="onlyOneChild.name" :icon="onlyOneChild.name" :title="onlyOneChild.name" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>

        <a v-else :href="child.path" :key="child.name" target="_blank" @click="clickLink(child.path,$event)">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { validateURL } from '@/assets/utils/validate'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children) {
      this.onlyOneChild = children
      return true;
      // const showingChildren = children.filter(item => {
      //   if (item.hidden) {
      //     return false
      //   } else {
      //     // temp set(will be used if only has one showing child )
      //     this.onlyOneChild = item
      //     return true
      //   }
      // })
      // if (showingChildren.length === 1) {
      //   return true
      // }
      // return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return validateURL(routePath)
    },
    clickLink(routePath, e) {
      if (!this.isExternalLink(routePath)) {
        e.preventDefault()
        const path = this.resolvePath(routePath)
        this.$router.push(path)
      }
    }
  }
}
</script>

