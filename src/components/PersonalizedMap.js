import { makeStyles } from "@material-ui/styles"
import Table from "./Table"
import tablesFromData from "../data/tables"

const useStyles = makeStyles({
    container: {
        width: 600,
        minHeight: "60vh",
        margin: "5px auto",
        padding: "20px 0",
        backgroundColor: "white",
    },
    topContainer: {
        height: 60,
        display: "flex",
        justifyContent: "space-evenly",
    },
    vereda: {
        height: 20,
        backgroundColor: "gray",
    },
    midContainer: {
        display: "grid",
        gridTemplateColumns: "3fr 4fr 4fr",
        columnGap: 10
    },
    midLeftContainer: {
        maxHeight: 160,
        marginTop: 50,
        paddingRight: 20,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    midCenterContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    midCenterTopContainer: {
        marginBottom: 20,
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    midRightContainer: {
        maxHeight: 200,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});


const PersonalizedMap = () => {

    const classes = useStyles();

    const tablesByNumber = tablesFromData.reduce((map, table) => {
        map[table.number] = table;
        return map;
    }, {});

    return (
        <div className={classes.container}>
            {/* TOP */}
            <div className={classes.topContainer}>
                <Table tableData={tablesByNumber[10]} />
                <Table tableData={tablesByNumber[9]} />
                <Table tableData={tablesByNumber[8]} />
                <Table tableData={tablesByNumber[7]} />
            </div>

            {/* VEREDA */}
            <div className={classes.vereda} />

            {/* MID */}
            <div className={classes.midContainer}>
                {/* MID LEFT */}
                <div className={classes.midLeftContainer}>
                    <Table tableData={tablesByNumber[11]} style={{ margin: "15px auto" }} />
                    <Table tableData={tablesByNumber[14]} style={{ margin: "15px auto" }} />
                    <Table tableData={tablesByNumber[12]} style={{ margin: "15px auto" }} />
                    <Table tableData={tablesByNumber[13]} style={{ margin: "15px auto" }} />
                </div>
                {/* MID CENTER */}
                <div className={classes.midCenterContainer}>
                    {/* MID CENTER TOP */}
                    <div className={classes.midCenterTopContainer}>
                        <Table tableData={tablesByNumber[3]} doubleVertical />
                        <div>
                            <Table tableData={tablesByNumber[4]} style={{ marginBottom: 35 }} />
                            <Table tableData={tablesByNumber[2]} />
                        </div>
                    </div>
                    {/* MID CENTER BOTTOM */}
                    <Table tableData={tablesByNumber[1]} doubleHorizontal style={{ marginTop: 25 }} />
                    <div style={{ height: 1, width: "50%", backgroundColor: "brown", marginTop: 20 }} />
                    <div style={{ height: 40, width: 80, backgroundColor: "brown", borderRadius: "8%", marginTop: 20 }} />
                    <Table tableData={tablesByNumber[22]} doubleHorizontal style={{ marginTop: 25 }} />
                    <div style={{ height: 40, width: 80, backgroundColor: "brown", borderRadius: "8%", marginTop: 25 }} />
                    <Table tableData={tablesByNumber[21]} doubleHorizontal style={{ marginTop: 25 }} />
                    <div style={{ height: 40, width: 80, backgroundColor: "brown", borderRadius: "8%", marginTop: 25 }} />
                    <Table tableData={tablesByNumber[1]} doubleHorizontal style={{ marginTop: 25 }} />
                    <div style={{ height: 50, width: 80, backgroundColor: "gray", borderRadius: "8%", marginTop: 25 }} >
                        <p style={{ margin: 0, lineHeight: "25px", fontSize: 13, color: "white", textAlign: "center" }}>
                            MESAS NO HABITABLES
                        </p>
                    </div>
                    <div style={{ height: 80, width: 80, backgroundColor: "green", marginTop: 25 }} >
                        <p style={{ margin: 0, lineHeight: "80px", color: "white", textAlign: "center" }}>
                            CAJA
                        </p>
                    </div>
                </div>

                {/* MID RIGHT */}
                <div className={classes.midRightContainer}>
                    <Table tableData={tablesByNumber[5]} doubleVertical style={{ margin: "25px 10px" }} />
                    <Table tableData={tablesByNumber[6]} doubleVertical style={{ margin: "25px 10px" }} />
                    <Table tableData={tablesByNumber[20]} style={{ margin: "25px 10px" }} />
                </div>
            </div>


        </div>

    );
};

export default PersonalizedMap;