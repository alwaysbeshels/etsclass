import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
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

const style = dashboardStyle;
export default class ClassInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numero: props.match.params.numero,
            data: [],
            classesSchedule: [],
            redirectLost: false,
            okToLoad: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.numero !== prevState.numero) {
            return {numero: nextProps.match.params.numero};
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.numero !== this.state.numero) {
            this.setState({
                numero: this.state.numero,
            });
            this.reloadState();
            this.forceUpdate();
        }
    }

    componentDidMount() {
        this.reloadState();
    }

    reloadState = function () {
        var self = this;
        axios.get('https://log515-backend.herokuapp.com/classroom/' + this.state.numero.toUpperCase()).then(
            response => {
            const timeNow = new Date();
            const weekday = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
            let valueLive = (timeNow.getTime() < new Date().setHours(12, 0, 0)) ?
                1 : (timeNow.getTime() < new Date().setHours(17, 0, 0)) ? 2 : 3;
            let isEmpty = true;
            if (timeNow.getDay() !== 0 && response.data.code === undefined)
                isEmpty = !response.data.classrooms.schedule[weekday[timeNow.getDay()]].includes(valueLive);
            else if(response.data.code)
                isEmpty = !response.data.classrooms.schedule[response.data.code].includes(valueLive);

            let classesSchedule = [["Matin"], ["Après-Midi"], ["Soir"]];
            for (let j = 1; j < 4; j++) {
                for (let i = 1; i <= 6; i++) {
                    classesSchedule[j - 1].push(!response.data.classrooms.schedule[weekday[i]].includes(j))
                }
            }

            this.setState({
                data: response.data.classrooms,
                isEmpty: isEmpty,
                classesSchedule: classesSchedule,
                okToLoad: true
            });
        }).catch(function (error) {
            if (JSON.stringify(error.message).includes("Network Error")) {
                self.setState({
                    redirectLost: false,
                    error: true
                });
            } else {
                self.setState({
                    redirectLost: true,
                    error: false
                });
            }
        })
    };

    render() {
        if (this.state.redirectLost) {
            return (<Redirect to='/lost'/>)
        } else if (this.state.error) {
            return (
                <div className={style.tableResponsive}>
                    <SnackbarContent
                        message={"Le système est actuellement indisponible. Veuillez revenir plus tard."}
                        color={"danger"}
                    />
                </div>
            );
        } else if (this.state.data.schedule !== null && this.state.okToLoad) {
            return (

                <Card>
                    <CardHeader color="info">
                        <h3 className={style.cardTitleWhite}>Information sur la classe</h3>
                        <p className={style.cardCategoryWhite}>
                            Prendre note que les informations sur de local de l'École de Technologie Supérieure
                            ne sont pas forcément dans cette liste et que nous ne pouvons garantir que les horaires
                            ci-dessous
                            sont juste à 100%.
                        </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={4} md={4}>
                                <Card>
                                    <CardHeader color="primary" stats icon>
                                        <CardIcon color="primary">
                                            <FontAwesomeIcon icon={faFingerprint} inverse/>
                                        </CardIcon>
                                        <p className={style.cardCategory}>Numéro de la classe</p>
                                        <h3 className={style.cardTitle}>{this.state.data.number}</h3>
                                    </CardHeader>
                                    <CardFooter/>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <Card>
                                    <CardHeader color="info" stats icon>
                                        <CardIcon color="info">
                                            <FontAwesomeIcon icon={faBuilding} inverse/>
                                        </CardIcon>
                                        <p className={style.cardCategory}>Bâtiment</p>
                                        <h3 className={style.cardTitle}>Pavillion {this.state.data.building}</h3>
                                    </CardHeader>
                                    <CardFooter/>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <Card>
                                    <CardHeader color="warning" stats icon>
                                        <CardIcon color="warning">
                                            <FontAwesomeIcon icon={faIndustry} inverse/>
                                        </CardIcon>
                                        <p className={style.cardCategory}>Étage</p>
                                        <h3 className={style.cardTitle}>{this.state.data.floor}e</h3>
                                    </CardHeader>
                                    <CardFooter/>
                                </Card>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <SnackbarContent
                                    message={this.state.isEmpty ? "Ce local est libre en ce moment." : "Ce local est occupé en ce moment."}
                                    color={this.state.isEmpty ? "success" : "danger"}
                                />
                            </GridItem>
                        </GridContainer>
                        <hr/>
                        <GridContainer>
                            <Table
                                tableHeaderColor="gray"
                                tableHead={["Période ⇩ \nSemaine ➩", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]}
                                tableData={this.state.classesSchedule}
                            />
                        </GridContainer>
                    </CardBody>
                </Card>
            )
        } else {
            return (
                <div className={style.tableResponsive}>
                </div>

            );
        }
    };

}
