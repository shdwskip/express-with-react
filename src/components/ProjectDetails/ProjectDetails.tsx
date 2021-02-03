import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField } from '@material-ui/core';

import { ICompanyProject } from '../../common/company.types';
import useStyles from './ProjectDetails.styles';

interface IProps {
  data: ICompanyProject;
}

const ProjectDetails: React.FC<IProps> = ({ data }) => {
  const classes = useStyles();

  const defaultValues = useMemo(
    () => ({
      [`name-${data.id}`]: data.name,
      [`department-${data.id}`]: data.department,
    }),
    [data.id]
  );

  const { register, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset({ ...defaultValues });
  }, [data.id]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item xs={6}>
        <TextField
          name={`name-${data.id}`}
          inputRef={register}
          label='Name'
          variant='outlined'
          className={classes.textField}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          name={`department-${data.id}`}
          inputRef={register}
          label='Department'
          variant='outlined'
          className={classes.textField}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default ProjectDetails;
