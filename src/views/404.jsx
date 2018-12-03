import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";

const style = {
    typo: {
        paddingLeft: "25%",
        marginBottom: "40px",
        position: "relative"
    },
    note: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        bottom: "10px",
        color: "#c0c1c2",
        display: "block",
        fontWeight: "400",
        fontSize: "13px",
        lineHeight: "13px",
        left: "0",
        marginLeft: "20px",
        position: "absolute",
        width: "260px"
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    centerImage: {
        margin: "auto",
        width: "100%",
        height: "100%"
    }
};

function LostPage(props) {
    const {classes} = props;
    return (
        <div style={{marginTop: "5em"}}>
            <Card>
                <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Bro, are you lost?</h4>
                </CardHeader>
                <CardBody>
                    <div>
                        <img
                            src="https://i.pinimg.com/originals/22/e2/21/22e221cd7f2e208aa2f08a550ef81471.gif"
                            alt="new"
                            className={classes.centerImage}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default withStyles(style)(LostPage);
