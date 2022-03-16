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
  },
  table_text: {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -55%)",
    fontSize: 20,
    fontWeight: 700,
    color: "white",
    textShadow:
      "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;",
  },
});

const Table = ({ tableData }) => {
  const classes = useStyles();
  const { measures } = tableData;

  let fontSize = 20;

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
                  borderRadius: tableData.shape === "rectangle" ? "8%" : "100%",
                }}
                key={key + ";" + key2}
              />
            ))}
          </div>
        );
      })}
      <p className={classes.table_text} style={{ fontSize }}>
        {tableData.number}
      </p>
    </div>
  );
};

export default Table;
