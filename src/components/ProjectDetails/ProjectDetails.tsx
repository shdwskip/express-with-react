import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import { ICompanyProject } from '../../common/company.types';
import { IEmployee } from '../../common/employee.types';
import useStyles from './ProjectDetails.styles';
import { Autocomplete } from '@material-ui/lab';

interface IProps {
  data: ICompanyProject;
  companyEmployees: IEmployee[];
}

const ProjectDetails: React.FC<IProps> = ({ data, companyEmployees }) => {
  const classes = useStyles();

  const defaultValues = useMemo(
    () => ({
      [`name-${data.id}`]: data.name,
      [`department-${data.id}`]: data.department,
      [`assignedEmployees-${data.id}`]: companyEmployees.filter(
        (companyEmployee) =>
          data.employeesId.find((id) => companyEmployee.id === id)
      ),
    }),
    [companyEmployees, data]
  );

  const { register, reset, control, handleSubmit } = useForm({
    ...defaultValues,
  });

  useEffect(() => {
    reset({ ...defaultValues });
  }, [companyEmployees, data, defaultValues, reset]);

  const ProjectEmployees = useMemo(
    () => (
      <Controller
        name={`assignedEmployees-${data.id}`}
        control={control}
        defaultValue={defaultValues[`assignedEmployees-${data.id}`]}
        render={({ onChange, value }) => (
          <Autocomplete
            fullWidth
            multiple
            value={value}
            options={companyEmployees}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            filterSelectedOptions
            onChange={(_: unknown, value) => {
              onChange(value);
            }}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' label='Employees' />
            )}
            ChipProps={{
              icon: <PersonIcon />,
              color: 'primary',
              size: 'small',
              style: {
                fontWeight: 'bold',
              },
            }}
          />
        )}
      />
    ),
    [companyEmployees, control, data.id, defaultValues]
  );

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Paper elevation={3} classes={{ root: classes.root }}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.fullHeight}>
        <Grid container spacing={2} className={classes.fullHeight}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name={`name-${data.id}`}
              inputRef={register({ required: true })}
              label='Name'
              variant='outlined'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name={`department-${data.id}`}
              inputRef={register}
              label='Department'
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12}>
            {ProjectEmployees}
          </Grid>

          <Grid container justify='center' alignItems='flex-end'>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProjectDetails;
