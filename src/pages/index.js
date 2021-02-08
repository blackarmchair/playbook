import React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import {
	makeStyles,
	CssBaseline,
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Container,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Navbar from '../components/common/Navbar';
import withAuth from '../../helpers/withAuth';

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
	padded: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
	paddingTop: {
		paddingTop: theme.spacing(2),
	},
}));

const Index = () => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(window.innerWidth > 1024);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
							<Paper className={classes.padded}>
								<Typography variant="h5" className={classes.container}>
									League Schedule
								</Typography>
								<TableContainer component={Paper}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell></TableCell>
												<TableCell></TableCell>
												<TableCell>Week 1</TableCell>
												<TableCell>Week 2</TableCell>
												<TableCell>Week 3</TableCell>
												<TableCell>Week 4</TableCell>
												<TableCell>Week 5</TableCell>
												<TableCell>Week 6</TableCell>
												<TableCell>Week 7</TableCell>
												<TableCell>Week 8</TableCell>
												<TableCell>Week 9</TableCell>
												<TableCell>Playoffs</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Coach</TableCell>
												<TableCell>Faction</TableCell>
												<TableCell>2/8 - 2/14</TableCell>
												<TableCell>2/15 - 2/21</TableCell>
												<TableCell>2/22 - 2/28</TableCell>
												<TableCell>3/1 - 3/7</TableCell>
												<TableCell>3/8 - 3/14</TableCell>
												<TableCell>3/15 - 3/21</TableCell>
												<TableCell>3/22 - 3/28</TableCell>
												<TableCell>3/29 - 4/4</TableCell>
												<TableCell>4/5 - 4/11</TableCell>
												<TableCell>Playoffs</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell>
													<strong>Alex A</strong>
												</TableCell>
												<TableCell>
													<strong>Orcs</strong>
												</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Willie</strong>
												</TableCell>
												<TableCell>
													<strong>Dwarves</strong>
												</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Nick</strong>
												</TableCell>
												<TableCell>
													<strong>Skaven</strong>
												</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Tim</strong>
												</TableCell>
												<TableCell>
													<strong>Goblins</strong>
												</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Willy</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Chris</strong>
												</TableCell>
												<TableCell>
													<strong>Nurgle</strong>
												</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Willy</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Kory</strong>
												</TableCell>
												<TableCell>
													<strong>Wood Elves</strong>
												</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Mitch</strong>
												</TableCell>
												<TableCell>
													<strong>Wood Elves</strong>
												</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Alex H</strong>
												</TableCell>
												<TableCell>
													<strong>Lizardmen</strong>
												</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Jordan</strong>
												</TableCell>
												<TableCell>
													<strong>Imperial Nobility</strong>
												</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>Taj</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<strong>Taj</strong>
												</TableCell>
												<TableCell>
													<strong>Black Orcs</strong>
												</TableCell>
												<TableCell>Alex H</TableCell>
												<TableCell>Nick</TableCell>
												<TableCell>Tim</TableCell>
												<TableCell>Jordan</TableCell>
												<TableCell>Chris</TableCell>
												<TableCell>Kory</TableCell>
												<TableCell>Willie</TableCell>
												<TableCell>Mitch</TableCell>
												<TableCell>Alex A</TableCell>
												<TableCell>TBD</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
};

export default withAuth(Index);
