import React from 'react';
import { Form, Field } from 'react-final-form';
import { Select } from 'mui-rff';
import firebase from 'firebase/app';
import { Modal, Button, MenuItem, makeStyles } from '@material-ui/core';
import { database } from '../../../../services/firebase';
import roster from '../../../pages/roster';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function getModalStyle() {
	const top = '50';
	const left = '50';

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const AddPlayer = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	async function getPlayerData(playerId) {
		const snapshot = await database
			.collection('players')
			.where(firebase.firestore.FieldPath.documentId(), '==', playerId)
			.get();
		return snapshot.docs[0].data();
	}

	function AddPlayerToRoster(playerData, journeymen) {
		const newPlayer = {
			...playerData,
			SPP: 0,
			name: '',
			id: `${new Date().getTime()}`,
			jerseyNumber: 0,
			MNG: false,
			NI: 0,
			level: 0,
			roster: props.roster.id,
			value: playerData.cost,
			stats: {
				cas: 0,
				comp: 0,
				int: 0,
				mvp: 0,
				td: 0,
			},
		};
		database
			.collection('rosters')
			.doc(props.roster.id)
			.update({
				players: [...props.roster.players, newPlayer],
				treasury: journeymen
					? props.roster.treasury
					: parseInt(props.roster.treasury) - parseInt(newPlayer.cost),
			});
	}

	const handleUpdate = async (formData) => {
		try {
			const addingJourneymen = formData.playerId === 'journeymen';
			const playerId = addingJourneymen ? journeymen().id : formData.playerId;
			const playerData = await getPlayerData(playerId);
			AddPlayerToRoster(playerData, addingJourneymen);
		} catch (ex) {
			alert(ex.message);
		} finally {
			props.handleClose();
		}
	};

	const healthyPlayers = props.roster.players.filter((p) => !p.MNG).length;
	const journeymen = () => {
		const linemenCount = Math.max.apply(
			Math,
			props.team.players.map((p) => p.max)
		);
		return (journeyman = props.team.players.find(
			(p) => p.max === linemenCount
		));
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Form
				onSubmit={handleUpdate}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} name="editPlayerSkills">
						<Field
							name="playerId"
							render={({ input }) => (
								<Select name="playerId" label="Select Player" {...input}>
									{props.team.players.map((player) => {
										const playerCountOnRoster = props.roster.players.reduce(
											(acc, cur) => {
												if (cur.position === player.position) {
													return acc + 1;
												}
												return acc;
											},
											0
										);
										return (
											<MenuItem
												key={player.id}
												value={player.id}
												disabled={
													playerCountOnRoster >= player.max ||
													player.cost > roster.treasury
												}
											>
												[{playerCountOnRoster}/{player.max}] {player.position} (
												{player.cost}g)
											</MenuItem>
										);
									})}
									<MenuItem value="journeymen" disabled={healthyPlayers >= 11}>
										Hire Journeymen
									</MenuItem>
								</Select>
							)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Hire Player
						</Button>
					</form>
				)}
			/>
		</div>
	);

	return (
		<Modal open={props.open} onClose={props.handleClose}>
			{modalBody}
		</Modal>
	);
};

export default AddPlayer;
