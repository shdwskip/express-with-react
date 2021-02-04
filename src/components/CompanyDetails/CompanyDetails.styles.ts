import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  slogan: {
    marginBottom: 10,
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
