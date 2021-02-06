import React from 'react';
import Router from 'next/router';
import { Form } from 'react-final-form';
import { TextField, Select } from 'mui-rff';
import {
	Button,
	Modal,
	makeStyles,
	InputLabel,
	MenuItem,
	FormControl,
	Typography,
} from '@material-ui/core';
import { database } from '../../../services/firebase/index';
import local from '../../../helpers/local';

const useStyles = makeStyles((theme) => ({
	modal: {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: 'none',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	spaced: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const CreateRoster = (props) => {
	const classes = useStyles();

	// Get User Data
	const user = JSON.parse(local.get('user'));

	// Manage Modal State
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// Get team data
	const [selectedTeam, setSelectedTeam] = React.useState('');
	const [teams, setTeams] = React.useState([]);
	React.useEffect(() => {
		async function fetchTeams() {
			const snapshot = await database.collection('teams').get();
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setTeams(data);
		}
		fetchTeams();
	}, []);

	const handleRosterCreation = (formData) => {
		database
			.collection('rosters')
			.add({
				team: formData.faction,
				name: formData.name,
				owner: user.uid,
				apothecary: 0,
				assistantCoaches: 0,
				cheerleaders: 0,
				dedicatedFans: 0,
				initiated: false,
				players: [],
				rerolls: 0,
				treasury: 1000000,
			})
			.then(() => {
				props.updateRosterData();
				handleClose();
			})
			.catch((ex) => {
				alert(ex.message);
			});
	};

	return (
		<>
			<Typography variant="h5">Create a New Roster</Typography>
			<Typography variant="body1" className={classes.spaced}>
				You seem to be without a team. Pre-season is over. It's time to set your
				starting roster.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={handleOpen}
				className={classes.spaced}
			>
				Create
			</Button>
			<Modal open={open} onClose={handleClose}>
				<div className={classes.modal}>
					<Form
						onSubmit={handleRosterCreation}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit} name="createNewRoster">
								<Typography variant="h6">Create a New Roster</Typography>
								<FormControl className={classes.formControl} fullWidth>
									<TextField
										margin="normal"
										required
										id="name"
										label="Team Name"
										name="name"
										autoFocus
									/>
								</FormControl>
								<FormControl className={classes.formControl} fullWidth>
									<Select
										labelId="team-label"
										id="team"
										name="faction"
										label="Faction"
									>
										{teams.map((team) => (
											<MenuItem key={team.id} value={team.id}>
												{team.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<Button
									className={classes.spaced}
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
								>
									Create
								</Button>
							</form>
						)}
					/>
				</div>
			</Modal>
		</>
	);
};

export default CreateRoster;
