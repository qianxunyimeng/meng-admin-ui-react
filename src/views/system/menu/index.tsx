import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RetweetOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  type FormProps,
  TreeSelect,
  Radio,
  InputNumber,
  message,
  Table,
  TableColumnsType,
  Space,
  Modal,
} from 'antd'
import { CreateFormModalProps, MenuModel, SearchFormField } from './type'
import { useMemo, useState } from 'react'
import BaseFormModal from '@/components/common/form-modal'
import {
  deleteMenuById,
  getMenuById,
  getMenuListApi,
  insertMenuApi,
  updateMenuApi,
} from '@/api/system/menu'
import { buildTreeFromArray } from '@/utils/tree'
import { useQuery } from '@tanstack/react-query'

const InitFormData: MenuModel = {
  parentId: 0,
  menuType: 'M',
  menuName: '',
  viewType: '1',
  sort: 0,
  visible: '1',
  status: '1',
  path: '',
}

const CreateMenuModal: React.FC<CreateFormModalProps> = (props) => {
  const [form] = Form.useForm()

  const { data } = useQuery({
    queryKey: ['sys-menu', 'menu', 'get', {}],
    queryFn: () =>
      getMenuListApi({}).then((res) => {
        if (res.code === 0) {
          return buildTreeFromArray(res.data || [], 'menuId')
        } else {
          new Error(res.msg)
        }
      }),
  })

  const menuTree = useMemo(() => {
    const treeSelectData: Record<string, any>[] = [
      {
        menuName: '主目录',
        menuId: 0,
      },
    ]
    treeSelectData[0].children = data
    return treeSelectData
  }, [data])

  const modalOpen = () => {
    form.setFieldsValue(props.initialValues)
  }
  return (
    <BaseFormModal {...props} form={form} afterOpen={modalOpen}>
      <Form form={form} labelCol={{ flex: '120px' }}>
        <Row>
          <Col span={24}>
            <Form.Item label='上级菜单' name='parentId'>
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder='请选择父级菜单'
                allowClear
                treeData={menuTree}
                fieldNames={{
                  label: 'menuName',
                  value: 'menuId',
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='菜单类型' name='menuType'>
              <Radio.Group>
                <Radio value='M'>目录</Radio>
                <Radio value='C'>菜单</Radio>
                <Radio value='F'>按钮</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='菜单名称'
              name='menuName'
              rules={[{ required: true, message: '请输入菜单名称!' }]}>
              <Input placeholder='请输入菜单名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='显示排序' name='sort'>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='显示类型' name='viewType'>
              <Radio.Group>
                <Radio value='1'>普通</Radio>
                <Radio value='2'>外链</Radio>
                <Radio value='3'>内嵌</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='路由地址'
              name='path'
              rules={[{ required: true, message: '请输入路由地址!' }]}>
              <Input placeholder='请输入路由地址' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='显示状态' name='visible'>
              <Radio.Group>
                <Radio value='1'>显示</Radio>
                <Radio value='0'>隐藏</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='菜单状态' name='status'>
              <Radio.Group>
                <Radio value='1'>普通</Radio>
                <Radio value='0'>停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseFormModal>
  )
}

export default function Menu() {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('添加菜单')
  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<MenuModel>(InitFormData)
  const [queryKey, setQueryKey] = useState<SearchFormField>({})
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['sys-menu', 'menu', 'get', queryKey],
    queryFn: () =>
      getMenuListApi(queryKey).then((res) => {
        if (res.code === 0) {
          return buildTreeFromArray(res.data || [], 'menuId')
        } else {
          new Error(res.msg)
        }
      }),
  })

  const queryOk: FormProps<SearchFormField>['onFinish'] = (values) => {
    setQueryKey(values)
  }
  const onReset = () => {
    form.resetFields()
    queryOk({})
  }

  const handleOk = (values: MenuModel, allValues: MenuModel): Promise<boolean> => {
    const api = allValues.menuId !== undefined ? updateMenuApi : insertMenuApi

    return api(values, allValues.menuId || 0)
      .then((res) => {
        if (res.code === 0) {
          setOpen(false)
          refetch()
          message.success(res.msg)
          return Promise.resolve(false)
        } else {
          message.error(res.msg)
          return Promise.reject()
        }
      })
      .catch((err) => {
        message.error(err.message)
        return Promise.reject(err)
      })
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const addModalOpen = () => {
    setOpen(true)
    setInitialValues(InitFormData)
  }

  const editBtnHandle = (menuId: number) => {
    setTitle('修改菜单')
    setOpen(true)
    getMenuById(menuId).then((res) => {
      if (res.code === 0) {
        setInitialValues(res.data || {})
      }
    })
  }

  const columns: TableColumnsType<MenuModel> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'age',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: '100px',
    },
    {
      title: '操作',
      key: 'action',
      width: '150px',
      className: 'action-col',
      render: (_, record) => (
        <Space size='small'>
          <Button
            icon={<EditOutlined />}
            type='link'
            size='small'
            onClick={() => editBtnHandle(record.menuId || 0)}>
            修改
          </Button>
          <Button
            icon={<PlusOutlined />}
            type='link'
            size='small'
            onClick={() => {
              setTitle('新增菜单')
              setOpen(true)
              setInitialValues({ ...InitFormData, parentId: record.menuId })
            }}>
            新增
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type='link'
            size='small'
            onClick={() => {
              Modal.confirm({
                title: '系统提示',
                content: `是否确认删除名称为"${record.menuName}"的数据项`,
                // okText: '确认',
                // cancelText: '取消',
                onOk: () => {
                  // 删除操作
                  deleteMenuById([record.menuId || 0]).then((res) => {
                    if (res.code === 0) {
                      message.success(res.msg)
                      //getData()
                      refetch()
                    }
                  })
                },
              })
            }}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className='app-container overflow-auto'>
      <Form form={form} layout='inline' className='mg-search-form-inline' onFinish={queryOk}>
        <Form.Item<SearchFormField> label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='状态' name='status'>
          <Select
            placeholder='请选择状态'
            options={[
              { value: '1', label: <span>正常</span> },
              { value: '0', label: <span>停用</span> },
            ]}
          />
        </Form.Item>
        <Form.Item<SearchFormField> className='mg-search-form-inline-opt'>
          <Button type='primary' size='middle' icon={<SearchOutlined />} htmlType='submit'>
            查询
          </Button>
          <Button icon={<RetweetOutlined />} onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col span={1.5}>
          <Button type='primary' size='middle' icon={<PlusOutlined />} onClick={addModalOpen}>
            新增
          </Button>
        </Col>
        <Col span={1.5}></Col>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        rowKey='menuId'
      />

      <CreateMenuModal
        title={title}
        open={open}
        width={760}
        onOk={handleOk}
        onCancel={handleCancel}
        initialValues={initialValues}
      />
    </div>
  )
}
