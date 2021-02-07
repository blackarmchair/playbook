import React from 'react';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Modal, Button, makeStyles, ButtonGroup } from '@material-ui/core';
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

const EditPlayerSPP = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const handleUpdate = (points, source) => {
		database
			.collection('rosters')
			.doc(props.roster.id)
			.update({
				...props.roster,
				players: [
					...props.roster.players.filter((p) => p.id !== props.player.id),
					{
						...props.player,
						SPP: parseInt(props.player.SPP) + parseInt(points),
						stats: {
							comp:
								source === 'comp' && props.player.stats
									? props.player.stats.comp + 1
									: 0,
							int:
								source === 'int' && props.player.stats
									? props.player.stats.int + 1
									: 0,
							cas:
								source === 'cas' && props.player.stats
									? props.player.stats.cas + 1
									: 0,
							td:
								source === 'td' && props.player.stats
									? props.player.stats.td + 1
									: 0,
							mvp:
								source === 'mvp' && props.player.stats
									? props.player.stats.mvp + 1
									: 0,
						},
					},
				],
			});
		props.handleClose();
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(1, 'comp')}
			>
				Passing Completion
			</Button>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(1, 'comp')}
			>
				Throwing Completion
			</Button>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(1, 'int')}
			>
				Deflection
			</Button>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(2, 'int')}
			>
				Interception
			</Button>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(2, 'cas')}
			>
				Casualty
			</Button>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(3, 'td')}
			>
				Touchdown
			</Button>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={() => handleUpdate(4, 'mvp')}
			>
				Most Valuable Player (MVP)
			</Button>
		</div>
	);

	return (
		<Modal open={props.open} onClose={props.handleClose}>
			{modalBody}
		</Modal>
	);
};

export default EditPlayerSPP;
