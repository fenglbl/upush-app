const ENV_CONFIG = {
  dev: {
    baseUrl: 'http://127.0.0.1:3000'
  },
  prod: {
    baseUrl: 'http://110.185.163.31:3000'
  }
}

function resolveEnv() {
  // #ifdef H5
  return process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
  // #endif

  // #ifndef H5
  return __DEV__ ? 'dev' : 'prod'
  // #endif
}

const currentEnv = resolveEnv()
const currentConfig = ENV_CONFIG[currentEnv]

export function getEnv() {
  return currentEnv
}

export function getBaseUrl() {
  return currentConfig.baseUrl
}

export default currentConfig
