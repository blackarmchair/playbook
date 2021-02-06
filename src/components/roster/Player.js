import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Avatar,
	makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import EditPlayerMeta from './modals/EditPlayerMeta';
import EditPlayerSPP from './modals/EditPlayerSPP';
import EditPlayerSkills from './modals/EditPlayerSkills';
import EditPlayerInjuries from './modals/EditPlayerInjuries';
import * as formatters from '../../../helpers/formatters';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	list: {
		width: '100%',
	},
}));

const Player = (props) => {
	const classes = useStyles();

	const [expanded, setExpanded] = React.useState(false);
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const [playerMetaModal, setPlayerMetaModal] = React.useState(false);
	const [playerSPPModal, setPlayerSPPModal] = React.useState(false);
	const [playerSkillsModal, setPlayerSkillsModal] = React.useState(false);
	const [playerInjuriesModal, setPlayerInjuriesModal] = React.useState(false);

	return (
		<>
			<EditPlayerMeta
				open={playerMetaModal}
				handleClose={() => {
					props.updateRosterData();
					setPlayerMetaModal(false);
				}}
				roster={props.roster}
				player={props.player}
			/>
			<EditPlayerSPP
				open={playerSPPModal}
				handleClose={() => {
					props.updateRosterData();
					setPlayerSPPModal(false);
				}}
				roster={props.roster}
				player={props.player}
			/>
			<EditPlayerSkills
				open={playerSkillsModal}
				handleClose={() => {
					props.updateRosterData();
					setPlayerSkillsModal(false);
				}}
				roster={props.roster}
				player={props.player}
			/>
			<EditPlayerInjuries
				open={playerInjuriesModal}
				handleClose={() => {
					props.updateRosterData();
					setPlayerInjuriesModal(false);
				}}
				roster={props.roster}
				player={props.player}
			/>
			<Accordion
				expanded={expanded === props.player.id}
				onChange={handleChange(props.player.id)}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${props.player.id}_content`}
					id={`${props.player.id}_content`}
				>
					<Typography className={classes.heading}>
						#{props.player.jerseyNumber}: {props.player.name || '[No Name]'} (
						{props.player.position})
					</Typography>
					<Typography className={classes.secondaryHeading}>
						MA: {props.player.MA} | ST: {props.player.ST} | AG:{' '}
						{props.player.AG}+ | PA: {props.player.PA}+ | AV: {props.player.AV}+
					</Typography>
					<Typography className={classes.secondaryHeading}>
						{formatters.commaSpacing(props.player.skills)}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List className={classes.list}>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={props.player.name || '[No Name]'}
								secondary="Change Player Name / Number"
							/>
							{!props.readOnly && (
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										onClick={() => setPlayerMetaModal(true)}
									>
										<EditIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={props.player.SPP} secondary="Edit SPP" />
							{!props.readOnly && (
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										onClick={() => setPlayerSPPModal(true)}
									>
										<EditIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={formatters.commaSpacing(props.player.skills)}
								secondary="Add Skills"
							/>
							{!props.readOnly && (
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										onClick={() => setPlayerSkillsModal(true)}
									>
										<EditIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`Miss Next Game: ${
									props.player.MNG ? 'Yes' : 'No'
								} | Niggling Injuries: ${props.player.NI}`}
								secondary="Update Injury Status"
							/>
							{!props.readOnly && (
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										onClick={() => setPlayerInjuriesModal(true)}
									>
										<EditIcon />
									</IconButton>
								</ListItemSecondaryAction>
							)}
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={formatters.parseNumber(props.player.value)}
								secondary="Player Value"
							/>
						</ListItem>
					</List>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default Player;
