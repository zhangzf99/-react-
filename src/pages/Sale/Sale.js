import React from 'react'
import { connect } from 'dva'
import { Table,Icon,Modal,Button,message } from 'antd'
import SaleForm from './SaleForm'

class Sale extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'sale/findAllSales'})
  }

  showModal = () => {
    this.props.dispatch({type:'sale/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'sale/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = e => {
    this.props.dispatch({type:'sale/closeDialog'})

  };

  SaleFormRef = (form)=>{
    this.form = form
  }

  // 删除
  delById = (record)=>{
    let id = record.id
    this.props.dispatch({type:'sale/delSaleById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delByIds = ()=>{
    let values = this.props.sale.ids
    console.log('===',values)
    this.props.dispatch({type:'sale/delSaleByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  update = (record)=>{
    this.props.sale.saleList = record
    this.props.dispatch({type:'sale/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const columns = [
      {
        title: '产品名',
        dataIndex: 'productname',
        align:'center'
      },
      {
        title: '销售数量',
        dataIndex: 'number',
        align:'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        align:'center'
      },
      {
        title: '销售日期',
        dataIndex: 'data',
        align:'center'
      },
      {
        title: '顾客姓名',
        dataIndex: 'customer.name',
        align:'center'
      },
      {
        title: '顾客联系方式',
        dataIndex: 'customer.telephone',
        align:'center'
      },
      {
        title: '顾客地址',
        dataIndex: 'customer.address',
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
        this.props.sale.ids = selectedRowKeys
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
          <Button type="primary" size='small' onClick={this.delByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.sale.allSales} 
        size='small' rowKey='id' loading={this.props.sale.loading} />
        <Modal
          title="新增"
          visible={this.props.sale.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <SaleForm ref={this.SaleFormRef} saleList={this.props.sale.saleList} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Sale)