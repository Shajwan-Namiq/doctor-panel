<template>
  <div class="p-panelmenu p-component">
    <template v-for="(item, index) of model" :key="label(item) + '_' + index">
      <div
        v-if="visible(item)"
        :class="getPanelClass(item)"
        :style="item.style"
        v-can="item.can"
      >
        <div :class="getHeaderClass(item)" :style="item.style">
          <template v-if="!$slots.item">
            <router-link
              v-if="item.to && !disabled(item)"
              :to="item.to"
              :custom="true"
              v-slot="{ navigate, href, isActive }"
              :class="{
                'active-link': isActive,
              }"
            >
              <a
                :href="href"
                :class="
                  getHeaderLinkClass(item, {
                    isActive,
                  })
                "
                @click="onItemClick($event, item, navigate)"
                role="treeitem"
                style="display: flex; justify-content: start"
              >
                <div
                  style="display: flex; justify-content: start;height: 25px; overflow;: hidden; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                >
                  <ion-icon
                    v-if="item.icon"
                    :name="isActive ? item.icon : item.icon + '-outline'"
                    class="p-menuitem-icon"
                  ></ion-icon>
                  <div class="p-menu-header-text">
                    {{ $t(`routes.${item?.to?.name ?? item.label}`) }}
                  </div>
                </div>
              </a>
            </router-link>
            <a
              v-else
              :href="item.url"
              :class="getHeaderLinkClass(item)"
              @click="onItemClick($event, item)"
              @keydown="onItemKeydown($event, item)"
              :tabindex="disabled(item) ? null : '0'"
              :aria-expanded="isActive(item)"
              :id="ariaId + '_header_' + index"
              :aria-controls="ariaId + '_content_' + index"
            >
              <div class="flex justify-content-between w-full">
                <div
                  style="height: 25px; overflow;: hidden; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                  :style="
                    item.label == 'translation' && unTranslated
                      ? 'color:var(--danger-color-kubak)'
                      : ''
                  "
                >
                  <ion-icon
                    v-if="item.icon"
                    :name="isActive(item) ? item.icon : item.icon + '-outline'"
                    class="p-menuitem-icon"
                  ></ion-icon>
                  <span class="p-menuitem-text">{{
                    $t(`routes.${item?.to?.name ?? item.label}`)
                  }}</span>
                </div>
                <span
                  v-if="item.items"
                  :class="getPanelToggleIcon(item)"
                ></span>
              </div>
            </a>
          </template>
          <component v-else :is="$slots.item" :item="item"></component>
        </div>
        <transition name="p-toggleable-content">
          <div
            class="p-toggleable-content"
            v-show="isActive(item)"
            role="region"
            :id="ariaId + '_content_' + index"
            :aria-labelledby="ariaId + '_header_' + index"
          >
            <div class="p-panelmenu-content" v-if="item.items">
              <PanelMenuSub
                :model="item.items"
                class="p-panelmenu-root-submenu"
                :template="$slots.item"
                :expandedKeys="expandedKeys"
                @item-toggle="updateExpandedKeys"
                :exact="exact"
              />
            </div>
          </div>
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
// import { TranslationService } from "@/backend/transport";
import PanelMenuSub from "./PanelMenuSub.vue";
import { UniqueComponentId } from "primevue/utils";
import { useRoute } from "vue-router";
import { currentUser } from "@/stores/currentUser";
import { PolicyType } from "@/backend/wallet";

export default {
  name: "PanelMenu",
  emits: ["update:expandedKeys"],
  props: {
    model: {
      type: Array,
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
      clickedItem: false,
      unTranslated: false,
    };
  },

  mounted() {
    const route = useRoute();
    this.currentRouteName = route.name;
    const userProfileStore = currentUser();

    // if (userProfileStore.policies.includes(PolicyType.READ_TRANSLATION)) {
    // TranslationService.checkUnTranslated().then((Response) => {
    // this.unTranslated = Response;
    // });
    // }
  },
  methods: {
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

      this.updateExpandedKeys({
        item: item,
        expanded: this.activeItem != null,
      });

      if (item.to) {
        event.preventDefault();
        this.$router.push(item.to);
      }
    },
    onItemKeydown(event, item) {
      if (event.which === 13) {
        this.onItemClick(event, item);
      }
    },
    updateExpandedKeys(event) {
      if (this.expandedKeys) {
        const item = event.item;
        const _keys = { ...this.expandedKeys };

        if (event.expanded) _keys[item.key] = true;
        else delete _keys[item.key];

        this.$emit("update:expandedKeys", _keys);
      }
    },
    getPanelClass(item) {
      return ["p-panelmenu-panel", item.class];
    },
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
    getPanelIcon(item) {
      return ["p-menuitem-icon", item.icon];
    },
    getHeaderLinkClass(item, routerProps) {
      return [
        "p-panelmenu-header-link",
        {
          "router-link-active": routerProps && routerProps.isActive,
        },
      ];
    },
    isActive(item) {
      if (!this.activeItem) {
        if (!this.clickedItem) {
          for (const index in item.items) {
            if (item.items[index].to) {
              if (this.currentRouteName == item.items[index].to.name) {
                this.activeItem = item;
              }
            }
          }
        }
      }
      return this.expandedKeys
        ? this.expandedKeys[item.key]
        : item === this.activeItem;
    },
    getHeaderClass(item) {
      return [
        "p-component p-panelmenu-header",
        {
          "p-highlight": this.isActive(item),
          "p-disabled": this.disabled(item),
        },
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
  components: {
    PanelMenuSub: PanelMenuSub,
  },
  computed: {
    ariaId() {
      return UniqueComponentId();
    },
  },
};
</script>

<style lang="scss">
.p-panelmenu .p-panelmenu-header-link {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  position: relative;
  text-decoration: none;
}

.p-panelmenu .p-panelmenu-header-link:focus {
  z-index: 1;
}

.p-panelmenu .p-submenu-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.p-panelmenu .p-menuitem-link {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
}

.p-panelmenu .p-menuitem-text {
  line-height: 1;
}

.ltr {
  .p-panelmenu-panel {
    .router-link-active {
      color: #ed7f22 !important;
      border-left: 4px solid #ed7f22 !important;
    }

    .router-link-active-exact {
      * {
        font-weight: bold !important;
        color: #ed7f22 !important;
      }

      border-left: 4px solid #ed7f22;
    }

    .activeRoute {
      color: #ed7f22 !important;

      border-left: 3px solid #ed7f22;
    }
  }
}

.rtl {
  .p-panelmenu-panel {
    // background-color: antiquewhite;
    .router-link-active {
      color: #ed7f22 !important;
      border-right: 1px solid #ed7f22 !important;
    }

    .router-link-active-exact {
      * {
        font-weight: bold !important;
        color: #ed7f22 !important;
      }

      border-right: 1px solid #ed7f22;
    }

    .activeRoute {
      color: #ed7f22 !important;

      border-right: 3px solid #ed7f22;
    }
  }
}
</style>
