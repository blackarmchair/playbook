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
		color: theme.palette.text.secondary,
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	list: {
		width: '100%',
	},
	accSummary: {
		flexDirection: window.innerWidth > 1024 ? 'row' : 'column',
	},
	noPadding: {
		padding: 0,
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
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
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
			<AccordionDetails classes={{ root: classes.noPadding }}>
				<List className={classes.list}>
					<ListItem>
						<Hidden smDown>
							<ListItemAvatar>
								<Avatar>
									<LabelIcon />
								</Avatar>
							</ListItemAvatar>
						</Hidden>
						<ListItemText primary="SPP:" secondary={props.player.SPP} />
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
						/>
					</ListItem>
				</List>
			</AccordionDetails>
		</Accordion>
	);
};

export default Player;
