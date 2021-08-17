# Sign in example

### Using TypeScript, TypeORM and Express

> **info:**  This is a codebase to create a login system for future projects :+1:


Steps to **run** this project:

1. Run `npm i` or `yarn` command

2. Setup database settings inside `ormconfig.json` (in my case `ormconfig.js`) file

3. Generate Public and Private key
4. Create a `.env` file, setting needed params for basic functionality

5. Run `npm dev` or `yarn dev` command

> ***Note:***
> To Generate Public and Private key you need to use openssl (see below)

```
openssl genrsa -out private-key.pem 2048
openssl rsa -in private-key.pem -pubout -out public-key.pem
``` 
----------
Developing to knowledgment. Sometimes I forget some things... :grinning:
