<template>
  <ul class="p-submenu-list" role="tree">
    <template v-for="(item, i) of model" :key="label(item) + i.toString()">
      <li
        role="none"
        :class="[getItemClass(item), isActive(item) ? 'activePanelMenu' : '']"
        :style="item.style"
        v-if="visible(item) && !item.separator"
        v-can="item.can"
      >
        <template v-if="!template">
          <router-link
            v-if="item.to && !disabled(item)"
            :to="item.to"
            custom
            v-slot="{ navigate, href, isActive: isRouterActive, isExactActive }"
          >
            <a
              :href="href"
              :class="
                linkClass(item, { isActive: isRouterActive, isExactActive })
              "
              @click="onItemClick($event, item, navigate)"
              role="treeitem"
              :aria-expanded="isActive(item)"
              class="flex justify-content-between"
            >
              <div
                style="height: 25px; overflow;: hidden; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
              >
                <span v-if="item.icon">
                  <ion-icon
                    :name="item.icon"
                    class="text-xs text-gray-600 ml-2"
                  ></ion-icon>
                </span>
                <span class="p-menuitem-text">{{
                  $t(`routes.${item?.to?.name ?? item.label}`)
                }}</span>
              </div>
              <span v-if="item.items" :class="getPanelToggleIcon(item)"></span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :class="linkClass(item)"
            :target="item.target"
            @click="onItemClick($event, item)"
            @keydown="onItemKeydown($event, item)"
            role="treeitem"
            :aria-expanded="isActive(item)"
            :tabindex="disabled(item) ? null : '0'"
          >
            <div class="flex justify-content-between">
              <div class="">
                <span
                  :class="['p-menuitem-icon', item.icon]"
                  v-if="item.icon"
                ></span>
                <span class="p-menuitem-text">{{
                  $t(`routes.${item?.to?.name ?? item.label}`)
                }}</span>
              </div>
              <span :class="getSubmenuIcon(item)" v-if="item.items"></span>
            </div>
          </a>
        </template>
        <component v-else :is="template" :item="item"></component>
        <transition name="p-toggleable-content">
          <div class="p-toggleable-content" v-show="isActive(item)">
            <PanelMenuSub
              :model="item.items"
              v-if="visible(item) && item.items"
              :key="label(item) + '_sub_'"
              :template="template"
              :expandedKeys="expandedKeys"
              @item-toggle="$emit('item-toggle', $event)"
              :exact="exact"
            />
          </div>
        </transition>
      </li>
      <li
        :class="['p-menu-separator', item.class]"
        :style="item.style"
        v-if="visible(item) && item.separator"
        :key="'separator' + i.toString()"
      ></li>
    </template>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "PanelMenuSub",
  emits: ["item-toggle"],
  props: {
    model: {
      type: null,
      default: null,
    },
    template: {
      type: Function,
      default: null,
    },
    expandedKeys: {
      type: null,
      default: null,
    },
    exact: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeItem: null,
      currentRouteName: "",
      route: useRoute(),
      clickedItem: false,
    };
  },

  mounted() {
    // const route = useRoute();
    this.currentRouteName = this.route.name;
  },
  methods: {
    getPanelToggleIcon(item) {
      const currentDirection = localStorage.getItem("direction");
      const active = this.isActive(item);
      return [
        "p-panelmenu-icon pi",
        {
          "pi-chevron-right": !active && currentDirection == "ltr",
          "pi-chevron-left": !active && currentDirection == "rtl",

          " pi-chevron-down": active,
        },
      ];
    },
    onItemClick(event, item, navigate) {
      this.clickedItem = true;
      if (this.isActive(item) && this.activeItem === null) {
        this.activeItem = item;
      }

      if (this.disabled(item)) {
        event.preventDefault();
        return;
      }

      if (item.command) {
        item.command({
          originalEvent: event,
          item: item,
        });
      }

      if (this.activeItem && this.activeItem === item) this.activeItem = null;
      else this.activeItem = item;

      this.$emit("item-toggle", {
        item: item,
        expanded: this.activeItem != null,
      });

      if (item.to && navigate) {
        navigate(event);
      }
    },
    onItemKeydown(event, item) {
      if (event.which === 13) {
        this.onItemClick(event, item);
      }
    },
    getItemClass(item) {
      return ["p-menuitem", item.className];
    },
    linkClass(item, routerProps) {
      return [
        "p-menuitem-link",
        {
          "p-disabled": this.disabled(item),
          "router-link-active":
            routerProps && routerProps.isActive && !item.items,
          "subMenu-active-header": routerProps && routerProps.isActive,
          "router-link-active-exact":
            this.exact &&
            routerProps &&
            routerProps.isExactActive &&
            !item.items,
        },
      ];
    },
    isActive(item) {
      if (!this.clickedItem) {
        if (this.route.name) {
          this.currentRouteName = this.route.name;
        }
        for (const index in item.items) {
          if (item.items[index].to) {
            if (this.currentRouteName == item.items[index].to.name) {
              this.activeItem = item;
            }
          }
        }
      }
      return this.expandedKeys
        ? this.expandedKeys[item.key]
        : item === this.activeItem;
    },
    getSubmenuIcon(item) {
      const active = this.isActive(item);
      return [
        "p-panelmenu-icon pi pi-fw",
        { "pi-angle-right": !active, "pi-angle-down": active },
      ];
    },
    visible(item) {
      return typeof item.visible === "function"
        ? item.visible()
        : item.visible !== false;
    },
    disabled(item) {
      return typeof item.disabled === "function"
        ? item.disabled()
        : item.disabled;
    },
    label(item) {
      return typeof item.label === "function" ? item.label() : item.label;
    },
  },
};
</script>
<style lang="scss">
.p-submenu-list {
  width: 100% !important;
}
.subMenu-active-header {
  // border-radius: 5px !important;
  background-color: #e9ecef;
}
.subMenu-active-header {
  background-color: transparent !important;
}
.rtl {
  .p-panelmenu
    .p-panelmenu-content
    .p-submenu-list:not(.p-panelmenu-root-submenu) {
    // padding: 10px 30px;
    li {
      border-right: 1px solid var(--border-color-kubak);
    }
  }
}
.ltr {
  .p-panelmenu
    .p-panelmenu-content
    .p-submenu-list:not(.p-panelmenu-root-submenu) {
    // padding: 10px 30px;
    li {
      border-left: 1px solid var(--border-color-kubak);
    }
  }
}
</style>
