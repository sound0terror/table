import {TableCell} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
    root: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "5px",
        whiteSpace: "nowrap",
        lineHeight: "normal",
        textAlign: "center",
        fontWeight: "700",
        boxShadow: styledBy('sort', {
            default: "none",
            desc: 'inset 0 -3px 0 0 rgb(0 0 0 / 60%)',
            asc: 'inset 0 3px 0 0 rgb(0 0 0 / 60%)',
        }),
        borderRight: "1px solid rgba(0,0,0,0.2)",
        "&:last-child": {
            borderRight: "none"
        }
    }
}

const HeadCell = withStyles(styles)((props) => {
    const {classes, subtitle, ...other} = props;
    return (
        <TableCell {...other} className={classes.root}>
            {other.children}
        </TableCell>
    )
})

export default HeadCell;