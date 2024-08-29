# AWS Secrets CLI
## An easy way to grab project secrets from AWS' Secret Manager

### About
Basically, I wanted to create an easier and safer system for grabbing `.env` credentials for projects my team used. I only later figured out how many of these clients already existed out in the internet after I started, so here's another one, and I hope you like it.
> This tool is **extremely** opinonated. It downloads `key: value` pairs from AWS Secret Manger and saves them to a .env file in the directory where this program is called. It formats the pairs like so:
```
key='value'

```

### Install
```
npm install -g aws-secrets
```

### Setup
You will need to have the AWS CLI installed on your machine for this program to work. You can find the instructions on how to install the CLI for your specific operating system [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

You will also need to set up the CLI so that you are logged into your AWS instance through the CLI. You can find the instructions on how to set up the CLI [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html).

### Usage
```
aws-secrets -p [project]
// Example
aws-secrets -p test-project
```
