<template>
  <transition name="fade">
    <div
      v-if="openingUserSettingPanel"
      class="top-1/2 flex flex-col left-1/2 bg-zinc-50 h-2/3 w-[36rem] absolute z-10 px-6 -translate-x-1/2 -translate-y-1/2 shadow-2xl max-w-[66vw]"
    >
      <div
        class="flex items-center justify-between py-3 border-b-[1px] border-zinc-500"
      >
        <div class="font-zinc-900 flex items-center space-x-3">
          <i class="ph-nut-fill" style="font-size: 32px"></i>
          <p class="libertinus-semibold text-2xl">Settings</p>
        </div>
        <button @click="toggleOpeningUserSettingPanel(false)">
          <i class="text-zinc-900 ph-x" style="font-size: 32px"></i>
        </button>
      </div>
      <div class="flex justify-between w-full py-6 space-x-12 overflow-hidden">
        <div class="h-fit relative">
          <img
            class="w-40 h-40 rounded-full"
            src="@/assets/images/Avatar.svg"
            alt="avatar"
          />
          <button
            class="text-zinc-900 transition-colors hover:bg-zinc-900/10 border-zinc-900 absolute bottom-0 right-0 flex items-center justify-center p-0.5 border-2 rounded-full"
          >
            <i class="ph-palette" style="font-size: 32px"></i>
          </button>
        </div>
        <div
          class="grow hide-scrollbar flex flex-col space-y-5 overflow-y-auto"
        >
          <div class="space-y-2">
            <div class="text-zinc-700 flex items-center space-x-2">
              <i class="ph-user-list-light" style="font-size: 24px"></i>
              <p class="text-base font-normal">Username</p>
            </div>
            <p class="libertinus-semibold text-zinc-900 text-2xl font-medium">
              {{ updateOptions.name }}
            </p>
          </div>
          <div class="space-y-2">
            <div class="text-zinc-700 flex items-center space-x-2">
              <i class="ph-key-light" style="font-size: 24px"></i>
              <p class="text-base font-normal">Password</p>
            </div>
            <p class="text-zinc-900 text-lg font-medium">*********</p>
          </div>
          <div class="w-full border-b-[1px] border-zinc-300"></div>
          <div class="group space-y-2">
            <div class="flex items-center justify-between">
              <div class="text-zinc-700 flex items-center space-x-2">
                <i class="ph-phone-light" style="font-size: 24px"></i>
                <p class="text-base font-normal">Phone</p>
              </div>
              <div
                class="flex items-center space-x-1 border-zinc-900 border-l-[1px] pl-2"
                v-show="editingStatus.phone"
              >
                <button
                  class="flex items-center justify-center"
                  @click="submitEditedInfo('phone')"
                >
                  <i
                    class="ph-upload-simple text-zinc-900"
                    style="font-size: 24px"
                  >
                  </i>
                </button>
                <button
                  class="flex items-center justify-center"
                  @click="reset('phone')"
                >
                  <i
                    class="ph-eraser text-zinc-900"
                    style="font-size: 24px"
                  ></i>
                </button>
              </div>
            </div>
            <LunarInput
              v-model:given-value="updateOptions.phone"
              @dblclick="toggleEditStatus('phone')"
              :disabled="!editingStatus.phone"
            >
            </LunarInput>
          </div>
          <div class="space-y-2">
            <div class="text-zinc-700 flex items-center space-x-2">
              <i class="ph-envelope-light" style="font-size: 24px"></i>
              <p class="text-base font-normal">Email</p>
            </div>
            <p class="text-zinc-900 libertinus-semibold text-lg font-medium">
              {{ updateOptions.email }}
            </p>
          </div>
          <div class="w-full border-b-[1px] border-zinc-300"></div>
          <div class="space-y-2">
            <div class="text-zinc-700 flex items-center space-x-2">
              <i
                class="ph-globe-hemisphere-west-light"
                style="font-size: 24px"
              ></i>
              <p class="text-base font-normal">Language</p>
            </div>
            <LunarSelector
              :selected-tap="selectedLanguage"
              :tap-options="languageOptions"
            ></LunarSelector>
          </div>
          <div class="w-full border-b-[1px] border-zinc-300"></div>
          <div class="space-y-2">
            <div class="text-zinc-700 flex items-center space-x-2">
              <i class="ph-paint-brush-broad-light" style="font-size: 24px"></i>
              <p class="text-base font-normal">Theme</p>
            </div>
            <LunarSelector
              :selected-tap="selectedTheme"
              :tap-options="themeOptions"
            ></LunarSelector>
          </div>
          <div class="w-full border-b-[1px] border-zinc-300"></div>
          <div class="text-zinc-700 flex items-center space-x-2">
            <i class="ph-warning-light" style="font-size: 24px"></i>
            <p class="text-base font-normal">Delete account</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, Transition, watch } from "vue";

import LunarSelector from "./LunarSelector.vue";

import { toggleUserSettingPanelKey } from "@/symbols/userSettingPanel";

import useUserStore from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

import type {
  IUserUpdateOptions,
  IUserEditingStatus,
  IUser,
} from "@/types/user";

import LunarInput from "./LunarInput.vue";

import { showTooltipKey } from "@/symbols/tooltip";
export default defineComponent({
  components: {
    LunarSelector,
    Transition,
    LunarInput,
  },
  setup() {
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    const updateOptions = reactive<IUserUpdateOptions>({});

    const languageOptions = reactive(["Chinese", "English"]);
    const selectedLanguage = "English";

    const themeOptions = reactive(["System", "Light", "Dark"]);
    const selectedTheme = "Light";

    const openingUserSettingPanel = inject("openingUserSettingPanel");
    const toggleOpeningUserSettingPanel =
      inject(toggleUserSettingPanelKey) ||
      (() => {
        console.log("missing toggleUserSettingKey");
      });

    watch(
      () => openingUserSettingPanel,
      () => {
        updateOptions.name = userInfo.value.name;
        updateOptions.password = userInfo.value.password;
        updateOptions.avatar = userInfo.value.avatar;
        updateOptions.gender = userInfo.value.gender;
        updateOptions.email = userInfo.value.email;
        updateOptions.phone = userInfo.value.phone;
      },
      { immediate: true }
    );

    const editingStatus = reactive<IUserEditingStatus>({
      name: false,
      password: false,
      phone: false,
      email: false,
      avatar: false,
    });

    const toggleEditStatus = (key: keyof IUserEditingStatus) => {
      console.log({ updateKey: key });

      editingStatus[key] = !editingStatus[key];
    };

    const showTooltip = inject(showTooltipKey);
    const submitEditedInfo = async (key: keyof IUserUpdateOptions) => {
      try {
        const res = await userStore.updateById(userInfo.value.id, {
          [key]: updateOptions[key],
        });
        if (showTooltip) {
          showTooltip(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const reset = (key: keyof IUserUpdateOptions) => {
      updateOptions[key] = userInfo.value[key];
    };
    return {
      languageOptions,
      selectedLanguage,
      themeOptions,
      selectedTheme,
      openingUserSettingPanel,
      toggleOpeningUserSettingPanel,
      userInfo,
      updateOptions,
      editingStatus,
      toggleEditStatus,
      submitEditedInfo,
      reset,
    };
  },
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
</style>
