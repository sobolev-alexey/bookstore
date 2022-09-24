import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = () => {
  const [searchForm] = Form.useForm();

  const onFinish = async values => {
    console.log(333, values?.query);
  }

  return (
    <Form
      className="header-search-wrapper"
      form={searchForm}
      size="large"
      layout="horizontal"
      name="search-form"
      hideRequiredMark
      onFinish={onFinish}
      initialValues={{ 
        query: '',
      }}
    >
      <Form.Item name="query">
        <Input 
          placeholder="Search for books by keyword / title / author / ISBN" 
          allowClear
          prefix={<SearchOutlined />}
          suffix={null}
          className="search-bar"
        />
      </Form.Item>
      <button className="search" type="submit">Search</button>
    </Form>
  );
};

export default SearchBar;
