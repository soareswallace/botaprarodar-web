import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    marginTop: 25,
  },
  card: {
    '& hr': {
      marginLeft: -20,
      marginRight: -20,
      border: '1px solid #eeeeee',
    },
  },
  cardHeader: {
    '& span': {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: 16,
      color: '#263238',
    },
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#515151',
    padding: '0 16px',
    height: 76,
    '&:last-child': {
      paddingBottom: 0,
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginRight: 10,
      },
    },
  },
  userContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  flexRowContainer: {
    display: 'flex',
    alignItems: 'space-around',
    marginLeft: 40,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 36,
    color: '#000000',
    marginLeft: 40,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  avatar: {
    width: '180px',
    height: '180px',
    marginBottom: '16px',
    position: 'relative',
    border: '3px solid #fff',
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
    },
  },
  imageButton: {
    width: 90,
    height: 60,
    border: 0,
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
  },
  blocked: {
    backgroundColor: '#E53535',
    border: '3px solid #E53535',
  },
  badge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
  },
}));
