import request from '@/utils/request.js'

const devicesApi = {
    add: '/devices',
    del: '/devices',
    put: '/devices/:deviceId',
    get: '/devices',
}
/**
 * 新增
 * @param data
 * @returns {AxiosPromise}
 */
export function pushDevice (data) {
    return request({
        url: devicesApi.add,
        method: 'post',
        data,
    })
}
/**
 * 删除
 * @param params deviceId
 * @returns { AxiosPromise }
 */
export function delDevices (params) {
    return request({
        url: devicesApi.del,
        method: 'DELETE',
        params,
    })
}
/**
 * 编辑
 * @param params deviceId
 * @returns { AxiosPromise }
 */
export function eachDevices (params) {
    return request({
        url: devicesApi.put,
        method: 'PUT',
      params,
    })
}

export function fetchDevices (params) {
    return request({
        url: devicesApi.get,
        method: 'GET',
      params,
    })
}
