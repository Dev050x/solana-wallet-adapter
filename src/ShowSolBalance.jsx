import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";


const ShowSolBalance = () => {
    const {connection}  = useConnection();
    const {publicKey} = useWallet();
    const [balance , setBalance] = useState(null);

    useEffect(() => {
        if(publicKey) {
            walletBalance();
        }
    },[publicKey,connection]);
    if(!publicKey || !connection){
        return (<div></div>)
    }
    async function walletBalance() {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
    }
    return (
        <div>
            <span> Your Solana Wallet Balance is: {balance} </span>
        </div>
    )
}

export default ShowSolBalance