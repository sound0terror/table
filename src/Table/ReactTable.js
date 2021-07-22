import React, {useEffect} from 'react'
import {Table, TableBody, TableFooter, TableHead} from '@material-ui/core'
import { useTable, useFlexLayout, useSortBy, useResizeColumns } from 'react-table'
import HeadRow from "./HeadRow";
import HeadCell from "./HeadCell";
import BodyRow from "./BodyRow";
import BodyCell from "./BodyCell";
import {makeStyles} from "@material-ui/styles";
import './ReactTable.css';
import Pagination from "./Pagination";


const defaultPropGetter = () => ({});

const useStyles = makeStyles({
    root: {
        border: "1px solid rgba(0,0,0,0.1)"
    }
})
function ReactTable({
    page,
    count,
    pageSize,
    rowPerPageOptions,
    changeOptionHandler,
    changeInputPageHandler,
    changeSortHandler,
    columns,
    data,
    columnOrderName,
    desc = true,
    pagination = false,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    ...other}) {

    const classes = useStyles(other);
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 1000,
        }), [])
    const { getTableProps, headerGroups, rows, prepareRow, state: {sortBy}} = useTable({
        columns,
        data,
        defaultColumn,
        manualSortBy: true,
        initialState: {sortBy: [{id: columnOrderName, desc: true}]}
    }, useFlexLayout, useSortBy, useResizeColumns)

    // useEffect(() => {
    //     changeSortHandler("columnOrderName", sortBy[0].id);
    //     changeSortHandler("orderDirection", sortBy[0].desc ? 'desc' : 'asc');
    // })
    return (
        <Table className={classes.root} {...getTableProps()}>
            <TableHead>
                {headerGroups.map((headerGroup, i) => (
                    <HeadRow {...headerGroup.getHeaderGroupProps()} subtitle={!(headerGroups.length > 1 && i === 0)}>
                        {headerGroup.headers.map(column => (
                            <HeadCell
                                {...column.getHeaderProps(getHeaderProps(column))}
                                sort={column.isSorted ? column.isSortedDesc ? "desc" : "asc" : "default"}
                                subtitle={!(headerGroups.length > 1 && i === 0)}
                            >
                                <span {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                </span>

                                {headerGroups.length > 1 && i !== 0 && column.canResize && (
                                    <div
                                        {...column.getResizerProps()}
                                        className={`resizer ${
                                            column.isResizing ? 'isResizing' : ''
                                        }`}
                                    />
                                )}
                            </HeadCell>
                        ))}
                    </HeadRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <BodyRow {...row.getRowProps(getRowProps(row))} status={row.status}>
                            {row.cells.map(cell => {
                                return (
                                    <BodyCell {...cell.getCellProps([{style: cell.column.style}])}>
                                        {cell.render('Cell')}
                                    </BodyCell>
                                )
                            })}
                        </BodyRow>
                    )
                })}
            </TableBody>
            {pagination ?
                <TableFooter>
                    <Pagination page={page}
                                count={count}
                                pageSize={pageSize}
                                rowPerPageOptions={rowPerPageOptions}
                                changeOptionsHandler={changeOptionHandler}
                                changeInputPageHandler={changeInputPageHandler}
                    />
                </TableFooter> : null
            }
        </Table>
    )
}

export default ReactTable
