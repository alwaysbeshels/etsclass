import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import Table from "../components/Table/TableAllClasses.jsx";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

function ClassList(props) {
    const { classes } = props;
    const timeNow = new Date();
    const heureMidi = new Date().setHours(12, 0,0),
        heureSoir = new Date().setHours(17, 0,0);
    let timeDay = "";
    if (timeNow < heureMidi)
        timeDay = "Matin";
    else if (timeNow > heureMidi && timeNow < heureSoir)
        timeDay = "Après-Midi";
    else
        timeDay = "Soir";

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h3 className={classes.cardTitleWhite}>
                            Liste de toutes les classes disponibles <b>aujourd'hui</b>
                            <br /> Période actuelle : <b>{timeDay}</b></h3>
                        <p className={classes.cardCategoryWhite}>
                            Prendre note que tous les locaux de l'École de Technologies Supérieures ne sont pas
                            forcément dans cette liste et que nous ne pouvons garantir que les horaires ci-dessous
                            sont juste à 100%.
                        </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                        <Table/>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

export default withStyles(styles)(ClassList);
