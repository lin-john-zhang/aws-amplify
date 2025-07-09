# AWS Amplify - Quick Setup Guide for IT Team

## TL;DR - What We Need

**Goal**: Create an IAM user for AWS Amplify development (POC project)

### Step 1: Create IAM User
```
Username: amplify-developer
Access Type: Programmatic access (generate keys)
```

### Step 2: Attach Permission Policy
**Recommended (for POC)**: `AdministratorAccess`

### Step 3: Provide Credentials
- Access Key ID: `AKIA...`
- Secret Access Key: `...`
- Region: `us-east-1`

---

## Why AdministratorAccess?

AWS Amplify Gen 2 dynamically creates and manages multiple AWS services:
- DynamoDB (database)
- AppSync (GraphQL API)
- Lambda (serverless functions)
- S3 (storage)
- CloudFormation (infrastructure)
- IAM roles (service permissions)

**Alternative**: Use the granular permissions in the detailed document if admin access is not allowed.

---

## Security Notes

- ✅ This is for **temporary POC development only**
- ✅ Keys should be rotated regularly
- ✅ User should be deleted after POC completion
- ✅ Consider enabling MFA on the IAM user
- ✅ Monitor costs (expected: $0-25/month)

---

## Commands the Developer Will Use

```bash
# Configure AWS CLI
aws configure

# Start Amplify development
npx ampx sandbox

# Deploy to AWS
npx ampx deploy
```

---

## Questions?

Contact: [Your Name] - [Your Email]
