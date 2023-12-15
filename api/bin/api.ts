#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoHostingStack } from '../lib/cognitoHosting-stack'
import {getConfig} from "../utils/config";

const config = getConfig()

const env: cdk.Environment = {
    account: config.CDK_DEFAULT_ACCOUNT,
    region: config.CDK_DEFAULT_REGION,
}

const tags= {
    cost: "SystemAuthExample",
    team: "Pravtz",
}

const app = new cdk.App();

new CognitoHostingStack(app, 'ApiStack', {
    env,
    tags
});