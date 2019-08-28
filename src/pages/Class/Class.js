import React from 'react'
import { connect } from 'dva';
import {Table} from 'antd'

class Class extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  componentDidMount(){
    this.props.dispatch({type:"clazz/getAllClazz"})
  }

  render(){
    const columns = [
      {
        title: '班级名',
        dataIndex: 'name',
      }
    ];
    
    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return(
      <div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.clazz.clazzList} size='small' />,
      </div>
    )
  }
}

export default connect(state=>state)(Class)