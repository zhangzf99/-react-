import React from 'react'
import { connect } from 'dva'
import { Form,Input,Select } from 'antd'

class RoleForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { Option } = Select;
    getFieldDecorator('id')

    return(
      <div>
        <Form>
          <Form.Item
            label='角色名'
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your roleName!', whitespace: true }],
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
  let obj = {};
  // alert(JSON.stringify(props))
  for(let key in props.role) {
    obj[key] = Form.createFormField({
      value:props.role[key]
    })
  }
  return obj
}

export default Form.create({mapPropsToFields})(connect(state=>state)(RoleForm))