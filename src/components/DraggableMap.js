import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import Draggable from "react-draggable";
import Table from "./Table";
import AddTableDialog from "./AddTableDialog";

const useStyles = makeStyles({
  container: {
    width: 600,
    height: 600,
    position: "relative",
    margin: "5px auto",
    backgroundColor: "white",
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
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

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export default function DraggableMap() {
  const classes = useStyles();

  // atributos de las mesas:
  // number (numero de la mesa)
  // measures ({x,y} medidas de la mesa)
  // position ({x,y} posicion de la mesa en el mapa)
  // newAdded (boolean que indica si la mesa es añadida en la edicion en curso)
  // shape string que indica si es "rectangle" o "circle"
  // state indica si la mesa esta libre, ocupado u otro
  const [tables, setTables] = useState();
  // estado que se usa para hacer el mapa editable o no
  const [editable, setEditable] = useState({
    label: "Editar Mapa",
    isTrue: false,
    hasChanges: false,
  });
  // estado que se usa para volver a renderizar
  // el mapa de mesas cuando se cancela la edición
  const [mapKey, setMapKey] = useState("keyone");
  // estado que indica la apertura del dialogo para agregar una nueva mesa
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      const data = await fetch(API_URL);
      const tables = await data.json();
      setTables(tables);
    };
    fetchTables();
  }, []);

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
    const newTables = [...tables];
    newTables.forEach((table) => {
      if (table.newPosition) table.position = table.newPosition;
      table.newPosition = undefined;
      delete table.newAdded;
    });

    const saveTables = async () => {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTables),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    saveTables();

    setTables(newTables);
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
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Agregar mesa
          </Button>
        )}
      </div>

      <div key={mapKey} className={classes.mapContainer}>
        {!tables ? (
          <Backdrop open style={{ position: "absolute" }}>
            <CircularProgress />
          </Backdrop>
        ) : (
          tables.map((table, index) => (
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
                <Table tableData={table} />
              </div>
            </Draggable>
          ))
        )}
      </div>

      <AddTableDialog
        states={{
          tables,
          setTables,
          editable,
          setEditable,
          openDialog,
          setOpenDialog,
        }}
      />
    </Grid>
  );
}
