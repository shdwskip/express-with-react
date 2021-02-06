import React, { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import PersonIcon from '@material-ui/icons/Person';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

import { ICompanyProject } from '../../common/company.types';
import { IEmployee } from '../../common/employee.types';
import { updateProjectDetails, IProjectDetailsPayload } from '../../actions';
import useStyles from './ProjectDetails.styles';
import {
  employeeNameValidationSchema,
  departmentNameValidationSchema,
} from '../../validations';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      updateProjectDetails,
    },
    dispatch
  );

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {
  data: ICompanyProject;
  companyEmployees: IEmployee[];
}

interface IFormData {
  name: string;
  department: string;
  employees: IEmployee[];
}

const ProjectDetails: React.FC<IProps> = ({
  data,
  companyEmployees,
  updateProjectDetails,
}) => {
  const classes = useStyles();

  const defaultValues: IFormData = useMemo(
    () => ({
      name: data.name,
      department: data.department,
      employees: companyEmployees.filter((companyEmployee) =>
        data.employeesId.find((id) => companyEmployee.id === id)
      ),
    }),
    [companyEmployees, data]
  );

  const { register, reset, control, handleSubmit, errors } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    reset({ ...defaultValues });
  }, [companyEmployees, data, defaultValues, reset]);

  const ProjectEmployees = useMemo(
    () => (
      <Controller
        name='employees'
        control={control}
        defaultValue={defaultValues.employees}
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
    [companyEmployees, control, defaultValues]
  );

  const onSubmit = (formData: IFormData) => {
    const { employees, ...payload } = formData;

    payload['employeesId'] = employees.map((e) => e.id);
    payload['id'] = data.id;

    updateProjectDetails(payload as IProjectDetailsPayload);
  };

  return (
    <Paper elevation={3} classes={{ root: classes.root }}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.fullHeight}>
        <Grid container spacing={2} className={classes.fullHeight}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name='name'
              inputRef={register(employeeNameValidationSchema)}
              label='Name'
              variant='outlined'
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name='department'
              inputRef={register(departmentNameValidationSchema)}
              label='Department'
              variant='outlined'
              error={!!errors.department}
              helperText={errors.department?.message}
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

export default connector(ProjectDetails);
