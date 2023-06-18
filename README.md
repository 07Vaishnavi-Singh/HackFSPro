# Archengel 
## The ultimate WEB3 video chatting platform you will ever need!!!

![](./Screenshots/UpdatedLogoForGitHub.jpeg)

Archangel is a web3 video chatting/conferencing platform that caters to all needs.
Be it chatting with strangers or friends, in public rooms as well as private rooms or rooms that allow access based on the NFTs you have in your wallet.

It is made using the huddle React JS SDK and the complimentary APIs it provides .

As Archangel is a web3 platform the only setup you need before starting is a MetaMask wallet in your browser and you are all set to go. Currently, we support MetaMask and WalletConnect and we plan to integrate much more wallets in the future.

Archangel provides its users with the option to join Public rooms created by active users across the world which can be seen once users connect their wallet by clicking on the connect wallet button in the top right corner. These available rooms come with the field of interest that the room creator has specified during the time of room creation. These interest fields help guests to join only if their rooms are of interest and prevents bad experience. The room creator also sets the maximum capacity of the guests each available room can have which also comes in very handy in the front end as you hover over the available room's screen.

Guests who want to join these Public rooms can just click on the available rooms shown on the screen and also select from their field of interest to join rooms of their field of interest they can do so from the available rooms button and choose to segregate the available public rooms to match their interests.

Archangel also has a feature of Private rooms that can be created by hosts who want to keep their meetings private and only accessible to guests who hold a particular NFT (ERC721 or ERC1155). For creating these rooms hosts have to specify the field of interest of these rooms and also the Token Type, Token chain and the Token Contract Address that will be used to segregate the incoming guests To join these rooms guests will be required to have the set Token in their wallets and they will be good to go and join the rooms.

## How it is made 
Archangel is a web3 video chatting application that allows its users with multiple video chatting features like Public Rooms, Private Rooms, and Interest-based Private rooms. Hosts are required to set the interest and the maximum capacity of the room while creating a public and also the chain and Token Type and address while creating a private one.

Public rooms Data is stored in the MongoDB database from here it is fetched whenever required.

For making a private room we have made use of the Huddle Token Gated API which requires a title, chain, token type and contract address and gives room id as a response. A room is created using the create Room API and the user is redirected to the lobby provided by Huddle01 @huddle01/react package.  

Public rooms are created by the meeting SDK rooms API provided by Huddle and the data is stored in the MongoDB database. Once the is the room is created the host of the meeting is redirected to the lobby using the joinLooby Hokk in the @huddle01/react package. 

If a person wants to join a Public room of interest then he/she has to first type the interest that he/she seeks. This interest is matched with all the interests of the available public rooms in the database and the guest is given options to join according to the priority of interests. 




Try running some of the following tasks:

```shell
cd front-end 
npm init
npm install react-scripts --force
npm start
```
