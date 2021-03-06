import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import firebase from 'firebase/app';
import { database } from '../../services/firebase/index';
import local from '../../helpers/local';
import * as formatters from '../../helpers/formatters';
import clsx from 'clsx';
import {
	makeStyles,
	CssBaseline,
	Typography,
	Container,
	Grid,
	Paper,
} from '@material-ui/core';
import withAuth from '../../helpers/withAuth';
import CreateRoster from '../components/roster/CreateRoster';
import InitializeRoster from '../components/roster/InitializeRoster';
import UpdateRoster from '../components/roster/UpdateRoster';
import TopBar from '../components/common/TopBar';
import SideDrawer from '../components/common/SideDrawer';
import LoadingOverlay from '../components/common/LoadingOverlay';

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
		height: '100%',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Roster = () => {
	const classes = useStyles();

	// Get User Data
	const user = JSON.parse(local.get('user'));

	// Provide a method to reload page
	const [loading, setLoading] = useState(true);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	const updateRosterData = () => {
		setShouldUpdate(true);
	};

	// Get Roster & Team Data
	const [roster, setRoster] = useState([]);
	const [team, setTeam] = React.useState({});
	useEffect(() => {
		async function fetchRoster() {
			const snapshot = await database.collection('rosters').get();
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			const roster = data.filter((roster) => roster.owner === user.uid)[0];
			setRoster(roster);
			if (!!roster) {
				fetchTeam(roster.team);
			} else {
				setLoading(false);
			}
		}
		async function fetchTeam(teamId) {
			const snapshot = await database
				.collection('teams')
				.where(firebase.firestore.FieldPath.documentId(), '==', teamId)
				.get();
			const teamData = snapshot.docs[0].data();
			fetchPlayers(teamData);
		}
		async function fetchPlayers(teamData) {
			const snapshot = await database
				.collection('players')
				.where('team', '==', `${teamData.name} Teams`)
				.get();
			setTeam({
				...teamData,
				players: snapshot.docs.map((doc) => doc.data()),
			});
			setLoading(false);
		}
		if (shouldUpdate) {
			setShouldUpdate(false);
			fetchRoster();
		}
	}, [shouldUpdate]);

	// Track Costs
	const [cost, setCost] = useState([]);
	const handleupdateCost = (event, item, itemCost) => {
		const qty = event.target.value;
		const newEntry = { item, qty, cost: itemCost * qty };
		if (cost.length) {
			const newCostModel = cost.filter((entry) => entry.item !== item);
			setCost([...newCostModel, newEntry]);
		} else {
			setCost([newEntry]);
		}
	};

	// Manage Sidebar
	const [open, setOpen] = React.useState(window.innerWidth > 1024);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	// Handle Roster Initialization
	const handleRosterInit = (formData) => {
		const players = [];
		Object.keys(formData)
			.filter((key) => key.startsWith('player_'))
			.forEach((key, i) => {
				const playerData = team.players.find(
					(player) => player.position === key.split('_')[1]
				);
				Array.from(Array(formData[key])).forEach((p, j) => {
					players.push({
						...playerData,
						SPP: 0,
						name: '',
						id: `${new Date().getTime()}${i}${j}`,
						jerseyNumber: 0,
						MNG: false,
						NI: 0,
						level: 0,
						roster: roster.id,
						value: playerData.cost,
						stats: {
							cas: 0,
							comp: 0,
							int: 0,
							mvp: 0,
							td: 0,
						},
					});
				});
			});

		async function updateRoster() {
			await database
				.collection('rosters')
				.doc(roster.id)
				.update({
					apothecary: formData.apothecary || roster.apothecary,
					assistantCoaches:
						formData.assistantCoaches || roster.assistantCoaches,
					cheerleaders: formData.cheerleaders || roster.cheerleaders,
					dedicatedFans: formData.dedicatedFans || roster.dedicatedFans,
					rerolls: formData.rerolls || roster.rerolls,
					initiated: true,
					players: players,
					treasury:
						parseInt(roster.treasury) -
							parseInt(cost.reduce((acc, cur) => acc + cur.cost, 0)) || 0,
				})
				.then(() => {
					updateRosterData();
				});
		}

		if (players.length >= 11) {
			updateRoster();
		} else {
			alert('You cannot start a roster with fewer than 11 players.');
		}
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Head>
				<title>Playbook - Roster</title>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo-96x96.png" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<CssBaseline />
			<LoadingOverlay isLoading={loading} />
			<TopBar handleDrawerOpen={handleDrawerOpen} />
			<SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={12}>
							{!loading ? (
								<Paper className={fixedHeightPaper}>
									{roster &&
									roster.hasOwnProperty('owner') &&
									team.hasOwnProperty('players') ? (
										<>
											<Typography variant="h5">
												{!roster.initiated &&
													`${
														roster.name
													} - Current Value: ${formatters.parseNumber(
														cost.reduce((acc, cur) => acc + cur.cost, 0)
													)}g`}
											</Typography>
											{!roster.players.length ? (
												<InitializeRoster
													submit={handleRosterInit}
													roster={roster}
													team={team}
													handleupdateCost={handleupdateCost}
													updateRosterData={updateRosterData}
												/>
											) : (
												<UpdateRoster
													submit={handleRosterInit}
													roster={roster}
													team={team}
													handleupdateCost={handleupdateCost}
													updateRosterData={updateRosterData}
												/>
											)}
										</>
									) : (
										<CreateRoster updateRosterData={updateRosterData} />
									)}
								</Paper>
							) : null}
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
};

export default withAuth(Roster);
