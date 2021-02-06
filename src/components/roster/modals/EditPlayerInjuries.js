import React from 'react';
import { Form } from 'react-final-form';
import { Switches, TextField } from 'mui-rff';
import { Modal, Button, makeStyles } from '@material-ui/core';
import { database } from '../../../../services/firebase';

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

const EditPlayerInjuries = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const handleUpdate = (formData) => {
		database
			.collection('rosters')
			.doc(props.roster.id)
			.update({
				...props.roster,
				players: [
					...props.roster.players.filter((p) => p.id !== props.player.id),
					{
						...props.player,
						MNG: formData.MNG !== undefined ? formData.MNG : false,
						NI: formData.NI,
					},
				],
			});
		props.handleClose();
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Form
				onSubmit={handleUpdate}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} name="editPlayerInjuries">
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="NI"
							label="Niggling Injuries"
							name="NI"
							autoFocus
							type="number"
						/>
						<Switches
							label="Player to Miss Next Game"
							name="MNG"
							data={{ label: 'Miss Next Game', value: props.player.MNG }}
						/>
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

export default EditPlayerInjuries;
