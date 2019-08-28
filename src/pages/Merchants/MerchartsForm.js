import React from 'react'
import { connect } from 'dva'
import { Form,Input,Select } from 'antd'

class MerchartsForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return(
      <div>
        <Form>
          <Form.Item
            label='商家名'
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label='联系电话'
          >
            {getFieldDecorator('telephone', {
              rules: [{ required: true, message: 'Please input your telephone!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label='地址'
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
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
        </Form>
      </div>
    )
  }
}



const mapPropsToFields = (props)=>{
  const obj = {}
  for(let key in props.merchantsInfo){
    obj[key] = Form.createFormField({
      value:props.merchantsInfo[key]
    })
  }
  return obj
}

export default Form.create({mapPropsToFields})(connect(state=>state)(MerchartsForm))