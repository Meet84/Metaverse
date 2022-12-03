import mverse from "./Metaverse.json" assert {type :"json"};
import {
    nftaddress
  } from '../config.js'

const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined") {
        rej("Install Metamask");
    }
    window.ethereum.request({ method : "eth_requestAccounts"});

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
        mverse,
        nftaddress
    );
    console.log(contract);
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            console.log("total supply",supply);
            contract.methods.getObjects().call({from : accounts[0]}).then((data) => {

                console.log("object",data);
                res({supply:supply, buildings : data});
                console.log(data);
            })
        });
    });
});

export default connect;
