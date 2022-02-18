import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    container: {
        aspectRatio: 1,
        padding: "30%"
    },
    table: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: 'red',
        borderRadius: "15%"
    },
    table_name: {
        margin: 0,        
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "2.5vw",
        color: "white"
    },
    chair: {
        position: "absolute",
        width: "22%",
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
})

const tableData = {
    state: "free",
    id: "table1"
}

const handleTableClick = () => console.log("presionada")

const Table = ({ tableData }) => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.table}
            style={{ backgroundColor: tableData.state === "free" ? "mediumseagreen" : "steelblue" }}
                onClick={() => handleTableClick()} >

                <p className={classes.table_name}>{tableData.id}</p>
                <div className={classes.chair} style={{ top: "20%", right: "-25%" }} />
                <div className={classes.chair} style={{ top: "20%", left: "-25%" }} />
                <div className={classes.chair} style={{ bottom: "20%", right: "-25%" }} />
                <div className={classes.chair} style={{ bottom: "20%", left: "-25%" }} />
                <div className={classes.chair} style={{ top: "-25%", right: "20%" }} />
                <div className={classes.chair} style={{ top: "-25%", left: "20%" }} />
                <div className={classes.chair} style={{ bottom: "-25%", right: "20%" }} />
                <div className={classes.chair} style={{ bottom: "-25%", left: "20%" }} />
            </div>

            {/* {tableData.state === "seated" &&
                <div className={classes.icon_container} >
                    {orderState().hasReqCancel && <Icons icon="cancel" fontSize="2.8vw" msg="Quiere abortar servicio"/>}
                    {userState().reqPay && <Icons icon="pay" fontSize="2.8vw" msg="Requiere pagar"/>}
                    {userState().reqAttention && <Icons icon="attention" fontSize="2.8vw" msg="Requiere atención"/>}
                    {orderState().isServed === false && <Icons icon="pending" fontSize="2.8vw" msg="Servicio pendiente"/>}                    
                    {userState().notPayed ? <Icons icon="notpayed" fontSize="2.8vw" msg="No ha pagado"/>
                        : <Icons icon="payed" fontSize="2.8vw" msg="Abortar"/>}
                </div>} */}
        </div>
    )
}

export default Table