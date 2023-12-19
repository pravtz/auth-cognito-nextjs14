'use server'

import {CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js'

const userPoolId = process.env.COGNITO_ID
const clientId = process.env.COGNITO_CLIENT_ID


if(!userPoolId || !clientId) {
  throw new Error('Missing Cognito User Pool ID or Client ID')
}

const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
}

const userData = {

}

async function createUserPool(): Promise<CognitoUserPool> {
    return new CognitoUserPool(poolData)
}

export async function createCognitoUser(username: string) {
    return new CognitoUser({Username: username, Pool: await createUserPool()})
}

export default createUserPool