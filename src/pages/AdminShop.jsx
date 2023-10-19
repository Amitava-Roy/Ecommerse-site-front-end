import React, { useState } from "react";
import ViewAdminProducts from "../component/ui/ViewAdminProducts";
import FormAddProduct from "../component/ui/FormAddProduct";
import Styles from "../component/Product.module.css";
import { Box, Button, Modal } from "@mui/material";
import Classes from "./AdminShop.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

function AdminShop({ proudcts = [] }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={Classes.container}>
      <div>
        <Button
          sx={{ mt: 3, mb: 3 }}
          fullWidth
          variant="outlined"
          onClick={handleOpen}
        >
          Add a Poduct
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormAddProduct handleClose={handleClose} />
          </Box>
        </Modal>
      </div>

      <div className={Styles.grid}>
        {proudcts.map((prod) => (
          <ViewAdminProducts key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default AdminShop;
