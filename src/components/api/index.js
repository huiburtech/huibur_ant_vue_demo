import request from '@/utils/request.js'

/**
 * 新增
 * @param data '{ }'
 * @returns {AxiosPromise}
 */
export function h_add (url, data) {
    return request({
        url: url,
        method: 'POST',
        data,
    })
}

/**
 * 编辑
 * @param data '{}'
 * @returns {AxiosPromise}
 */
export function h_edit (url, data, id) {
    return request({
        url: url + (id ? '/' + id : ''),
        method: 'PUT',
        data,
    })
}


/**
 * 删除
 * @param data '{}'
 * @returns {AxiosPromise}
 */
export function h_delete (url, id) {
    return request({
        url: url + (id ? '/' + id : ''),
        method: 'DELETE',
    })
}


/**
 * 获取列表
 * @param data '{}'
 * @returns {AxiosPromise}
 */
 export function h_getList (url, params) {
    return request({
        url: url,
        method: 'GET',
        params,
    })
}


/**
 * 获取详情
 * @param data '{}'
 * @returns {AxiosPromise}
 */
 export function h_getDetail (url, id) {
    return request({
        url: url + (id ? '/' + id : ''),
        method: 'GET'
    })
}


/**
 * 其他网络请求
 * @param data '{}'
 * @returns {AxiosPromise}
 */
 export function h_request (method, url, params, data, id) {
    return request({
        url: url+ (id ? '/' + id : ''),
        method: method,
        params,
        data
    })
}