import React from 'react'
import { connect } from 'dva'
import { Form,Input,Select } from 'antd'

class Product extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:'repository/findAllRepository'})
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
          <Form.Item label='进货地'>
            {getFieldDecorator('repositoryId', {
              rules: [{ required: true, message: 'Please select your importAddress!' }],
            })(
              <Select>
                {
                  this.props.repository.repositoryList.map((item)=>{
                    return(
                      <Option key={item.id} value={item.id}>{item.adress}</Option>
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
  if(props.outList.number){
    props.outList.number=props.outList.number.toString()
  }
  for(let key in props.outList){
    obj[key] = Form.createFormField({
      value:props.outList[key]
    })
  }
  // console.log(obj)
  return obj
}

export default Form.create({mapPropsToFields})(connect(state=>state)(Product))