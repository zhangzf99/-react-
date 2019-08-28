import React from 'react'
import { connect } from 'dva'
import { Form,Input,Select } from 'antd'


class ProductForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'category/findAllCategory'})
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    getFieldDecorator('id')
    return(
      <div>
        <Form>
          <Form.Item
            label='产品名'
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label='库存量'
          >
            {getFieldDecorator('inventorynum', {
              rules: [{ required: true, message: 'Please input your inventorynum!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label='描述'
          >
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input your description!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label='单价'
          >
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Please input your price!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label='状态'>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: 'Please select your status!' }],
            })(
              <Select initialValue="正常">
                <Option value="正常">正常</Option>
                <Option value="禁用">禁用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='产品类别'>
            {getFieldDecorator('productCategoryId', {
              rules: [{ required: true, message: 'Please select your productType!' }],
            })(
              <Select>
                {
                  this.props.category.allCategory.map((item)=>{
                    return(
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapPropsToFields = (props)=>{
  const obj = {};
  // console.log('props',props.intoList)
  if(props.productList.inventorynum){
    props.productList.inventorynum=props.productList.inventorynum.toString()
  }
  for(let key in props.productList){
    obj[key] = Form.createFormField({
      value:props.productList[key]
    })
  }
  // console.log(obj)
  return obj
}


export default Form.create({mapPropsToFields})(connect(state=>state)(ProductForm))