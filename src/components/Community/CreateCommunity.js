import React, { useState } from 'react';
import { Button, Form, Input, Menu, Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import { getToken } from './auth'; // Function to retrieve authentication token, adjust as per your implementation

const base_url = process.env.REACT_APP_SERVER_BASE_URL;

const CreateCommunity = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  const onFinish = async (values) => {
    const token = getToken(); // Retrieve authentication token

    try {
      const res = await axios.post(`${base_url}/community/create`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVisible(false);
      const url = res.headers["location"];
      navigate(url, { replace: true });
    } catch (error) {
      console.error('Error creating community:', error);
      // Handle error gracefully, e.g., show a notification to the user
    }
  };

  return (
    <>
      <Menu.Item key="5" onClick={showModal}>Create a community</Menu.Item>
      <Modal
        title="Create your own community🤩"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // Remove the footer for now
      >
        <Form
          form={form}
          name="createCommunityForm"
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{ avatar: [] }} // Initial values if needed
        >
          <Form.Item
            name="community_name"
            label="Community Name"
            rules={[
              {
                required: true,
                message: 'Please input your community name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Avatar (JPG/PNG)"
            valuePropName="fileList"
            getValueFromEvent={(normFile)}
            rules={[
              {
                required: true,
                message: 'Please upload your community avatar',
              },
            ]}
          >
            <Avatar setAvatar={props.setAvatar} />
          </Form.Item>

          <Form.Item
            name="intro"
            label="Brief Intro"
            rules={[
              {
                required: true,
                message: 'Please input Intro about this community',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCommunity;