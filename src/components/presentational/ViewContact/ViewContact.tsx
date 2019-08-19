import React from 'react';
import { Typography, CardContent, Card, CardHeader, Avatar, Divider } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import * as q from '../../../queries';
import './ViewContact.css';
import { Contact } from '../../../interfaces';
import { RouteComponentProps } from 'react-router-dom';

type TParams = {id: string};

const ViewContact:React.FC<RouteComponentProps<TParams>> = props => {

  const { id } = props.match.params;
  const { data } = useQuery(q.getContact, { variables: { id: id } });

  const contact: Contact = { ...data.contact }

  return (
    <Card className='card'>
      <CardHeader
        avatar={
          <Avatar aria-label="avatar" >
            {contact.name && contact.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={contact.name}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          Name: {contact.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {contact.email}
        </Typography>
        <Divider variant='fullWidth' className='divider' />
        <div className='card-footer'>
          <Typography color="textSecondary" gutterBottom>
            Created on: {contact.creationDate && contact.creationDate.substring(0, contact.creationDate.length - 8).replace('T', ' ')}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Modified on: {contact.modifiedDate && contact.modifiedDate.substring(0, contact.modifiedDate.length - 8).replace('T', ' ')}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default ViewContact;