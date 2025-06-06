import React, { useState, useEffect } from 'react';
import {
  Drawer, Table, Form, Input, Button,
  DatePicker, Select, Space, Modal, Popconfirm
} from 'antd';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import dayjs from 'dayjs';

const PaymentHistoryDrawer = ({ visible, onClose, invoice, refreshInvoices }) => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({ paymentHistory: [] });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditingPaymentId, setCurrentEditingPaymentId] = useState(null);

  const getCurrentUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.email || 'Unknown';
    } catch {
      return 'Unknown';
    }
  };

  const fetchInvoice = async () => {
    if (!invoice?._id) return;
    try {
      const res = await axios.get(`/api/invoices/${invoice._id}`);
      setInvoiceData({
        ...res.data,
        paymentHistory: Array.isArray(res.data.paymentHistory) 
          ? res.data.paymentHistory 
          : []
      });
    } catch {
      toast.error('Failed to refresh invoice');
    }
  };

  useEffect(() => {
    if (visible) fetchInvoice();
  }, [visible]);

  const handleAddPayment = async (values) => {
    if (!values) return;
    
    setLoading(true);
    try {
      const payload = {
        amount: parseFloat(values.amount) || 0,
        method: values.method || 'Cash',
        reference: values.reference || '',
        date: values.date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
        addedBy: getCurrentUser()
      };
      await axios.patch(`/api/invoices/${invoice._id}/payments`, payload);
      toast.success('Payment added');
      form.resetFields();
      fetchInvoice();
      refreshInvoices?.();
    } catch (err) {
      toast.error('Failed to add payment');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (record) => {
    if (!record) return;
    setCurrentEditingPaymentId(record._id);
    editForm.setFieldsValue({
      amount: record.amount || 0,
      method: record.method || 'Cash',
      reference: record.reference || '',
      date: record.date ? dayjs(record.date) : dayjs()
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    if (!currentEditingPaymentId) return;
    try {
      const payload = {
        amount: parseFloat(values.amount) || 0,
        method: values.method || 'Cash',
        reference: values.reference || '',
        date: values.date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
        addedBy: getCurrentUser()
      };
      await axios.put(`/api/invoices/${invoice._id}/payments/${currentEditingPaymentId}`, payload);
      toast.success('Payment updated');
      setEditModalVisible(false);
      fetchInvoice();
      refreshInvoices?.();
    } catch {
      toast.error('Failed to update payment');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!paymentId) return;
    try {
      await axios.delete(`/api/invoices/${invoice._id}/payments/${paymentId}`);
      toast.success('Payment deleted');
      fetchInvoice();
      refreshInvoices?.();
    } catch {
      toast.error('Failed to delete payment');
    }
  };

  const columns = [
    { 
      title: 'Amount', 
      dataIndex: 'amount',
      render: amount => `₹${(typeof amount === 'number' ? amount : 0).toFixed(2)}`
    },
    { 
      title: 'Method', 
      dataIndex: 'method',
      render: method => method || 'N/A'
    },
    { 
      title: 'Reference', 
      dataIndex: 'reference',
      render: reference => reference || 'N/A'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: text => text ? dayjs(text).format('YYYY-MM-DD') : 'N/A'
    },
    { 
      title: 'Added By', 
      dataIndex: 'addedBy',
      render: addedBy => addedBy || 'Unknown'
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Delete this payment?"
            onConfirm={() => handleDeletePayment(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      title={`Payment History - ${invoice?.invoiceNumber || 'Invoice'}`}
      width={800}
    >
      <Table
        dataSource={invoiceData.paymentHistory}
        columns={columns}
        rowKey="_id"
        pagination={false}
        style={{ marginBottom: 24 }}
      />

      <Form layout="vertical" form={form} onFinish={handleAddPayment}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="method" label="Method" rules={[{ required: true }]}>
            <Select placeholder="Select method">
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="UPI">UPI</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="reference" label="Reference" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} defaultValue={dayjs()} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Add Payment</Button>
        </Space>
      </Form>

      <Modal
        open={editModalVisible}
        title="Edit Payment Entry"
        onCancel={() => setEditModalVisible(false)}
        onOk={() => editForm.submit()}
        okText="Update"
        cancelText="Cancel"
      >
        <Form layout="vertical" form={editForm} onFinish={handleEditSubmit}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="method" label="Method" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="UPI">UPI</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
              <Select.Option value="Card">Card</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="reference" label="Reference" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Drawer>
  );
};

export default PaymentHistoryDrawer;