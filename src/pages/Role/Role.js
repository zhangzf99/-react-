import React from 'react'
import { Table,Icon,Button,Modal,message } from 'antd'
import { connect } from 'dva';
import RoleForm from './RoleForm'

class Role extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'role/findAllRoles'})
  }
  // 模态框

  showModal = () => {
    this.props.dispatch({type:'role/openDialog'})
  }

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({type:'role/saveRoles',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = e => {
    this.props.dispatch({type:'role/closeDialog'})
  };

  roleFormRef = (form)=>{
    this.form = form
  }

  // 删除角色
  delRole = (record)=>{
    let id = record.id
    this.props.dispatch({type:'role/delRole',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delRoleByIds = ()=>{
    let values = this.props.role.ids
    this.props.dispatch({type:'role/delRoles',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改角色
  updateRole = (record)=>{
    console.log(record)
    this.props.role.role = record
    this.props.dispatch({type:'role/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        align:'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        align:'center'
      },
      {
        title: '操作',
        dataIndex: '',
        align:'center',
        render:(record)=>{
          return(
            <div>
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}} onClick={this.updateRole.bind(this,record)} />
              <Icon type="delete" style={{color:'#dd1144'}} onClick={this.delRole.bind(this,record)} />
            </div>
          )
        }
      }
    ];
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.role.ids = selectedRowKeys
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return(
      <div>
        <div className='btns' style={{marginBottom:'10px'}}>
          <Button type="primary" size='small' style={{marginRight:'10px'}} onClick={this.showModal}>新增</Button>
          <Button type="primary" size='small' onClick={this.delRoleByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.role.allRoles} 
        size='small' rowKey='id' loading={this.props.role.loading} />
        <Modal
          title={this.props.role.title}
          visible={this.props.role.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RoleForm ref={this.roleFormRef} role={this.props.role.role} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Role)