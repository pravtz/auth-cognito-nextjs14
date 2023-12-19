import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {getServerSession, NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import createUserPool from "@/app/utils/cognitoUserPool";
import {AuthenticationDetails, CognitoUser, CognitoUserSession} from "amazon-cognito-identity-js";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials?): Promise<unknown> {
                if (!credentials || !credentials.username || !credentials.password) {
                    return new Error("Missing credentials")
                }
                const userpool = await createUserPool()

                const cognitoUser: CognitoUser = new CognitoUser({
                    Username: credentials.username,
                    Pool: userpool
                })
                const authenticationDetails:AuthenticationDetails = new AuthenticationDetails({
                    Username: credentials.username,
                    Password: credentials.password
                })

                return new Promise((resolve, reject) => {
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: (result: CognitoUserSession): void => {
                            console.log('Cognito Login success', result)
                            const payload = result.getIdToken().payload
                            resolve({
                                id: credentials.username,
                                email: credentials.username,
                            })
                        },
                        onFailure: (err): void => {
                            console.log('Cognito Login failure', err)
                            if(err.code === 'UserNotConfirmedException') {
                                resolve({
                                    id: credentials.username,
                                    email: 'NOTVERFIED'
                                })
                            }
                            reject(new Error(err.measure)||"Login failed")
                        }
                    })
                })
            },
        })
    ],
    pages: {
        signIn: "/login",
        // signOut: "/logout",
        // error: "/login",
        // verifyRequest: "/verify",
        // newUser: "/newuser"
    }
}

export function getSession(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}