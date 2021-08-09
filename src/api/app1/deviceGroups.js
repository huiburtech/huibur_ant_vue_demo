import request from '@/utils/request.js'

const deviceGroupsApi = {
    add: '/deviceGroups',
    del: '/deviceGroups',
    update: '/deviceGroups',
    get: '/deviceGroups',
}

/**
 * 新增
 * @param data '{ " deviceGroupName": "水表"," deviceGroupDesc": "这个设备组是水表",}'
 * @returns {AxiosPromise}
 */
export function pushDeviceGroup (data) {
    return request({
        url: deviceGroupsApi.add,
        method: 'post',
        data,
    })
}

/**
 * 删除
 * @param params deviceGroupId
 * @returns { AxiosPromise }
 */
export function delDeviceGroups (params) {
    return request({
        url: deviceGroupsApi.del,
        method: 'DELETE',
        params,
    })
}

export function fetchDeviceGroups (params) {
    return request({
        url: deviceGroupsApi.get,
        method: 'GET',
      params,
    })
}
