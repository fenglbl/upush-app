export function getSystemTheme() {
  const systemInfo = uni.getSystemInfoSync()
  return systemInfo.hostTheme === 'dark' || systemInfo.theme === 'dark' ? 'dark' : 'light'
}

export function getThemeMode() {
  const savedTheme = uni.getStorageSync('appThemeMode') || uni.getStorageSync('appTheme')
  return ['system', 'light', 'dark'].includes(savedTheme) ? savedTheme : (savedTheme || 'system')
}

export function resolveTheme(mode = getThemeMode()) {
  return mode === 'system' ? getSystemTheme() : mode
}

export function syncStoredTheme() {
  const themeMode = getThemeMode()
  const theme = resolveTheme(themeMode)
  uni.setStorageSync('appThemeMode', themeMode)
  uni.setStorageSync('appTheme', theme)
  return {
    themeMode,
    theme
  }
}
