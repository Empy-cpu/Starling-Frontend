// components/ProfileCard.tsx
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Email, Home, Phone } from "@mui/icons-material";
import Customer from "@/types/customer";
import { profileCardStyles as styles } from "./profile-card-styles";

export default function ProfileCard({
  customer,
  onEditClick,
}: {
  customer: Customer;
  onEditClick: () => void;
}) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent>
          <Box sx={styles.header}>
            <Avatar sx={styles.avatar}>
              {customer.firstName[0]}
              {customer.lastName[0]}
            </Avatar>
            <Box sx={styles.info}>
              <Typography variant="h6">
                {customer.firstName} {customer.lastName}
              </Typography>
              <Typography variant="body2">
                Member since {formatDate(customer.createdAt)}
              </Typography>
            </Box>
            <IconButton onClick={onEditClick} sx={styles.iconButton}>
              <Edit />
            </IconButton>
          </Box>

          <Divider />

          <Box mt={2}>
            <Box sx={styles.detailItem}>
              <Email fontSize="small" />
              <Typography variant="body2">{customer.email}</Typography>
            </Box>
            <Box sx={styles.detailItem}>
              <Phone fontSize="small" />
              <Typography variant="body2">{customer.phoneNumber}</Typography>
            </Box>
            <Box sx={styles.detailItem}>
              <Home fontSize="small" />
              <Typography variant="body2">{customer.address}</Typography>
            </Box>
          </Box>

          <Box sx={styles.chipGroup}>
            {customer.hasPets && (
              <Chip label="Has Pets" size="small" color="success" />
            )}
            {customer.cleanedRecently && (
              <Chip label="Recently Cleaned" size="small" color="info" />
            )}
          </Box>

          {customer.entryInstructions && (
            <Box sx={styles.entrySection}>
              <Typography variant="subtitle2" color="textSecondary">
                Entry Instructions:
              </Typography>
              <Typography variant="body2">
                {customer.entryInstructions}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
