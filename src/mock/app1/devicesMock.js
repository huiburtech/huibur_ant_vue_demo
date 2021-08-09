// 设备组管理mock
import { getQueryParameters, iBuilder } from '@/mock/util.js'
import Mock from 'mockjs2'

// 增
Mock.mock(/\/api\/devices/, 'post', iBuilder({ data: true }))

// 删除
Mock.mock(/\/api\/devices/, 'delete', iBuilder({ data: true }))

// 改
Mock.mock(/\/api\/devices/, 'update', iBuilder({ data: true }))

// 查
const deviceList = (options) => {
    const parameters = getQueryParameters(options)
    console.log('Mock: get devices', parameters)
    const list = [
        {
            'deviceName': '设备1',
            'deviceSeries': '自来水',
            'deviceAddr': '天津市',
            'deviceGroupId': '1',
            'deviceDesc': '这是水表设备',
            'tryConnectTime': '30s',
            'longConnectTime': '60s',
            'commModeId': '1',
            'enabled': '1',
            'optimized': '0',
            'redundancy': '0',
        },
    ]

    const pageNo = parseInt(parameters.pageNo)
    const pageSize = parseInt(parameters.pageSize)
    const totalCount = list.length
    const totalPage = Math.ceil(totalCount / pageSize)
    return iBuilder({
        pageNo,
        pageSize,
        totalPage,
        totalCount,
        list: list,
    }, '删除成功', 200)
}
Mock.mock(/\/devices/, 'get', deviceList)
