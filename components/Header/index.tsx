import { FC, memo, useState, useRef, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { get } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Skeleton from '@material-ui/lab/Skeleton';
//
import clickedOutside from '../../lib/utils/clickedOutside';
import { fetcher } from '../../lib/utils/fetcher';
import { MenuItem } from '../../lib/types/menu';
//
import Loader from '../Loader';
import Menu from './components/Menu';
import Logo from './components/Logo';
import SocialLinks from './components/SocialLinks';
//
import styles from './style.module.scss';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto',
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '12ch',
				'&:focus': {
					width: '20ch',
				},
			},
		},
	})
);

const Header: FC<{}> = () => {
	const router = useRouter();
	const wrapperRef = useRef(null);
	const { data, error } = useSWR(`/api/menu/header`, fetcher);
	const [menuToggled, setMenuToggled] = useState<boolean>(false);
	const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
	const [searchValue, setSearchValue] = useState<string>('');

	const classes = useStyles();
	const classNames = `${classes.root} ${styles.Header}`;

	useEffect(() => {
		if (data) {
			const menuData = get(data, 'menu.menuItems.nodes', null);
			setMenuItems(menuData);
		}
	}, [data]);

	clickedOutside(
		wrapperRef,
		() => {
			if (menuToggled) {
				setMenuToggled(false);
			}
		},
		menuToggled
	);

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (searchValue.length < 3) return;

		router.push(`/search?search=${searchValue}?page=${1}`);
	};

	if (error) return <Loader />;

	if (!data) {
		return (
			<>
				<Loader />
				<Skeleton
					variant="rect"
					width="100%"
					height="65px"
					style={{ top: '0', left: 'unset', right: '0', position: 'fixed' }}
				/>
			</>
		);
	}

	return (
		<>
			<AppBar className={classNames} position="fixed">
				<Container maxWidth="lg" disableGutters>
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
							onClick={() => setMenuToggled(!menuToggled)}
						>
							{!menuToggled ? <MenuIcon /> : <CloseIcon />}
						</IconButton>
						<Logo />
						<div className={classes.search}>
							<form onSubmit={(e) => handleSearch(e)}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
								/>
							</form>
						</div>
					</Toolbar>
				</Container>
			</AppBar>

			{menuToggled && (
				<Slide direction="right" in={menuToggled} mountOnEnter unmountOnExit>
					<aside ref={wrapperRef} className={styles.HeaderMenu}>
						{menuItems && <Menu items={menuItems} />}
						<SocialLinks />
					</aside>
				</Slide>
			)}
		</>
	);
};

export default memo(Header);
