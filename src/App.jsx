import { useState,useEffect } from 'react'
import abi from "./contracts/chai.sol/chai.json"
import { ethers } from 'ethers'

import './App.css'
import Buy from './components/Buy'
import Memos from './components/Memos'
import chai from "./chai.png";
import img from "./blk.jpg"

function App() {
  // const [btn,setBtn]=useState('Connect to Wallet'); 
  const [balance,setBalance]=useState('Not Connected !');
  const[state,setState]=useState({
    provider:null,
    signer:null,
    contract:null,

  })
  const[account,setAccount]=useState('Not Connected !')
  useEffect(()=>{
    const template=async()=>{
      const contractAddress="0xddD537cD5074e867ED5d9E89C80c3c46d03FA295";
      const contractABI=abi.abi;



      //METAMASK
      //1. in order to do transsactions on goerli test net
      //2. metamask cvonsiosts of infura api which actually connects to the blockchain


        const {ethereum}=window;


       //**********for Direct connection with out clicking any button*********
        const account = await window.ethereum.request({
             method: 'eth_requestAccounts',
        })
        const balance= await window.ethereum.request({ method: 'eth_getBalance', params: [account[0],'latest'] });


        //without refreash
        window.ethereum.on('accountsChanged', ()=> {
          // Time to reload your interface with accounts[0]!
          // setAccount(account[0])
          window.location.reload();
        })
        setBalance(ethers.utils.formatEther(balance));
        setAccount(account[0]);
        //without refreash to get the balance 
        const getbal= async () => {
          const balance= await ethereum.request({ method: 'eth_getBalance', params: [accounts[0],'latest'] })
          setBalance(ethers.utils.formatEther(balance));
        }
        getbal();
  
        const provider = new ethers.providers.Web3Provider(ethereum);//read the blockchain
        const signer = provider.getSigner(); //sign the transaction
  
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        console.log(contract);
        setState({provider,signer,contract});





    }
    template()
  },[])


  return (
    <div>
    <img src={img} className="img-fluid" alt=".." width="100%" height="300px" />

    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      
      <small>
      <p >Your Wallet Address :<span className='cnct'> {account}</span></p>
        <p>Your Balance : <span className='cnct'>{balance}</span>ETH </p>
      </small>
    </p>
    <Buy state={state}></Buy>
    <Memos state={state}></Memos>

    </div>
  )
}

export default App
