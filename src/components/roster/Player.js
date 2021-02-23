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
	Avatar,
	Hidden,
	makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabelIcon from '@material-ui/icons/Label';
import { database } from '../../../services/firebase/index';
import * as formatters from '../../../helpers/formatters';

const useStyles = (props) =>
	makeStyles((theme) => ({
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
			flexBasis: '33.33%',
			flexShrink: 0,
		},
		list: {
			width: '100%',
		},
		accordion: () => ({
			'&:nth-of-type(even)': {
				backgroundColor:
					props.player.MNG || props.player.DEAD
						? theme.palette.background.default
						: theme.palette.primary.main,
				color:
					props.player.MNG || props.player.DEAD
						? theme.palette.text.disabled
						: theme.palette.primary.contrastText,
			},
			'&:nth-of-type(odd)': {
				backgroundColor:
					props.player.MNG || props.player.DEAD
						? theme.palette.background.default
						: theme.palette.primary.light,
				color:
					props.player.MNG || props.player.DEAD
						? theme.palette.text.disabled
						: theme.palette.primary.contrastText,
			},
		}),
		accSummary: {
			flexDirection: window.innerWidth > 1024 ? 'row' : 'column',
		},
		accDetails: {
			padding: 0,
		},
		expandIcon: {
			'&:nth-of-type(even)': {
				color: theme.palette.primary.contrastText,
			},
			'&:nth-of-type(odd)': {
				color: theme.palette.secondary.contrastText,
			},
		},
		whiteText: {
			color: theme.palette.common.white,
		},
	}));

const Player = (props) => {
	const classes = useStyles(props)();

	const [playerLevel, setPlayerLevel] = React.useState('');
	React.useEffect(() => {
		async function fetchLevels() {
			const snapshot = await database.collection('levels').get();
			const data = snapshot.docs
				.map((doc) => ({ ...doc.data(), id: doc.id }))
				.find((doc) => parseInt(doc.level) === parseInt(props.player.level));
			setPlayerLevel(data.label);
		}
		if (props.player.hasOwnProperty('id')) {
			fetchLevels();
		}
	}, []);

	const [expanded, setExpanded] = React.useState(false);
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Accordion
			expanded={expanded === props.player.id}
			onChange={handleChange(props.player.id)}
			classes={{ root: classes.accordion }}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
				aria-controls={`${props.player.id}_content`}
				id={`${props.player.id}_content`}
				classes={{
					content: classes.accSummary,
				}}
			>
				<Typography className={classes.heading}>
					<strong>
						#{props.player.jerseyNumber}: {props.player.name || '[No Name]'}
					</strong>
					<br />
					{props.player.position}
					<br />
					{playerLevel}
				</Typography>
				<Typography className={classes.secondaryHeading}>
					MA: {props.player.MA} | ST: {props.player.ST} | AG: {props.player.AG}+
					| PA: {props.player.PA}+ | AV: {props.player.AV}+
				</Typography>
			</AccordionSummary>
			<AccordionDetails classes={{ root: classes.accDetails }}>
				<List className={classes.list}>
					<ListItem>
						<Hidden smDown>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
						</Hidden>
						<ListItemText
							primary="Star Player Points (SPP):"
							secondary={props.player.SPP}
							classes={{
								primary: classes.whiteText,
								secondary: classes.whiteText,
							}}
						/>
					</ListItem>
					<ListItem>
						<Hidden smDown>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
						</Hidden>
						<ListItemText
							primary="Skills:"
							secondary={formatters.commaSpacing(props.player.skills)}
							classes={{
								primary: classes.whiteText,
								secondary: classes.whiteText,
							}}
						/>
					</ListItem>
					<ListItem>
						<Hidden smDown>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
						</Hidden>
						<ListItemText
							primary="Miss Next Game:"
							secondary={props.player.MNG ? 'Yes' : 'No'}
							classes={{
								primary: classes.whiteText,
								secondary: classes.whiteText,
							}}
						/>
					</ListItem>
					<ListItem>
						<Hidden smDown>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
						</Hidden>
						<ListItemText
							primary="Niggling Injuries"
							secondary={props.player.NI}
							classes={{
								primary: classes.whiteText,
								secondary: classes.whiteText,
							}}
						/>
					</ListItem>
					<ListItem>
						<Hidden smDown>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
						</Hidden>
						<ListItemText
							primary="Player Value"
							secondary={`${formatters.parseNumber(props.player.value)}g`}
							classes={{
								primary: classes.whiteText,
								secondary: classes.whiteText,
							}}
						/>
					</ListItem>
				</List>
			</AccordionDetails>
		</Accordion>
	);
};

export default Player;
