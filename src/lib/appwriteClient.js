import {Client,Database, Account } from 'appwrite'
import variables from '../../variables'

const client = new Client()
.setEndpoint(variables.dbUrl)
.setProject(variables.projectId)


export const account = Account(client);

export const database = Database(client);

export default client;