'use server'

import createUserPool, {createCognitoUser} from "@/app/utils/cognitoUserPool";

export default async function cognitoConfirmRegister({username, code}: {username: string, code: string}){

    return new Promise(async (resolve, reject) => {
        const UserPool = await createUserPool()


        const cognitoUser = await createCognitoUser(username)

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                console.log("Cognito Confirm Register Error: ", err)
                reject(new Error(err.message) || "Cognito Confirm Register Failed!")
            }
            console.log("Cognito Confirm Register Data: ", result)
            resolve(result)
        })
    })
}