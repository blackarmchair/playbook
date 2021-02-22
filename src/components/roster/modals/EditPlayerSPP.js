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
		const confirm = window.confirm(
			`Add (${points}) SPP for a ${source} to ${props.player.name}?`
		);
		if (confirm) {
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
							stats: props.player.hasOwnProperty('stats')
								? {
										...props.player.stats,
										[source]: parseInt(props.player.stats[source]) + 1,
								  }
								: {
										comp: source === 'comp' ? 1 : 0,
										int: source === 'int' ? 1 : 0,
										cas: source === 'cas' ? 1 : 0,
										td: source === 'td' ? 1 : 0,
										mvp: source === 'mvp' ? 1 : 0,
								  },
						},
					],
				});
		}
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
