const Web3 = require("web3");
const RPC_URL = "https://goerli.infura.io/v3/2d36d4501c894be49a0347c6e657908a";
const web3 = new Web3(RPC_URL);

//GET BALANCE OF AN ADDRESS
web3.eth.getBalance(
  "0x4b984D560387C22f399B76a38edabFE52903E599",
  (err, wei) => {
    const balance = web3.utils.fromWei(wei, "ether");
    console.log("GET BALANCE OF AN ADDRESS :", balance);
  }
);

//CREATE INSTANCE of SIMPLE STORAGE CONTRACT + CALL GET()
const ABI = [
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = "0x1f9c83f7311c1b0ad188e9925e2705a3b60c4b1d";
const simpleStorageContract = new web3.eth.Contract(ABI, contractAddress);
simpleStorageContract.methods
  .get()
  .call((err, data) =>
    console.log(
      "CREATE INSTANCE of SIMPLE STORAGE CONTRACT + CALL GET() :",
      data
    )
  );

//EXERCICE - CALL A GOERLI CONTRACT AND GET VALUE OF THE VARIAVLE NAMED DATA

const EXERCICE_ABI = [
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddressExercice = "0xfA95935932ECcd000765C772CF8A731B1E215d06";
const exerciceContract = new web3.eth.Contract(
  EXERCICE_ABI,
  contractAddressExercice
);
exerciceContract.methods
  .get()
  .call((err, data) =>
    console.log(
      "CALL A GOERLI CONTRACT AND GET VALUE OF THE VARIAVLE NAMED DATA:",
      data
    )
  );
