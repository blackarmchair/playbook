import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import { database } from '../../../services/firebase/index';
import * as formatters from '../../../helpers/formatters';
import Player from '../../components/roster/player';

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
		const apothecary = props.roster.apothecary ? 50000 : 0;
		const assistantCoaches = props.roster.assistantCoaches ? 10000 : 0;
		const cheerleaders = props.roster.cheerleaders ? 10000 : 0;
		const dedicatedFans = props.roster.dedicatedFans ? 10000 : 0;
		const rerolls = (props.roster.rerolls * team.rerolls.cost) | 0;

		return formatters.parseNumber(
			playerValue +
				apothecary +
				assistantCoaches +
				cheerleaders +
				dedicatedFans +
				rerolls
		);
	};

	return (
		<Container className={classes.container}>
			<Typography variant="h5" className={classes.container}>
				{props.roster.name} | {owner.fname} {owner.lname}
			</Typography>
			{props.roster.players.map((player, index) => (
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
			{team.hasOwnProperty('name') && (
				<Typography className={classes.container}>
					Team Value: {teamValuation()}
				</Typography>
			)}
		</Container>
	);
};

export default Roster;
