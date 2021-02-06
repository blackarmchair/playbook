import { useState, useEffect } from 'react';
import { database } from '../../../services/firebase/index';

const Teams = () => {
	const [teams, setTeams] = useState([]);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		async function fetchTeams() {
			const snapshot = await database.collection('teams').get();
			const data = snapshot.docs.map((doc) => doc.data());
			setTeams(data);
		}
		async function fetchPlayers() {
			const snapshot = await database.collection('players').get();
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setPlayers(data);
		}
		fetchPlayers();
		fetchTeams();
	}, []);

	const TeamList = () => {
		const list = teams.map((team) => (
			<div key={team.id}>
				<p>
					<strong>Team Name:</strong> {team.name} Teams
				</p>
				{players
					.filter((player) => player.team === `${team.name} Teams`)
					.map((player) => (
						<p key={player.id}>
							{' '}
							({player.min} - {player.max}) / {player.position} / {player.cost}{' '}
						</p>
					))}
			</div>
		));
		return list;
	};

	return (
		<div>
			<h1>Teams</h1>
			{TeamList()}
		</div>
	);
};

export default Teams;
