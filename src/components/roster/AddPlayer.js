import React from 'react';
import firebase from 'firebase/app';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { database } from '../../../services/firebase/index';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
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

const AddPlayerModal = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	// Manage Modal State
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// Get Team Data
	const [team, setTeam] = React.useState({});
	React.useEffect(() => {
		async function fetchTeam() {
			const snapshot = await database
				.collection('teams')
				.where(firebase.firestore.FieldPath.documentId(), '==', props.team)
				.get();
			setTeam({
				...team,
				...snapshot.docs[0].data(),
			});
			fetchPlayers(snapshot.docs[0].data().name);
		}
		async function fetchPlayers(teamName) {
			const snapshot = await database
				.collection('players')
				.where('team', '==', `${teamName} Teams`)
				.get();
			setTeam({
				...team,
				players: snapshot.docs.map((doc) => doc.data()),
			});
		}
		fetchTeam();
	}, []);

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<pre>{JSON.stringify(team, null, 2)}</pre>
		</div>
	);

	return (
		<div>
			<Button variant="outlined" onClick={handleOpen}>
				Add a Player
			</Button>
			<Modal open={open} onClose={handleClose}>
				{modalBody}
			</Modal>
		</div>
	);
};

export default AddPlayerModal;
