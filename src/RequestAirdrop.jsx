import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


const RequestAirdrop = () => {
    const {publicKey} = useWallet();
    const {connection} = useConnection();
    if(!publicKey || !connection){
        return (<div></div>)
    }
    async function sendAirdrop(){
        try {
            console.log("public key is and Connectio is: ", publicKey.toBase58() , connection);
            const sig =await connection.requestAirdrop(publicKey , document.getElementById("amount").value * LAMPORTS_PER_SOL);
            console.log("token sent succefullly ", sig);
        } catch (error) {
            alert("error in sendign token");
        }
    }

    return (
        <div>
            <input id="amount" type="text" placeholder="Enter the sol you want" />
            <button onClick = {sendAirdrop} >
                Send Token
            </button>    
        </div>
    )
}

export default RequestAirdrop