import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


const SendToken = () => {
    const wallet = useWallet();
    const {connection} = useConnection();
    if(!wallet.publicKey || !connection){
        return (<div></div>)
    }
    async function sendToken(){
        let to = document.getElementById("toWallet").value;
        let amount = document.getElementById("sendAmount").value;
        let toPublicKey;
        try {
            toPublicKey = new PublicKey(to);
        } catch(error){
            alert("invalid address of receiver");
            return;
        }
        console.log("to address and amount is", to);
        console.log("amount is: ", amount);

        if (isNaN(amount) || amount <= 0) {
            alert("invalid amount");
            return;
        }
        
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey:wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }))
        try {
            console.log("sending token.....");
            await wallet.sendTransaction(transaction , connection);
            console.log("token send susccefully");
        } catch (error) {
            alert("error while sending");
        }
    }

    return (
        <div>
            <span>Send SendToken</span>
            <br />
            <input type="text" id="toWallet" placeholder="enter the wallet address" /><br />
            <input type="number" id="sendAmount" placeholder="enter the amount you want to send" /><br /> 
            <button onClick={sendToken}>send token</button>
        </div>
    )
}

export default SendToken