import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'mui-rff';
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

const UpdateTreasury = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const updateTreasury = (formData) => {
		const message = `Update treasury to ${formData.treasury}g?`;
		const confirm = window.confirm(message);
		if (confirm) {
			database
				.collection('rosters')
				.doc(props.roster.id)
				.update({ ...props.roster, treasury: formData.treasury })
				.then(() => {
					props.updateRosterData();
					props.handleClose();
				})
				.catch((ex) => {
					alert(ex.message);
				});
		}
	};

	const initialData = { treasury: parseInt(props.roster.treasury) };

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Form
				onSubmit={updateTreasury}
				initialValues={initialData}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} name="updateTreasury">
						<Field
							name="treasury"
							render={({ input }) => (
								<TextField
									{...input}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="treasury"
									label="Treasury"
									name="treasury"
									autoFocus
									type="number"
								/>
							)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Update Treasury
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

export default UpdateTreasury;
