# oiai-frontend

**oiai-frontend** is a lightweight frontend application designed for testing an endpoint of the `oiai-backend` service. It is built using simple HTML, CSS, and JavaScript, and utilizes Vite for local development.

Available on https://web.oiai.thisguydeploys.com/

## Features

- **Lightweight Frontend**: Minimal setup with HTML, CSS, and JavaScript.
- **Vite for Development**: Fast development server with Vite.
- **Continuous Deployment to S3**: Automated deployment to an S3 bucket using GitHub Actions.
- **AWS Authentication via OIDC**: Secure authentication with AWS using OpenID Connect.

## Project Structure

``` bash
.
├── index.html       # Main HTML file
├── package.json     # Node.js dependencies and scripts
├── script.js        # JavaScript logic for interacting with oiai-backend
├── styles.css       # Styles for the frontend
└── yarn.lock        # Dependency lock file
```

## Getting Started

### Prerequisites

- **Node.js**: Version 16 or later is required.
- **Yarn**: For package management.
- **Vite**: Development server for running the application locally.

### Running Locally

1. Clone the repository:

   ``` bash 
   git clone https://github.com/fabian818/oiai-frontend.git
   cd oiai-frontend
   ```

2. Install the dependencies:

   ``` bash 
   yarn install
   ```

3. Start the development server with Vite:

   ``` bash 
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application.

## CI/CD Pipeline

The CI/CD pipeline is configured using **GitHub Actions** to automate the deployment to an S3 bucket:

- **AWS Authentication via OIDC**: The pipeline assumes the role `arn:aws:iam::132900311735:role/oiai-dev-github-role` using OpenID Connect (OIDC) to authenticate with AWS.
- **Build and Deploy**: The frontend is built using `yarn build` and the artifacts are copied to the S3 bucket.

### GitHub Actions Workflow

``` bash
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v3
  with:
    role-to-assume: arn:aws:iam::132900311735:role/oiai-dev-github-role
    aws-region: us-east-1

- name: Set up Node.js
  uses: actions/setup-node@v2
  with:
    node-version: '16'

- name: Install dependencies
  run: yarn install

- name: Build project
  run: yarn build

- name: Copy script file
  run: cp script.js dist/script.js

- name: Deploy to S3
  run: aws s3 cp dist/ s3://web.oiai.thisguydeploys.com/ --recursive --exclude ".git/*" --exclude ".github/*"
```

## Deployment

The frontend application is automatically deployed to an S3 bucket: `s3://web.oiai.thisguydeploys.com/`.

### Disclaimer

While deploying to S3, the preferred deployment stack would have included both **S3 and CloudFront** for optimized content delivery. However, due to an AWS Service Quota limitation in my account, creating additional CloudFront distributions was not possible.

## Future Enhancements

- **CloudFront Integration**: Once the service quota issue is resolved, migrate to an S3/CloudFront stack for better performance and caching.
- **Enhanced Testing**: Include automated end-to-end tests to validate the frontend against the backend.
- **CI/CD Improvements**: Add a rollback strategy for deployments.
