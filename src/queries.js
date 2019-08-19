import {gql} from 'apollo-boost';

export const getContacts = gql`query GetContacts{
    contacts {
      id,
      name,
      email,
    }
  }`

export const getContact = gql`query getContact($id:ID!){
    contact(id:$id){
      id,
      name,
      email,
      modifiedDate,
      creationDate
    }
  }`
export const addContact = gql`mutation addContact($contact: InputContact!){
    addContact(contact: $contact){
              id,
              name,
              email
    }
  }`
export const deleteContact = gql`mutation deleteContact($id:ID!){
    deleteContact(id:$id)
  }`

export const updateContact = gql`mutation updateContact($contact:InputContact!){
    updateContact(contact:$contact){
      id,
      name,
      email
    }
  }`
  