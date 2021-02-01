import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
  parentItem: {
    borderBottom: '1px solid gray',
    marginBottom: 16,
  },
  childItem: {
    borderBottom: '1px dashed gray',
    marginBottom: 4,

    '&:last-of-type': {
      border: 'none',
    },
  },
});
