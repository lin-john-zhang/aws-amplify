# Troubleshooting

Document common errors and their solutions here.

## AWS Credentials Issues

### Error: ExpiredTokenException
**Solution:** Refresh your AWS credentials using `aws configure` or your SSO login method.

### Error: UnrecognizedClientException
**Solution:** 
- Verify your Access Key ID and Secret Access Key are correct
- Check that the IAM user has the necessary permissions
- Ensure you're using the correct AWS region

### Error: AccessDeniedException
**Solution:**
- Verify the IAM user has sufficient permissions
- Check if the policy includes the specific service you're trying to access
- For POC, consider using AdministratorAccess temporarily

## Amplify Gen 2 Issues

### Error: "amplify directory not found"
**Solution:** Ensure you have a `backend.ts` file in the `amplify/` directory

### Error: "No default region configured"
**Solution:** 
- Run `aws configure` and set your region (e.g., us-east-1)
- Or set the `AWS_DEFAULT_REGION` environment variable

### Error: "Stack [CDKToolkit] already exists"
**Solution:** 
- This is normal if CDK bootstrap was already run
- Continue with your deployment - this is not an error

## Network Issues

### Error: Connection timeout
**Solution:**
- Check your internet connection
- Verify corporate firewall/proxy settings
- Try using a different network if possible

## Package Installation Issues

### Error: "npm ci can only install packages when your package.json and package-lock.json are in sync"
**Solution:** 
- Run `npm install` to update the lock file
- Then try `npm ci` again 