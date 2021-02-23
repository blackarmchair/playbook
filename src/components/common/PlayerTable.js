import React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Hidden,
	makeStyles,
	withStyles,
} from '@material-ui/core';
import * as formatters from '../../../helpers/formatters';

const useStyles = (props) =>
	makeStyles((theme) => ({
		dead: {
			backgroundColor: theme.palette.secondary.light,
		},
		injured: {
			backgroundColor: theme.palette.error.light,
		},
		healthy: {
			backgroundColor: theme.palette.common.white,
		},
	}));

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		cursor: 'pointer',
	},
	body: {
		fontSize: 14,
		color: theme.palette.primary.contrastText,
		cursor: 'pointer',
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(even)': {
			backgroundColor: theme.palette.primary.main,
		},
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.primary.light,
		},
	},
}))(TableRow);

const PlayerTable = (props) => {
	const classes = useStyles(props)();
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					{props.showRosterTitle && (
						<StyledTableRow>
							<StyledTableCell colSpan={9}>{props.roster.name}</StyledTableCell>
						</StyledTableRow>
					)}
					<StyledTableRow>
						<StyledTableCell>#</StyledTableCell>
						<StyledTableCell>Player</StyledTableCell>
						<StyledTableCell>Position</StyledTableCell>
						<Hidden smDown>
							<StyledTableCell>MA</StyledTableCell>
							<StyledTableCell>ST</StyledTableCell>
							<StyledTableCell>AG</StyledTableCell>
							<StyledTableCell>PA</StyledTableCell>
							<StyledTableCell>AV</StyledTableCell>
							<StyledTableCell>Skills & Traits</StyledTableCell>
						</Hidden>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{props.players
						.sort((a, b) => {
							if (a.position.toLowerCase() < b.position.toLowerCase())
								return -1;
							if (a.position.toLowerCase() > b.position.toLowerCase()) return 1;
							return 0;
						})
						.map((player) => (
							<StyledTableRow
								onClick={() => props.handlePlayerSelect(player)}
								className={
									player.DEAD
										? classes.dead
										: player.MNG
										? classes.injured
										: classes.healthy
								}
								key={player.id}
							>
								<StyledTableCell>{player.jerseyNumber}</StyledTableCell>
								<StyledTableCell>{player.name}</StyledTableCell>
								<StyledTableCell>{player.position}</StyledTableCell>
								<Hidden smDown>
									<StyledTableCell>{player.MA}</StyledTableCell>
									<StyledTableCell>{player.ST}</StyledTableCell>
									<StyledTableCell>{player.AG}+</StyledTableCell>
									<StyledTableCell>{player.PA}+</StyledTableCell>
									<StyledTableCell>{player.AV}+</StyledTableCell>
									<StyledTableCell>
										{formatters.commaSpacing(player.skills)}
									</StyledTableCell>
								</Hidden>
							</StyledTableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PlayerTable;
