// 采购页面
import React from 'react'
import { connect } from 'dva'
import { Table,Icon,Modal,Button,message } from 'antd'
import BuyForm from './BuyForm'

class Buy extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'buy/findAllBuy'})
  }

  showModal = () => {
    this.props.dispatch({type:'buy/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'buy/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = e => {
    this.props.dispatch({type:'buy/closeDialog'})
  };

  BuyFormRef = (form)=>{
    this.form = form
  }

  delById = (record)=>{
    let id = record.id
    this.props.dispatch({type:'buy/delBuysById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  delByIds = ()=>{
    let values = this.props.buy.ids
    this.props.dispatch({type:'buy/delBuyByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  update = (record)=>{
    this.props.buy.buyList = record
    this.props.dispatch({type:'buy/openDialog'}).then(()=>{
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
        title: '采购数量',
        dataIndex: 'number',
        align:'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        align:'center'
      },
      {
        title: '采购日期',
        dataIndex: 'data',
        align:'center'
      },
      {
        title: '供应商',
        dataIndex: 'provider.name',
        align:'center'
      },
      {
        title: '供应商联系方式',
        dataIndex: 'provider.telephone',
        align:'center'
      },
      {
        title: '供应商地址',
        dataIndex: 'provider.address',
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
        this.props.buy.ids = selectedRowKeys
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.buy.allBuys} 
        size='small' rowKey='id' loading={this.props.buy.loading} />
        <Modal
          title="新增模态框"
          visible={this.props.buy.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <BuyForm ref={this.BuyFormRef} buyList={this.props.buy.buyList} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Buy)