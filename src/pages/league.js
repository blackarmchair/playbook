import React from 'react';
import clsx from 'clsx';
import {
	makeStyles,
	CssBaseline,
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Container,
	Grid,
	Paper,
	List,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from '../components/common/Navbar';
import withAuth from '../../helpers/withAuth';
import { database } from '../../services/firebase/index';
import Roster from '../components/roster/Roster';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
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
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
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
	accSummary: {
		flexDirection: window.innerWidth > 1024 ? 'row' : 'column',
	},
}));

const League = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(window.innerWidth > 1024);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const [rosters, setRosters] = React.useState([]);
	React.useEffect(() => {
		async function fetchRosters() {
			const snapshot = await database.collection('rosters').get();
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			fetchOwner(data);
		}
		async function fetchOwner(rosters) {
			const snapshot = await database.collection('users').get();
			const data = snapshot.docs.map((doc) => ({
				userData: {
					...doc.data(),
					id: doc.id,
				},
				...rosters.find((roster) => roster.owner === doc.id),
			}));
			setRosters(data);
		}
		fetchRosters();
	}, []);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						Playbook
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{Navbar}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								{rosters
									.sort((a, b) => {
										if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
										if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
										return 0;
									})
									.map((roster) => (
										<Accordion key={roster.id}>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls={`${roster.id}_content`}
												id={`${roster.id}_content`}
												classes={{
													content: classes.accSummary,
												}}
											>
												<Typography className={classes.heading}>
													{roster.name}
												</Typography>
												<Typography className={classes.secondaryHeading}>
													{roster.userData.fname} {roster.userData.lname}
												</Typography>
												{window.innerWidth > 1024 && (
													<Typography className={classes.secondaryHeading}>
														({roster.record.win}/{roster.record.loss}/
														{roster.record.draw})
													</Typography>
												)}
											</AccordionSummary>
											<AccordionDetails>
												<Roster roster={roster} />
											</AccordionDetails>
										</Accordion>
									))}
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
};

export default withAuth(League);
