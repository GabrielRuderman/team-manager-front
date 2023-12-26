import React from "react";
import { Link, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styles from "../styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Typography variant="overline" display="block">© Developed by Gabriel Ruderman</Typography>
      <div className={styles.contact}>
        <Link href="https://www.linkedin.com/in/gabriel-ruderman/" underline="none" variant="body2" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon fontSize="large"/>
        </Link>
        <Link href="https://api.whatsapp.com/send?phone=5491165019584" underline="none" variant="body2" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon color="success" fontSize="large"/>
        </Link>
      </div>
    </div>
  );
}

export default Footer;