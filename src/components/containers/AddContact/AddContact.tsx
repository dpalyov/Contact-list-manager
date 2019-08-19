import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core';
import {useMutation} from '@apollo/react-hooks';
import * as q from '../../../queries';
import './AddContact.css';
import { Input, InputContact } from '../../../interfaces';
import {RouteComponentProps} from 'react-router-dom';

type TParams = {history: string}

const AddContact:React.FC<RouteComponentProps<TParams>> = props => {

    const initialInput: Input = {name: '', email: ''};

    const [input, setInput] = useState(initialInput);
    const [error, setError] = useState('');
    const add = useMutation(q.addContact)[0];
    

    const addNewContact = () => {

        const contact: InputContact = {id: '', name: input.name, email: input.email};
        const emailReg = /^\S+@\S+$/i;

        if(!contact.name || !contact.email){
            setError('Missing required fields');
            return;
        }

        if(contact.email.search(emailReg) < 0) {
            setError('Not a valid email address');
            return;
        }

        add({variables: {contact}});
        setInput({name: '', email: ''});
        props.history.push('/');
    }

    return (
        <Paper style={{padding:'20px'}}>
            <header>
                <Typography variant='h5' align='left' >
                    Add new contact
                </Typography>
            </header>
            <span style={{color: 'red'}}>{error}</span>
            <form noValidate autoComplete="off">
                <Grid container justify='center'>
                    <Grid item xs={12}>
                    <TextField
                        id='name'
                        label='Name'
                        className='input'
                        value={input.name}
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id='email'
                        label='Email'
                        className='input'
                        value={input.email}
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                    />
                    </Grid>
                    <Grid container justify='flex-end'>
                        <Grid item >
                        <Button onClick={addNewContact} className='button' variant='contained' color='primary'>Add</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    )
}

export default AddContact;