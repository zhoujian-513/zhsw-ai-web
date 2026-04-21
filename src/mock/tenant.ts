import type { Tenant } from '@/store/modules/tenant'

export const MOCK_TENANT_LIST: Tenant[] = [
  {
    id: 'group',
    name: '智慧水务集团总部',
    shortName: '集团总览',
    type: 'group',
    contactPerson: '张总',
    contactPhone: '13800000001',
    status: 1
  },
  {
    id: 'gz',
    name: '广州水务有限公司',
    shortName: '广州水务',
    type: 'subsidiary',
    region: '广东省广州市',
    contactPerson: '李经理',
    contactPhone: '13800000002',
    status: 1
  },
  {
    id: 'sz',
    name: '深圳水务有限公司',
    shortName: '深圳水务',
    type: 'subsidiary',
    region: '广东省深圳市',
    contactPerson: '王经理',
    contactPhone: '13800000003',
    status: 1
  },
  {
    id: 'dg',
    name: '东莞水务有限公司',
    shortName: '东莞水务',
    type: 'subsidiary',
    region: '广东省东莞市',
    contactPerson: '陈经理',
    contactPhone: '13800000004',
    status: 1
  },
  {
    id: 'fs',
    name: '佛山水务有限公司',
    shortName: '佛山水务',
    type: 'subsidiary',
    region: '广东省佛山市',
    contactPerson: '刘经理',
    contactPhone: '13800000005',
    status: 1
  }
]

export function mockGetTenantList() {
  return MOCK_TENANT_LIST
}
