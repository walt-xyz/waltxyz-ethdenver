## Getting Started

Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the project
```bash
npm run nextDev
# or
yarn nextDev
# or
pnpm nextDev
```

## Overview

### web3 auth flows by walt.id

Auth via on-chain + off-chain identity

[Demo Deployment](https://waltxyz-ethdenver.vercel.app/)

#### GOAL
Demonstrate user onboarding and authentication that leverages on-chain and off-chain identity.

#### DEMO DESCRIPTION
A user interacts with 2 apps in separate flows:

User onboards to app "Franz"

1. Sign in with ETH [1]
2. Data is collected (via form)
3. Data is signed/transformed into a Verifiable Credential, "VC" [2]
4. "VC" is stored on Ceramic [3]
5. NFT (membership) is minted to user's wallet [4]

User authenticates to App "Sissi"
6. Sign in with ETH

7. On-chain data (ENS domain) is fetched
8. Off-chain data (VC) is shared via Ceramic
9. On-chain data (membership NFT) is verified + unlocks voucher

---


[1] SIWE: EIP-4361
[2] VC: W3C DID (did:key) + W3C VC (JWT)
[3] Ceramic: ComposeDB
[4] NFT: ERC-721 on Mumbai


