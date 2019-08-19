import React from 'react';
import {Paper, Typography, Button, Grid, Popover } from '@material-ui/core';
import './ConfirmationPopper.css';
import { useMutation } from '@apollo/react-hooks';
import * as q from '../../../queries';
import { PopperProps } from '../../../interfaces';

const ConfirmationPopper:React.FC<PopperProps> = props => {

    const delContact = useMutation(q.deleteContact)[0];

    const deleteContact = () => {
        const id = props.contactId
        delContact({ variables: { id } });
        props.refreshData();
        props.close();
    }

    return (
        <Popover
            open={props.open}
            anchorOrigin={
                {
                    vertical: 'top',
                    horizontal: 'center'
                }
            }
            transformOrigin={
                {
                    vertical: 'top',
                    horizontal: 'center'
                }
            }
            onClose={props.close}
            disableRestoreFocus
        >
            <Paper className='body'>
                <Typography variant='h5' align='center' gutterBottom>Confirmation required</Typography>
                <Grid container justify='center' >
                    <Grid container justify='flex-start'>
                        <Grid item>
                            <Typography variant='body1' gutterBottom align='left'>
                                Do you really want to delete this contact?
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify='flex-start' spacing={8}>
                        <Grid item>
                            <Button onClick={deleteContact} variant='text' color='primary'>
                                Yes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={props.close} variant='text' color='secondary'>
                                No
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Popover>
    );
}

export default ConfirmationPopper;