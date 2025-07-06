// InvoiceList.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Space,
  Button,
  Card,
  Input,
  Popconfirm,
  Tag,
  Tooltip,
  Modal,
  Descriptions,
  Select,
  Typography,
  DatePicker,
  List,
  Divider,
  Dropdown,
  Menu,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  PrinterOutlined,
  SearchOutlined,
  MessageOutlined,
  LockOutlined,
  UnlockOutlined,
  DollarOutlined,
  ScheduleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { saveAs } from "file-saver"; // Still needed if you export Excel from here
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import NotesDrawer from "./NotesDrawer.jsx";
import PaymentHistoryDrawer from "././PaymentHistoryDrawer.jsx";
import FollowUpDrawer from "././FollowUpDrawer.jsx";
import axios from "../../api/axios.js";

import generateInvoicePdf from './generateInvoicePdf.js'; 

const { Text } = Typography;
const { RangePicker } = DatePicker;

const InvoiceList = ({
  invoices,
  onAddNew,
  onEdit,
  onDelete,
  onSearch,
  refreshInvoices,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [notesDrawerVisible, setNotesDrawerVisible] = useState(false);
  const [followUpDrawerVisible, setFollowUpDrawerVisible] = useState(false);
  const [paymentDrawerVisible, setPaymentDrawerVisible] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [businessFilter, setBusinessFilter] = useState("all");
  const [itemViewModalVisible, setItemViewModalVisible] = useState(false);
  const [invoiceStatusMap, setInvoiceStatusMap] = useState({});

  const uniqueBusinessNames = [
    ...new Set(invoices.map((inv) => inv.businessName)),
  ];

  const calculatePaymentStatus = useCallback((invoice) => {
    const totalAmount = parseFloat(invoice.totalAmount) || 0;
    const totalPaid = invoice.paymentHistory?.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0) || 0;

    if (totalAmount <= 0) {
      return "N/A";
    }

    if (totalPaid >= totalAmount - 0.01) {
      return "paid";
    } else if (totalPaid > 0 && totalPaid < totalAmount) {
      return "partial";
    } else {
      return "pending";
    }
  }, []);

  useEffect(() => {
    const newStatusMap = {};
    invoices.forEach(invoice => {
      newStatusMap[invoice._id] = calculatePaymentStatus(invoice);
    });
    setInvoiceStatusMap(newStatusMap);
  }, [invoices, calculatePaymentStatus]);

  // Removed numberToWords and formatIndianCurrency from here as they are now in generateInvoicePdf.js
  const formatIndianCurrency = useCallback((num) => {
    if (isNaN(num)) return "0.00";
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, []);


  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setViewModalVisible(true);
  };

  const handleViewNotes = (invoice) => {
    setSelectedInvoice(invoice);
    setNotesDrawerVisible(true);
  };

  const handleViewPayments = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentDrawerVisible(true);
  };

  const handleViewItemSpecs = (invoice) => {
    setSelectedInvoice(invoice);
    setItemViewModalVisible(true);
  };

  const handleShowFollowUpDrawer = (invoice) => {
    setSelectedInvoice(invoice);
    setFollowUpDrawerVisible(true);
  };

  const handleCloseInvoice = async (id) => {
    const toastId = toast.loading("Closing invoice...");
    try {
      await axios.patch(`/api/invoices/${id}/close`);
      toast.success("Invoice closed successfully", { id: toastId });
      refreshInvoices?.();
    } catch (error) {
      console.error("Error closing invoice:", error);
      toast.error("Failed to close invoice", { id: toastId });
    }
  };

  const handleUnlockInvoice = async (id) => {
    const toastId = toast.loading("Unlocking invoice...");
    try {
      await axios.patch(`/api/invoices/${id}/unlock`);
      toast.success("Invoice unlocked successfully", { id: toastId });
      refreshInvoices?.();
    } catch (error) {
      console.error("Error unlocking invoice:", error);
      toast.error("Failed to unlock invoice", { id: toastId });
    }
  };

  const exportToExcel = () => {
    const data = filteredInvoices.map((inv, index) => ({
      SNo: index + 1,
      Number: inv.invoiceNumber,
      Business: inv.businessName,
      Customer: inv.customerName,
      ContactName: inv.contactName || "N/A",
      Email: inv.email || "N/A",
      MobileNumber: inv.mobileNumber || "N/A",
      TotalAmount: inv.totalAmount || 0,
      Date: inv.date,
      DueDate: inv.dueDate || "",
      Status: invoiceStatusMap[inv._id] || inv.paymentStatus,
      Closed: inv.isClosed ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, `Invoices-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesType = inv.invoiceType === "Invoice";
    const matchesSearch =
      !searchTerm ||
      inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.mobileNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      !dateRange ||
      (new Date(inv.date) >= dateRange[0].toDate() &&
        new Date(inv.date) <= dateRange[1].toDate());
    const calculatedStatus = invoiceStatusMap[inv._id];
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "overdue"
        ? calculatedStatus !== "paid" && new Date(inv.dueDate) < new Date()
        : calculatedStatus === statusFilter;
    const matchesBusiness =
      businessFilter === "all" ? true : inv.businessName === businessFilter;

    return (
      matchesType &&
      matchesSearch &&
      matchesDate &&
      matchesStatus &&
      matchesBusiness
    );
  });

  const getStatusTag = (status) => {
    let tagColor = "red";
    let tagText = "Payment Pending";

    if (status === "paid") {
      tagColor = "green";
      tagText = "Completed Payment";
    } else if (status === "partial") {
      tagColor = "orange";
      tagText = "Partial Payment";
    }

    return <Tag color={tagColor}>{tagText}</Tag>;
  };

  const getItemsTableColumns = () => [
    {
      title: "S.No",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      ellipsis: true,
      render: (text, record) => {
        let productName = text || record.description || "";
        if (!productName && record.specifications?.length > 0) {
          const modelSpec = record.specifications.find(s => s.name === "Model");
          if (modelSpec) {
            productName = modelSpec.value;
          }
        }
        return productName || "N/A";
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      render: (text, record) => {
        if (!text && record.specifications?.length > 0) {
          const mainSpec = record.specifications.find(
            (s) => s.name === "SPECIFICATION"
          );
          return mainSpec ? mainSpec.value : "N/A";
        }
        return text || "N/A";
      },
    },
    {
      title: "HSN/SAC",
      dataIndex: "hsnSac",
      width: 100,
      align: "center",
      render: (text) => text || "N/A",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: 80,
      align: "center",
      render: (qty) => parseFloat(qty) || 0,
    },
    {
      title: "Unit Price (₹)",
      width: 140,
      align: "right",
      render: (_, item) => formatIndianCurrency(item.rate || 0),
    },
    {
      title: "Total (₹)",
      width: 140,
      align: "right",
      render: (_, item) => (
        <Text strong style={{ color: "#52c41a" }}>
          {formatIndianCurrency((item.quantity || 0) * (item.rate || 0))}
        </Text>
      ),
    },
  ];

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => <Text strong>{index + 1}</Text>,
      width: 60,
    },
    {
      title: "Invoice Number",
      render: (_, record) => (
        <Tag icon={<FileTextOutlined />} color="blue">
          {record.invoiceNumber}
        </Tag>
      ),
    },
    {
      title: "Business",
      render: (_, record) => {
        const name = record.businessId?.businessName || record.businessName;
        return (
          <Tooltip title={name}>
            <Text strong>{name}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Contact Person",
      dataIndex: "contactName",
      render: (text, record) => record.businessId?.contactName || text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => record.businessId?.email || text || "N/A",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      render: (text, record) => record.businessId?.mobileNumber || record.businessId?.phoneNumber || text || "N/A",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      align: "right",
      render: (amt) => (
        <Text style={{ color: "#52c41a" }}>₹{(amt || 0)}</Text>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      align: "center",
      render: (date) => <Text>{date || "N/A"}</Text>,
    },
    {
      title: "Payment Status",
      key: "paymentStatusLabel",
      align: "center",
      render: (_, record) => {
        const calculatedStatus = invoiceStatusMap[record._id] || "pending";
        return getStatusTag(calculatedStatus);
      },
    },
    {
      title: "Actions",
      width: 80,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="view"
                icon={<EyeOutlined />}
                onClick={() => handleView(record)}
              >
                View Invoice Details
              </Menu.Item>
              <Menu.Item
                key="view-specs"
                icon={<FileTextOutlined />}
                onClick={() => handleViewItemSpecs(record)}
              >
                View Item Specifications
              </Menu.Item>
              <Menu.Item
                key="generate-pdf"
                icon={<PrinterOutlined />}
                onClick={() => generateInvoicePdf(record)} // Use the imported function
              >
                Generate PDF
              </Menu.Item>
              <Menu.Item
                key="view-notes"
                icon={<MessageOutlined />}
                onClick={() => handleViewNotes(record)}
              >
                View Notes
              </Menu.Item>
              <Menu.Item
                key="add-followup"
                icon={<ScheduleOutlined />}
                onClick={() => handleShowFollowUpDrawer(record)}
              >
                Add/View Follow-ups
              </Menu.Item>
              <Menu.Item
                key="view-payments"
                icon={<DollarOutlined />}
                onClick={() => handleViewPayments(record)}
              >
                View Payments
              </Menu.Item>
              {!record.isClosed && (
                <Menu.Item
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(record)}
                >
                  Edit Invoice
                </Menu.Item>
              )}
              {!record.isClosed ? (
                <Menu.Item
                  key="lock"
                  icon={<LockOutlined />}
                  onClick={() => {
                    Modal.confirm({
                      title: "Close Invoice",
                      content:
                        "Are you sure you want to close this invoice? It will become uneditable.",
                      okText: "Yes, Close",
                      cancelText: "No",
                      okButtonProps: { danger: true },
                      onOk: () => handleCloseInvoice(record._id),
                    });
                  }}
                >
                  Lock Invoice
                </Menu.Item>
              ) : (
                <Menu.Item
                  key="unlock"
                  icon={<UnlockOutlined />}
                  onClick={() => {
                    Modal.confirm({
                      title: "Unlock Invoice",
                      content:
                        "Are you sure you want to unlock this invoice? It will become editable again.",
                      okText: "Yes, Unlock",
                      cancelText: "No",
                      onOk: () => handleUnlockInvoice(record._id),
                    });
                  }}
                >
                  Unlock Invoice
                </Menu.Item>
              )}
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
              >
                <Popconfirm
                  title="Are you sure you want to delete this invoice?"
                  onConfirm={() => onDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  Delete Invoice
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Invoice Management"
        extra={
          <Space wrap>
            <RangePicker onChange={setDateRange} format="YYYY-MM-DD" />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 140 }}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="paid">Paid</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="partial">Partial</Select.Option>
              <Select.Option value="overdue">Overdue</Select.Option>
            </Select>
            <Select
              value={businessFilter}
              onChange={setBusinessFilter}
              placeholder="Filter by Business"
              style={{ width: 200 }}
              allowClear
            >
              <Select.Option value="all">All Businesses</Select.Option>
              {uniqueBusinessNames.map((name) => (
                <Select.Option key={name} value={name}>
                  {name}
                </Select.Option>
              ))}
            </Select>
            <Input.Search
              placeholder="Search invoices"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 240 }}
              allowClear
              prefix={<SearchOutlined />}
            />
            <Button onClick={exportToExcel}>Export Excel</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddNew}>
              New Invoice
            </Button>
          </Space>
        }
      >
        <Table
          dataSource={filteredInvoices}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title="Invoice Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={
          <Button onClick={() => setViewModalVisible(false)}>Close</Button>
        }
        width={1000}
      >
        {selectedInvoice && (
          <div>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Invoice No">
                {selectedInvoice.invoiceNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {selectedInvoice.date
                  ? new Date(selectedInvoice.date).toLocaleDateString("en-IN")
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                {selectedInvoice.dueDate
                  ? new Date(selectedInvoice.dueDate).toLocaleDateString(
                      "en-IN"
                    )
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Business">
                {selectedInvoice.businessName}
              </Descriptions.Item>
              <Descriptions.Item label="Customer">
                {selectedInvoice.contactName || selectedInvoice.customerName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Contact Person">
                {selectedInvoice.contactName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedInvoice.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile Number">
                {selectedInvoice.mobileNumber || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="GSTIN" span={2}>
                <Text code>{selectedInvoice.businessId?.gstNumber || selectedInvoice.gstin || "N/A"}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Business Info" span={2}>
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {selectedInvoice.businessId ?
                    `${selectedInvoice.businessId.addressLine1 || ''}\n${selectedInvoice.businessId.addressLine2 || ''}\n${selectedInvoice.businessId.addressLine3 || ''}\n${selectedInvoice.businessId.city || ''} - ${selectedInvoice.businessId.pincode || ''}\n${selectedInvoice.businessId.state || ''}, ${selectedInvoice.businessId.country || ''}`.trim()
                    : selectedInvoice.customerAddress || "N/A"}
                </Text>
              </Descriptions.Item>
            </Descriptions>

            {selectedInvoice.items?.length > 0 && (
              <>
                <Divider orientation="left">
                  Items ({selectedInvoice.items.length})
                </Divider>
                <Table
                  dataSource={selectedInvoice.items}
                  columns={getItemsTableColumns()}
                  pagination={false}
                  size="small"
                  rowKey={(item, idx) => `${selectedInvoice._id}-item-${idx}`}
                  bordered
                  expandable={{
                    expandedRowRender: (item) => (
                      <div style={{ margin: 0, padding: 0 }}>
                        {item.specifications?.length > 0 && (
                          <Descriptions column={1} size="small">
                            {item.specifications
                              .filter((spec) => spec.name !== "SPECIFICATION")
                              .map((spec, i) => (
                                <Descriptions.Item key={i} label={spec.name}>
                                  {spec.value}
                                </Descriptions.Item>
                              ))}
                          </Descriptions>
                        )}
                      </div>
                    ),
                    rowExpandable: (item) => item.specifications?.length > 0,
                  }}
                  summary={(pageData) => {
                    const subTotal = pageData.reduce(
                      (sum, item) =>
                        sum + (item.quantity || 0) * (item.rate || 0),
                      0
                    );
                    const gstPercentage = selectedInvoice.gstPercentage || 0;
                    const gstType = selectedInvoice.gstType || "intrastate";
                    let totalGSTAmount = 0;
                    let cgstAmount = 0;
                    let sgstAmount = 0;
                    let igstAmount = 0;

                    if (gstType === "interstate") {
                      igstAmount = subTotal * (gstPercentage / 100);
                      totalGSTAmount = igstAmount;
                    } else {
                      cgstAmount = subTotal * (gstPercentage / 200);
                      sgstAmount = subTotal * (gstPercentage / 200);
                      totalGSTAmount = cgstAmount + sgstAmount;
                    }

                    const grandTotal = subTotal + totalGSTAmount;

                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row>
                          <Table.Summary.Cell
                            index={0}
                            colSpan={5}
                            align="right"
                          >
                            <Text strong>Sub Total:</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={5}>
                            <Text strong>{formatIndianCurrency(subTotal)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                        {gstType === "interstate" ? (
                          <Table.Summary.Row>
                            <Table.Summary.Cell
                              index={0}
                              colSpan={5}
                              align="right"
                            >
                              <Text strong>IGST ({gstPercentage}%):</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5}>
                              <Text strong>
                                {formatIndianCurrency(igstAmount)}
                              </Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        ) : (
                          <>
                            <Table.Summary.Row>
                              <Table.Summary.Cell
                                index={0}
                                colSpan={5}
                                align="right"
                              >
                                <Text strong>CGST ({gstPercentage / 2}%):</Text>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell index={5}>
                                <Text strong>
                                  {formatIndianCurrency(cgstAmount)}
                                </Text>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                              <Table.Summary.Cell
                                index={0}
                                colSpan={5}
                                align="right"
                              >
                                <Text strong>SGST ({gstPercentage / 2}%):</Text>
                              </Table.Summary.Cell>
                              <Table.Summary.Cell index={5}>
                                <Text strong>
                                  {formatIndianCurrency(sgstAmount)}
                                </Text>
                              </Table.Summary.Cell>
                            </Table.Summary.Row>
                          </>
                        )}
                        <Table.Summary.Row>
                          <Table.Summary.Cell
                            index={0}
                            colSpan={5}
                            align="right"
                          >
                            <Text strong>Grand Total:</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={5}>
                            <Text strong style={{ color: "#52c41a" }}>
                              {formatIndianCurrency(grandTotal)}
                            </Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={6}>
                            <Text italic>
                              Amount in words:{" "}
                              {/* You might need to expose numberToWords from generateInvoicePdf.js or redefine it here */}
                              {/* For simplicity, if numberToWords is only for PDF, you can remove it from here. */}
                              {/* If you need it for display in the modal, you'd redefine it or import it. */}
                              {/* For now, I'll assume you only need it in the PDF for this example. */}
                            </Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    );
                  }}
                />
              </>
            )}

            <Descriptions
              column={2}
              bordered
              size="small"
              style={{ marginTop: "20px" }}
            >
              <Descriptions.Item label="Sub Total" span={2}>
                ₹{selectedInvoice.subTotal?.toFixed(2) || "0.00"}
              </Descriptions.Item>
              {selectedInvoice.gstType === "interstate" ? (
                <Descriptions.Item label="IGST Amount" span={2}>
                  ₹{selectedInvoice.igstAmount?.toFixed(2) || "0.00"}
                </Descriptions.Item>
              ) : (
                <>
                  <Descriptions.Item label="CGST Amount" span={1}>
                    ₹{selectedInvoice.cgstAmount?.toFixed(2) || "0.00"}
                  </Descriptions.Item>
                  <Descriptions.Item label="SGST Amount" span={1}>
                    ₹{selectedInvoice.sgstAmount?.toFixed(2) || "0.00"}
                  </Descriptions.Item>
                </>
              )}
              <Descriptions.Item label="Grand Total" span={2}>
                <Text strong style={{ fontSize: "18px", color: "#52c41a" }}>
                  ₹{selectedInvoice.totalAmount?.toFixed(2) || "0.00"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Amount in Words" span={2}>
                <Text italic>
                  {/* If you need numberToWords here, you will need to re-implement it or export it from generateInvoicePdf.js */}
                  {/* For now, removing the call since it's moved */}
                  {/* {numberToWords(Math.floor(selectedInvoice.totalAmount || 0))}{" "} */}
                  Rupees Only
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={2}>
                {getStatusTag(invoiceStatusMap[selectedInvoice._id])}
              </Descriptions.Item>
              <Descriptions.Item label="Closed" span={2}>
                {selectedInvoice.isClosed ? (
                  <Tag color="red">Yes</Tag>
                ) : (
                  <Tag color="green">No</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>

            {selectedInvoice.notes?.length > 0 && (
              <>
                <Divider orientation="left">
                  Notes ({selectedInvoice.notes.length})
                </Divider>
                {selectedInvoice.notes.map((note, index) => (
                  <div key={index} style={{ marginBottom: 8 }}>
                    <Text strong>{note.author}</Text> on{" "}
                    <Text type="secondary">{note.timestamp}</Text>
                    <p>{note.text}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="Item Specifications"
        open={itemViewModalVisible}
        onCancel={() => setItemViewModalVisible(false)}
        footer={
          <Button onClick={() => setItemViewModalVisible(false)}>Close</Button>
        }
        width={800}
      >
        {selectedInvoice && selectedInvoice.items && (
          <List
            itemLayout="vertical"
            dataSource={selectedInvoice.items}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={
                    <Text strong>{item.description || "No Description"}</Text>
                  }
                  description={
                    <>
                      <Text>Quantity: {item.quantity}</Text>
                      <br />
                      <Text>Rate: ₹{formatIndianCurrency(item.rate)}</Text>
                      <br />
                      {item.hsnSac && <Text>HSN/SAC: {item.hsnSac}</Text>}
                      {item.specifications &&
                        item.specifications.length > 0 && (
                          <>
                            <br />
                            <Text strong>Specifications:</Text>
                            <ul>
                              {item.specifications.map((spec, specIndex) => (
                                <li key={specIndex}>
                                  {spec.name}: {spec.value}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Modal>

      {selectedInvoice && (
        <NotesDrawer
          visible={notesDrawerVisible}
          onClose={() => setNotesDrawerVisible(false)}
          invoice={selectedInvoice}
          refreshInvoices={refreshInvoices}
        />
      )}

      {selectedInvoice && (
        <FollowUpDrawer
          visible={followUpDrawerVisible}
          onClose={() => setFollowUpDrawerVisible(false)}
          invoice={selectedInvoice}
          refreshInvoices={refreshInvoices}
        />
      )}

      <PaymentHistoryDrawer
        visible={paymentDrawerVisible}
        onClose={() => setPaymentDrawerVisible(false)}
        invoice={selectedInvoice}
        refreshInvoices={refreshInvoices}
      />
    </>
  );
};

export default InvoiceList;