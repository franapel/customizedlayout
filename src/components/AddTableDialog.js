import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const useStyles = makeStyles({
  tableButtonContainer: {
    margin: "20px 0 40px",
    display: "flex",
    gap: 20,
  },
  tableButton: {
    height: 40,
    width: 40,
    borderRadius: "8%",
    backgroundColor: "steelblue",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)",
      boxShadow: "0 0 5px orange",
    },
    transition: "all .1s",
  },
  clicked: {
    transform: "scale(1.2)",
    boxShadow: "0 0 5px orange",
  },
});

export default function AddTabelDialog({ states }) {
  const classes = useStyles();

  const [selectedShape, setSelectedShape] = useState(null);

  const {
    tables,
    setTables,
    editable,
    setEditable,
    openDialog,
    setOpenDialog,
  } = states;

  const handleChangeButtonState = (e) => {
    const name = e.target.getAttribute("name");
    if (selectedShape === name) setSelectedShape(null);
    else setSelectedShape(name);
  };

  const handleAddTable = (e) => {
    const tableNumber = Number(document.getElementById("number_input").value);
    const tableMeasures = {
      y: Number(document.getElementById("vertical_input").value),
      x: Number(document.getElementById("horizontal_input").value),
    };
    const newTables = [...tables];
    newTables.push({
      number: tableNumber,
      measures: tableMeasures,
      position: { y: 0, x: 0 },
      newAdded: true,
      shape: selectedShape,
      state: "free",
    });
    setTables(newTables);

    const newEditable = { ...editable, hasChanges: true };
    setEditable(newEditable);

    setSelectedShape(null);

    setOpenDialog(false);
  };

  const handleCancel = () => {
    setSelectedShape(null);
    setOpenDialog(false);
  };

  return (
    <Dialog
      className={classes.container}
      open={openDialog}
      onClose={() => setOpenDialog(false)}
    >
      <DialogTitle>Agregar Nueva Mesa</DialogTitle>
      <DialogContent>
        <DialogContentText>Elige la forma de la nueva mesa.</DialogContentText>
        <div className={classes.tableButtonContainer}>
          <div
            name="rectangle"
            className={`${classes.tableButton} ${
              selectedShape === "rectangle" && classes.clicked
            }`}
            style={{ borderRadius: "8%" }}
            onClick={handleChangeButtonState}
          />
          <div
            name="circle"
            className={`${classes.tableButton} ${
              selectedShape === "circle" && classes.clicked
            }`}
            style={{ borderRadius: "100%" }}
            onClick={handleChangeButtonState}
          />
        </div>
        <DialogContentText>
          Ingresa el número de la nueva mesa y el espacio que usará.
        </DialogContentText>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            margin="dense"
            id="number_input"
            label="Número"
            variant="standard"
            style={{ width: 60 }}
          />
          <TextField
            margin="dense"
            id="vertical_input"
            label="Espacio vertical"
            variant="standard"
            style={{ width: 140 }}
          />
          <TextField
            margin="dense"
            id="horizontal_input"
            label="Espacio horizontal"
            variant="standard"
            style={{ width: 140 }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button onClick={handleAddTable} disabled={!selectedShape}>
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
