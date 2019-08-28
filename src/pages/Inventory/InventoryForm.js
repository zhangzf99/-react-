import React from 'react'
import { connect } from 'dva'
import { Form,Input,Select } from 'antd'

class Inventory extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { Option } = Select;
    getFieldDecorator("id")
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
        </Form>
      </div>
    )
  }
}

const mapPropsToFields = (props)=>{
  let obj = {};
  // console.log(props.product.number,typeof(props.product.number))
  if(props.product.number){
    props.product.number=props.product.number.toString()
  }
  // console.log(props.product.number,typeof(props.product.number))
  
  // alert(JSON.stringify(props))
  for(let key in props.product) {
    obj[key] = Form.createFormField({
      value:props.product[key]
    })
  }
  // console.log('===',obj)
  return obj
}

export default Form.create({mapPropsToFields})(connect(state=>state)(Inventory))