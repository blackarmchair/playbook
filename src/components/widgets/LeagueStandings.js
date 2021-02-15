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
}));

function determineStandings(rosterA, rosterB) {
	const rosterATDs = rosterA.players.reduce(
		(acc, cur) => (cur.hasOwnProperty('stats') ? acc + parseInt(cur.td) : acc),
		0
	);
	const rosterBTDs = rosterB.players.reduce(
		(acc, cur) => (cur.hasOwnProperty('stats') ? acc + parseInt(cur.td) : acc),
		0
	);
	if (parseInt(rosterA.leaguePoints) < parseInt(rosterB.leaguePoints)) {
		return 1;
	}
	if (parseInt(rosterA.leaguePoints) > parseInt(rosterB.leaguePoints)) {
		return -1;
	}
	if (parseInt(rosterA.leaguePoints) === parseInt(rosterB.leaguePoints)) {
		if (rosterATDs < rosterBTDs) {
			return 1;
		}
		if (rosterATDs > rosterBTDs) {
			return -1;
		}
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
								<TableCell>League Points</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rosters
								.filter((roster) => filterDelinquents(roster, currentWeek))
								.sort(determineStandings)
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
										<TableCell>{roster.leaguePoints}</TableCell>
									</TableRow>
								))}
							{rosters
								.filter((roster) => !filterDelinquents(roster, currentWeek))
								.sort(determineStandings)
								.map((roster, ind, self) => (
									<TableRow>
										<TableCell>
											{rosters.length - (self.length - (ind + 1))}
										</TableCell>
										<TableCell>
											{roster.userData.fname} {roster.userData.lname}
										</TableCell>
										<TableCell>{roster.name}</TableCell>
										<TableCell>
											({roster.record.win}/{roster.record.loss}/
											{roster.record.draw})
										</TableCell>
										<TableCell>{roster.leaguePoints}</TableCell>
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
