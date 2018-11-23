import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFingerprint, faIndustry} from '@fortawesome/free-solid-svg-icons'
import {faBuilding} from '@fortawesome/free-regular-svg-icons'
// core components
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import CardIcon from "../components/Card/CardIcon";
import SnackbarContent from "../components/Snackbar/SnackbarContent.jsx";
import Table from "../components/Table/TableInfoClassSchedule.jsx";


import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function ClassInfoPage(props) {
    const {classes} = props;
    //TODO appeler le back end pour récupérer les informations d'un local à partir de son numéro
    const infoClass = {
        numero: props.match.params.numero, batiment: "A", etage: "2e",
        horaire: [
            {heureDebut: "8:30:00", heureFin: "12:00:00", journee: "Monday"},
            {heureDebut: "13:00:00", heureFin: "17:30:00", journee: "Monday"},
            {heureDebut: "9:00:00", heureFin: "12:30:00", journee: "Tuesday"},
            {heureDebut: "13:30:00", heureFin: "16:30:00", journee: "Tuesday"},
            {heureDebut: "18:00:00", heureFin: "21:30:00", journee: "Tuesday"},
            {heureDebut: "13:30:00", heureFin: "17:00:00", journee: "Thursday"},
            {heureDebut: "18:00:00", heureFin: "21:00:00", journee: "Thursday"},
            {heureDebut: "8:30:00", heureFin: "12:30:00", journee: "Friday"},
            {heureDebut: "13:30:00", heureFin: "16:30:00", journee: "Friday"},
            {heureDebut: "8:30:00", heureFin: "12:00:00", journee: "Saturday"},
            {heureDebut: "13:00:00", heureFin: "16:00:00", journee: "Saturday"},
        ]
    };
    const weekday=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeNow = new Date();
    let estDispo = true;

    infoClass.horaire.filter(function(x) {
        return x.journee === weekday[timeNow.getDay()];
    }).forEach(function(current_value) {
        const separateTimeDebut = current_value.heureDebut.split(":"), separateTimeFin = current_value.heureFin.split(":");
        const heureDebut = new Date().setHours(separateTimeDebut[0], separateTimeDebut[1],separateTimeDebut[2]),
            heureFin = new Date().setHours(separateTimeFin[0], separateTimeFin[1], separateTimeFin[2]);
        if (heureDebut < timeNow.getTime() && heureFin > timeNow.getTime())
            estDispo = false;
    });

    return (
        <Card>
            <CardHeader color="info">
                <h3 className={classes.cardTitleWhite}>Information sur la classe</h3>
                <p className={classes.cardCategoryWhite}>
                    Prendre note que les informations sur de local de l'École de Technologies Supérieures
                    ne sont pas forcément dans cette liste et que nous ne pouvons garantir que les horaires ci-dessous
                    sont juste à 100%.
                </p>
            </CardHeader>
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={4} md={4}>
                        <Card>
                            <CardHeader color="primary" stats icon>
                                <CardIcon color="primary">
                                    <FontAwesomeIcon icon={faFingerprint}/>
                                </CardIcon>
                                <p className={classes.cardCategory}>Numéro de la classe</p>
                                <h3 className={classes.cardTitle}>{infoClass.numero}</h3>
                            </CardHeader>
                            <CardFooter/>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <FontAwesomeIcon icon={faBuilding}/>
                                </CardIcon>
                                <p className={classes.cardCategory}>Batiment</p>
                                <h3 className={classes.cardTitle}>Pavillion {infoClass.batiment}</h3>
                            </CardHeader>
                            <CardFooter/>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                        <Card>
                            <CardHeader color="warning" stats icon>
                                <CardIcon color="warning">
                                    <FontAwesomeIcon icon={faIndustry}/>
                                </CardIcon>
                                <p className={classes.cardCategory}>Étage</p>
                                <h3 className={classes.cardTitle}>{infoClass.etage}</h3>
                            </CardHeader>
                            <CardFooter/>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <SnackbarContent
                            message={estDispo ? "Ce local est libre en ce moment." : "Ce local est occupé en ce moment."}
                            color={estDispo ? "success" : "danger"}
                        />
                    </GridItem>
                </GridContainer>
                <hr />
                <GridContainer>
                    <Table
                        tableHeaderColor="Black"
                        tableHead={["Période ⇩ \nSemaine ➩", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]}
                        tableData={[
                            ["Matin", true,false,true,true,false,true],
                            ["Après-Midi", false,false,false,false,false,true],
                            ["Soir", true,false,true,true,false,false]
                        ]}
                    />
                </GridContainer>


            </CardBody>
        </Card>
    );
}

export default withStyles(dashboardStyle)(ClassInfoPage);
