import React, { useState, useEffect } from 'react';
import { List, ListItem, Paper, ListItemText, ListItemSecondaryAction, Typography, ListItemAvatar, Avatar, Divider, IconButton, Grid, ListItemIcon } from '@material-ui/core';
import { Delete, Add, Edit, Visibility } from '@material-ui/icons'
import * as q from '../../../queries';
import { useQuery } from '@apollo/react-hooks';
import './ContactList.css';
import ConfirmationPopper from '../../presentational/ConfirmationPopper/ConfirmationPopper';
import {Contact, Data} from '../../../interfaces';
import {RouteComponentProps} from 'react-router-dom';

type TParams = {history: string}

const ContactList:React.FC<RouteComponentProps<TParams>> = props => {

    useEffect(() => {
        refetch();
    }, [])

    const { loading, error, data, refetch } = useQuery(q.getContacts);
    const contacts: Data = data ? data.contacts : [];
    const [anchorEl, setAnchorEl] = useState(null);
    const [showViewIcon, setShowViewIcon] = useState({id: '', visible: false});
    const [open, setOpen] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>

    const togglePopper = (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const redirectToAddContact = () => {
        let history = props.history;
        history.push('/contact/add');
    }

    const redirectToEditContact = (id: string) => (event: any) => {
        let history = props.history;
        history.push('/contact/edit/' + id);
    }

    const redirectToViewContact = (id: string) => (event:any) => {
        let history = props.history;
        history.push('/contact/get/' + id);
    }

    return (
        <React.Fragment>
            <header>
                <Typography variant='h5' align='left' >
                    Contact List
                </Typography>
            </header>
            <Grid container justify='flex-end'>
                <IconButton onClick={redirectToAddContact}>
                    <Add />
                </IconButton>
            </Grid>
            <Paper style={{ minHeight: contacts.length > 0 ? '0' : '150px' }}>
                <List component='ul' className='contact-list'>
                    {contacts ? contacts.map((c: Contact) => {
                        return (
                            <React.Fragment key={c.id}>
                                <ListItem 
                                className='list-item'
                                component='li'
                                alignItems='flex-start' 
                                onMouseEnter={() => setShowViewIcon({id: c.id, visible: true})} 
                                onMouseLeave={() => setShowViewIcon({id: c.id, visible: false})} 
                                onClick={redirectToViewContact(c.id)}>
                                    {showViewIcon.id === c.id && showViewIcon.visible ?
                                        <ListItemIcon className='viewIcon'>
                                            <Visibility fontSize='large' /> 
                                        </ListItemIcon>
                                     : null}
                                    <ListItemAvatar >
                                            <Avatar src='' alt='avatar' >
                                                {c.name && c.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={c.name}
                                        secondary={
                                            <Typography
                                                variant='body2'
                                                component='span'
                                                color='textSecondary'>
                                                {`${c.email}`}
                                            </Typography>
                                        } />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={redirectToEditContact(c.id)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={togglePopper}>
                                            <Delete />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ConfirmationPopper refreshData={() => refetch()} contactId={c.id} close={() => setOpen(false)} anchorEl={anchorEl} open={open} />
                            </React.Fragment>
                        )
                    }) : null}
                </List>
            </Paper>

        </React.Fragment>
    )
}

export default ContactList;