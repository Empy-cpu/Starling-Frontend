// components/customer-dashboard/EditProfileDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Customer from "@/types/customer";
import { editProfileDialogStyles as styles } from "./edit-profile-dialog-styles";

export interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  onSave: () => void | Promise<void>;
}

export default function EditProfileDialog({
  open,
  onClose,
  customer,
  setCustomer,
  onSave,
}: EditProfileDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={styles.dialogTitle}>
        <Typography variant="h6">Edit Profile</Typography>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.formBox}>
          <TextField
            label="First Name"
            value={customer?.firstName || ""}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev!, firstName: e.target.value }))
            }
          />
          <TextField
            label="Last Name"
            value={customer?.lastName || ""}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev!, lastName: e.target.value }))
            }
          />
          <TextField
            label="Email"
            value={customer?.email || ""}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev!, email: e.target.value }))
            }
          />
          <TextField
            label="Phone Number"
            value={customer?.phoneNumber || ""}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev!,
                phoneNumber: e.target.value,
              }))
            }
          />
          <TextField
            label="Address"
            multiline
            rows={2}
            value={customer?.address || ""}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev!,
                address: e.target.value,
              }))
            }
          />
          <TextField
            label="Entry Instructions"
            multiline
            rows={3}
            value={customer?.entryInstructions || ""}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev!,
                entryInstructions: e.target.value,
              }))
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer?.hasPets || false}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev!,
                    hasPets: e.target.checked,
                  }))
                }
              />
            }
            label="Has Pets"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer?.cleanedRecently || false}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev!,
                    cleanedRecently: e.target.checked,
                  }))
                }
              />
            }
            label="Recently Cleaned"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave} sx={styles.saveButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
