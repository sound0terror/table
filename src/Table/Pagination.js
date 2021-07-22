import {Button, FormControl, Grid, MenuItem, Select, TextField} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import {useState} from "react";


const useStyles = makeStyles({
    root: {
        fontSize: '14px'
    },
    button: {
        textTransform: "none",
        width: "100%"
    },
    pageInput: {
        width: "70px",
        margin: '0 4px',
        paddingLeft: '10px'
    },
    pageSelect: {
        padding: "4px 10px",
        fontSize: "14px"
    }
})
const Pagination = (
    {
        count,
        page,
        changeInputPageHandler,
        rowPerPageOptions,
        changeOptionsHandler,
        pageSize,
        onChangePage,
        ...props
    }) => {
    const classes = useStyles(props)

    const pageCount = Math.ceil(count / pageSize);
    const handleBackButtonClick = event => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs>
                    <Button
                        disabled={page === 0}
                        onClick={handleBackButtonClick}
                        className={classes.button}
                        variant='contained'
                        color="default">Предыдущая
                    </Button>
                </Grid>
                <Grid item xs>
                    Страница
                    <input className={classes.pageInput} type="number" value={page + 1}
                           onChange={changeInputPageHandler}/>
                    из {pageCount}
                </Grid>
                <Grid item xs>
                    <FormControl className={classes.pageSelect}>
                        <Select
                            value={pageSize}
                            onChange={(e) => {
                                changeOptionsHandler(e.target.value)
                            }}
                        >
                            {rowPerPageOptions.map(option => (
                                <MenuItem value={option}>{option} записей</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <Button
                        onClick={handleNextButtonClick}
                        disabled={page >= Math.ceil(count / pageSize) - 1}
                        className={classes.button}
                        variant='contained'
                        color="default">Следующая
                    </Button>
                </Grid>
            </Grid>
        </div>

    )
}

export default Pagination;