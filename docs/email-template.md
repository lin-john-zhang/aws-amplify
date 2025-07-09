# Email Template for IT Team

**Subject**: AWS Permissions Request - Amplify POC Development

---

Hi [IT Team/Manager Name],

I'm working on a Proof of Concept (POC) project using AWS Amplify to explore cloud-native application development. I need AWS permissions to set up the development environment.

## Quick Summary
- **Project**: To-Do List App (AWS Amplify POC)
- **Duration**: 3-4 weeks (temporary)
- **Cost**: Estimated $0-25/month (within AWS free tier)
- **Risk**: Low (POC environment, will be cleaned up after)

## What I Need
1. **IAM User**: `amplify-developer` (or similar name)
2. **Access Type**: Programmatic access (Access Key + Secret Key)
3. **Permissions**: `AdministratorAccess` policy (recommended for POC)
4. **Region**: `us-east-1`

## Why AdministratorAccess?
AWS Amplify Gen 2 automatically creates and manages multiple AWS services (DynamoDB, AppSync, Lambda, S3, etc.). The admin policy simplifies the POC setup and avoids permission-related blockers.

## Documentation
I've prepared detailed documentation with:
- Complete permission justifications
- Security considerations
- Cost estimates
- Cleanup procedures

**Documents**: 
- `docs/aws-permissions-request.md` (detailed)
- `docs/aws-quick-setup-guide.md` (quick reference)

## Next Steps
Once you provide the AWS credentials, I can:
1. Configure my local development environment
2. Deploy the Amplify backend
3. Begin POC development
4. Provide regular updates on progress

## Timeline
- **Week 1**: Setup and initial deployment
- **Week 2-3**: Feature development and testing
- **Week 4**: Documentation and cleanup

I'm available to discuss this request or answer any questions about the technical requirements.

Thank you for your support!

Best regards,
[Your Name]
[Your Contact Information]

---

**Attachments**: aws-permissions-request.md, aws-quick-setup-guide.md
