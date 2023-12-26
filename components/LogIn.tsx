import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import { isEmail, isEmpty } from 'validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccessContainer from "./common/AccessContainer";
import { validateCredentials } from "../pages/api/userApi";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const LogIn: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
    
    const handleClickShowPassword: () => void = () => setShowPassword((showPassword) => !showPassword);

    const handleLogInClick: () => void = async () => {
        setError(null);

        if (!isEmail(email)) {
            setError("Please insert a correct email");
        } else if (isEmpty(password)) {
            setError("The password can't be empty");
        } else {
            const response = await validateCredentials(email, password);
            switch(response.code) {
                case 1:
                    document.cookie = `authToken=${response.token}; max-age=3600; path=/; secure; samesite=strict`;
                    router.push("./dashboard");
                    break;
                case 2:
                    setError("The password is incorrect");
                    break;
                case 3:
                    setError("The email is not registered");
                    break;
                default:
                    setError("Error. Try again later");
                    break;
            }
        }
        setTimeout(() => {
            setError(null);
        }, 2500);
    }

    const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setForgotPasswordDialogOpen(true);
    }

    return (
        <>
            <AccessContainer>
                <Typography variant="h5">Log In</Typography>
                <TextField label="Email" onChange={e => setEmail(e.target.value)} type="email" value={email} variant="outlined" />
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </FormControl>
                <Button onClick={handleLogInClick} variant="contained">LOG IN</Button>
                <Link href="/" underline="none" variant="body2" onClick={handleForgotPasswordClick}>
                    {"Forgot password?"}
                </Link>
                {error && <Alert severity="error">{error}</Alert>}
            </AccessContainer>
            {forgotPasswordDialogOpen && <ForgotPasswordDialog setDialogOpen={setForgotPasswordDialogOpen} />}
        </>
    );
}

export default LogIn;