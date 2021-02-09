import React from 'react';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Link,
	makeStyles,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
	text: {
		color: theme.palette.common.white,
	},
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<div>
			<Link href="/">
				<ListItem button>
					<ListItemIcon>
						<HomeIcon className={classes.text} />
					</ListItemIcon>
					<ListItemText primary="Home" className={classes.text} />
				</ListItem>
			</Link>
			<Link href="/roster">
				<ListItem button>
					<ListItemIcon>
						<ListIcon className={classes.text} />
					</ListItemIcon>
					<ListItemText primary="Roster" className={classes.text} />
				</ListItem>
			</Link>
			<Link href="/league">
				<ListItem button>
					<ListItemIcon>
						<PeopleIcon className={classes.text} />
					</ListItemIcon>
					<ListItemText primary="League" className={classes.text} />
				</ListItem>
			</Link>
		</div>
	);
};

export default Navbar;
