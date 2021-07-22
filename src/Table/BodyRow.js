import {withStyles} from "@material-ui/styles";
import {TableRow} from "@material-ui/core";


const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
    root: {
        background: styledBy('status', {
            blocked: "rgba(172, 37, 37, 0.5)",
            cancelled: "rgba(255, 255, 10, 0.6)",
            error: "orange",
            success: "rgba(37, 172, 37, 0.5)",
            processing: "grey"
        }),
        color: styledBy('status', {
            processing: "white"
        }),
        borderBottom: "solid 1px rgba(0,0,0,0.05)",
        boxShadow: props => props.subtitle ? "0 2px 15px 0 rgb(0 0 0 / 15%)" : "none",
        overflow: "auto"
    }
}

const BodyRow = withStyles(styles)((props) => {
    const {classes, ...other} = props;
    return (
        <TableRow {...other} className={classes.root}>
            {other.children}
        </TableRow>
    )
})

export default BodyRow;