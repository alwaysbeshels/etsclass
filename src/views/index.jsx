import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
//Font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDollarSign, faUsers} from '@fortawesome/free-solid-svg-icons'

// core components
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardIcon from "../components/Card/CardIcon.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Index extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                    <FontAwesomeIcon icon={faDollarSign} inverse/>

                </CardIcon>
                <p className={classes.cardCategory}>Coût de projet</p>
                <h3 className={classes.cardTitle}>7,050$ CAD</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  Estimé durant le cadre du cours de LOG515
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                    <FontAwesomeIcon icon={faUsers} inverse/>
                </CardIcon>
                <p className={classes.cardCategory}>Nombre de personne dans l'équipe</p>
                <h3 className={classes.cardTitle}>4</h3>
              </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        Nombre de personnes ayant travaillées sur le projet
                    </div>
                </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <Card chart>
                      <CardHeader color="primary">
                          <h3 className={classes.cardTitleWhite}>Quel est le problème?</h3>
                      </CardHeader>
                      <CardBody>
                          <div>
                              <p>
                                  Le manque d’espace pour les étudiants de l’université de l’ÉTS est flagrant.
                                  Avec les événements promotionnels qui ont lieu dans l’université, les présentations
                                  des clubs étudiants ainsi que le taux d’occupation élevé des classes, il ne reste
                                  plus de place pour les étudiants qui veulent étudier à l'extérieur de leur cours.
                                <br/><br/>
                                  Le réaménagement de la bibliothèque ne permet pas à tous les étudiants d’étudier
                                  aisément. Plusieurs étudiants ont tendance à s’installer seul sur une table dédiée au
                                  travail collaboratif. De plus, l’administration de l’université a décidé de retirer
                                  les tables de travail dans le bloc E, bloc censé être dédié aux étudiants.
                                  <br/><br/>
                                  Toutes ces circonstances n’aident pas les élèves à trouver un espace d’étude propice.
                                  Il n’y a donc aucun moyen de trouver la disponibilité des classes dans l’université.
                                  La seule façon de se trouver un local, c’est de se déplacer physiquement dans l’école,
                                  mais cela ne garantit pas qu’il n’y aura pas un cours plus tard dans la journée.
                                  Cela augmente considérablement la perte de temps des universitaires pour se trouver
                                  un local libre, par exemple, pour les laboratoires, certains ont besoin d'être
                                  dans un local précis sur un poste particulier.

                              </p>
                          </div>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <Card chart>
                      <CardHeader color="warning">
                          <h3 className={classes.cardTitleWhite}>Présentation du Projet : Jé l'Doua Dentré</h3>
                      </CardHeader>
                      <CardBody>
                          <div>
                              <p>Ce projet permettra à quiconque s’aventurant dans les locaux de l’École de
                                  Technologie Supérieure de savoir quels locaux, de cours ou de laboratoire,
                                  n’ont actuellement aucun cours. Il sera possible d’obtenir des informations
                                  sur un local spécifique, comme leur plage horaire par exemple, mais aussi
                                  d’obtenir une liste de tous les locaux libres dans un bâtiment ou sur un étage.
                              </p>
                          </div>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <Card chart>
                      <CardHeader color="danger">
                          <h3 className={classes.cardTitleWhite}>Présentation de l'équipe</h3>
                      </CardHeader>
                      <CardBody>
                          <div className={classes.typo}>
                              <div className={classes.note}>Shelsea Saint-Fleur</div>
                              <p>
                                  Shelsea à 3 rôles dans notre équipe. Elle est la gestionnaire de projet, experte de
                                  la matière et une de nos testeurs du projet. Elle comprend bien les besoins du projet et
                                a permis de bien définir les objectifs de celui-ci.
                              </p>
                          </div>
                          <div className={classes.typo}>
                              <div className={classes.note}>Mensur Rasic</div>
                              <p>
                                  Mensur à 3 rôles dans notre équipe. Il est le gestionnaire de projet, un développeur
                                  et un de nos testeurs. Il nous a permis de bien définir les livrables réalisables du
                                projet et de les communiquer clairement à toute l'équipe.
                              </p>
                          </div>
                          <div className={classes.typo}>
                              <div className={classes.note}>Kevin Duvignau</div>
                              <p>
                                  Kevin à 3 rôles dans notre équipe. Il est le chef de projet de l'équipe de
                                  développement, le représentant de notre équipe et un développeur. Il a été la
                                personne ressource pour communiquer avec les parties prenantes, soit les étudiants de
                                l'École de Technologies Supérieures.
                              </p>
                          </div>
                          <div className={classes.typo}>
                              <div className={classes.note}>Cristian Feisan</div>
                              <p>
                                  Cristian à 3 rôles dans notre équipe. Il est le chef de projet de l'équipe de
                                  test, l'analyste des activités et un développeur. Il s'est assuré du bon
                                  déroulement du projet.
                              </p>
                          </div>

                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Index);
