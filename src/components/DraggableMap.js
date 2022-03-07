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
  Grid,
} from "@mui/material";
import Draggable from "react-draggable";
import Table from "./Table";
import tablesFromData from "../data/tables";

const useStyles = makeStyles({
  container: {
    width: 600,
    height: 600,
    position: "relative",
    margin: "5px auto",
    backgroundColor: "white",
  },
  buttons: {
    height: 200,
    position: "absolute",
    top: 50,
    right: "105%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableContainer: {
    width: "fit-content",
    position: "absolute",
  },
});

const DraggableMap = () => {
  const classes = useStyles();

  // atributos de las mesas:
  // number (numero de la mesa)
  // measures ({x,y} medidas de la mesa)
  // position ({x,y} posicion de la mesa en el mapa)
  // newAdded (boolean que indica si la mesa es añadida en la edicion en curso)
  const [tables, setTables] = useState([]);
  // estado que indica la apertura del dialogo para agregar una nueva mesa
  const [openDialog, setOpenDialog] = useState(false);
  // estado que se usa para hacer el mapa editable o no
  const [editable, setEditable] = useState({
    label: "Editar Mapa",
    isTrue: false,
    hasChanges: false,
  });
  // estado que se usa para volver a renderizar
  // el mapa de mesas cuando se cancela la edición
  const [mapKey, setMapKey] = useState("keyone");

  // transformar array de mesas en un objeto que tenga como keys
  // el numero de la mesa y como valor la mesa con sus atributos
  const tablesByNumber = tablesFromData.reduce((map, table) => {
    map[table.number] = table;
    return map;
  }, {});

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
    });
    setTables(newTables);

    const newEditable = { ...editable, hasChanges: true };
    setEditable(newEditable);

    setOpenDialog(false);
  };

  const handleMouseStop = (draggableNode, tableIndex) => {
    const newTables = [...tables];
    newTables[tableIndex].newPosition = {
      y: draggableNode.y,
      x: draggableNode.x,
    };
    setTables(newTables);

    const newEditable = { ...editable, hasChanges: true };
    setEditable(newEditable);
  };

  const handleEditMap = () => {
    setEditable({ label: "Cancelar Edición", isTrue: true, hasChanges: false });
  };

  const handleDiscardChanges = () => {
    const newTables = tables.filter((table) => {
      table.newPosition = undefined;
      return !table.newAdded;
    });
    setTables(newTables);

    setEditable({ label: "Editar Mapa", isTrue: false, hasChanges: false });

    setMapKey(mapKey !== "keyone" ? "keyone" : "keytwo");
  };

  const handleSaveChanges = () => {
    tables.forEach((table) => {
      table.position = table.newPosition;
      table.newPosition = undefined;
      delete table.newAdded;
    });

    setEditable({ label: "Editar Mapa", isTrue: false, hasChanges: false });
  };

  return (
    <Grid className={classes.container}>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={!editable.isTrue ? handleEditMap : handleDiscardChanges}
        >
          {editable.label}
        </Button>

        {editable.hasChanges && (
          <Button
            variant="contained"
            color="success"
            onClick={handleSaveChanges}
          >
            Guardar Cambios
          </Button>
        )}

        {editable.isTrue && (
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Agregar mesa
          </Button>
        )}
      </div>

      <div key={mapKey} style={{ width: "100%", height: "100%" }}>
        {tables.map((table, index) => (
          <Draggable
            bounds="parent"
            onStop={(e, node) => handleMouseStop(node, index)}
            disabled={!editable.isTrue}
            key={index}
            defaultPosition={table.position}
          >
            <div
              className={classes.tableContainer}
              style={{
                cursor: editable.isTrue ? "move" : "default",
              }}
            >
              <Table
                tableData={tablesByNumber[table.number]}
                measures={table.measures}
              />
            </div>
          </Draggable>
        ))}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Nueva Mesa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa el número de la nueva mesa y el espacio que usará.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="number_input"
            label="Número"
            variant="standard"
            style={{ width: 100 }}
          />
          <TextField
            margin="dense"
            id="vertical_input"
            label="Espacio vertical"
            variant="standard"
            style={{ width: 150, marginLeft: 10, marginRight: 10 }}
          />
          <TextField
            margin="dense"
            id="horizontal_input"
            label="Espacio horizontal"
            variant="standard"
            style={{ width: 150 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddTable}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DraggableMap;
