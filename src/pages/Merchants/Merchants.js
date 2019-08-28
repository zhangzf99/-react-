// 供应商信息页面
import React from 'react'
import { connect } from 'dva';
import { Table,Icon,Button,Modal } from 'antd'
import MerchantsForm from './MerchartsForm'

class Merchants extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'merchants/findAllMerchants'})
  }

  showModal = () => {
    this.props.dispatch({type:'merchants/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'merchants/saveOrUpdate',values})
      }
    });
  };

  handleCancel = () => {
    this.props.dispatch({type:'merchants/closeDialog'})
  };

  MerchantsFormRef = (form)=>{
    this.form = form  
  }

  // 删除
  delById = (record)=>{
    console.log(record.id)
    let id = record.id
    this.props.dispatch({type:'merchants/delById',id})
  }
  
  // 批量删除
  delByIds = ()=>{
    let values = this.props.merchants.ids
    this.props.dispatch({type:'merchants/delByIds',values})
  }

  // 修改
  updateMerchants = (record)=>{
    this.props.merchants.merchantsInfo = record
    this.props.dispatch({type:'merchants/openDialog'})
  }

  render(){
    const columns = [
      {
        title: '供应商姓名',
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
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}} onClick={this.updateMerchants.bind(this,record)} />
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
        this.props.merchants.ids = selectedRowKeys
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return(
      <div>
        {/* 供应商信息 */}
        <div className='btns' style={{marginBottom:'10px'}}>
          <Button type="primary" size='small' style={{marginRight:'10px'}} onClick={this.showModal}>新增</Button>
          <Button type="primary" size='small' onClick={this.delByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.merchants.merchantsList} 
        size='small' rowKey='id' loading={this.props.merchants.loading} />
        <Modal
          title="新增"
          visible={this.props.merchants.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <MerchantsForm ref={this.MerchantsFormRef} merchantsInfo={this.props.merchants.merchantsInfo} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Merchants)