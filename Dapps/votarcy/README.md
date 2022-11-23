# Welcome to Votarcy

## DEMO WEBSITE

Dapps is deployed at : <a href='https://solidity-mocha.vercel.app//'>https://solidity-mocha.vercel.app/</a>

## DEMO VIDEO

https://www.loom.com/share/befb15705adb40a2b2a99015ffc54a7a

## Instalation

```sh
# Fetching sources from  Github
$ git clone https://github.com/0xJilan/Solidity/tree/master/Dapps/votarcy
```

```sh
# Install Truffle dependencies
$ cd truffle
$ npm install
```

```sh
# Install React dependencies
$ cd client
$ npm install
```

## Launch local blockchain for dev

```sh
# Run Ganache
$ ganache
```

```sh
# Redeploy contract in other CLI  :
$ cd truffle
$ truffle migrate --reset
```

```sh
# Run front :
$ cd client
$ npm start
  Starting the development server ...
```

Lancer la DAPP via <a href='http/localhost:3000/'>http/localhost:3000/</a>

## Deploy to goerli

CONNECT TO INFURA

```sh
# add in .env
MNEMONIC=YOUR_MNEMONIC
INFURA_GOERLI_URL=https://goerli.infura.io/v3
INFURA_GOERLI_KEY=YOURKEY
```

INFURA_ID étant l'API KEY Infura
MNEMONIC étant la SEED du wallet (Metamask)

```sh
# Run :
$ cd truffle
$ truffle migrate --network goerli
```
