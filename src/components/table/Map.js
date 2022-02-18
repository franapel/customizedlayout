import { makeStyles } from "@material-ui/styles"
import {
    Button,
} from "@mui/material"
import Table from "./Table"
import tablesFromData from "../../data/tables"
import { useState } from "react";

const useStyles = makeStyles({
    container: {
        maxWidth: "80%",
        minHeight: "60vh",
        margin: "110px auto 20px",
        padding: "5%",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "fit-content(100%)",
        backgroundColor: "white"
    },
    addBtn: {
        position: "absolute",
        top: 100,
        left: 80
    }
})

const Map = () => {

    const classes = useStyles();

    const [tables, setTables] = useState(tablesFromData);    

    return (
        <>
            {/* <Button className={classes.addBtn} variant="contained" color="success"
                onClick={handleOpenDialog}>+ Mesa</Button>           */}

            <div className={classes.container}>
                {tables.map((table, i) =>
                    <Table key={i} tableData={table} />
                )}
            </div>
        </>

    );
};

export default Map;