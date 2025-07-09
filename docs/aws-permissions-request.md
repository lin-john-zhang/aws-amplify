# AWS Permissions Request for Amplify Project

## Project Overview
- **Project Name**: To-Do List App (AWS Amplify POC)
- **Technology Stack**: React + TypeScript + AWS Amplify Gen 2
- **Purpose**: Proof of Concept to explore AWS Amplify features
- **Timeline**: Development phase (temporary/POC)

## Required AWS Services

### Core Services Needed:
1. **AWS Amplify** - Application hosting and CI/CD
2. **Amazon DynamoDB** - NoSQL database for todo items
3. **AWS AppSync** - GraphQL API layer
4. **Amazon Cognito** - User authentication (planned)
5. **Amazon S3** - Static asset hosting and file storage
6. **AWS Lambda** - Serverless functions
7. **AWS CloudFormation** - Infrastructure as Code
8. **AWS IAM** - Identity and Access Management

## IAM User Requirements

### Recommended Approach:
Create a dedicated IAM user specifically for Amplify development with the following characteristics:

- **Username**: `amplify-developer` (or similar)
- **Access Type**: Programmatic access (Access Key + Secret Key)
- **Usage**: Local development and Amplify CLI operations

### Required Permissions:

#### Option 1: Full Administrative Access (Recommended for POC)
- **Policy**: `AdministratorAccess` (AWS managed policy)
- **Justification**: Amplify Gen 2 creates and manages multiple AWS services dynamically
- **Scope**: Temporary for POC development phase

#### Option 2: Granular Permissions (Production-ready)
If administrative access is not permitted, attach these specific policies:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "amplify:*",
                "appsync:*",
                "cognito-identity:*",
                "cognito-idp:*",
                "dynamodb:*",
                "s3:*",
                "lambda:*",
                "cloudformation:*",
                "iam:*",
                "logs:*",
                "apigateway:*",
                "cloudwatch:*",
                "events:*",
                "ssm:*",
                "secretsmanager:*"
            ],
            "Resource": "*"
        }
    ]
}
```

## Specific Permission Justifications

### AWS Amplify (`amplify:*`)
- Create and manage Amplify applications
- Deploy frontend and backend resources
- Configure CI/CD pipelines

### Amazon DynamoDB (`dynamodb:*`)
- Create tables for todo items
- Configure indexes and streams
- Manage table settings and scaling

### AWS AppSync (`appsync:*`)
- Create GraphQL API endpoints
- Configure resolvers and data sources
- Set up real-time subscriptions

### Amazon Cognito (`cognito-identity:*`, `cognito-idp:*`)
- Create user pools for authentication
- Configure identity providers
- Manage user authentication flows

### Amazon S3 (`s3:*`)
- Host static website assets
- Store deployment artifacts
- Configure bucket policies

### AWS Lambda (`lambda:*`)
- Create serverless functions
- Configure function permissions
- Set up event triggers

### AWS CloudFormation (`cloudformation:*`)
- Deploy infrastructure as code
- Manage stack updates and rollbacks
- Create nested stacks

### AWS IAM (`iam:*`)
- Create service roles for Lambda functions
- Configure resource-based policies
- Manage temporary credentials

## Security Considerations

### Best Practices:
- **Temporary Access**: This is for POC development only
- **Key Rotation**: Rotate access keys regularly
- **MFA Requirement**: Enable MFA on the IAM user if possible
- **IP Restrictions**: Consider restricting access to specific IP ranges
- **Audit Logging**: Enable CloudTrail for audit purposes

### Cleanup:
- Delete IAM user after POC completion
- Remove all created AWS resources
- Review and clean up any remaining permissions

## Regional Requirements

### Primary Region: `us-east-1`
- Most Amplify services are available in this region
- Lower latency for development in North America
- Extensive service availability

### Alternative Regions:
- `us-west-2` (Oregon)
- `eu-west-1` (Ireland)
- `ap-southeast-1` (Singapore)

## Expected AWS Costs

### Estimated Monthly Cost (POC):
- **DynamoDB**: $0-5 (free tier: 25 GB storage, 25 RCU/WCU)
- **AppSync**: $0-10 (free tier: 250K requests/month)
- **Lambda**: $0-5 (free tier: 1M requests/month)
- **S3**: $0-2 (free tier: 5 GB storage)
- **Amplify Hosting**: $0-5 (free tier: 1,000 build minutes)

**Total Estimated**: $0-25/month for POC development

## Timeline and Deliverables

### Phase 1: Setup (Week 1)
- Create IAM user and configure local development
- Deploy basic Amplify backend
- Test GraphQL API connectivity

### Phase 2: Development (Weeks 2-3)
- Implement todo CRUD operations
- Add authentication (if time permits)
- Test real-time features

### Phase 3: Cleanup (Week 4)
- Document lessons learned
- Clean up AWS resources
- Remove IAM user and permissions

## Contact Information

**Developer**: [Your Name]
**Email**: [Your Email]
**Project Repository**: [GitHub URL if applicable]

## IT Team Actions Required

1. **Create IAM User**:
   - Username: `amplify-developer`
   - Access type: Programmatic access
   - Generate Access Key ID and Secret Access Key

2. **Attach Permissions**:
   - Attach `AdministratorAccess` policy (recommended for POC)
   - OR attach granular permissions listed above

3. **Provide Credentials**:
   - Securely share Access Key ID and Secret Access Key
   - Include region configuration (`us-east-1`)

4. **Enable Monitoring** (Optional):
   - Set up CloudTrail for audit logging
   - Configure billing alerts for cost monitoring

## Support and Escalation

If you have questions about:
- **AWS Services**: Refer to AWS documentation or contact AWS support
- **Security Concerns**: Review AWS security best practices
- **Cost Optimization**: Consider using AWS Cost Explorer

Please reach out to [Your Name] for any clarifications on the technical requirements.
