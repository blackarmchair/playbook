import React from 'react';
import { Form } from 'react-final-form';
import { Switches, TextField } from 'mui-rff';
import { Modal, Button, makeStyles } from '@material-ui/core';
import { database } from '../../../../services/firebase';
import * as formatters from '../../../../helpers/formatters';

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
		const MNG = formData.DEAD
			? true
			: formData.MNG !== undefined
			? formData.MNG
			: false;
		database
			.collection('rosters')
			.doc(props.roster.id)
			.update({
				...props.roster,
				players: [
					...props.roster.players.filter((p) => p.id !== props.player.id),
					{
						...props.player,
						MNG,
						NI: formData.NI,
						DEAD: formData.DEAD,
					},
				],
			});
		props.handleClose();
	};

	const initialData = {
		NI: formatters.parseNumber(props.player.NI),
		MNG: props.player.DEAD ? true : props.player.MNG,
		DEAD: props.player.DEAD || false,
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Form
				onSubmit={handleUpdate}
				initialValues={initialData}
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
							label=""
							name="MNG"
							data={{ label: 'Miss Next Game', value: props.player.MNG }}
						/>
						<Switches
							label=""
							name="DEAD"
							data={{ label: 'Dead', value: props.player.DEAD || false }}
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
