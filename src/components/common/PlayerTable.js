import React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	makeStyles,
} from '@material-ui/core';
import * as formatters from '../../../helpers/formatters';

const useStyles = makeStyles((theme) => ({
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

const PlayerTable = (props) => {
	const classes = useStyles();
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell>Player</TableCell>
						<TableCell>Position</TableCell>
						{!props.minimal && (
							<>
								<TableCell>MA</TableCell>
								<TableCell>ST</TableCell>
								<TableCell>AG</TableCell>
								<TableCell>PA</TableCell>
								<TableCell>AV</TableCell>
								<TableCell>Skills & Traits</TableCell>
							</>
						)}
					</TableRow>
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
							<TableRow
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
								<TableCell>{player.jerseyNumber}</TableCell>
								<TableCell>{player.name}</TableCell>
								<TableCell>{player.position}</TableCell>
								{!props.minimal && (
									<>
										<TableCell>{player.MA}</TableCell>
										<TableCell>{player.ST}</TableCell>
										<TableCell>{player.AG}+</TableCell>
										<TableCell>{player.PA}+</TableCell>
										<TableCell>{player.AV}+</TableCell>
										<TableCell>
											{formatters.commaSpacing(player.skills)}
										</TableCell>
									</>
								)}
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PlayerTable;
