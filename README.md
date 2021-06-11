# Hashed Comments
Comment Sections that are Uncensorable, Consistent, and Pricier to AI ChatBot Swarm.

| Network  | Cost per Post (est)   | Etherscan   |
|---|---|---|---|---|
| Ethereum  | ~$2.50   | https://etherscan.io/address/0xE53348b65fe575C561F47ce79Bf2C55E07881bba |
| Avalanche  | ~$0.10   | https://cchain.explorer.avax.network/address/0x8E06B7F7305dD03A0c8F15DfC2Dab3ec889B6F44/contracts |
| Fantom   | ~$0.0007   | https://ftmscan.com/address/0x8e06b7f7305dd03a0c8f15dfc2dab3ec889b6f44#code |

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

