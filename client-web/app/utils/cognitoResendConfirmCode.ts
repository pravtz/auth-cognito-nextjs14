'use server'
import  {createCognitoUser} from "@/app/utils/cognitoUserPool";
export default async function cognitoResendConfirmCode(username: string){

    return new Promise(async (resolve, reject) => {
        const cognitoUser = await createCognitoUser(username)

        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                console.log("Cognito Resend Confirm Code Error: ", err)
                reject(new Error(err.message) || "Cognito Resend Confirm Code Failed!")
            }
            console.log("Cognito Resend Confirm Code Data: ", result)
            resolve(result)
        })


    })
}