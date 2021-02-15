import React from 'react';
import {
	Container,
	Grid,
	Card,
	CardContent,
	Button,
	makeStyles,
	Typography,
	TextField,
} from '@material-ui/core';
import { database } from '../../../services/firebase/index';
import * as formatters from '../../../helpers/formatters';
import AddPlayer from './modals/AddPlayer';
import PlayerDetailsDrawer from './PlayerDetailsDrawer';
import PlayerTable from '../common/PlayerTable';

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const InitializeRoster = (props) => {
	const classes = useStyles();

	const buildRoster = (type) => {
		const confirm = window.confirm(`Add (1) ${type} to your team?`);
		if (confirm) {
			switch (type) {
				case 'apothecary':
					if (!props.roster.apothecary && props.roster.treasury >= 50000) {
						database
							.collection('rosters')
							.doc(props.roster.id)
							.update({
								...props.roster,
								apothecary: 1,
								treasury: props.roster.treasury - 50000,
							})
							.then(() => {
								props.updateRosterData();
							})
							.catch((ex) => {
								alert(ex.message);
							});
					} else {
						if (props.roster.apothecary > 0) {
							alert('You cannot hire more than (1) Apothecary.');
						}
						if (props.roster.treasury < 50000) {
							alert("You don't have enough gold.");
						}
					}
					break;
				case 'assistantCoaches':
					if (
						props.roster.assistantCoaches < 6 &&
						props.roster.treasury >= 10000
					) {
						database
							.collection('rosters')
							.doc(props.roster.id)
							.update({
								...props.roster,
								assistantCoaches: props.roster.assistantCoaches + 1,
								treasury: props.roster.treasury - 10000,
							})
							.then(() => {
								props.updateRosterData();
							})
							.catch((ex) => {
								alert(ex.message);
							});
					} else {
						if (props.roster.assistantCoaches > 5) {
							alert('You cannot hire more than (6) Assistant Coaches.');
						}
						if (props.roster.treasury < 10000) {
							alert("You don't have enough gold.");
						}
					}
					break;
				case 'cheerleaders':
					if (props.roster.cheerleaders < 6 && props.roster.treasury >= 10000) {
						database
							.collection('rosters')
							.doc(props.roster.id)
							.update({
								...props.roster,
								cheerleaders: props.roster.cheerleaders + 1,
								treasury: props.roster.treasury - 10000,
							})
							.then(() => {
								props.updateRosterData();
							})
							.catch((ex) => {
								alert(ex.message);
							});
					} else {
						if (props.roster.cheerleaders > 5) {
							alert('You cannot hire more than (6) Cheerleaders.');
						}
						if (props.roster.treasury < 10000) {
							alert("You don't have enough gold.");
						}
					}
					break;
				case 'rerolls':
					if (
						props.roster.rerolls < 8 &&
						props.roster.treasury >= props.team.rerolls.cost * 2
					) {
						database
							.collection('rosters')
							.doc(props.roster.id)
							.update({
								...props.roster,
								rerolls: props.roster.rerolls + 1,
								treasury: props.roster.treasury - props.team.rerolls.cost * 2,
							})
							.then(() => {
								props.updateRosterData();
							})
							.catch((ex) => {
								alert(ex.message);
							});
					} else {
						if (props.roster.rerolls > 7) {
							alert('You cannot have more than (8) Re-rolls.');
						}
						if (props.roster.treasury < props.team.rerolls.cost * 2) {
							alert("You don't have enough gold.");
						}
					}
					break;
				default:
					console.log('oops...');
					break;
			}
		}
	};

	// Assess team value
	const teamValuation = () => {
		const playerValue = props.roster.players.reduce((acc, cur) => {
			if (cur.MNG) {
				return acc;
			}
			return cur.value + acc;
		}, 0);
		const apothecary = props.roster.apothecary * 50000;
		const assistantCoaches = props.roster.assistantCoaches * 10000;
		const cheerleaders = props.roster.cheerleaders * 10000;
		const rerolls = props.roster.rerolls * props.team.rerolls.cost || 0;

		return formatters.parseNumber(
			playerValue + apothecary + assistantCoaches + cheerleaders + rerolls
		);
	};

	// Add Dedicated Fans
	const updateDedicatedFans = (increase) => {
		const message = increase
			? `Increase fan factor from ${props.roster.dedicatedFans + 1} to ${
					props.roster.dedicatedFans + 2
			  }`
			: `Decrease fan factor from ${props.roster.dedicatedFans + 1} to ${
					props.roster.dedicatedFans
			  }`;
		const confirm = window.confirm(message);
		if (confirm) {
			database
				.collection('rosters')
				.doc(props.roster.id)
				.update({
					...props.roster,
					dedicatedFans: increase
						? props.roster.dedicatedFans + 1
						: props.roster.dedicatedFans - 1,
				})
				.then(() => {
					props.updateRosterData();
				})
				.catch((ex) => {
					alert(ex.message);
				});
		}
	};

	// Treasury Update
	const [treasury, setTreasury] = React.useState(props.roster.treasury);
	const updateTreasury = () => {
		const message = `Update treasury to ${treasury}g?`;
		const confirm = window.confirm(message);
		if (confirm) {
			database
				.collection('rosters')
				.doc(props.roster.id)
				.update({ ...props.roster, treasury })
				.then(() => {
					props.updateRosterData();
				})
				.catch((ex) => {
					alert(ex.message);
				});
		}
	};

	// Add League Points
	const addLeaguePoints = (points, outcome) => {
		const message = `Add a ${outcome} to your record?`;
		const confirm = window.confirm(message);
		if (confirm) {
			database
				.collection('rosters')
				.doc(props.roster.id)
				.update({
					...props.roster,
					leaguePoints: props.roster.leaguePoints + points,
					record: {
						win:
							outcome === 'win'
								? props.roster.record.win + 1
								: props.roster.record.win,
						loss:
							outcome === 'loss'
								? props.roster.record.loss + 1
								: props.roster.record.loss,
						draw:
							outcome === 'draw'
								? props.roster.record.draw + 1
								: props.roster.record.draw,
					},
				})
				.then(() => {
					props.updateRosterData();
				})
				.catch((ex) => {
					alert(ex.message);
				});
		}
	};

	// Hire New Player
	const [addPlayerModal, setAddPlayerModal] = React.useState(false);

	// Handle Drawer
	const [selectedPlayer, setSelectedPlayer] = React.useState({});
	const [playerDetailsDrawer, setPlayerDetailsDrawer] = React.useState(false);
	const handleDrawerOpen = (player) => {
		setSelectedPlayer(player);
		setPlayerDetailsDrawer(true);
	};
	const handleDrawerClose = () => {
		setSelectedPlayer({});
		setPlayerDetailsDrawer(false);
	};

	return (
		<Container className={classes.container}>
			<AddPlayer
				roster={props.roster}
				team={props.team}
				open={addPlayerModal}
				handleClose={() => setAddPlayerModal(false)}
			/>
			<PlayerDetailsDrawer
				open={playerDetailsDrawer}
				handleOpen={handleDrawerOpen}
				handleClose={handleDrawerClose}
				updateRosterData={() => {
					handleDrawerClose();
					props.updateRosterData();
				}}
				player={selectedPlayer}
				roster={props.roster}
			/>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<PlayerTable
						players={props.roster.players}
						handlePlayerSelect={(player) => handleDrawerOpen(player)}
					/>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>Team Re-Rolls: {props.roster.rerolls}</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => buildRoster('rerolls')}
							>
								Coach Players
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>Cheerleaders: {props.roster.cheerleaders}</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => buildRoster('cheerleaders')}
							>
								Hire Cheerleaders
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>
								Assistant Coaches: {props.roster.assistantCoaches}
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => buildRoster('assistantCoaches')}
							>
								Hire Coaches
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>
								Apothecary: {props.roster.apothecary ? 1 : 0}
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => buildRoster('apothecary')}
							>
								Hire Apothecary
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>
								Dedicated Fans: {props.roster.dedicatedFans + 1}
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => updateDedicatedFans(true)}
							>
								Increase Dedicated Fans
							</Button>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => updateDedicatedFans(false)}
							>
								Decrease Dedicated Fans
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>Treasury:</Typography>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="treasury"
								label=""
								name="treasury"
								autoFocus
								type="number"
								value={treasury}
								onChange={(e) => setTreasury(e.target.value)}
							/>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => updateTreasury()}
							>
								Update Treasury
							</Button>
							<Typography>Total Team Value: {teamValuation()}</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>
								Record: ({props.roster.record.win}/{props.roster.record.loss}/
								{props.roster.record.draw}) [{props.roster.leaguePoints || 0}]
							</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => addLeaguePoints(3, 'win')}
							>
								Win
							</Button>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => addLeaguePoints(0, 'loss')}
							>
								Loss
							</Button>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => addLeaguePoints(1, 'draw')}
							>
								Draw
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Card>
						<CardContent>
							<Typography>Build Your Roster</Typography>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={classes.container}
								onClick={() => setAddPlayerModal(true)}
							>
								Hire A New Player
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default InitializeRoster;
