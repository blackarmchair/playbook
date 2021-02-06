import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';

const Navbar = (
	<div>
		<Link href="/">
			<ListItem button>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItem>
		</Link>
		<Link href="/roster">
			<ListItem button>
				<ListItemIcon>
					<ListIcon />
				</ListItemIcon>
				<ListItemText primary="Roster" />
			</ListItem>
		</Link>
		<Link href="/league">
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="League" />
			</ListItem>
		</Link>
	</div>
);

export default Navbar;
