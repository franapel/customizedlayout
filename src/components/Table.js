import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  row: {
    display: "flex",
    gap: 1,
  },
  table: {
    height: 40,
    width: 40,
    borderRadius: "8%",
  },
  table_name: {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 20,
    color: "white",
  },
});

const Table = ({ tableData, measures }) => {
  const classes = useStyles();

  if (!measures) measures = { x: 1, y: 1 };

  let fontSize = 15;

  if (measures.x === 1 && measures.y === 1) fontSize *= 1.5;
  else if (measures.x > measures.y) fontSize *= measures.x;
  else fontSize *= measures.y;

  return (
    <div className={classes.container}>
      {[...Array(measures.y)].map((row, key) => {
        return (
          <div className={classes.row} key={key}>
            {[...Array(measures.x)].map((table, key2) => (
              <div
                className={classes.table}
                style={{
                  backgroundColor:
                    tableData.state === "free" ? "mediumseagreen" : "steelblue",
                }}
                key={key + ";" + key2}
              />
            ))}
          </div>
        );
      })}
      <p className={classes.table_name} style={{ fontSize }}>
        {tableData.number}
      </p>
    </div>
  );
};

export default Table;
