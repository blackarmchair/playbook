import React from 'react';
import clsx from 'clsx';
import {
	Drawer,
	List,
	Divider,
	IconButton,
	makeStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Navbar from './Navbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		backgroundColor: theme.palette.secondary.main,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		backgroundColor: theme.palette.secondary.main,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	text: {
		color: theme.palette.secondary.main,
	},
}));

const SideDrawer = (props) => {
	const classes = useStyles();

	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: clsx(
					classes.drawerPaper,
					!props.open && classes.drawerPaperClose
				),
			}}
			open={props.open}
		>
			<div className={classes.toolbarIcon}>
				<IconButton>
					<ChevronLeftIcon className={classes.text} />
				</IconButton>
			</div>
			<Divider />
			<List>
				<Navbar />
			</List>
		</Drawer>
	);
};

export default SideDrawer;
