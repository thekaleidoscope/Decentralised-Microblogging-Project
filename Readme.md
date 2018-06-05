##SpillFree (Decentralized Microblogging Website)

Daily trends have made this era an age of Social Media, The number of Facebook users worldwide has doubled between 2010 and 2013, from 608 million to 1,230 million, while Twitter has 284 million monthly users. With a wider look, one can find pattern displayed to us. Whatever one watches is seen only because someone decides that it qualifies their censorship policy.

Social networking communities should be free when sharing their thoughts. The platform should be democratic, and the community itself should decide on the unwanted content. Platform data should be public and private information should not be requested from the user. The user cannot be forced to export any data that can not be published publicly.

A real-time protocol should be used to ensure seamless discussion experience.

>“People hate the truth for the sake of whatever it is that they love more than the truth. They love truth when it shines warmly on them, and hate it when it rebukes them.”
>
>Saint Augustine of Hippo

---

###Introducing SpillFree
SpillFree is a decentralized microblogging website where you can literally ***spill your thoughts freely*** . It lives on Ethereum Blockchain and once deployed cannot be censored, altered or misused. Blockchains are a unique solution which addresses these
issues discussed before. The blockchain is fundamentally a way to provide reliability and safety by redundancy. A new way which can democratize the process of Social networking.

SpillFree uses the ethereum address as a reference to the user much like a handle on Twitter to uniquely identify the user apart. Anyone with a ethereum account can join the network and post their thoughts. Every user joins the network by signing in using a username and password. The password is secured by *keccak256* with inspiration from Proof or Work algorithm. Once registered the user must log-in before creating a post.

The posts are displayed in a simplified interface in real-time with no censorship possibility.

###Experience
1. Sign-In to the application.
2. Log in using the credentials used before.
3. Create and view posts.

![Image](https://image.ibb.co/mnqTho/Tw7.png)

---

###Architecture and Tech-stack

![Image](https://image.ibb.co/c1dg2o/Overview.jpg)

The basic overview contains three critical components Smart-Contract, Front-End with Web3.js integration and IPFS for decentralizing the application. The Smart Contract contains the logic underlining which the Dapp will function. The FrontEnd website will interact with the SmartContract for data flow and security controls. The interplanetary file system will decentralize the content of FrontEnd so that no part of the Dapp has a central point of failure.

####Components

![Image](https://image.ibb.co/ehn8ho/Components.jpg)

The Permission and Curation component of the Dapp is done on the chain( hence Red ). The modifiers and cryptographic algorithm in SmartContract control the permission and security of the data flow. Curation is done by accessing the public data structure containing the posts. The presentation is done using Off-Chain( Blue ) using scripting and designing frameworks. The Incentivised storage is a method of storing the additional data like the files and code which can be handled either Off or On Chain.

A Post contains:
* Username.
* Address of author.
* Post data.
* Data Time of the post. (Handled by timehelper contract)

![Image](https://image.ibb.co/gRvsso/Tw8.png)


####Tech-stack
1. Solidity(Programming Language for SmartContract)
2. Truffle frameworks (for ground work)
3. mocha & chai (Unit Testing)
4. truffle-hdwallet-provider (Ropsten testnet Integration)
5. Infura (API for Rosten testnet Communication)
6. Ganache (Local Deployment)
7. IPFS (Incentivised storage)
8. MetaMask(Web3 Injection into browser)
9. Web3.js (FrontEnd Communication)
10. HTML & Bootstrap (Designing FrontEnd)

---
#####Steps to setup contracts using truffle
1. `git clone 'https://github.com/thekaleidoscope/Decentralised-Microblogging-Project.git' `
2. `truffle migrate --network <ganache or ropsten>  --reset`
3. `truffle test`
4. `truffle console`
5. Interact with web3.js

#####Steps to compile GUI
1. git clone `https://github.com/thekaleidoscope/Decentralised-Microblogging-Project.git`
2. In terminal run `npm install .`
3. Open a browser and ensure MetaMask is set up to custom RPC `http://localhost:7545`
4. Run Ganache
5. In terminal run `npm run dev`

![Image](https://image.ibb.co/dtgXso/Tw10.png)

#####Steps to deploy the DApp on IPFS
1.  git clone `https://github.com/thekaleidoscope/Decentralised-Microblogging-Project.git`
2. Initialize IPFS `ipfs init`
3. Run `ipfs daemon`
4. Copy Files `rsync /src /dist` & `rsync /build/contracts /dist`
5. Check for peers `ipfs swarm peers`
6. Add it to IPFS `ipfs add -r dist/ `
7. Publish to network `ipfs name publish <hash of the dist/ folder>`
8. Open `https://gateway.ipfs.io/ipfs/<hash retured>`

#####Steps to interact and quickly test on Ropsten Testnet using Remix and MetaMask
1. Open MetaMask, ensure you have been using Ropsten Net and have a valid account.
2. Open Remix and copy `Microblogger.sol` from `./contrats/` to the browser.
3. Compile the contract.
4. Open Run tab, In load contract address enter `0x8B63182e9155acB63C3F82b5f92c9c1Dd9d3735a`.
5. Hit the At Address button.

---
###Who does it benefit?
Any believer of open and free media is a  definite benefactor of this system. A whistleblower like Julian Assange might have greatly benefited by such system. This solution will not only provide a method of decentralized Social media Communication but also help create a similar better system for preservation of intellectual data and protection from censorship.

####Flaws in the system
1. Adoption: Initial adoption of the system might be slow due to technical illiteracy, but the recent [NetNutrality](https://www.itproportal.com/features/net-neutrality-decentralization-is-the-future-of-the-internet/) issues proves there will be adopted when time demands.
2. Difference in unit of currency: The solution model requires ether/wei as the basic unit of currency for transactions. However, a similar system can be replaced with UBI in place.
