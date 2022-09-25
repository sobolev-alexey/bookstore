import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AppContext } from '../context/globalState';
import { findBooks } from '../utils/helpers';

const SearchBar = () => {
  const { books, setFilteredBooks } = useContext(AppContext);

  const [searchForm] = Form.useForm();

  const onFinish = values => {
    const result = findBooks(books, values?.query);
    setFilteredBooks(result);
  }

  const onChange = async event => {
    if (event.target?.value === '') {
      setFilteredBooks(books);
    }
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
          onChange={onChange}
        />
      </Form.Item>
      <button className="search" type="submit">Search</button>
    </Form>
  );
};

export default SearchBar;
