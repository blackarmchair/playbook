import { delBasePath } from 'next/dist/next-server/lib/router/router';
import { database } from '../firebase/index';

const LEAGUE_MODEL = {
	name: '',
	description: '',
	players: [],
	teams: [],
	events: [],
	active: false,
};

const createLeague = async (leagueData) => {
	const league = Object.assign({}, LEAGUE_MODEL, leagueData);
	const newLeague = await database.collection('leagues').add(league);
	return { id: newLeague.id, ...league };
};

const startLeague = async (leagueId) => {
	const updatedLeague = await database
		.collection('leagues')
		.doc(leagueId)
		.update({ active: true });
	if (!!updatedLeague) {
		const league = await database.collection('leagues').doc(leagueId).get();
		return league;
	}
	return {};
};

const endLeague = async (leagueId) => {
	const updatedLeague = await database
		.collection('leagues')
		.doc(leagueId)
		.update({ active: false });
	if (!!updatedLeague) {
		const league = await database.collection('leagues').doc(leagueId).get();
		return league;
	}
	return {};
};

const deleteLeague = async (leagueId) => {
	const league = await database.collection('leagues').doc(leagueId).delete();
	return league;
};

const viewLeague = async (leagueId) => {
	const league = await database.collection('leagues').doc(leagueId).get();
	return league;
};

export default {
	createLeague,
	deleteLeague,
	startLeague,
	endLeague,
	viewLeague,
};
