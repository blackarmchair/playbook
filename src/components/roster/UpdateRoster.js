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
import UpdateTreasury from './modals/UpdateTreasury';
import PlayerDetailsDrawer from './PlayerDetailsDrawer';
import PlayerTable from '../common/PlayerTable';
import RosterBuilder from './RosterBuilder';

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
	const [treasuryModal, setTreasuryModal] = React.useState(false);

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
			<UpdateTreasury
				roster={props.roster}
				open={treasuryModal}
				handleClose={() => setTreasuryModal(false)}
				updateRosterData={() => props.updateRosterData()}
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
						roster={props.roster}
						showRosterTitle={true}
						players={props.roster.players}
						handlePlayerSelect={(player) => handleDrawerOpen(player)}
						minimal={true}
					/>
				</Grid>
				<Grid item xs={12}>
					<RosterBuilder
						teamValue={teamValuation}
						roster={props.roster}
						buildRoster={(item) => buildRoster(item)}
						updateDedicatedFans={(direction) => updateDedicatedFans(direction)}
						addLeaguePoints={(number, label) => addLeaguePoints(number, label)}
						setAddPlayerModal={() => setAddPlayerModal(true)}
						setTreasuryModal={() => setTreasuryModal(true)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default InitializeRoster;
