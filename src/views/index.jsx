import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import withStyles from "@material-ui/core/styles/withStyles";
//Font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

// core components
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import Card from "../components/Card/Card.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardIcon from "../components/Card/CardIcon.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";

import dashboardStyle from "../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import github from "../assets/img/logo/GitHub.png";
import linkedin from "../assets/img/logo/linkedin.png";
import stackoverflow from "../assets/img/logo/stackoverflow.png";


class Index extends React.Component {
    state = {
        value: 0
    };
    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes} = this.props;
        var divStyle = {
            color: 'black',
            textDecorationLine: 'underline',
        };

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                        <Card>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <FontAwesomeIcon icon={faGithub} inverse/>
                                </CardIcon>
                                <br/>

                                <h4 className={classes.cardTitle}>
                                    <a  style={divStyle} href={"https://github.com/alwaysbeshels/etsclass"} >Front-end du projet</a>
                                    <br/>
                                    {/*<a style={divStyle} href={"https://github.com/alwaysbeshels/classets_backend"} >Back-end du projet</a>*/}
                                </h4>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    Si vous trouvez un bug, SVP les inscrires dans la table Issues du lien ci-dessus.
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
                                <p className={classes.cardCategory}>Nombre de personnes dans l'équipe</p>
                                <h3 className={classes.cardTitle}>3</h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    Nombre de personnes ayant travaillé sur le projet
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
                                        Avec les événements promotionnels qui ont lieu dans l’université, les
                                        présentations
                                        des clubs étudiants ainsi que le taux d’occupation élevé des classes, il ne
                                        reste
                                        plus de place pour les étudiants qui veulent étudier à l'extérieur de leur
                                        cours.
                                        <br/><br/>
                                        Le réaménagement de la bibliothèque ne permet pas à tous les étudiants d’étudier
                                        aisément. Plusieurs étudiants ont tendance à s’installer seul sur une table
                                        dédiée au
                                        travail collaboratif. De plus, l’administration de l’université a décidé de
                                        retirer
                                        les tables de travail dans le bloc E, bloc censé être dédié aux étudiants.
                                        <br/><br/>
                                        Toutes ces circonstances n’aident pas les élèves à trouver un espace d’étude
                                        propice.
                                        Il n’y a donc aucun moyen de trouver la disponibilité des classes dans
                                        l’université.
                                        La seule façon de se trouver un local, c’est de se déplacer physiquement dans
                                        l’école,
                                        mais cela ne garantit pas qu’il n’y aura pas un cours plus tard dans la journée.
                                        Cela augmente considérablement la perte de temps des universitaires pour se
                                        trouver
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
                                <h3 className={classes.cardTitleWhite}>Présentation du Projet</h3>
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <p>Ce projet permettra à quiconque s’aventurant dans les locaux de l’École de
                                        Technologie Supérieure de savoir quels locaux, de cours ou de laboratoire,
                                        n’ont actuellement aucun cours. Il sera possible d’obtenir des informations
                                        sur un local spécifique, comme leur plage horaire par exemple, mais aussi
                                        d’obtenir une liste de tous les locaux libres dans un bâtiment ou sur un étage.
                                    </p>
                                    <h3>Comment ça marche ?</h3>
                                    <p>
                                        À partir des <a style={divStyle} href={"https://www.etsmtl.ca/Etudiants/Horaire-cours"} >PDFs</a> de listes des horaires de cours disponibles sur le site web de
                                        l’École de Technologie Supérieure, un script passe à travers des <a style={divStyle} href={"https://www.etsmtl.ca/Etudiants/Horaire-cours"} >PDFs</a> et en extrait les horaies de cours avec leurs numéros de classe associés. Un autre
                                        script lit le <a style={divStyle} href={"https://www.etsmtl.ca/docs/Etudes/calendrier-universitaire/Documents/calendrier-seance-" + ((new Date()).getFullYear())} >PDFs contenant le calendrier</a> pour en extraire les jours fériés, les congés et les permutations d'horaires.

                                        <h4>Informations Importantes</h4>
                                        <p>Puisque nous avons développé cette application durant la session de l'automne 2018,
                                        nous avons seulement les classes qui ont été dans au moins un des <a style={divStyle} href={"https://www.etsmtl.ca/Etudiants/Horaire-cours"} >PDFs</a> disponibles depuis cette session. Donc, il se peut qu'il manque des numéros de local dans
                                            la liste. Par contre, plus les sessions avancent, plus notre liste augmentera avec les nouveaux <a style={divStyle} href={"https://www.etsmtl.ca/Etudiants/Horaire-cours"} >PDFs</a>.
                                        </p>
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
                                    <div className={classes.note}>Shelsea<br/>Saint-Fleur</div>
                                    <p>
                                        Shelsea est une vétérane de l'ÉTS, elle connait tous les secrets qui s'y cache.
                                        Elle a le sens de la planification et de l'organisation.
                                        Passioner par l'intelligence artificielle et le big-data,
                                        elle maîtrise le monde entier. Lorsqu'elle ne programme pas,
                                        elle est train de chercher pendant des jours le meilleur angle pour ses photos.
                                    </p>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Github"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Github"
                                            className={classes.tableActionButton} >
                                            <a href={"https://github.com/alwaysbeshels"} target={"_blank"}><img src={github} alt="Github" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Stackoverflow"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Stackoverflow"
                                            className={classes.tableActionButton} >
                                            <a href={"https://stackoverflow.com/users/4094893/alwaysbeshels"} target={"_blank"}><img src={stackoverflow} alt="Stackoverflow" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Linkedin"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Linkedin"
                                            className={classes.tableActionButton} >
                                            <a href={"https://www.linkedin.com/in/shelseasaintfleur/"} target={"_blank"}><img src={linkedin} alt="Linkedin" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Mensur<br/>Rasic</div>
                                    <p>
                                        Mensur est vif et ambitieux, travaillant plusieurs centaines d'heures par jour,
                                        la légende dit qu'il n'y a pas beaucoup de personnes qui arrive à le voir.
                                        En plus d'avoir le sens de l'organisation et du leadership,
                                        ne remettez pas en question sa capacité d'analyser des problèmes très complexes.
                                        Lorsqu'il n'est pas en train de travailler ou d'étudier,
                                        il passe des heures à programmer comme un acharné.
                                    </p>

                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Github"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Github"
                                            className={classes.tableActionButton} >
                                            <a href={"https://github.com/MensurRasic"} target={"_blank"}><img src={github} alt="Github" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Stackoverflow"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Stackoverflow"
                                            className={classes.tableActionButton} >
                                            <a href={"https://stackoverflow.com/users/5675992/citrix"} target={"_blank"}><img src={stackoverflow} alt="Stackoverflow" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Linkedin"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Linkedin"
                                            className={classes.tableActionButton} >
                                            <a href={"https://ca.linkedin.com/in/mensur-rasic-343629133"} target={"_blank"}><img src={linkedin} alt="Linkedin" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className={classes.typo}>
                                    <div className={classes.note}>Kevin<br/>Duvignau</div>
                                    <p>
                                        Fils de Christophe Colomb, il n'a pas peur des nouvelles aventures.
                                        Kevin est une personne très doué dans son domaine.
                                        Ce savant barbu trouve des solutions aux problèmes en une fraction de seconde.
                                        Lors qu'il n'est pas en train de développer le jeu du siècle,
                                        il fait le tour du monde sur son voilier.
                                    </p>

                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Github"
                                        placement="top"
                                        classes={{tooltip: classes.tooltip}} >
                                        <IconButton
                                            aria-label="Github"
                                            className={classes.tableActionButton} >
                                            <a href={"https://github.com/kduvignau"} target={"_blank"}><img src={github} alt="Github" height={20} width={20}/></a>
                                        </IconButton>
                                    </Tooltip>
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
