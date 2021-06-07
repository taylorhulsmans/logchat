# Hashed Comments
Comment Sections that are Uncensorable, Consistent, and Pricier to AI ChatBot Swarm.

live at https://etherscan.io/address/0xE53348b65fe575C561F47ce79Bf2C55E07881bba
## Basic Usage
![how-to-use](https://github.com/Joe-mcgee/Hashed-Comments/blob/master/web/src/assets/Basic-usage.gif)


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

