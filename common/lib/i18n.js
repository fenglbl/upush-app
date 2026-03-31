const SUPPORTED_LOCALES = ['zh', 'en']

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
      emailPlaceholder: '输入邮箱',
      emailCodePlaceholder: '输入邮箱验证码',
      passwordPlaceholder: '输入密码',
      confirmPasswordPlaceholder: '确认密码',
      hasAccount: '已有账号？',
      goLogin: '去登录',
      submit: '注册账号',
      usernameRequired: '请输入账号',
      emailRequired: '请输入邮箱',
      emailInvalid: '请输入正确的邮箱地址',
      emailCodeRequired: '请输入邮箱验证码',
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
      securityMemberName: '会员名',
      securityEmail: '邮箱',
      securityEmailDesc: '查看并修改当前绑定邮箱',
      securityEmailPageTitle: '修改邮箱',
      securityVerifyOldEmailPageTitle: '验证旧邮箱',
      securityVerifyOldEmailDesc: '请先验证当前绑定邮箱，再继续更换为新邮箱。',
      securityVerifyPasswordPageTitle: '验证邮箱并修改密码',
      securityVerifyPasswordDesc: '请先通过当前绑定邮箱验证，再继续修改登录密码。',
      securityVerifyCloseAccountPageTitle: '验证邮箱并注销账户',
      securityVerifyCloseAccountDesc: '请先通过当前绑定邮箱验证，再继续注销账户。',
      securityNewEmailPageTitle: '绑定新邮箱',
      securityNewEmailPageDesc: '旧邮箱验证通过后，请填写新邮箱并完成验证码验证。',
      securityPasswordPageTitle: '修改登录密码',
      securityPasswordPageDesc: '请输入新的登录密码并确认。',
      securityPasswordPlaceholder: '请输入新密码',
      securityConfirmPasswordPlaceholder: '请再次输入新密码',
      securityPasswordRequired: '请输入新密码',
      securityConfirmPasswordRequired: '请再次输入新密码',
      securityPasswordMin: '密码至少 6 位',
      securityPasswordMismatch: '两次密码输入不一致',
      securityPasswordChangeSuccessRelogin: '密码修改成功，请重新登录',
      securityCloseAccountPageTitle: '注销账户',
      securityCloseAccountPageDesc: '注销后将清除当前登录状态，请谨慎操作。',
      securityCloseAccountWarning: '危险操作：请输入 DELETE 以确认注销当前账户。注销后将无法直接恢复。',
      securityCloseAccountConfirmRequired: '请输入 DELETE 以确认注销',
      securityCloseAccountModalTitle: '再次确认注销',
      securityCloseAccountModalContent: '注销后将退出登录，且当前账户将不可继续使用。确认继续吗？',
      securityEmailCode: '邮箱验证码',
      securityChangePassword: '修改登录密码',
      securityChangePasswordDesc: '修改当前账号的登录密码',
      securityCloseAccount: '注销账户',
      securityCloseAccountDesc: '申请注销当前账户并清除登录状态',
      securityCurrentEmail: '当前邮箱',
      securityCurrentEmailPlaceholder: '请输入当前绑定的邮箱地址',
      securityNewEmail: '新邮箱',
      securityEmailPlaceholder: '请输入新的邮箱地址',
      securityOldEmailCodePlaceholder: '请输入旧邮箱验证码',
      securityNewEmailCodePlaceholder: '请输入新邮箱验证码',
      securitySendOldEmailCode: '发送验证码',
      securitySendNewEmailCode: '发送验证码',
      securityNextStep: '下一步',
      securitySaveEmail: '保存邮箱',
      securityEmailSaveSuccess: '邮箱已更新',
      emailCodeSent: '验证码已发送，测试环境固定为 123456',
      emailCodeInvalid: '邮箱验证码不正确',
      emailCodeRequired: '请输入邮箱验证码',
      oldEmailRequired: '请输入旧邮箱',
      oldEmailCodeRequired: '请输入旧邮箱验证码',
      newEmailCodeRequired: '请输入新邮箱验证码',
      oldEmailMismatch: '旧邮箱与当前绑定邮箱不一致',
      newEmailSameAsOld: '新邮箱不能与当前邮箱相同',
      changeEmailSessionInvalid: '旧邮箱验证状态无效，请重新验证旧邮箱',
      aboutGroup: '关于',
      aboutUpush: '关于 UPUSH',
      aboutUpushDesc: '了解版本信息、产品介绍与基础说明',
      aboutUpushPageTitle: '关于 UPUSH',
      aboutUpushPageDesc: '查看产品介绍、版本信息与项目说明',
      checkUpdate: '检测更新',
      checkUpdateDesc: '查看当前版本并检测是否有新版本',
      checkUpdatePageTitle: '检测更新',
      checkUpdatePageDesc: '查看当前版本并确认是否有新版本可用',
      updateLatest: '当前已是最新版本',
      updateAvailable: '发现新版本',
      updateFailed: '版本检测失败',
      currentVersionLabel: '当前版本',
      latestVersionLabel: '最新版本',
      forceUpdateLabel: '强制更新',
      userAgreement: '用户服务协议',
      userAgreementDesc: '查看平台服务条款与使用说明',
      userAgreementPageTitle: '用户服务协议',
      userAgreementPageDesc: '阅读平台服务条款、使用规范与说明',
      privacyPolicy: '隐私协议',
      privacyPolicyDesc: '查看个人信息收集、使用与保护说明',
      privacyPolicyPageTitle: '隐私协议',
      privacyPolicyPageDesc: '阅读隐私保护政策与个人信息处理说明',
      agreementLoadFailed: '协议加载失败',
      contactUs: '联系我们',
      contactUsDesc: '获取联系方式与商务合作信息',
      contactUsPageTitle: '联系我们',
      contactUsPageDesc: '查看邮箱、微信和其他联系渠道',
      feedback: '反馈意见',
      feedbackDesc: '提交你的建议、问题和体验反馈',
      feedbackPageTitle: '反馈意见',
      feedbackPageDesc: '告诉我们你的想法、问题与改进建议',
      feedbackType: '反馈类型',
      feedbackContact: '联系方式',
      feedbackContent: '意见内容',
      feedbackTypePlaceholder: '请选择反馈类型',
      feedbackContactPlaceholder: '请输入联系方式',
      feedbackContentPlaceholder: '请描述你遇到的问题或建议',
      feedbackTypeRequired: '请选择反馈类型',
      feedbackContactRequired: '请输入联系方式',
      feedbackContentRequired: '请输入意见内容',
      feedbackSubmit: '提交反馈',
      feedbackSubmitSuccess: '反馈已提交',
      feedbackTypeBug: '问题反馈',
      feedbackTypeSuggestion: '产品建议',
      feedbackTypeOther: '其他',
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
      emailPlaceholder: 'Enter email',
      emailCodePlaceholder: 'Enter email verification code',
      passwordPlaceholder: 'Enter password',
      confirmPasswordPlaceholder: 'Confirm password',
      hasAccount: 'Already have an account?',
      goLogin: 'Sign In',
      submit: 'Create Account',
      usernameRequired: 'Please enter username',
      emailRequired: 'Please enter email',
      emailInvalid: 'Please enter a valid email address',
      emailCodeRequired: 'Please enter the email verification code',
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
      securityMemberName: 'Member Name',
      securityEmail: 'Email',
      securityEmailDesc: 'View and update the current bound email',
      securityEmailPageTitle: 'Update Email',
      securityVerifyOldEmailPageTitle: 'Verify Old Email',
      securityVerifyOldEmailDesc: 'Verify your current bound email first, then continue to bind the new email.',
      securityVerifyPasswordPageTitle: 'Verify Email and Change Password',
      securityVerifyPasswordDesc: 'Verify your current bound email first, then continue to change the login password.',
      securityVerifyCloseAccountPageTitle: 'Verify Email and Close Account',
      securityVerifyCloseAccountDesc: 'Verify your current bound email first, then continue to close the account.',
      securityNewEmailPageTitle: 'Bind New Email',
      securityNewEmailPageDesc: 'After the old email is verified, enter the new email and complete verification.',
      securityPasswordPageTitle: 'Change Password',
      securityPasswordPageDesc: 'Enter the new login password and confirm it.',
      securityPasswordPlaceholder: 'Please enter the new password',
      securityConfirmPasswordPlaceholder: 'Please enter the new password again',
      securityPasswordRequired: 'Please enter the new password',
      securityConfirmPasswordRequired: 'Please enter the new password again',
      securityPasswordMin: 'Password must be at least 6 characters',
      securityPasswordMismatch: 'The two passwords do not match',
      securityPasswordChangeSuccessRelogin: 'Password changed successfully. Please sign in again.',
      securityCloseAccountPageTitle: 'Close Account',
      securityCloseAccountPageDesc: 'Closing the account will clear the current login state. Please proceed carefully.',
      securityCloseAccountWarning: 'Dangerous action: enter DELETE to confirm closing the current account. This action cannot be easily undone.',
      securityCloseAccountConfirmRequired: 'Please enter DELETE to confirm account closure',
      securityCloseAccountModalTitle: 'Confirm Account Closure Again',
      securityCloseAccountModalContent: 'Closing the account will sign you out, and the current account will no longer be available. Do you want to continue?',
      securityEmailCode: 'Email Code',
      securityChangePassword: 'Change Password',
      securityChangePasswordDesc: 'Change the login password of the current account',
      securityCloseAccount: 'Close Account',
      securityCloseAccountDesc: 'Request account closure and clear sign-in status',
      securityCurrentEmail: 'Current Email',
      securityCurrentEmailPlaceholder: 'Please enter the current bound email address',
      securityNewEmail: 'New Email',
      securityEmailPlaceholder: 'Please enter a new email address',
      securityOldEmailCodePlaceholder: 'Please enter the old email verification code',
      securityNewEmailCodePlaceholder: 'Please enter the new email verification code',
      securitySendOldEmailCode: 'Send Code',
      securitySendNewEmailCode: 'Send Code',
      securityNextStep: 'Next',
      securitySaveEmail: 'Save Email',
      securityEmailSaveSuccess: 'Email updated',
      emailCodeSent: 'Verification code sent, fixed as 123456 in test mode',
      emailCodeInvalid: 'The email verification code is incorrect',
      emailCodeRequired: 'Please enter the email verification code',
      oldEmailRequired: 'Please enter the old email',
      oldEmailCodeRequired: 'Please enter the old email verification code',
      newEmailCodeRequired: 'Please enter the new email verification code',
      oldEmailMismatch: 'The old email does not match the current bound email',
      newEmailSameAsOld: 'The new email cannot be the same as the current email',
      changeEmailSessionInvalid: 'The old email verification session is invalid. Please verify the old email again.',
      aboutGroup: 'About',
      aboutUpush: 'About UPUSH',
      aboutUpushDesc: 'Learn about version info, product intro and basic details',
      aboutUpushPageTitle: 'About UPUSH',
      aboutUpushPageDesc: 'View product intro, version info and project details',
      checkUpdate: 'Check for Updates',
      checkUpdateDesc: 'View current version and check for a new version',
      checkUpdatePageTitle: 'Check for Updates',
      checkUpdatePageDesc: 'View the current version and check for available updates',
      updateLatest: 'You are already on the latest version',
      updateAvailable: 'New version available',
      updateFailed: 'Version check failed',
      currentVersionLabel: 'Current Version',
      latestVersionLabel: 'Latest Version',
      forceUpdateLabel: 'Force Update',
      userAgreement: 'User Agreement',
      userAgreementDesc: 'Read service terms and usage details',
      userAgreementPageTitle: 'User Agreement',
      userAgreementPageDesc: 'Read service terms, usage rules and related details',
      privacyPolicy: 'Privacy Policy',
      privacyPolicyDesc: 'Read how personal data is collected, used and protected',
      privacyPolicyPageTitle: 'Privacy Policy',
      privacyPolicyPageDesc: 'Read the privacy policy and personal data processing details',
      agreementLoadFailed: 'Failed to load agreement',
      contactUs: 'Contact Us',
      contactUsDesc: 'Get contact details and business cooperation info',
      contactUsPageTitle: 'Contact Us',
      contactUsPageDesc: 'View email, WeChat and other contact channels',
      feedback: 'Feedback',
      feedbackDesc: 'Send your suggestions, issues and experience feedback',
      feedbackPageTitle: 'Feedback',
      feedbackPageDesc: 'Tell us your ideas, issues and improvement suggestions',
      feedbackType: 'Feedback Type',
      feedbackContact: 'Contact',
      feedbackContent: 'Content',
      feedbackTypePlaceholder: 'Please choose a feedback type',
      feedbackContactPlaceholder: 'Please enter your contact information',
      feedbackContentPlaceholder: 'Please describe your issue or suggestion',
      feedbackTypeRequired: 'Please choose a feedback type',
      feedbackContactRequired: 'Please enter your contact information',
      feedbackContentRequired: 'Please enter your feedback content',
      feedbackSubmit: 'Submit Feedback',
      feedbackSubmitSuccess: 'Feedback submitted',
      feedbackTypeBug: 'Issue',
      feedbackTypeSuggestion: 'Suggestion',
      feedbackTypeOther: 'Other',
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

function normalizeLocaleTag(localeTag) {
  if (!localeTag) {
    return 'en'
  }

  const normalizedTag = String(localeTag).replace(/_/g, '-').toLowerCase()
  const [primaryLanguage] = normalizedTag.split('-')

  if (SUPPORTED_LOCALES.includes(primaryLanguage)) {
    return primaryLanguage
  }

  return 'en'
}

function getSystemLocale() {
  const systemInfo = uni.getSystemInfoSync()
  const localeTag = systemInfo.appLanguage || systemInfo.osLanguage || systemInfo.hostLanguage || systemInfo.language || ''
  return normalizeLocaleTag(localeTag)
}

function getDefaultLocale() {
  return getSystemLocale()
}

function resolveMessage(locale, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), messages[locale])
}

export function getLocale() {
  const savedLocaleMode = uni.getStorageSync('appLocaleMode') || uni.getStorageSync('appLocale')
  const localeMode = ['system', 'zh', 'en'].includes(savedLocaleMode) ? savedLocaleMode : 'system'
  const systemLocale = getSystemLocale()
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
  const systemLocale = getSystemLocale()
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
