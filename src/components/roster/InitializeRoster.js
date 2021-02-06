import React from 'react';
import { Form, Field } from 'react-final-form';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	TextField as MuiTextField,
	MenuItem,
	makeStyles,
} from '@material-ui/core';
import * as formatters from '../../../helpers/formatters';

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const InitializeRoster = (props) => {
	const classes = useStyles();
	return (
		<Form
			onSubmit={props.submit}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} name="rosterInit">
					<TableContainer component={Paper} className={classes.submit}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>QTY</TableCell>
									<TableCell>Position</TableCell>
									<TableCell align="right">COST</TableCell>
									<TableCell align="right">MA</TableCell>
									<TableCell align="right">ST</TableCell>
									<TableCell align="right">AG</TableCell>
									<TableCell align="right">PA</TableCell>
									<TableCell align="right">AV</TableCell>
									<TableCell>SKILLS & TRAITS</TableCell>
									<TableCell>Primary</TableCell>
									<TableCell>Secondary</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.team.players.map((player) => (
									<TableRow key={player.position}>
										<TableCell component="th" scope="row">
											<Field
												name={`player_${player.position}`}
												component={({ input }) => (
													<MuiTextField
														{...input}
														onChange={(e) => {
															input.onChange(e);
															props.handleupdateCost(
																e,
																player.position,
																player.cost
															);
														}}
														variant="outlined"
														margin="normal"
														id={player.position}
														label=""
														select
													>
														{Array.from(Array(player.max + 1)).map((x, i) => (
															<MenuItem value={i} key={i}>
																{i}
															</MenuItem>
														))}
													</MuiTextField>
												)}
											/>
										</TableCell>
										<TableCell component="th" scope="row">
											{player.position}
										</TableCell>
										<TableCell align="right">
											{formatters.parseNumber(player.cost)}
										</TableCell>
										<TableCell align="right">{player.MA}</TableCell>
										<TableCell align="right">{player.ST}</TableCell>
										<TableCell align="right">{player.AG}</TableCell>
										<TableCell align="right">{player.PA}</TableCell>
										<TableCell align="right">{player.AV}</TableCell>
										<TableCell>{player.skills}</TableCell>
										<TableCell align="center">{player.primary}</TableCell>
										<TableCell align="center">{player.secondary}</TableCell>
									</TableRow>
								))}
								<TableRow>
									<TableCell>
										<Field
											name="rerolls"
											component={({ input }) => (
												<MuiTextField
													{...input}
													onChange={(e) => {
														input.onChange(e);
														props.handleupdateCost(
															e,
															'rerolls',
															props.team.rerolls.cost
														);
													}}
													variant="outlined"
													margin="normal"
													id="rerolls"
													label=""
													select
												>
													{Array.from(Array(props.team.rerolls.max + 1)).map(
														(x, i) => (
															<MenuItem value={i} key={i}>
																{i}
															</MenuItem>
														)
													)}
												</MuiTextField>
											)}
										/>
									</TableCell>
									<TableCell>Re-Rolls</TableCell>
									<TableCell>{props.team.rerolls.cost}</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Field
											name="dedicatedFans"
											component={({ input }) => (
												<MuiTextField
													{...input}
													onChange={(e) => {
														input.onChange(e);
														props.handleupdateCost(e, 'dedicatedFans', 10000);
													}}
													variant="outlined"
													margin="normal"
													id="dedicatedFans"
													label=""
													select
												>
													{Array.from(Array(7)).map((x, i) => (
														<MenuItem value={i} key={i}>
															{i}
														</MenuItem>
													))}
												</MuiTextField>
											)}
										/>
									</TableCell>
									<TableCell>Dedicated Fans</TableCell>
									<TableCell>10000</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Field
											name="cheerleaders"
											component={({ input }) => (
												<MuiTextField
													{...input}
													onChange={(e) => {
														input.onChange(e);
														props.handleupdateCost(e, 'cheerleaders', 10000);
													}}
													variant="outlined"
													margin="normal"
													id="cheerleaders"
													label=""
													select
												>
													{Array.from(Array(7)).map((x, i) => (
														<MenuItem value={i} key={i}>
															{i}
														</MenuItem>
													))}
												</MuiTextField>
											)}
										/>
									</TableCell>
									<TableCell>Cheerleaders</TableCell>
									<TableCell>10000</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Field
											name="assistantCoaches"
											component={({ input }) => (
												<MuiTextField
													{...input}
													onChange={(e) => {
														input.onChange(e);
														props.handleupdateCost(
															e,
															'assistantCoaches',
															10000
														);
													}}
													variant="outlined"
													margin="normal"
													id="assistantCoaches"
													label=""
													select
												>
													{Array.from(Array(7)).map((x, i) => (
														<MenuItem value={i} key={i}>
															{i}
														</MenuItem>
													))}
												</MuiTextField>
											)}
										/>
									</TableCell>
									<TableCell>Assistant Coaches</TableCell>
									<TableCell>10000</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
									<TableCell>-</TableCell>
								</TableRow>
								{props.team.apothecary ? (
									<TableRow>
										<TableCell>
											<Field
												name="apothecary"
												component={({ input }) => (
													<MuiTextField
														{...input}
														onChange={(e) => {
															input.onChange(e);
															props.handleupdateCost(e, 'apothecary', 50000);
														}}
														variant="outlined"
														margin="normal"
														id="rerolls"
														label=""
														select
													>
														{Array.from(Array(2)).map((x, i) => (
															<MenuItem value={i} key={i}>
																{i}
															</MenuItem>
														))}
													</MuiTextField>
												)}
											/>
										</TableCell>
										<TableCell>Apothecary</TableCell>
										<TableCell>50000</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
										<TableCell>-</TableCell>
									</TableRow>
								) : null}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Confirm Starting Roster
					</Button>
				</form>
			)}
		/>
	);
};

export default InitializeRoster;
