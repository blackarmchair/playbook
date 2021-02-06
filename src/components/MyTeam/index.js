import { useState, useEffect } from 'react';
import { database } from '../../../services/firebase/index';
import local from '../../../helpers/local';

const MyTeam = () => {
	const user = local.get('user');
	return <pre>{user}</pre>;
};

export default MyTeam;
