import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CognitoHostingStack extends cdk.Stack {
  private userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(this, 'UserPool', {
        userPoolName: 'CognitoHostingUserPool',
        selfSignUpEnabled: true,
        signInAliases: {
            username: true,
            email: true,
        },
        autoVerify: {
            email: true,
        },
      userVerification: {
          emailSubject: 'Verify your email for our awesome app!',
          emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
          emailStyle: cognito.VerificationEmailStyle.CODE,
        },
        standardAttributes: {
            email: {
              required: true,
              mutable: true,
            },
          familyName: {
            required: true,
            mutable: true,
          }
        },
        customAttributes: {
            createdAt: new cognito.DateTimeAttribute(),
        },

        passwordPolicy: {
            minLength: 8,
            requireLowercase: true,
            requireUppercase: true,
            requireDigits: true,
            requireSymbols: true,
        },
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

    this.userPool.addClient('UserPoolClient', {
        userPoolClientName: 'CognitoHostingUserPoolClient',
        authFlows: {
            userPassword: true,
            userSrp: true,
        },
        generateSecret: false,
        refreshTokenValidity: cdk.Duration.days(30),
        supportedIdentityProviders: [
            cognito.UserPoolClientIdentityProvider.COGNITO,
        ],
    });

    this.userPool.addDomain('CognitoHostingUserPoolDomain', {
        cognitoDomain: {
            domainPrefix: 'example-pravtz-auth',
        },
    });




  }




}
