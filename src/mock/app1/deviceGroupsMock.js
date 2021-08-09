// 设备组管理mock
import { getQueryParameters, iBuilder } from '@/mock/util.js'
import Mock from 'mockjs2'

// 增
Mock.mock(/\/api\/deviceGroups/, 'post', iBuilder({ data: true }))

// 删除
Mock.mock(/\/api\/deviceGroups/, 'delete', iBuilder({ data: true }))

// 改
Mock.mock(/\/api\/deviceGroups/, 'update', iBuilder({ data: true }))

// 查
const deviceGroupList = (options) => {
  const parameters = getQueryParameters(options)
  console.log('Mock: get deviceGroups', parameters)
  const list = [
    {
      'deviceGroupId': 1,
      'deviceGroupName': '水表',
      'deviceGroupDesc': '这个设备组是水表',
      'deviceNum': 2,
      'addTime': '2021-7-29 10:00:00',
      'status': '1',
      'appId': 1
    }, {
      'deviceGroupId': 2,
      'deviceGroupName': '水表',
      'deviceGroupDesc': '这个设备组是水表',
      'deviceNum': 2,
      'addTime': '2021-7-29 10:00:00',
      'status': '1',
      'appId': 1
    },
    {
      'deviceGroupId': 3,
      'deviceGroupName': '水表',
      'deviceGroupDesc': '这个设备组是水表',
      'deviceNum': 2,
      'addTime': '2021-7-29 10:00:00',
      'status': '1',
      'appId': 1
    },
    {
      'deviceGroupId': 4,
      'deviceGroupName': '水表',
      'deviceGroupDesc': '这个设备组是水表',
      'deviceNum': 2,
      'addTime': '2021-7-29 10:00:00',
      'status': '1',
      'appId': 1
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
Mock.mock(/\/deviceGroups/, 'get', deviceGroupList)
