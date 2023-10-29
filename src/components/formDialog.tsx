import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, } from "@mui/material";
import { TRANSLATE_TERMS } from "src/utils";

export const FormDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [role, setRole] = useState("");

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{TRANSLATE_TERMS.CREATE_NEW_ACCOUNT}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                    <FormControl sx={{ mt: 2, width: "25ch" }}>
                        <InputLabel id="role-select-label">
                            Role
                        </InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            label="Role"
                            value={role}
                            onChange={handleRoleChange}
                        >
                            <MenuItem value={10}>ADMIN</MenuItem>
                            <MenuItem value={20}>Partner</MenuItem>
                            <MenuItem value={30}>Customer</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
