// components/customer-dashboard/EditProfileDialog.styles.ts
import { SxProps, Theme } from "@mui/material";

export const editProfileDialogStyles: { [key: string]: SxProps<Theme> } = {
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#023859",
    color: "#F2EFE9",
  },
  closeButton: {
    color: "#F2EFE9",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingTop: 1,
    backgroundColor: "#F2EFE9",
  },
  dialogContent: {
    paddingTop: 2,
    backgroundColor: "#F2EFE9",
  },
  dialogActions: {
    justifyContent: "flex-end",
    padding: "16px 24px",
    backgroundColor: "#F2EFE9",
  },
  saveButton: {
    backgroundColor: "#8BBF65",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#79a956",
    },
  },
};
