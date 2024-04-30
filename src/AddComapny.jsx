import { Modal, Form, Input, Button } from 'antd';
import React from 'react';

const AddCompany = ({ onSave, open, close }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values.companyName);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={open}
      title="Add Company"
      onCancel={close}
      footer={[
        <Button key="cancel" onClick={() => {form.resetFields(); close();}}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[
            {
              required: true,
              message: 'Please enter the company name',
            },
          ]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCompany;
