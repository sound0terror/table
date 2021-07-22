import {TableCell} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        padding: "5px",
        borderRight: "1px solid rgba(0,0,0,0.2)"
    }
})

const BodyCell = (props) => {
    const classes = useStyles(props);
    return (
        <TableCell className={classes.root} {...props}/>
    )
}

export default BodyCell;