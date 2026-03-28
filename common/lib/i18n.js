const messages = {
  zh: {
    common: {
      appName: 'upush',
      darkMode: '夜间模式',
      lightMode: '日间模式',
      theme: '主题',
      loadingAll: '已加载全部数据',
      networkError: '网络异常',
      goLogin: '去登录',
      tabHome: '首页',
      tabMine: '我的',
      language: '语言',
      logout: '退出登录',
      setting: '设置',
      settingDesc: '统一管理主题和语言偏好'
    },
    login: {
      eyebrow: '消息直达',
      title: '欢迎登录',
      subtitle: '统一管理设备接收、推送消息与消息列表。',
      usernamePlaceholder: '输入账号',
      passwordPlaceholder: '输入密码',
      noAccount: '还没有账号？',
      register: '注册',
      submit: '登录',
      usernameRequired: '请输入账号',
      passwordRequired: '请输入密码'
    },
    register: {
      eyebrow: '创建账号',
      title: '欢迎注册',
      subtitle: '填写基础信息后即可创建 upush 账号并返回登录。',
      usernamePlaceholder: '输入账号',
      passwordPlaceholder: '输入密码',
      confirmPasswordPlaceholder: '确认密码',
      hasAccount: '已有账号？',
      goLogin: '去登录',
      submit: '注册账号',
      usernameRequired: '请输入账号',
      passwordRequired: '请输入密码',
      passwordMin: '密码至少 6 位',
      confirmPasswordRequired: '请确认密码',
      passwordMismatch: '两次密码不一致',
      success: '注册成功'
    },
    home: {
      title: '消息中心',
      subtitle: '实时查看设备接收到的推送消息',
      currentUserId: '当前用户 ID',
      emptyTitle: '当前未登录',
      emptyDesc: '登录后可查看推送消息记录，并实时接收新的消息提醒。'
    },
    mine: {
      title: '我的',
      subtitle: '管理账号信息、语言和登录状态',
      nickname: '昵称',
      username: '账号',
      userId: '用户 ID',
      languageLabel: '当前语言',
      settingEntry: '设置',
      settingHint: '主题、语言与个性化偏好',
      loginHint: '登录后可查看完整账号信息',
      logoutSuccess: '已退出登录'
    },
    setting: {
      title: '设置',
      subtitle: '在这里统一管理界面偏好',
      themeTitle: '外观模式',
      themeDesc: '切换日间模式或夜间模式',
      languageTitle: '界面语言',
      languageDesc: '切换中文或英文界面',
      dark: '夜间模式',
      light: '日间模式',
      chinese: '中文',
      english: '英文'
    }
  },
  en: {
    common: {
      appName: 'upush',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      theme: 'Theme',
      loadingAll: 'All data loaded',
      networkError: 'Network error',
      goLogin: 'Sign In',
      tabHome: 'Home',
      tabMine: 'Me',
      language: 'Language',
      logout: 'Sign Out',
      setting: 'Settings',
      settingDesc: 'Manage theme and language preferences in one place'
    },
    login: {
      eyebrow: 'Instant Reach',
      title: 'Welcome Back',
      subtitle: 'Manage device delivery, push messages and message feeds in one place.',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      noAccount: "Don't have an account?",
      register: 'Register',
      submit: 'Sign In',
      usernameRequired: 'Please enter username',
      passwordRequired: 'Please enter password'
    },
    register: {
      eyebrow: 'Create Account',
      title: 'Join upush',
      subtitle: 'Fill in the basics to create your upush account and return to sign in.',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      confirmPasswordPlaceholder: 'Confirm password',
      hasAccount: 'Already have an account?',
      goLogin: 'Sign In',
      submit: 'Create Account',
      usernameRequired: 'Please enter username',
      passwordRequired: 'Please enter password',
      passwordMin: 'Password must be at least 6 characters',
      confirmPasswordRequired: 'Please confirm password',
      passwordMismatch: 'Passwords do not match',
      success: 'Registration successful'
    },
    home: {
      title: 'Message Center',
      subtitle: 'Check push messages received by this device in real time',
      currentUserId: 'Current User ID',
      emptyTitle: 'Not signed in',
      emptyDesc: 'Sign in to view push history and receive new message alerts in real time.'
    },
    mine: {
      title: 'Profile',
      subtitle: 'Manage account info, language and sign-in status',
      nickname: 'Nickname',
      username: 'Username',
      userId: 'User ID',
      languageLabel: 'Current Language',
      settingEntry: 'Settings',
      settingHint: 'Theme, language and personal preferences',
      loginHint: 'Sign in to view full account information',
      logoutSuccess: 'Signed out'
    },
    setting: {
      title: 'Settings',
      subtitle: 'Manage your interface preferences here',
      themeTitle: 'Appearance',
      themeDesc: 'Switch between light mode and dark mode',
      languageTitle: 'Interface Language',
      languageDesc: 'Switch between Chinese and English',
      dark: 'Dark Mode',
      light: 'Light Mode',
      chinese: 'Chinese',
      english: 'English'
    }
  }
}

function getDefaultLocale() {
  const savedLocale = uni.getStorageSync('appLocale')
  if (savedLocale === 'zh' || savedLocale === 'en') {
    return savedLocale
  }

  const systemInfo = uni.getSystemInfoSync()
  const language = (systemInfo.language || '').toLowerCase()
  return language.startsWith('zh') ? 'zh' : 'en'
}

function resolveMessage(locale, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), messages[locale])
}

export function getLocale() {
  const locale = getDefaultLocale()
  uni.setStorageSync('appLocale', locale)
  return locale
}

export function setLocale(locale) {
  const nextLocale = locale === 'en' ? 'en' : 'zh'
  uni.setStorageSync('appLocale', nextLocale)
  return nextLocale
}

export function t(path, locale) {
  const currentLocale = locale || getLocale()
  return resolveMessage(currentLocale, path) || path
}

export function applyTabBarI18n(locale) {
  const currentLocale = locale || getLocale()
  const items = [
    { index: 0, text: t('common.tabHome', currentLocale) },
    { index: 1, text: t('common.tabMine', currentLocale) }
  ]

  items.forEach((item) => {
    uni.setTabBarItem({
      index: item.index,
      text: item.text
    })
  })
}

export function applyTabBarTheme(theme) {
  const currentTheme = theme === 'dark' ? 'dark' : 'light'
  const style = currentTheme === 'dark'
    ? {
        color: '#8fa2b8',
        selectedColor: '#54b2ff',
        backgroundColor: '#132638',
        borderStyle: 'white'
      }
    : {
        color: '#7f8fa4',
        selectedColor: '#1c8ef5',
        backgroundColor: '#ffffff',
        borderStyle: 'black'
      }

  uni.setTabBarStyle(style)
}
