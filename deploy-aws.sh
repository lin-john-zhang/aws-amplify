#!/bin/bash

# AWS Amplify Deployment Script
# Run this script once AWS credentials are properly configured

echo "🚀 AWS Amplify Deployment Script"
echo "=================================="

# Check if AWS CLI is configured
echo "📋 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS credentials found"

# Display current AWS identity
echo "🔍 Current AWS identity:"
aws sts get-caller-identity

# Check if amplify CLI is available
if ! command -v amplify &> /dev/null && ! command -v npx ampx &> /dev/null; then
    echo "❌ Amplify CLI not found. Installing..."
    npm install -g @aws-amplify/cli
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Initializing Amplify backend..."
# Try different Amplify CLI commands based on what's available
if command -v npx ampx &> /dev/null; then
    # Use Amplify Gen 2 CLI
    echo "Using Amplify Gen 2 (ampx)..."
    npx ampx deploy --branch dev
elif command -v amplify &> /dev/null; then
    # Use legacy Amplify CLI
    echo "Using legacy Amplify CLI..."
    amplify init --yes
    amplify push --yes
else
    echo "❌ No Amplify CLI found. Please install it manually."
    exit 1
fi

echo "✅ Backend deployment complete!"

# Check if amplify_outputs.json was created
if [ -f "amplify_outputs.json" ]; then
    echo "✅ amplify_outputs.json found - copying to src directory..."
    cp amplify_outputs.json src/
    echo "✅ Configuration file copied successfully"
else
    echo "⚠️  amplify_outputs.json not found. Checking for aws-exports.js..."
    if [ -f "src/aws-exports.js" ]; then
        echo "✅ aws-exports.js found (legacy format)"
    else
        echo "❌ No configuration file found. Manual setup may be required."
    fi
fi

echo "🎯 Testing the connection..."
npm start &
sleep 5
echo "✅ App should be running on http://localhost:3000"
echo "🔄 Try switching to AWS mode in the data mode selector!"

echo ""
echo "🎉 Deployment complete!"
echo "Next steps:"
echo "1. Open http://localhost:3000"
echo "2. Use the data mode selector to switch to '☁️ AWS Amplify'"
echo "3. Test creating, updating, and deleting todos"
echo "4. Check the browser console for connection status"
