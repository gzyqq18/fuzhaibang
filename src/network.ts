import Taro from '@tarojs/taro'

/**
 * 网络请求模块
 * 封装 Taro.request、Taro.uploadFile、Taro.downloadFile，自动添加项目域名前缀
 * 如果请求的 url 以 http:// 或 https:// 开头，则不会添加域名前缀
 *
 * IMPORTANT: 项目已经全局注入 PROJECT_DOMAIN
 * IMPORTANT: 除非你需要添加全局参数，如给所有请求加上 header，否则不能修改此文件
 */
export namespace Network {
    const createUrl = (url: string): string => {
        // 如果已经是完整的 URL，直接返回
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
        }

        // 如果 PROJECT_DOMAIN 已配置，使用它
        if (typeof PROJECT_DOMAIN !== 'undefined' && PROJECT_DOMAIN) {
            return `${PROJECT_DOMAIN}${url}`
        }

        // 在抖音云环境中，使用相对路径（小程序会自动处理）
        // 警告：确保后端服务在同一域名下
        console.warn('PROJECT_DOMAIN 未配置，使用相对路径，可能导致请求失败')
        return url
    }

    export const request: typeof Taro.request = option => {
        const finalUrl = createUrl(option.url)

        // 调试日志
        console.log('Network.request:', {
            url: option.url,
            finalUrl,
            method: option.method || 'GET',
            data: option.data,
        })

        return Taro.request({
            ...option,
            url: finalUrl,
        })
    }

    export const uploadFile: typeof Taro.uploadFile = option => {
        const finalUrl = createUrl(option.url)

        // 调试日志
        console.log('Network.uploadFile:', {
            url: option.url,
            finalUrl,
            name: option.name,
        })

        return Taro.uploadFile({
            ...option,
            url: finalUrl,
        })
    }

    export const downloadFile: typeof Taro.downloadFile = option => {
        const finalUrl = createUrl(option.url)

        // 调试日志
        console.log('Network.downloadFile:', {
            url: option.url,
            finalUrl,
        })

        return Taro.downloadFile({
            ...option,
            url: finalUrl,
        })
    }
}
