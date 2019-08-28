// 类型管理页面
import React from 'react'
import { connect } from 'dva'
import { Table,Icon,Button,Modal,message } from 'antd'
import TypeForm from './TypeForm'

class Type extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'type/findAllTypes'})
  }

  showModal = () => {
    this.props.dispatch({type:'type/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'type/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = e => {
    this.props.dispatch({type:'type/closeDialog'})
  };

  TypeFormRef = (form)=>{
    this.form = form
  };

  // 删除
  delbyId = (record)=>{
    let id = record.id
    this.props.dispatch({type:'type/delTypeById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delByIds = ()=>{
    let values = this.props.type.ids
    this.props.dispatch({type:'type/delTypeByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 修改
  update = (record)=>{
    this.props.type.rowTypeList = record
    this.props.dispatch({type:'type/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const columns = [
      {
        title: '类型种类',
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
              <Icon type="edit" style={{color:'#339900',marginRight:'10px'}} onClick={this.update.bind(this,record)} />
              <Icon type="delete" style={{color:'#dd1144'}} onClick={this.delbyId.bind(this,record)} />
            </div>
          )
        }
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.type.ids = selectedRowKeys
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.type.typeList} 
        size='small' rowKey='id' loading={this.props.type.loading} />
        <Modal
          title="新增"
          visible={this.props.type.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TypeForm ref={this.TypeFormRef} rowTypeList={this.props.type.rowTypeList} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Type)