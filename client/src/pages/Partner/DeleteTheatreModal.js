
import { Modal, message } from "antd";
import { deleteTheatre } from "../../api/theatre";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  theatres,
  setTheatres
}) => {
  const dispatch = useDispatch();

  const handleOK = async () => {
    try {
      dispatch(ShowLoading());
      const theatreId = selectedTheatre._id;
      const response = await deleteTheatre(theatreId);
      if (response.success) {
        // Remove deleted theatre from state
        setTheatres(prev => prev.filter(t => t._id !== theatreId));
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      setSelectedTheatre(null);
      setIsDeleteModalOpen(false);
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading());
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      centered
      title="Delete Theatre"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOK}
    >
      <p>Are you sure you want to delete this theatre?</p>
      <p>This action can't be undone and you'll lose this theatre data.</p>
    </Modal>
  );
};

export default DeleteTheatreModal;
