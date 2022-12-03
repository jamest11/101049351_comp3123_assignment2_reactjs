import {Modal, Button, Box, Typography, FormGroup} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

const DelEmpModal = ({ open, setOpen, employee, callback }) => {

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {employee && (
          <>
            <Typography variant="h6" sx={{ mb: 1 }}>Confirm Deletion</Typography>
            <span>Are you sure you want to delete employee <strong>{employee.first_name} {employee.last_name}</strong>?</span>
            <FormGroup row sx={{ gap: 2, mt: 2, mb: 1, justifyContent: 'flex-end' }}>
              <Button variant="contained" size="small" color="secondary" onClick={() => callback(employee.eid)}>Delete</Button>
              <Button variant="contained" size="small" onClick={handleClose}>Cancel</Button>
            </FormGroup>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default DelEmpModal;