import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { isEmail, isEmpty, isLength } from "validator";
import AccessContainer from "./common/AccessContainer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUser } from "../pages/api/userApi";

const SignUp: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const handleClickShowPassword: () => void = () => setShowPassword((showPassword) => !showPassword);

    const handleSignUpClick: () => void = async () => {
        setError(null);

        if (!isEmail(email)) {
            setError("Please insert a correct email");
        } else if (isEmpty(name)) {
            setError("The name can't be empty");
        } else if (!isLength(password, { min: 6 })) {
            setError("The password must be at least 6 characters");
        } else {
            const response = await createUser(email, name, password);
            switch(response.code) {
                case 1:
                    document.cookie = `authToken=${response.token}; max-age=3600; path=/; secure; samesite=strict`;
                    router.push("./dashboard");
                    break;
                case 2:
                    setError("The email already exists");
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
    
    return (
        <AccessContainer>
            <Typography variant="h5">Sign Up</Typography>
            <TextField label="Email" onChange={e => setEmail(e.target.value)} type="email" value={email} variant="outlined" />
            <TextField label="Name" onChange={e => setName(e.target.value)} type="text" value={name} variant="outlined" />
            <FormControl>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    type={showPassword ? "text" : "password"}
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
            <Button onClick={handleSignUpClick} variant="contained">SIGN UP</Button>
            {error && <Alert severity="error">{error}</Alert>}
        </AccessContainer>
    );
}

export default SignUp;