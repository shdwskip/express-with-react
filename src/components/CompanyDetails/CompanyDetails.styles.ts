import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  slogan: {
    marginBottom: 10,
    fontStyle: 'italic',
    display: 'inline',
  },
  addressContainer: {
    marginBottom: 20,
  },
  listItem: {
    '& > .MuiListItemIcon-root': {
      paddingLeft: 8,
    },
  },
}));
