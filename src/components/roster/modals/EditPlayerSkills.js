import React from 'react';
import { Form, Field } from 'react-final-form';
import { Select } from 'mui-rff';
import { Modal, Button, MenuItem, makeStyles } from '@material-ui/core';
import { database } from '../../../../services/firebase';
import ADVANCEMENT_VALUATION from '../../../models/tables/advancementValuation.json';

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

const EditPlayerSkills = (props) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const [level, setLevel] = React.useState({});
	const [skills, setSkills] = React.useState([]);
	React.useEffect(() => {
		async function fetchLevels() {
			const snapshot = await database.collection('levels').get();
			const data = snapshot.docs
				.map((doc) => ({ ...doc.data(), id: doc.id }))
				.filter((l) => l.level === props.player.level)[0];
			setLevel({
				'Chosen Secondary': data.chosenSecondary,
				'Random Characteristic': data.randomCharacteristic,
				'Random Secondary': data.randomSecondary,
				'Random Primary': data.randomPrimary,
				'Chosen Primary': data.chosenPrimary,
			});
		}
		async function fetchSkills() {
			const snapshot = await database.collection('skills').get();
			const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setSkills(data);
		}
		fetchLevels();
		fetchSkills();
	}, []);

	const [advancementType, setAdvancementType] = React.useState('');
	const [sppCost, setSppCost] = React.useState(0);

	const handleUpdate = (formData) => {
		const { skill } = formData;
		const updatedPlayer = {
			...props.player,
			skills: `${props.player.skills},${skill}`,
			level: props.player.level + 1,
			SPP: props.player.SPP - sppCost,
			value:
				parseInt(props.player.value) +
				parseInt(ADVANCEMENT_VALUATION[advancementType]),
		};
		database
			.collection('rosters')
			.doc(props.roster.id)
			.update({
				...props.roster,
				players: [
					...props.roster.players.filter((p) => p.id !== props.player.id),
					updatedPlayer,
				],
			});
		props.handleClose();
	};

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<Form
				onSubmit={handleUpdate}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} name="editPlayerSkills">
						<Field
							name="type"
							render={({ input }) => (
								<Select
									name="type"
									label="Select Advancement Type"
									onChange={(e) => {
										input.onChange(e);
										setAdvancementType(e.target.value);
										setSppCost(level[e.target.value]);
									}}
								>
									{Object.keys(level).map((l) => (
										<MenuItem
											key={l}
											value={l}
											disabled={level[l] > props.player.SPP}
										>
											{l} (SPP Cost: {level[l]})
										</MenuItem>
									))}
								</Select>
							)}
						/>
						{advancementType && (
							<Field
								name="skill"
								render={({ input }) => (
									<Select name="skill" label="Skill">
										{skills
											.filter((skill) => {
												if (advancementType.toLowerCase().includes('primary')) {
													return props.player.primary.indexOf(skill.type) > -1;
												}
												if (
													advancementType.toLowerCase().includes('secondary')
												) {
													return (
														props.player.secondary.indexOf(skill.type) > -1
													);
												}
											})
											.map((skill) => (
												<MenuItem key={skill.name} value={skill.name}>
													{skill.name} ({skill.type})
												</MenuItem>
											))}
									</Select>
								)}
							/>
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Add Skill
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

export default EditPlayerSkills;
