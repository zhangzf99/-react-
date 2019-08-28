import React from 'react'
import { Table,Button,Icon,Modal,message } from 'antd'
import { connect } from 'dva'
import CustomerForm from './CustomerForm'

class Customer extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'customer/findAllCustomer'})
  }

  showModal = () => {
    this.props.dispatch({type:'customer/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'customer/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = () => {
    this.props.dispatch({type:'customer/closeDialog'})
  };

  CustomerFormRef = (form)=>{
    this.form = form
  }

  // 删除
  delById = (record)=>{
    let id = record.id
    this.props.dispatch({type:'customer/delCustomerById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delByIds = ()=>{
    let values = this.props.customer.ids
    this.props.dispatch({type:'customer/delCustomerByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  update = (record)=>{
    this.props.customer.customerInfo = record
    this.props.dispatch({type:'customer/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const columns = [
      {
        title: '顾客名',
        dataIndex: 'name',
        align:'center'
      },
      {
        title: '联系电话',
        dataIndex: 'telephone',
        align:'center'
      },
      {
        title: '地址',
        dataIndex: 'address',
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
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}} onClick={this.update.bind(this,record)} />
              <Icon type="delete" style={{color:'#dd1144'}} onClick={this.delById.bind(this,record)} />
            </div>
          )
        }
      },
    ];
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.customer.ids = selectedRowKeys
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    // alert(JSON.stringify(this.props.customer.customerList))
    return(
      <div>
        <div className='btns' style={{marginBottom:'10px'}}>
          <Button type="primary" size='small' style={{marginRight:'10px'}} onClick={this.showModal}>新增</Button>
          <Button type="primary" size='small' onClick={this.delByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.customer.customerList} 
        size='small' rowKey='id' loading={this.props.customer.loading} />
        <Modal
          title="新增"
          visible={this.props.customer.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CustomerForm ref={this.CustomerFormRef} customerInfo={this.props.customer.customerInfo} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Customer)