# Log Chat
Bootstrap a serverless comment section inside evm compatible blockchain event logs

## Basic Usage
![how-to-use](https://github.com/taylorhulsmans/logchat/blob/master/web/src/assets/Basic-usage.gif)

## Development
Req's
- node
- ganache-cli
- truffle
- metamask

Setup
- Clone Project
- cd project, npm install
- cd web, npm install
- cd .., cp .env.example .env
- one doesn't need to fill the memnonic, but its helpful to sync metamask and ganache-cli
- terminal a: ganache-cli (see tmux.sh for full cmd)
- terminal b: cd ./web, npm run serve
- terminal c: truffle migrate --reset

gotcha's worth of note
- memnonic in env needs to be wrapped in single quotes
- successive truffle migrate --resets likely will require to reset account in the advanced tab in metamask to reset the nonce

