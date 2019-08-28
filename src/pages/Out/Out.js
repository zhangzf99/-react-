// 出入库信息管理 销售订单信息管理
import React from 'react'
import { connect } from 'dva'
import { Table,Icon,Button,Modal,message } from 'antd'
import OutForm from './OutForm'

class Out extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'out/findOutMes'})
  }

  showModal = () => {
    this.props.dispatch({type:'out/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'out/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = e => {
    this.props.dispatch({type:'out/closeDialog'})
  };

  OutFormRef = (form)=>{
    this.form = form
  }

  // 删除
  delById = (record)=>{
    let id = record.id
    this.props.dispatch({type:"out/delProductById",id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delByIds = ()=>{
    let values = this.props.out.ids
    this.props.dispatch({type:'out/delProductByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  update = (record)=>{
    // alert(1)
    this.props.out.outList = record
    this.props.dispatch({type:'out/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const columns = [
      {
        title: '商品名',
        dataIndex: 'productname',
        align:'center'
      },
      {
        title: '日期',
        dataIndex: 'data',
        align:'center'
      },
      {
        title: '数量',
        dataIndex: 'number',
        align:'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        align:'center'
      },
      {
        title: '产地',
        dataIndex: 'repository.adress',
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
        this.props.out.ids = selectedRowKeys
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.out.outMes} 
        size='small' rowKey='id' loading={this.props.out.loading} />
        <Modal
          title="新增"
          visible={this.props.out.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <OutForm ref={this.OutFormRef} outList={this.props.out.outList} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Out)