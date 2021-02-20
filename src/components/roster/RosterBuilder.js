import React from 'react';
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	Hidden,
	IconButton,
	Avatar,
	makeStyles,
} from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import EditIcon from '@material-ui/icons/Edit';

import * as formatters from '../../../helpers/formatters';

const useStyles = makeStyles((theme) => ({
	layout: {
		[theme.breakpoints.down('sm')]: {
			position: 'initial',
			transform: 'initial',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
			borderBottom: `1px solid ${theme.palette.text.disabled}`,
		},
	},
}));

const RosterItem = ({ primary, secondary, children }) => {
	const classes = useStyles();
	return (
		<ListItem>
			<Hidden smDown>
				<ListItemAvatar>
					<Avatar>
						<LabelIcon />
					</Avatar>
				</ListItemAvatar>
			</Hidden>
			<ListItemText primary={primary} secondary={secondary} />
			<ListItemSecondaryAction classes={{ root: classes.layout }}>
				{children}
			</ListItemSecondaryAction>
		</ListItem>
	);
};

const RosterBuilder = (props) => {
	return (
		<List>
			<RosterItem
				primary="Team Re-Rolls"
				secondary={`${props.roster.name} have (${props.roster.rerolls}) team re-rolls.`}
			>
				<IconButton onClick={() => props.buildRoster('rerolls')}>
					<AddCircleIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Cheerleaders"
				secondary={`${props.roster.name} have (${props.roster.cheerleaders}) cheerleaders.`}
			>
				<IconButton onClick={() => props.buildRoster('cheerleaders')}>
					<AddCircleIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Assistant Coaches"
				secondary={`${props.roster.name} have (${props.roster.assistantCoaches}) assistant coaches.`}
			>
				<IconButton onClick={() => props.buildRoster('assistantCoaches')}>
					<AddCircleIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Apothecary"
				secondary={`${props.roster.name} have (${props.roster.apothecary}) apothecaries.`}
			>
				<IconButton onClick={() => props.buildRoster('apothecary')}>
					<AddCircleIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Dedicated Fans"
				secondary={`${props.roster.name} have (${
					props.roster.dedicatedFans + 1
				}) dedicated fans.`}
			>
				<IconButton onClick={() => props.updateDedicatedFans(true)}>
					<AddCircleIcon />
				</IconButton>
				<IconButton onClick={() => props.updateDedicatedFans(false)}>
					<RemoveCircleIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Record"
				secondary={`${props.roster.name} have a record of (${props.roster.record.win}/${props.roster.record.loss}/${props.roster.record.draw})`}
			>
				<IconButton onClick={() => props.addLeaguePoints(3, 'win')}>
					<CheckCircleIcon />
				</IconButton>
				<IconButton onClick={() => props.addLeaguePoints(1, 'draw')}>
					<SwapHorizontalCircleIcon />
				</IconButton>
				<IconButton onClick={() => props.addLeaguePoints(0, 'loss')}>
					<CancelIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Hire A New Player"
				secondary={`${props.roster.name} currently have (${props.roster.players.length}) players.`}
			>
				<IconButton onClick={() => props.setAddPlayerModal()}>
					<AddCircleIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Update Treasury"
				secondary={`${
					props.roster.name
				} currently have ${formatters.parseNumber(props.roster.treasury)}g.`}
			>
				<IconButton onClick={() => props.setTreasuryModal()}>
					<EditIcon />
				</IconButton>
			</RosterItem>
			<RosterItem
				primary="Team Value"
				secondary={`${
					props.roster.name
				} currently have a value of ${formatters.parseNumber(
					props.teamValue()
				)}g.`}
			/>
		</List>
	);
};

export default RosterBuilder;
