import React from 'react';
import { Container, makeStyles, Typography, Grid } from '@material-ui/core';
import firebase from 'firebase/app';
import { database } from '../../../services/firebase/index';
import * as formatters from '../../../helpers/formatters';
import Player from './Player';

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Roster = (props) => {
	const classes = useStyles();

	const [team, setTeam] = React.useState({});
	const [owner, setOwner] = React.useState({});
	React.useEffect(() => {
		async function fetchTeam(teamId) {
			const snapshot = await database
				.collection('teams')
				.where(firebase.firestore.FieldPath.documentId(), '==', teamId)
				.get();
			const teamData = snapshot.docs[0].data();
			setTeam(teamData);
		}
		async function fetchOwner(userId) {
			const snapshot = await database
				.collection('users')
				.where(firebase.firestore.FieldPath.documentId(), '==', userId)
				.get();
			setOwner(snapshot.docs[0].data());
		}
		fetchTeam(props.roster.team);
		fetchOwner(props.roster.owner);
	}, []);

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
		const rerolls = props.roster.rerolls * team.rerolls.cost || 0;

		return formatters.parseNumber(
			playerValue + apothecary + assistantCoaches + cheerleaders + rerolls
		);
	};

	return (
		<Container className={classes.container}>
			{props.roster.players
				.sort((a, b) => {
					if (a.position.toLowerCase() < b.position.toLowerCase()) {
						return -1;
					}
					if (a.position.toLowerCase() > b.position.toLowerCase()) {
						return 1;
					}
					return 0;
				})
				.map((player, index) => (
					<Player
						key={player.id}
						player={player}
						roster={props.roster}
						updateRosterData={() => {
							console.log('foo');
						}}
						index={index}
						readOnly={true}
					/>
				))}
			<Grid container spacing={3}>
				<Grid item xs={12} md={4} lg={3}>
					{team.hasOwnProperty('name') && (
						<Typography className={classes.container}>
							Team Value: {teamValuation()}
						</Typography>
					)}
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						Rerolls: {props.roster.rerolls}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						Dedicated Fans: {props.roster.dedicatedFans}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						Apothecary: {props.roster.apothecary}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						Assistant Coaches: {props.roster.assistantCoaches}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						Cheerleaders: {props.roster.cheerleaders}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						League Points: {props.roster.leaguePoints}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Typography className={classes.container}>
						Treasury: {formatters.parseNumber(props.roster.treasury)}g
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Roster;
