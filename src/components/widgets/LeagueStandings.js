import React from 'react';
import {
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	padded: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
	subdued: {
		color: theme.palette.text.secondary,
	},
}));

function sumTDs(roster) {
	return roster.players.reduce((acc, cur) => {
		return cur.hasOwnProperty('stats') ? acc + parseInt(cur.stats.td) : acc;
	}, 0);
}

function sumCas(roster) {
	return roster.players.reduce((acc, cur) => {
		console.log(
			cur.hasOwnProperty('stats') && isNaN(parseInt(cur.stats.cas)) ? cur : null
		);
		return cur.hasOwnProperty('stats') ? acc + parseInt(cur.stats.cas) : acc;
	}, 0);
}

function sortByRecord(rosterA, rosterB) {
	if (parseInt(rosterA.leaguePoints) < parseInt(rosterB.leaguePoints)) {
		return 1;
	}
	if (parseInt(rosterA.leaguePoints) > parseInt(rosterB.leaguePoints)) {
		return -1;
	}
	return 0;
}

function sortByTDs(rosterA, rosterB) {
	if (parseInt(rosterA.leaguePoints) === parseInt(rosterB.leaguePoints)) {
		const rosterATDs = sumTDs(rosterA);
		const rosterBTDs = sumTDs(rosterB);
		if (rosterATDs < rosterBTDs) return 1;
		if (rosterATDs > rosterBTDs) return -1;
	}
	return 0;
}

function sortByCAS(rosterA, rosterB) {
	const rosterATDs = sumTDs(rosterA);
	const rosterBTDs = sumTDs(rosterB);

	if (
		rosterATDs === rosterBTDs &&
		parseInt(rosterA.leaguePoints) === parseInt(rosterB.leaguePoints)
	) {
		const rosterACas = sumCas(rosterA);
		const rosterBCas = sumCas(rosterB);
		if (rosterACas < rosterBCas) return 1;
		if (rosterACas > rosterBCas) return -1;
	}
	return 0;
}

function filterDelinquents(roster, currentWeek) {
	return (
		roster.record.win + roster.record.loss + roster.record.draw >= currentWeek
	);
}

const LeagueStandings = ({ rosters }) => {
	const classes = useStyles();
	const currentWeek = rosters.reduce((acc, cur) => {
		const gamesPlayed = cur.record.win + cur.record.loss + cur.record.draw;
		return gamesPlayed > acc ? gamesPlayed : acc;
	}, 0);
	return (
		rosters.length && (
			<Paper className={classes.padded}>
				<Typography variant="h5" className={classes.container}>
					League Standings - Week {currentWeek}
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Place</TableCell>
								<TableCell>Coach</TableCell>
								<TableCell>Team</TableCell>
								<TableCell>Record</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rosters
								.filter((roster) => filterDelinquents(roster, currentWeek))
								.sort(sortByRecord)
								.sort(sortByTDs)
								.sort(sortByCAS)
								.map((roster, ind) => (
									<TableRow>
										<TableCell>{ind + 1}</TableCell>
										<TableCell>
											{roster.userData.fname} {roster.userData.lname}
										</TableCell>
										<TableCell>{roster.name}</TableCell>
										<TableCell>
											({roster.record.win}/{roster.record.loss}/
											{roster.record.draw})
										</TableCell>
									</TableRow>
								))}
							{rosters
								.filter((roster) => !filterDelinquents(roster, currentWeek))
								.sort(sortByRecord)
								.sort(sortByTDs)
								.sort(sortByCAS)
								.map((roster, ind, self) => (
									<TableRow>
										<TableCell className={classes.subdued}>
											{rosters.length - (self.length - (ind + 1))}
										</TableCell>
										<TableCell className={classes.subdued}>
											{roster.userData.fname} {roster.userData.lname}
										</TableCell>
										<TableCell className={classes.subdued}>
											{roster.name}
										</TableCell>
										<TableCell className={classes.subdued}>
											({roster.record.win}/{roster.record.loss}/
											{roster.record.draw})
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		)
	);
};

export default LeagueStandings;
