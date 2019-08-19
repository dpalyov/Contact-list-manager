import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core';
import {useMutation} from '@apollo/react-hooks';
import * as q from '../../../queries';
import './EditContact.css';
import {RouteComponentProps} from 'react-router-dom';
import { Contact, Input } from '../../../interfaces';

type TParams = {match: string, history: string, id: string}

const EditContact:React.FC<RouteComponentProps<TParams>> = props => {

    const initialInput: Input = {name: '', email: ''};
    const [input, setInput] = useState(initialInput);
    const [error, setError] = useState('');
    const update = useMutation(q.updateContact)[0];

    const {id} = props.match.params;
    const contact: Contact = {id: id, name: input.name, email: input.email}

    const editContact = (e: { preventDefault: () => void; }) : void => {

        const emailReg = /^\S+@\S+$/i;

        if(!contact.name || !contact.email || !contact.id){
            setError('Missing required fields');
            return;
        }

        if(contact.email.search(emailReg) < 0) {
            setError('Not a valid email address');
            return;
        }

        update({variables: {contact}})
        setInput({name: '', email: ''});
        props.history.push('/');
    }

    return (
        <Paper style={{padding:'20px'}}>
            <header>
                <Typography variant='h5' align='left' >
                    Update Contact
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
                        type='email'
                        onError={() => setError('Incorrect email')}
                        value={input.email}
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                    />
                    </Grid>
                    <Grid container justify='flex-end'>
                        <Grid item >
                        <Button onClick={editContact} className='button' variant='contained' color='secondary'>Edit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            </Paper>

    )
}

export default EditContact;