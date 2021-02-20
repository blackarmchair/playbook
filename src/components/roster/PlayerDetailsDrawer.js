import React from 'react';
import {
	Grid,
	Container,
	Paper,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	ListItemAvatar,
	Avatar,
	makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import CancelIcon from '@material-ui/icons/Cancel';
import * as formatters from '../../../helpers/formatters';
import { database } from '../../../services/firebase/index';

import PlayerTable from '../common/PlayerTable';
import EditPlayerMeta from './modals/EditPlayerMeta';
import EditPlayerSPP from './modals/EditPlayerSPP';
import EditPlayerSkills from './modals/EditPlayerSkills';
import EditPlayerInjuries from './modals/EditPlayerInjuries';

const useStyles = makeStyles((theme) => ({
	drawer: {
		backgroundColor: theme.palette.background.paperTransparent,
		padding: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			width: '75vw',
			flexShrink: 0,
		},
		[theme.breakpoints.down('sm')]: {
			width: '100vw',
			flexShrink: 0,
		},
	},
	gridItem: {
		flexGrow: 1,
	},
	gridItemContainer: {
		height: '100%',
	},
	closeDrawerIcon: {
		color: theme.palette.background.paper,
	},
}));

const PlayerDetailsDrawer = ({
	open,
	handleClose,
	handleOpen,
	player,
	roster,
	updateRosterData,
	readOnly = false,
}) => {
	const classes = useStyles();

	const [playerLevel, setPlayerLevel] = React.useState('');
	React.useEffect(() => {
		async function fetchLevels() {
			const snapshot = await database.collection('levels').get();
			const data = snapshot.docs
				.map((doc) => ({ ...doc.data(), id: doc.id }))
				.find((doc) => parseInt(doc.level) === parseInt(player.level));
			setPlayerLevel(data.label);
		}
		if (player.hasOwnProperty('id')) {
			fetchLevels();
		}
	}, [player]);

	const [playerMetaModal, setPlayerMetaModal] = React.useState(false);
	const [playerSPPModal, setPlayerSPPModal] = React.useState(false);
	const [playerSkillsModal, setPlayerSkillsModal] = React.useState(false);
	const [playerInjuriesModal, setPlayerInjuriesModal] = React.useState(false);

	return (
		<SwipeableDrawer
			anchor="right"
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			classes={{
				paper: classes.drawer,
			}}
		>
			<EditPlayerMeta
				open={playerMetaModal}
				handleClose={() => {
					updateRosterData();
					setPlayerMetaModal(false);
				}}
				roster={roster}
				player={player}
			/>
			<EditPlayerSPP
				open={playerSPPModal}
				handleClose={() => {
					updateRosterData();
					setPlayerSPPModal(false);
				}}
				roster={roster}
				player={player}
			/>
			<EditPlayerSkills
				open={playerSkillsModal}
				handleClose={() => {
					updateRosterData();
					setPlayerSkillsModal(false);
				}}
				roster={roster}
				player={player}
			/>
			<EditPlayerInjuries
				open={playerInjuriesModal}
				handleClose={() => {
					updateRosterData();
					setPlayerInjuriesModal(false);
				}}
				roster={roster}
				player={player}
			/>
			<Grid container spacing={2}>
				<Grid item xs={10} sm={11}></Grid>
				<Grid item xs={2} sm={1}>
					<IconButton onClick={handleClose}>
						<CancelIcon className={classes.closeDrawerIcon} />
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<PlayerTable players={[player]} handlePlayerSelect={() => {}} />
				</Grid>
				<Grid className={classes.gridItem} item xs={12} md={6}>
					<Container component={Paper} className={classes.gridItemContainer}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LabelIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Player Name & Number:"
									secondary={`#${player.jerseyNumber} ${
										player.name || '[No Name]'
									}`}
								/>
								{!readOnly && (
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
						</List>
					</Container>
				</Grid>
				<Grid className={classes.gridItem} item xs={12} md={6}>
					<Container component={Paper} className={classes.gridItemContainer}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LabelIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Player Value:"
									secondary={formatters.parseNumber(player.value)}
								/>
							</ListItem>
						</List>
					</Container>
				</Grid>
				<Grid className={classes.gridItem} item xs={12} md={6}>
					<Container component={Paper} className={classes.gridItemContainer}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LabelIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Skills:"
									secondary={formatters.commaSpacing(player.skills)}
								/>
								{!readOnly && (
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
						</List>
					</Container>
				</Grid>
				<Grid className={classes.gridItem} item xs={12} md={6}>
					<Container component={Paper} className={classes.gridItemContainer}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LabelIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Star Player Points (SPP):"
									secondary={player.SPP}
								/>
								{!readOnly && (
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
						</List>
					</Container>
				</Grid>
				<Grid className={classes.gridItem} item xs={12} md={6}>
					<Container component={Paper} className={classes.gridItemContainer}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LabelIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Update Injury Status:"
									secondary={`Miss Next Game: ${
										player.MNG ? 'Yes' : 'No'
									} | Niggling Injuries: ${player.NI}`}
								/>
								{!readOnly && (
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
						</List>
					</Container>
				</Grid>
				<Grid className={classes.gridItem} item xs={12} md={6}>
					<Container component={Paper} className={classes.gridItemContainer}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LabelIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Player Level:" secondary={playerLevel} />
							</ListItem>
						</List>
					</Container>
				</Grid>
			</Grid>
		</SwipeableDrawer>
	);
};

export default PlayerDetailsDrawer;
