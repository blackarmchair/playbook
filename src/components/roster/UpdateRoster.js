import React from 'react';
import {
	Container,
	Grid,
	Card,
	CardContent,
	Button,
	makeStyles,
	Typography,
} from '@material-ui/core';
import Player from './Player';
import { database } from '../../../services/firebase/index';
import * as formatters from '../../../helpers/formatters';

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const InitializeRoster = (props) => {
	const classes = useStyles();

	const buildRoster = (type) => {
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
	};

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

	return (
		<Container className={classes.container}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12} lg={12}>
					{props.roster.players.map((player, index) => (
						<Player
							key={player.id}
							player={player}
							roster={props.roster}
							updateRosterData={props.updateRosterData}
							index={index}
						/>
					))}
					<Typography className={classes.container}>
						Team Value: {teamValuation()}
					</Typography>
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
								Dedicated Fans: {props.roster.dedicatedFans}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default InitializeRoster;
