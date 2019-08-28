import React from 'react'
import { connect } from 'dva'
import { Table,Button,Icon,Modal,message } from 'antd'
import IntoForm from './IntoForm'

class Into extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'into/findAllIntoList'})
    this.props.dispatch({type:'repository/findAllRepository'})
  }

  showModal = () => {
    this.props.dispatch({type:'into/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'into/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = e => {
    this.props.dispatch({type:'into/closeDialog'})
  };

  IntoFormRef = (form)=>{
    this.form = form
  }

  // 删除
  delById = (record)=>{
    let id = record.id
    this.props.dispatch({type:'into/delRepositoryById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delIntoByIds = ()=>{
    let values = this.props.into.ids
    // console.log(values)
    this.props.dispatch({type:'into/delRepositoryByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  update =(record)=>{
    this.props.into.intoList = record
    this.props.dispatch({type:'into/openDialog'}).then(()=>{
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
        title: '进货日期',
        dataIndex: 'data',
        align:'center'
      },
      {
        title: '数量',
        dataIndex: 'number',
        align:'center'
      },
      {
        title: '进货地',
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
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}}  onClick={this.update.bind(this,record)}/>
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
        this.props.into.ids = selectedRowKeys
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
          <Button type="primary" size='small' onClick={this.delIntoByIds}>批量删除</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.into.importList} 
        size='small' rowKey='id' loading={this.props.into.loading} />
        <Modal
          title="新增"
          visible={this.props.into.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <IntoForm ref={this.IntoFormRef} intoList={this.props.into.intoList} />
        </Modal>
      </div> 
    )
  }
}

export default connect(state=>state)(Into)