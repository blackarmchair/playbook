import React from 'react';
import {
	Container,
	makeStyles,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Hidden,
} from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import firebase from 'firebase/app';
import { database } from '../../../services/firebase/index';
import * as formatters from '../../../helpers/formatters';
import Player from './Player';

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3, 0, 2),
	},
	layout: {
		[theme.breakpoints.down('sm')]: {
			position: 'initial',
			transform: 'initial',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
			borderBottom: `1px solid ${theme.palette.text.disabled}`,
		},
	},
	whiteText: {
		color: theme.palette.common.white,
	},
}));

const RosterItem = ({ primary, secondary, children }) => {
	const classes = useStyles();
	return (
		<ListItem>
			<Hidden smDown>
				<ListItemAvatar>
					<Avatar>
						<LabelIcon />
					</Avatar>
				</ListItemAvatar>
			</Hidden>
			<ListItemText primary={primary} secondary={secondary} />
		</ListItem>
	);
};

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

			{team.hasOwnProperty('name') && (
				<List>
					<RosterItem
						primary="Team Re-Rolls:"
						secondary={`${props.roster.name} have (${props.roster.rerolls}) team re-rolls.`}
					/>
					<RosterItem
						primary="Cheerleaders:"
						secondary={`${props.roster.name} have (${props.roster.cheerleaders}) cheerleaders.`}
					/>
					<RosterItem
						primary="Assistant Coaches:"
						secondary={`${props.roster.name} have (${props.roster.assistantCoaches}) assistant coaches.`}
					/>
					<RosterItem
						primary="Apothecaries:"
						secondary={`${props.roster.name} have (${props.roster.apothecary}) apothecaries.`}
					/>
					<RosterItem
						primary="Dedicated Fans:"
						secondary={`${props.roster.name} have (${
							props.roster.dedicatedFans + 1
						}) dedicated fans.`}
					/>
					<RosterItem
						primary="Record:"
						secondary={`(${props.roster.record.win}/${props.roster.record.loss}/${props.roster.record.draw})`}
					/>
					<RosterItem
						primary="Treasury:"
						secondary={`${formatters.parseNumber(
							parseInt(props.roster.treasury)
						)}g.`}
					/>
					<RosterItem
						primary="Team Value:"
						secondary={`${formatters.parseNumber(teamValuation())}g.`}
					/>
				</List>
			)}
		</Container>
	);
};

export default Roster;
