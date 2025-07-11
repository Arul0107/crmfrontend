import React, { useState, useEffect } from 'react';
import {
  Drawer, Typography, Form, Input, Button, Spin
} from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import './NotesDrawer.css'; // ✅ custom styling

const { TextArea } = Input;
const { Title, Text } = Typography;

const NotesDrawer = ({ visible, onClose, quotation, refreshQuotations }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Ensure notes are updated when quotation changes
    setNotes(quotation?.notes || []);
  }, [quotation]);

  const getCurrentUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.email || 'Unknown';
    } catch {
      return 'Unknown';
    }
  };

  const handleAddNote = async (values) => {
    try {
      setLoading(true);
      const toastId = toast.loading('Adding note...');

      const newNote = {
        text: values.note,
        timestamp: new Date().toLocaleString(),
        author: getCurrentUser()
      };
      // Create a new array with the new note appended
      const updatedNotes = [...notes, newNote];
      
      // Send only the updated notes array to the backend.
      // The backend (quotationController.js) should be modified to handle this partial update.
      await axios.put(`/api/quotations/${quotation._id}`, {
        notes: updatedNotes
      });
      
      setNotes(updatedNotes); // Update local state
      toast.success('Note added', { id: toastId });
      form.resetFields(); // Clear the input field

      // Call refreshQuotations if it's a function to update the parent component's data
      if (typeof refreshQuotations === 'function') {
        refreshQuotations();
      }
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error('Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const renderNotes = () => {
    if (!notes.length) {
      return <Text type="secondary">No notes added yet</Text>;
    }

    return notes.map((note, index) => {
      const previous = index > 0 ? notes[index - 1] : null;
      const currentDate = new Date(note.timestamp).toDateString();
      const previousDate = previous ? new Date(previous.timestamp).toDateString() : null;
      const showDate = currentDate !== previousDate;

      return (
        <div key={index}>
          {showDate && <div className="note-date-header">{currentDate}</div>}
          <div className="note-bubble">
            <div className="note-meta">
              {note.author} &nbsp;&nbsp; {note.timestamp}
            </div>
            <div className="note-text">{note.text}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <Drawer
      title={<Title level={4} style={{ margin: 0 }}>Notes for Quotation #{quotation?.quotationNumber}</Title>}
      open={visible}
      onClose={onClose}
      width={440}
      destroyOnClose // Ensures form fields reset when closed
    >
      <Spin spinning={loading}>
        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', marginBottom: 16 }}>
          {renderNotes()}
        </div>

        <Form form={form} layout="vertical" onFinish={handleAddNote}>
          <Form.Item
            name="note"
            rules={[{ required: true, message: 'Please enter a note' }]}
          >
            <TextArea rows={3} placeholder="Type your note here" />
          </Form.Item>
          <Button
            type="primary"
             style={{ backgroundColor: '#ef7a1b', borderColor: '#orange', color: 'white' }}
            htmlType="submit"
            loading={loading}
            block
            icon={<SendOutlined />}
          >
            Add Note
          </Button>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default NotesDrawer;