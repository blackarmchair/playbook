import React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import {
	makeStyles,
	CssBaseline,
	Typography,
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
import withAuth from '../../helpers/withAuth';
import { database } from '../../services/firebase/index';
import TopBar from '../components/common/TopBar';
import SideDrawer from '../components/common/SideDrawer';
import LoadingOverlay from '../components/common/LoadingOverlay';
import LeagueStandings from '../components/widgets/LeagueStandings';

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
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
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

	const [rosters, setRosters] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
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
			setLoading(false);
		}
		fetchRosters();
	}, []);

	return (
		<div className={classes.root}>
			<Head>
				<title>Playbook - Home</title>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo-96x96.png" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CssBaseline />
			<LoadingOverlay isLoading={loading} />
			<TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
			<SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
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
						<Grid item xs={12}>
							{rosters.length && <LeagueStandings rosters={rosters} />}
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
};

export default withAuth(Index);
