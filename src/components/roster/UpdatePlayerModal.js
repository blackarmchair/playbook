import React from 'react';
import { Form, Field } from 'react-final-form';
import firebase from 'firebase/app';
import {
	Modal,
	Button,
	TextField as MuiTextField,
	makeStyles,
} from '@material-ui/core';
import { database } from '../../../services/firebase';

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

const UpdatePlayerModal = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const [name, setName] = React.useState(props.player.name);
	const [jerseyNumber, setJerseyNumber] = React.useState(
		props.player.jerseyNumber
	);
	const [spp, setSpp] = React.useState(props.player.SPP);

	// const [skills, setSkills] = React.useState([]);
	// React.useEffect(() => {
	// 	async function fetchSkills() {
	// 		const snapshot = await database.collection('skills').get();
	// 		const data = snapshot.docs.map((doc) => ({
	// 			...doc.data(),
	// 			id: doc.id
	// 		}));
	// 		setSkills(data);
	// 	}
	// 	fetchSkills();
	// }, []);

	const handleUpdatePlayer = (formData) => {
		const { name, jerseyNumber, SPP } = formData;
		database
			.collection('rosters')
			.doc(props.roster.id)
			.update({
				...props.roster,
				players: [
					...props.roster.players.filter((p) => p.id !== props.player.id),
					{
						...props.player,
						name,
						jerseyNumber,
						SPP,
					},
				],
			});
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Form
				onSubmit={handleUpdatePlayer}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} name="updatePlayer">
						<Field
							name="name"
							component={({ input }) => (
								<MuiTextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="name"
									label="Player Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							)}
						/>
						{/* <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="jerseyNumber"
							label="Jersey Number"
							name="jerseyNumber"
							type="number"
							value={props.player.jerseyNumber}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="SPP"
							label="Star Player Points"
							name="SPP"
							type="number"
							value={props.player.SPP}
						/> */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Update Player
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

export default UpdatePlayerModal;
