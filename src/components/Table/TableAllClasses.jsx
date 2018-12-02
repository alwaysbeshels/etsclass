import React from 'react';
import axios from "axios";
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
import Search from "@material-ui/icons/Search";

// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import { Checkbox } from '@material-ui/core';

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
    {id: 'number', disablePadding: true, label: 'Numéro', checkable: false},
    {id: 'building', disablePadding: true, label: 'Bâtiment', checkable: false},
    {id: 'floor', disablePadding: true, label: 'Étage', checkable: false},
    {id: 'morningSchedule', disablePadding: true, label: 'Matin', checkable: true},
    {id: 'afternoonSchedule', disablePadding: true, label: 'Après-Midi', checkable: true},
    {id: 'EveningSchedule', disablePadding: true, label: 'Soir', checkable: true},
];

const hashmapCodeMessage = {
    "C" : "Congé Férié! Aujourd'hui est une journée férié, ainsi tous les locaux sont disponibles.",
    "R" : "Relâche! Aujourd'hui est une journée de congé, ainsi tous les locaux sont disponibles.",
    "F" : "AVERTISSEMENT! Nous sommes présentement en période d'examen. Il nous est impossiblem pour le moment, de " +
        "connaître les locaux occupés du campus. Par conséquent, nous ne pouvons garantir que les horaires" +
        " ci-dessous sont exactes.",
    "P" : "AVERTISSEMENT! Aujourd'hui est enseigné comme un "
};

const weekdays = {
    "Dim" : "Dimanche",
    "Lun" : "Lundi",
    "Mar" : "Mardi",
    "Mer" : "Mercredi",
    "Jeu" : "Jeudi",
    "Ven" : "Vendredi",
    "Sam" : "Samedi"
};


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
                        var label;
                        if(row.checkable) {
                            label = 
                            <div>{row.label}
                                <Checkbox 
                                onChange={event => this.props.handlePeriodFilters(row.label, event.target.checked)}/>
                            </div>;
                        }
                        else {
                            label = 
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
                        }

                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                            {label}
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
        search: '',
        "Matin": false,
        "Après-Midi": false,
        "Soir": false
    };

    componentDidMount() {
        const timeNow = new Date();

        axios.get('https://log515-backend.herokuapp.com/classroom?day=' + timeNow.getDate() + "&month=" + timeNow.getMonth())
            .then(response => {
                this.setState({
                    data: response.data,
                    classrooms: response.data.classrooms,
                    code: response.data.code
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

    handlePeriodFilters = (period, value) =>
    {
        this.setState({[period] : value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.classrooms.length - page * rowsPerPage);
        const timeNow = new Date();
        let dayName = (weekdays.hasOwnProperty(this.state.code)) ? this.state.code : Object.keys(weekdays)[timeNow.getDay()];
        var dataFilter = this.state.classrooms.filter(
            (result) => {
                var isFree = true;
                if(this.state["Matin"]) {
                    isFree = !result.schedule[dayName].includes(1);
                }
                if(isFree && this.state["Après-Midi"]) {
                    isFree = !result.schedule[dayName].includes(2);
                }
                if(isFree && this.state["Soir"]) {
                    isFree = !result.schedule[dayName].includes(3);
                }

                return result.number.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && isFree;
            }
        );
        return (
            <div className={classes.tableResponsive}>
                { (this.state.code !== null && !weekdays.hasOwnProperty(this.state.code)) &&
                <SnackbarContent
                    message={hashmapCodeMessage[this.state.code] + ""}
                    color={(this.state.code === "R" || this.state.code==="C") ? "primary" : "danger"}
                />
                }
                { (weekdays.hasOwnProperty(this.state.code)) &&
                <SnackbarContent
                    message={hashmapCodeMessage["P"] + weekdays[this.state.code]}
                    color={"warning"}
                />
                }
                <div className={classes.searchWrapper} >
                    <TextField
                        className={classes.margin + " " + classes.search}
                        style={{minWidth:"20em", margin:"0.5em"}}
                        placeholder="Rechercher par numéro"
                    value={this.state.search}
                    onChange={(event) => this.setState({search: event.target.value})}
                    />
                    <Button
                        color="white" aria-label="edit"
                        justIcon round disabled style={{marginLeft:"-1.5em"}} >
                        <Search  />
                    </Button>
                </div>
            <Paper className={classes.root}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.classrooms.length}
                            handlePeriodFilters={this.handlePeriodFilters}
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
                                                message={!n.schedule[dayName].includes(1) ? "Libre  " : "Occupé"}
                                                color={!n.schedule[dayName].includes(1) ? "success" : "danger"}
                                            /></TableCell>
                                            <TableCell component="th" scope="row" id={"afternoonSchedule"}>
                                                <SnackbarContent
                                                message={!n.schedule[dayName].includes(2) ? "Libre  " : "Occupé"}
                                                color={!n.schedule[dayName].includes(2) ? "success" : "danger"}
                                            /></TableCell>
                                            <TableCell component="th" scope="row" id={"eveningSchedule"}>
                                                <SnackbarContent
                                                message={!n.schedule[dayName].includes(3) ? "Libre  " : "Occupé"}
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
                    rowsPerPageOptions={[10, 25, 100, dataFilter.length]}
                    component="div"
                    count={dataFilter.length}
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
