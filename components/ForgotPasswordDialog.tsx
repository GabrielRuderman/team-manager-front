import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CircularProgress from '@mui/material/CircularProgress';
import { isEmail, isEmpty } from 'validator';
import { recoverPassword } from '../pages/api/userApi';

export default function ForgotPasswordDialog({ setDialogOpen }) {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>(null);
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    
    const handleClose: () => void = () => {
        setDialogOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleSend: () => void = () => {
        setError(null);
        if (isEmpty(email) || !isEmail(email)) {
            setError("Please insert a correct email");
        } else {
            setLoading(true);
            recoverPassword(email).then(response => {
                setLoading(false);
                switch(response.code) {
                    case 1:
                        setEmailSent(true);
                        setTimeout(() => {
                            setDialogOpen(false);
                        }, 15000);
                        break;
                    case 2:
                        setError("The email is not registered");
                        break;
                    default:
                        setError("An error occurred, try again later");
                        break;
                }
            });
        }
    }

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center" }}>Password Recovery</DialogTitle>
                {loading ?
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress/>
                    </DialogContent>
                : !emailSent ?
                    <>
                        <DialogContent>
                            <DialogContentText>
                                We will send an email with a link to recover your password.
                            </DialogContentText>
                            <TextField
                                error={!!error}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                helperText={error || ""}
                                variant="standard"
                                value={email}
                                onChange={handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSend}>Send</Button>
                        </DialogActions>
                    </>
                    :
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <MarkEmailReadIcon color="primary" sx={{ fontSize: 40, marginBottom: 2 }} />
                        <DialogContentText>
                            An email to <b>{email}</b> was sent.
                            <br />
                            Please check the spam folder.
                        </DialogContentText>
                    </DialogContent>
                }
        </Dialog>
    );
}