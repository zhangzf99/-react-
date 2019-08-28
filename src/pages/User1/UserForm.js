import React from 'react'
import {Form,Input,Select} from 'antd'
import { connect } from 'dva';

class UserForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id')
    const { Option } = Select;
    return(
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label='用户名'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input
                placeholder="name"
              />,
            )}
          </Form.Item>
          <Form.Item label='密码'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item label='性别'>
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select your gender!' }],
            })(
              <Select initialValue="男">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='电话'>
            {getFieldDecorator('phonenum', {
              rules: [{ required: true, message: 'Please input your phonenum!' }],
            })(
              <Input
                placeholder="phonenum"
              />,
            )}
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
          <Form.Item label='角色'>
            {getFieldDecorator('roleId', {
              rules: [{ required: true, message: 'Please select your role!' }],
            })(
              <Select initialValue="正常">
                {
                  // alert(this.props.role.allRoles)
                  this.props.role.allRoles.map((item)=>{
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

// const mapPropsToFields = ()=>{
//   console.log(this.props.user1.userInfo)
//   // const userInfo = this.props.user1.userInfo
//   // const obj = {};
//   // // alert(JSON.stringify(props))
//   // for(let key in userInfo) {
//   //   obj[key] = Form.createFormField({
//   //     value:userInfo[key]
//   //   })
//   // }
//   // return obj
// }

const mapPropsToFields = (props)=>{
  const obj = {};
  // console.log('props',props)
  for(let key in props.userList){
    obj[key] = Form.createFormField({
      value:props.userList[key]
    })
  }
  // console.log(obj)
  return obj
}


export default Form.create({mapPropsToFields})(connect(state=>state)(UserForm))