<template>
  <uv-navbar
    :title="title"
    :autoBack="autoBack"
    :leftIcon="showBack ? 'arrow-left' : ''"
    :placeholder="placeholder"
    :safeAreaInsetTop="safeAreaInsetTop"
    :bgColor="navBackgroundColor"
    :titleStyle="{ color: navTitleColor }"
    :leftIconColor="navTitleColor"
  ></uv-navbar>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    autoBack: {
      type: Boolean,
      default: true
    },
    showBack: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: Boolean,
      default: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    navBackgroundColor() {
      return this.theme === 'dark' ? '#0f1d2c' : '#f5f9ff'
    },
    navTitleColor() {
      return this.theme === 'dark' ? '#ffffff' : '#17324d'
    }
  }
}
</script>
