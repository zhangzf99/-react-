import React from 'react'
import { Table,Icon,Button,Modal,message } from 'antd'
import { connect } from 'dva';
import UserForm from './UserForm'

class User1 extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      userList:{}
    }
  }

  componentDidMount(){
    this.props.dispatch({type:'user1/getAllUser'})
    this.props.dispatch({type:'role/findAllRoles'})
  }

  // 模态框
  showModal = () => {
    this.props.dispatch({type:'user1/openDialog'})
  };

  handleOk = e => {
    // alert(1)
    // console.log(e);
    // this.setState({
    //   visible: false,
    // });
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'user1/saveUser',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = ()=>{
    this.props.dispatch({type:'user1/closeDialog'})
  }

  userFormRef = (form)=>{
    this.form = form
  }

  // 删除用户
  delUserById = (record)=>{
    console.log(record.id)
    let values = record.id
    this.props.dispatch({type:'user1/delUser',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delUserByIds = ()=>{
    // console.log(this.props.user1.ids)
    let values = this.props.user1.ids
    this.props.dispatch({type:"user1/delUsers",values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改用户
  updateUser = (record)=>{
    // console.log(record)
    this.props.user1.userInfo = record
    this.props.dispatch({type:"user1/openDialog"}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
    // this.setState({
    //   userList:record
    // },()=>{
    //   console.log(this.state.userList)
    //   this.props.dispatch({type:"user1/openDialog"})
    // })
  }



  render(){
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align:'center',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        align:'center',
      },
      {
        title: '联系方式',
        dataIndex: 'phonenum',
        key: 'phonenum',
        align:'center',
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        align:'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
      },
      {
        title: '角色',
        dataIndex: 'role.name',
        key: 'role.id',
        align:'center',
      },
      {
        title: '操作',
        dataIndex: '',
        align:'center',
        render:(record)=>{
          return(
            <div>
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}} onClick={this.updateUser.bind(this,record)} />
              <Icon type="delete" style={{color:'#dd1144'}} onClick={this.delUserById.bind(this,record)} />
            </div>
          )
        }
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        console.log(selectedRowKeys)
        this.props.user1.ids = selectedRowKeys
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
          <Button type="primary" size='small' onClick={this.delUserByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.props.user1.userList} 
        columns={columns} size="small" rowKey='id' loading={this.props.user1.loading} />

        {/* 模态框 */}
        <Modal
          title={this.props.user1.title}
          visible={this.props.user1.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UserForm ref={this.userFormRef} userList={this.props.user1.userInfo} />
        </Modal>
      </div>
    )
  }
}

export default connect(state => state)(User1)