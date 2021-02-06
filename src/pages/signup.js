import Head from 'next/head';
import Router from 'next/router';
import { auth, database } from '../../services/firebase/index';

import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import {
	Avatar,
	Button,
	CssBaseline,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Typography,
	makeStyles,
	Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = () => {
	const classes = useStyles();

	const handleSignUp = async (formData) => {
		const { email, password, firstName, lastName } = formData;
		const newUser = await auth.createUserWithEmailAndPassword(email, password);

		const usersRef = await database
			.collection('users')
			.doc(newUser.user.uid)
			.set({
				fname: firstName,
				lname: lastName,
				email,
			});

		Router.push('/');
	};

	return (
		<>
			<Head>
				<title>Sign Up</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Form
						onSubmit={handleSignUp}
						render={({ handleSubmit }) => (
							<form className={classes.form} noValidate onSubmit={handleSubmit}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete="fname"
											name="firstName"
											variant="outlined"
											required
											fullWidth
											id="firstName"
											label="First Name"
											autoFocus
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="lastName"
											label="Last Name"
											name="lastName"
											autoComplete="lname"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="current-password"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControlLabel
											control={
												<Checkbox value="allowExtraEmails" color="primary" />
											}
											label="I want to receive inspiration, marketing promotions and updates via email."
										/>
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Sign Up
								</Button>
								<Grid container justify="flex-end">
									<Grid item>
										<Link href="#" variant="body2">
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</form>
						)}
					/>
				</div>
			</Container>
		</>
	);
};

export default SignUp;
