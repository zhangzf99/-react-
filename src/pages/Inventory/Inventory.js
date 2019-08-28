// 产品库存信息管理
import React from 'react'
import { Table,Icon,Button,Modal,message } from 'antd'
import { connect } from 'dva';
import InventoryForm from './InventoryForm'
// import { connect } from 'dva';

class Inventory extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'inventory/findAllProducts'})
  }

  // 模态框
  showModal = () => {
    this.props.dispatch({type:'inventory/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'inventory/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    })
  };

  handleCancel = () => {
    this.props.dispatch({type:'inventory/closeDialog'})
  };

  InventoryFormRef = (form)=>{
    this.form = form
  }

  // 删除
  delInventory = (record)=>{
    let id = record.id
    this.props.dispatch({type:'inventory/delById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }
  
  // 批量删除
  delByIds = ()=>{
    let ids = this.props.inventory.ids
    this.props.dispatch({type:'inventory/delByIds',ids}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  Update = (record)=>{
    // console.log(record)
    this.props.inventory.product = record;
    this.props.dispatch({type:'inventory/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const { confirm } = Modal;
    const columns = [
      {
        title: '产品名',
        dataIndex: 'productname',
        align:'center'
      },
      {
        title: '数量',
        dataIndex: 'number',
        align:'center'
      },
      {
        title: '厂家地',
        dataIndex: 'repository.adress',
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
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}} onClick={this.Update.bind(this,record)} />
              <Icon type="delete" style={{color:'#dd1144'}} onClick={this.delInventory.bind(this,record)} />
            </div>

          )
        }
      },
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.inventory.ids = selectedRowKeys
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return(
      <div>
        {/* 库存管理 */}
        <div className='btns' style={{marginBottom:'10px'}}>
          <Button type="primary" size='small' style={{marginRight:'10px'}} onClick={this.showModal}>新增</Button>
          <Button type="primary" size='small' onClick={this.delByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.inventory.productList} 
        size='small' rowKey='id' loading={this.props.inventory.loading} />
        <Modal
          title="新增"
          visible={this.props.inventory.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <InventoryForm ref={this.InventoryFormRef} product={this.props.inventory.product} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Inventory)