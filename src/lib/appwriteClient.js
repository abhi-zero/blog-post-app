import { Client,Databases, Account } from 'appwrite'
import variables from '../../variables'

const client = new Client()
.setEndpoint(variables.dbUrl)
.setProject(variables.projectId)


export const account = new Account(client);

export const database =new Databases(client);

export default client;