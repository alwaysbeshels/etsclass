import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";

let counter = 0;

function createData(numero, batiment, etage, matin, apresmidi, soir) {
    counter += 1;
    return {id: counter, numero, batiment, etage, matin, apresmidi, soir};
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    {id: 'numero', disablePadding: true, label: 'Numéro'},
    {id: 'batiment', disablePadding: true, label: 'Batiment'},
    {id: 'etage', disablePadding: true, label: 'Étage'},
    {id: 'matin', disablePadding: true, label: 'Matin'},
    {id: 'apresmidi', disablePadding: true, label: 'Après-Midi'},
    {id: 'soir', disablePadding: true, label: 'Soir'},
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Ascendant / Descendant"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'numero',
        selected: [],
        // TODO : Changer ici pour integration backend
        data: [
            createData("A2241", "A", "2e", "Libre", "Occupé", "Libre"),
            createData("A2546", "A", "2e", "Libre", "Libre", "Libre"),
            createData("B4241", "B", "4e", "Occupé", "Occupé", "Occupé"),
            createData("B1141", "B", "1e", "Libre", "Occupé", "Libre"),
            createData("E4236", "E", "4e", "Occupé", "Occupé", "Occupé"),
            createData("A4241", "A", "3e", "Libre", "Occupé", "Libre"),
            createData("E3241", "E", "3e", "Libre", "Libre", "Libre"),
            createData("B3251", "B", "3e", "Occupé", "Libre", " Occupé"),
            createData("E2141", "E", "2e", "Libre", "Occupé", "Libre"),
            createData("A1536", "A", "1e", "Occupé", "Occupé", "Libre"),
            createData("A4241", "A", "4e", "Libre", "Occupé", "Libre"),
            createData("A3241", "A", "3e", "Libre", "Libre", "Occupé"),
            createData("E2241", "E", "2e", "Occupé", "Occupé", "Occupé"),
            createData("B1141", "B", "1e", "Libre", "Occupé", "Libre"),
            createData("A3536", "A", "3e", "Occupé", "Occupé", "Libre")
        ],
        page: 0,
        rowsPerPage: 10,
        search: ''
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        
        var dataFilter = this.state.data.filter(
            (result) => {
                return result.numero.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div className={classes.tableResponsive}>
                <TextField
                    
                    placeholder="Rechercher par numéro"
                    value={this.state.search}
                    onChange={(event) => this.setState({search: event.target.value})}
                />
            <Paper className={classes.root}>
                <div>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(dataFilter, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell  component="th" scope="row" padding="default">
                                               <a href={`#/class/${n.numero}`}
                                                  style={{color: '#00acc1', textDecoration: "underline"}}>{n.numero}</a>
                                            </TableCell>
                                            <TableCell component="th" scope="row">{n.batiment}</TableCell>
                                            <TableCell component="th" scope="row" >{n.etage}</TableCell>
                                            <TableCell component="th" scope="row" >{n.matin}</TableCell>
                                            <TableCell component="th" scope="row" >{n.apresmidi}</TableCell>
                                            <TableCell component="th" scope="row" >{n.soir}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
            </div>
        );
    }
}

EnhancedTable.defaultProps = {
    tableHeaderColor: "gray"
};

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(tableStyle)(EnhancedTable);
