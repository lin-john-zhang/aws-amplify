# IT Team FAQ - AWS Amplify POC

## General Questions

### Q: What is AWS Amplify?
**A:** AWS Amplify is a full-stack development platform that enables developers to build and deploy web and mobile applications using AWS services. It provides a simplified workflow for creating serverless backends with authentication, APIs, databases, and storage.

### Q: Why are we doing this POC?
**A:** To evaluate AWS Amplify as a potential platform for future cloud-native application development. The POC will help us understand the developer experience, security posture, cost implications, and technical capabilities.

### Q: How long will this POC run?
**A:** 4 weeks total - 3 weeks for development and 1 week for documentation and cleanup.

## Security Questions

### Q: What are the security implications?
**A:** The POC uses only test data, operates in an isolated environment, and includes comprehensive security controls:
- All data encrypted at rest and in transit
- AWS IAM for access control
- CloudTrail logging for audit
- No connection to production systems

### Q: Why does the developer need AdministratorAccess?
**A:** AWS Amplify Gen 2 dynamically creates and manages multiple AWS services (DynamoDB, Lambda, AppSync, S3, etc.). Admin access simplifies the POC setup and avoids permission-related blockers. We can use granular permissions if admin access is not acceptable.

### Q: What data will be stored?
**A:** Only test todo items with titles like "Buy milk" or "Complete project". No personal, sensitive, or production data will be used.

### Q: How do we monitor for security issues?
**A:** 
- CloudTrail logging for all API calls
- CloudWatch monitoring and alerts
- Weekly security posture reviews
- Billing alerts for unusual activity

## Cost Questions

### Q: What will this cost?
**A:** Estimated $0-25/month, mostly within AWS free tier:
- DynamoDB: $0-5
- Lambda: $0-3
- API Gateway: $0-5
- S3: $0-2
- Other services: $0-10

### Q: How do we prevent cost overruns?
**A:** Multiple safeguards:
- Billing alerts at $5, $15, $25
- AWS free tier monitoring
- Weekly cost reviews
- Service limits prevent runaway costs

### Q: What happens if costs exceed budget?
**A:** 
- Immediate: Pause development and review usage
- Investigation: Identify high-cost resources
- Resolution: Optimize or delete unnecessary resources

## Technical Questions

### Q: What AWS services will be used?
**A:** Core services include:
- AWS Amplify (hosting and CI/CD)
- DynamoDB (database)
- AppSync (GraphQL API)
- Lambda (serverless functions)
- S3 (storage)
- CloudFormation (infrastructure)

### Q: How complex is the setup?
**A:** 
- Developer complexity: Medium (learning curve expected)
- IT setup complexity: Low (standard IAM user creation)
- Ongoing maintenance: Minimal (AWS manages infrastructure)

### Q: What happens if AWS has an outage?
**A:** Development would pause temporarily, but:
- No impact on production systems
- No data loss (everything backed up)
- Can resume when service returns

## Compliance Questions

### Q: Are we compliant with company policies?
**A:** Yes, the POC follows standard practices:
- Proper approval process
- Security assessment completed
- Cost controls in place
- Documentation requirements met

### Q: What about data residency?
**A:** All data will be stored in us-east-1 region as configured.

### Q: How do we handle audit requirements?
**A:** 
- CloudTrail provides complete audit logs
- All resources tagged for tracking
- Monthly cost and usage reports available
- Security posture documented

## Operational Questions

### Q: Who supports this during development?
**A:** 
- Primary: Developer (handles day-to-day development)
- Secondary: AWS documentation and community forums
- Escalation: IT team for access/permission issues

### Q: What happens when the POC ends?
**A:** Complete cleanup procedure:
- Delete all AWS resources
- Remove IAM user and permissions
- Export any documentation/learnings
- Final cost reconciliation

### Q: Can this impact our other AWS usage?
**A:** No, the POC:
- Uses separate IAM user with limited scope
- Creates resources in isolated environment
- Has no dependencies on existing systems
- Operates within service limits

## Decision Questions

### Q: What criteria will determine POC success?
**A:** 
- Technical: Working application with all features
- Educational: Clear understanding of AWS Amplify
- Business: Informed recommendation for future use
- Financial: Staying within budget constraints

### Q: What are the possible outcomes?
**A:** 
- Positive: Recommend AWS Amplify for future projects
- Negative: Recommend alternative solutions
- Neutral: Recommend further evaluation with specific focus areas

### Q: How will results be communicated?
**A:** 
- Weekly progress updates during development
- Final presentation with findings and recommendations
- Complete documentation package
- Knowledge transfer session

## Next Steps

### Q: What do you need from IT to proceed?
**A:** 
1. Create IAM user with programmatic access
2. Attach AdministratorAccess policy (or granular permissions)
3. Provide Access Key ID and Secret Access Key
4. Set default region to us-east-1

### Q: How quickly can we start?
**A:** Development can begin immediately after AWS credentials are provided and configured.

### Q: Who do we contact for questions?
**A:** 
- **Developer**: [Your Name] - [Your Email]
- **Technical Questions**: AWS documentation or support
- **Security Questions**: [Security Team Contact]
- **Budget Questions**: [Finance Team Contact]

## Emergency Contacts

### If something goes wrong:
- **High costs**: Contact developer immediately
- **Security concerns**: Follow standard incident response
- **Technical issues**: Developer + AWS support
- **Access problems**: IT team + developer

---

*This FAQ will be updated based on questions received from the IT team.*
