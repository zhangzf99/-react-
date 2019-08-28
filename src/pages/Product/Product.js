// 产品信息  产品管理
import React from 'react'
import { connect } from 'dva'
import { Table,Icon,Button,Modal,message } from 'antd'
import ProductForm from './ProductForm'

class Product extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'product/findAllProduct'})
  }

  showModal = () => {
    this.props.dispatch({type:'product/openDialog'})
  };

  handleOk = e => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch({type:'product/saveOrUpdate',values}).then(()=>{
          message.success('新增成功');
        }).catch(()=>{
          message.error('新增失败')
        })
      }
    });
  };

  handleCancel = () => {
    this.props.dispatch({type:'product/closeDialog'})
  };

  ProductFormRef = (form)=>{
    this.form = form
  }

  // 删除
  delById = (record)=>{
    let id = record.id
    // console.log(id)
    this.props.dispatch({type:'product/delProductById',id}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    })
  }

  // 批量删除
  delByIds = ()=>{
    let values = this.props.product.ids
    this.props.dispatch({type:'product/delProductByIds',values}).then(()=>{
      message.success('删除成功');
    }).catch(()=>{
      message.error('删除失败')
    }) 
  }

  // 修改
  update = (record)=>{
    this.props.product.productList = record
    this.props.dispatch({type:'product/openDialog'}).then(()=>{
      message.success('修改成功');
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  render(){
    const columns = [
      {
        title: '产品名',
        dataIndex: 'name',
        align:'center'
      },
      {
        title: '库存量',
        dataIndex: 'inventorynum',
        align:'center'
      },
      {
        title: '单价',
        dataIndex: 'price',
        align:'center'
      },
      {
        title: '类别',
        dataIndex: 'category.name',
        align:'center'
      },
      {
        title: '描述',
        dataIndex: 'description',
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
        this.props.product.ids = selectedRowKeys
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.product.allProduct} 
        size='small' rowKey='id' loading={this.props.product.loading} />
        <Modal
          title="新增"
          visible={this.props.product.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ProductForm ref={this.ProductFormRef} productList={this.props.product.productList} />
        </Modal>
      </div>
    )
  }
}

export default connect(state=>state)(Product)