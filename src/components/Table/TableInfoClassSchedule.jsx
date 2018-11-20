import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";

function CustomTable({...props}) {
    const {classes, tableHead, tableData, tableHeaderColor} = props;
    let first = 0;
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell}
                                        key={key}
                                    >
                                        <h4><b>{prop}</b></h4>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        return (
                            <TableRow key={key}>
                                {prop.map((prop, key) => {
                                    if (first++ === 0) {
                                        return (
                                            <TableCell
                                                className={classes.tableCell}
                                                key={key}>
                                                <h4><b>{prop}</b></h4>
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                <SnackbarContent
                                                    message={prop ? "Libre" : "Occupé"}
                                                    color={prop ? "success" : "danger"}
                                                />
                                            </TableCell>
                                        );
                                    }
                                })}
                                <p hidden> {first = 0}</p>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "black"
};

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
        "black"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
