import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    table: {
        position: "relative",
        borderRadius: "8%"
    },
    table_name: {
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 20,
        color: "white"
    },
    chair: {
        position: "absolute",
        width: 8,
        aspectRatio: "1/1",
        borderRadius: "10%",
        backgroundColor: "gainsboro"
    },
    icon_container: {
        position: "absolute",
        top: "130%",
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
});

const handleTableClick = () => console.log("presionada")

const Table = ({ tableData, style, doubleVertical, doubleHorizontal }) => {
    const classes = useStyles()

    const tableMeasures = {
        height: doubleVertical ? 80 : 40,
        width: doubleHorizontal ? 80 : 40,
    };

    return (
        <div className={classes.table}
            style={{
                backgroundColor: tableData.state === "free" ? "mediumseagreen" : "steelblue",
                ...tableMeasures,
                ...style
            }}
            onClick={() => handleTableClick()}
        >

            <p className={classes.table_name}>{tableData.number}</p>

            {doubleVertical ?
                <>
                    <div className={classes.chair} style={{ top: "12%", right: "-25%" }} />
                    <div className={classes.chair} style={{ top: "12%", left: "-25%" }} />
                    <div className={classes.chair} style={{ top: "32%", right: "-25%" }} />
                    <div className={classes.chair} style={{ top: "32%", left: "-25%" }} />
                    <div className={classes.chair} style={{ bottom: "12%", right: "-25%" }} />
                    <div className={classes.chair} style={{ bottom: "12%", left: "-25%" }} />
                    <div className={classes.chair} style={{ bottom: "32%", right: "-25%" }} />
                    <div className={classes.chair} style={{ bottom: "32%", left: "-25%" }} />
                    <div className={classes.chair} style={{ top: "-13%", right: "20%" }} />
                    <div className={classes.chair} style={{ top: "-13%", left: "20%" }} />
                    <div className={classes.chair} style={{ bottom: "-13%", right: "20%" }} />
                    <div className={classes.chair} style={{ bottom: "-13%", left: "20%" }} />
                </> :
                doubleHorizontal ?
                    <>
                        <div className={classes.chair} style={{ top: "20%", right: "-13%" }} />
                        <div className={classes.chair} style={{ top: "20%", left: "-13%" }} />
                        <div className={classes.chair} style={{ bottom: "20%", right: "-13%" }} />
                        <div className={classes.chair} style={{ bottom: "20%", left: "-13%" }} />
                        <div className={classes.chair} style={{ top: "-25%", right: "32%" }} />
                        <div className={classes.chair} style={{ top: "-25%", left: "32%" }} />
                        <div className={classes.chair} style={{ bottom: "-25%", right: "32%" }} />
                        <div className={classes.chair} style={{ bottom: "-25%", left: "32%" }} />
                        <div className={classes.chair} style={{ top: "-25%", right: "12%" }} />
                        <div className={classes.chair} style={{ top: "-25%", left: "12%" }} />
                        <div className={classes.chair} style={{ bottom: "-25%", right: "12%" }} />
                        <div className={classes.chair} style={{ bottom: "-25%", left: "12%" }} />
                    </> :
                    <>
                        <div className={classes.chair} style={{ top: "20%", right: "-25%" }} />
                        <div className={classes.chair} style={{ top: "20%", left: "-25%" }} />
                        <div className={classes.chair} style={{ bottom: "20%", right: "-25%" }} />
                        <div className={classes.chair} style={{ bottom: "20%", left: "-25%" }} />
                        <div className={classes.chair} style={{ top: "-25%", right: "20%" }} />
                        <div className={classes.chair} style={{ top: "-25%", left: "20%" }} />
                        <div className={classes.chair} style={{ bottom: "-25%", right: "20%" }} />
                        <div className={classes.chair} style={{ bottom: "-25%", left: "20%" }} />
                    </>
            }
        </div>
    )
}

export default Table