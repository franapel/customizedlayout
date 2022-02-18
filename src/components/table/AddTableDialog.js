import { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material"


const addTableDialog = ({ tables, setTables }) => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddTable = () => {
        const tableId = document.getElementById("table-number").value;
        if (tableId !== "") {
            const newTable = {
                "id": tableId,
                "capacity": 0,
                "position": "0",
                "state": "free"
            };
            setTables([...tables, newTable]);
        }

        handleCloseDialog()

    }

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Agregar nueva mesa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ingresa el número de la nueva mesa
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="table-number"
                    label="Mesa"
                    type="number"
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancelar</Button>
                <Button onClick={handleAddTable}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default addTableDialog;