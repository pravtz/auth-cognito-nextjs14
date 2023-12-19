'use server'

import  {createCognitoUser} from "@/app/utils/cognitoUserPool";
export default async function CognitoSignOut(username: string){

    return new Promise(async (resolve, reject) => {
        const cognitoUser = await createCognitoUser(username)

        cognitoUser.signOut()

    })
}