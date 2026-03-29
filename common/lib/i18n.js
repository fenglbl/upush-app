const messages = {
  zh: {
    common: {
      appName: 'upush',
      followSystem: '跟随系统',
      loading: '数据加载中',
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
      settingDesc: '  '
    },
    login: {
      navTitle: '登录',
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
      navTitle: '注册',
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
      navTitle: '首页',
      title: '消息中心',
      subtitle: '实时查看设备接收到的推送消息',
      currentUserId: '当前用户 ID',
      tapToCopy: '点击复制',
      emptyTitle: '当前未登录',
      emptyDesc: '登录后可查看推送消息记录，并实时接收新的消息提醒。'
    },
    mine: {
      navTitle: '我的',
      title: '我的',
      subtitle: '管理账号信息、语言和登录状态',
      nickname: '昵称',
      username: '账号',
      userId: '用户 ID',
      languageLabel: '当前语言',
      accountInfo: '账号信息',
      settingEntry: '设置',
      settingHint: '主题、语言与个性化偏好',
      loginHint: '登录后可查看完整账号信息',
      logoutSuccess: '已退出登录'
    },
    setting: {
      title: '设置',
      subtitle: '统一管理设置偏好',
      userGroup: '用户信息',
      profileTitle: '个人资料',
      profileDesc: '查看和编辑昵称、头像等资料',
      profilePageTitle: '个人资料',
      profilePageDesc: '这里将用于管理昵称、头像和基础资料',
      profileNickname: '昵称',
      profileUsername: '账号',
      profileUserId: '用户 ID',
      profileAvatar: '头像标识',
      profileNicknamePlaceholder: '请输入昵称',
      profileSave: '保存资料',
      profileSaveSuccess: '资料已更新',
      securityTitle: '账户安全',
      securityDesc: '密码、设备登录与安全设置',
      securityPageTitle: '账户安全',
      securityPageDesc: '这里将用于管理密码、设备和安全设置',
      aboutGroup: '关于',
      aboutUpush: '关于 UPUSH',
      aboutUpushDesc: '了解版本信息、产品介绍与基础说明',
      aboutUpushPageTitle: '关于 UPUSH',
      aboutUpushPageDesc: '查看产品介绍、版本信息与项目说明',
      checkUpdate: '检测更新',
      checkUpdateDesc: '查看当前版本并检测是否有新版本',
      checkUpdatePageTitle: '检测更新',
      checkUpdatePageDesc: '查看当前版本并确认是否有新版本可用',
      userAgreement: '用户服务协议',
      userAgreementDesc: '查看平台服务条款与使用说明',
      userAgreementPageTitle: '用户服务协议',
      userAgreementPageDesc: '阅读平台服务条款、使用规范与说明',
      contactUs: '联系我们',
      contactUsDesc: '获取联系方式与商务合作信息',
      contactUsPageTitle: '联系我们',
      contactUsPageDesc: '查看邮箱、微信和其他联系渠道',
      feedback: '反馈意见',
      feedbackDesc: '提交你的建议、问题和体验反馈',
      feedbackPageTitle: '反馈意见',
      feedbackPageDesc: '告诉我们你的想法、问题与改进建议',
      logoutEntry: '退出登录',
      logoutEntryDesc: '退出当前账号并返回未登录状态',
      logoutSuccess: '已退出登录',
      logoutConfirmTitle: '退出登录',
      logoutConfirmContent: '确认退出当前账号吗？',
      preferenceGroup: '偏好设置',
      themeTitle: '外观模式',
      themeDesc: '切换日间模式或夜间模式',
      languageTitle: '界面语言',
      languageDesc: '切换中文或英文界面',
      appearancePageTitle: '外观模式',
      languagePageTitle: '界面语言',
      dark: '夜间模式',
      light: '日间模式',
      chinese: '中文',
      english: '英文'
    }
  },
  en: {
    common: {
      appName: 'upush',
      followSystem: 'Follow System',
      loading: 'Loading data',
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
      navTitle: 'Sign In',
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
      navTitle: 'Register',
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
      navTitle: 'Home',
      title: 'Message Center',
      subtitle: 'Check push messages received by this device in real time',
      currentUserId: 'Current User ID',
      tapToCopy: 'Tap to copy',
      emptyTitle: 'Not signed in',
      emptyDesc: 'Sign in to view push history and receive new message alerts in real time.'
    },
    mine: {
      navTitle: 'Profile',
      title: 'Profile',
      subtitle: 'Manage account info, language and sign-in status',
      nickname: 'Nickname',
      username: 'Username',
      userId: 'User ID',
      languageLabel: 'Current Language',
      accountInfo: 'Account Info',
      settingEntry: 'Settings',
      settingHint: 'Theme, language and personal preferences',
      loginHint: 'Sign in to view full account information',
      logoutSuccess: 'Signed out'
    },
    setting: {
      title: 'Settings',
      subtitle: 'Unified management settings preferences',
      userGroup: 'User Info',
      profileTitle: 'Profile',
      profileDesc: 'View and edit nickname, avatar and profile details',
      profilePageTitle: 'Profile',
      profilePageDesc: 'This page will manage nickname, avatar and profile details',
      profileNickname: 'Nickname',
      profileUsername: 'Username',
      profileUserId: 'User ID',
      profileAvatar: 'Avatar Badge',
      profileNicknamePlaceholder: 'Enter nickname',
      profileSave: 'Save Profile',
      profileSaveSuccess: 'Profile updated',
      securityTitle: 'Account Security',
      securityDesc: 'Password, device sign-in and security settings',
      securityPageTitle: 'Account Security',
      securityPageDesc: 'This page will manage password, devices and security settings',
      aboutGroup: 'About',
      aboutUpush: 'About UPUSH',
      aboutUpushDesc: 'Learn about version info, product intro and basic details',
      aboutUpushPageTitle: 'About UPUSH',
      aboutUpushPageDesc: 'View product intro, version info and project details',
      checkUpdate: 'Check for Updates',
      checkUpdateDesc: 'View current version and check for a new version',
      checkUpdatePageTitle: 'Check for Updates',
      checkUpdatePageDesc: 'View the current version and check for available updates',
      userAgreement: 'User Agreement',
      userAgreementDesc: 'Read service terms and usage details',
      userAgreementPageTitle: 'User Agreement',
      userAgreementPageDesc: 'Read service terms, usage rules and related details',
      contactUs: 'Contact Us',
      contactUsDesc: 'Get contact details and business cooperation info',
      contactUsPageTitle: 'Contact Us',
      contactUsPageDesc: 'View email, WeChat and other contact channels',
      feedback: 'Feedback',
      feedbackDesc: 'Send your suggestions, issues and experience feedback',
      feedbackPageTitle: 'Feedback',
      feedbackPageDesc: 'Tell us your ideas, issues and improvement suggestions',
      logoutEntry: 'Sign Out',
      logoutEntryDesc: 'Sign out of the current account and return to guest mode',
      logoutSuccess: 'Signed out',
      logoutConfirmTitle: 'Sign Out',
      logoutConfirmContent: 'Are you sure you want to sign out of this account?',
      preferenceGroup: 'Preferences',
      themeTitle: 'Appearance',
      themeDesc: 'Switch between light mode and dark mode',
      languageTitle: 'Interface Language',
      languageDesc: 'Switch between Chinese and English',
      appearancePageTitle: 'Appearance',
      languagePageTitle: 'Language',
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
  const savedLocaleMode = uni.getStorageSync('appLocaleMode') || uni.getStorageSync('appLocale')
  const localeMode = ['system', 'zh', 'en'].includes(savedLocaleMode) ? savedLocaleMode : 'system'
  const systemLocale = getDefaultLocale()
  const locale = localeMode === 'system' ? systemLocale : localeMode
  uni.setStorageSync('appLocaleMode', localeMode)
  uni.setStorageSync('appLocale', locale)
  return locale
}

export function setLocale(locale) {
  const nextLocale = locale === 'en' ? 'en' : 'zh'
  uni.setStorageSync('appLocaleMode', nextLocale)
  uni.setStorageSync('appLocale', nextLocale)
  return nextLocale
}

export function setLocaleMode(localeMode) {
  const nextMode = ['system', 'zh', 'en'].includes(localeMode) ? localeMode : 'system'
  const systemLocale = getDefaultLocale()
  const locale = nextMode === 'system' ? systemLocale : nextMode
  uni.setStorageSync('appLocaleMode', nextMode)
  uni.setStorageSync('appLocale', locale)
  return locale
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
