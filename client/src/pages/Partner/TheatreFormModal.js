
import { Col, Modal, Row, Form, Input, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTheatre, updateTheatre } from "../../api/theatre";

const TheatreFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
  theatres,
  setTheatres,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

const onFinish = async (values) => {
  try {
    dispatch(ShowLoading());
    let response = null;

    if (formType === "add") {
      response = await addTheatre({ ...values, owner: user._id });
      if (response.success && response.data) {
        setTheatres((prev) => [
          ...prev,
          { ...response.data, key: `theatre${response.data._id}` },
        ]);
      }
    } else {
      // ✅ Pass `_id` in payload instead of `theatreId`
      response = await updateTheatre({ ...values, _id: selectedTheatre._id });
      if (response.success && response.data) {
        setTheatres((prev) =>
          prev.map((t) =>
            t._id === response.data._id
              ? { ...response.data, key: `theatre${response.data._id}` }
              : t
          )
        );
      }
    }

    if (response.success) {
      message.success(response.message);
      setIsModalOpen(false);
      setSelectedTheatre(null);
    } else {
      message.error(response.message);
    }
    dispatch(HideLoading());
  } catch (err) {
    dispatch(HideLoading());
    message.error(err.message);
  }
};

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={selectedTheatre}
        onFinish={onFinish}
      >
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input placeholder="Enter the Theatre name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Theatre Address"
              name="address"
              rules={[
                { required: true, message: "Theatre address is required!" },
              ]}
            >
              <TextArea rows="3" placeholder="Enter the address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required!" }]}
            >
              <Input type="email" placeholder="Enter the email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[{ required: true, message: "Phone number is required!" }]}
            >
              <Input type="number" placeholder="Enter the contact number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreFormModal;
