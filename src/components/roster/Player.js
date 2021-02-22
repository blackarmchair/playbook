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
	Hidden,
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
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	list: {
		width: '100%',
	},
	accordion: {
		'&:nth-of-type(even)': {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
		},
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.secondary.contrastText,
		},
	},
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
	const classes = useStyles();

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
					#{props.player.jerseyNumber}: {props.player.name || '[No Name]'} (
					{props.player.position})
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
