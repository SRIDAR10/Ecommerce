import { Modal, Typography } from 'antd';
import React from 'react';

const {Text} = Typography;

const DeletePopup = ({showModal, handleClose, actionComponents}) => {
  return (
    <Modal
    open={showModal}
    title="Delete Confirmation"
    styles={{
      body: {
        paddingTop: '1em',
      },
    }}
    onCancel={handleClose}
    footer={actionComponents}
  >
     <Text>Are you sure you want to delete ?</Text>
    </Modal>
  );
};

export default DeletePopup;