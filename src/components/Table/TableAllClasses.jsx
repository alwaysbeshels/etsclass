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
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import axios from "axios";

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
    {id: 'number', disablePadding: true, label: 'Numéro'},
    {id: 'building', disablePadding: true, label: 'Bâtiment'},
    {id: 'floor', disablePadding: true, label: 'Étage'},
    {id: 'morningSchedule', disablePadding: true, label: 'Matin'},
    {id: 'afternoonSchedule', disablePadding: true, label: 'Après-Midi'},
    {id: 'EveningSchedule', disablePadding: true, label: 'Soir'},
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
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'numero',
        selected: [],
        data: [],
        classrooms: [],
        page: 0,
        rowsPerPage: 10,
        search: ''
    };

    componentDidMount() {
        const timeNow = new Date();

        axios.get('https://log515-backend.herokuapp.com/classroom?day=' + timeNow.getDate() + "&month=" + timeNow.getMonth())
            .then(response => {
                this.setState({
                    data: response.data,
                    classrooms: response.data.classrooms
                });
            }).catch(function (error) {
            console.log(error);
        })
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
        const {order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.classrooms.length - page * rowsPerPage);
        const timeNow = new Date();
        const weekday = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        let dayName = weekday[timeNow.getDay()];

        var dataFilter = this.state.classrooms.filter(
            (result) => {
                return result.number.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
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
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.classrooms.length}
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
                                            hover
                                            onClick={event => window.location = `#/class/${n.number}`}
                                            style={{cursor:"pointer"}}
                                        >
                                            <TableCell  component="th" scope="row" padding="default">{n.number}</TableCell>
                                            <TableCell component="th" scope="row">{n.building}</TableCell>
                                            <TableCell component="th" scope="row" >{n.floor}</TableCell>
                                            <TableCell component="th" scope="row" id={"morningSchedule"}>
                                                <SnackbarContent
                                                message={!n.schedule[dayName].includes(1) ? "Libre" : "Occupé"}
                                                color={!n.schedule[dayName].includes(1) ? "success" : "danger"}
                                            /></TableCell>
                                            <TableCell component="th" scope="row" id={"afternoonSchedule"}>
                                                <SnackbarContent
                                                message={!n.schedule[dayName].includes(2) ? "Libre" : "Occupé"}
                                                color={!n.schedule[dayName].includes(2) ? "success" : "danger"}
                                            /></TableCell>
                                            <TableCell component="th" scope="row" id={"eveningSchedule"}>
                                                <SnackbarContent
                                                message={!n.schedule[dayName].includes(3) ? "Libre" : "Occupé"}
                                                color={!n.schedule[dayName].includes(3) ? "success" : "danger"}
                                            /></TableCell>
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
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.classrooms.length}
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
