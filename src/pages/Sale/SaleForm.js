import React from 'react'
import { connect } from 'dva'
import { Form,Input,Select } from 'antd'

class SaleForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'customer/findAllCustomer'})
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    getFieldDecorator('id')
    return(
      <div>
        <Form>
          <Form.Item
            label='商品名'
          >
            {getFieldDecorator('productname', {
              rules: [{ required: true, message: 'Please input your productname!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label='数量'
          >
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Please input your number!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label='顾客姓名'>
            {getFieldDecorator('customerId', {
              rules: [{ required: true, message: 'Please select your customer!' }],
            })(
              <Select initialValue="正常">
                {/* <Option value="正常">正常</Option>
                <Option value="禁用">禁用</Option> */}
                {
                  this.props.customer.customerList.map((item)=>{
                    return(
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label='状态'>
            {getFieldDecorator('status', {
              rules: [{ required: true, message: 'Please select your status!' }],
            })(
              <Select>
                <Option value="正常">正常</Option>
                <Option value="禁用">禁用</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </div>
    )
  }
}


const mapPropsToFields = (props)=>{
  if(props.saleList.number){
    props.saleList.number=props.saleList.number.toString()
  }
  let obj = {};
  // alert(JSON.stringify(props))
  for(let key in props.saleList) {
    obj[key] = Form.createFormField({
      value:props.saleList[key]
    })
  }
  return obj
}


export default Form.create({mapPropsToFields})(connect(state=>state)(SaleForm))