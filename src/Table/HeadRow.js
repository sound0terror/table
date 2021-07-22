import {makeStyles} from "@material-ui/styles";
import {TableRow} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        background: (props => props.subtitle ? "#fff" : "rgba(0,0,0,0.03)"),
        borderBottom: (props => props.subtitle ? "none" : "1px solid rgba(0,0,0,0.05)"),
        boxShadow: props => props.subtitle ? "0 2px 15px 0 rgb(0 0 0 / 15%)" : "none",
        overflow: "auto"
    }
})

function HeadRow (props) {
    const {subtitle, ...other} = props;
    const classes = useStyles(props);
    return <TableRow {...other} className={classes.root}>
        {other.children}
    </TableRow>
}

export default HeadRow;