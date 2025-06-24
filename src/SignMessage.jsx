import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { ed25519 } from '@noble/curves/ed25519';


const SignMessage = () => {
    const wallet = useWallet();
    const connection = useConnection();
    if(!wallet.publicKey || !connection){
        return <div></div>;
    }

    async function singMessage(){
        const message = document.getElementById("message").value;
        console.log("message is: ",message);
        const encodedMessage = new TextEncoder().encode(message);
        console.log("encoded message is: ",encodedMessage);
        const signature = await wallet.signMessage(encodedMessage);
        if(!ed25519.verify(signature , encodedMessage , wallet.publicKey.toBytes())){
            alert("invalid signature");
            return;
        }
        console.log("succefully signed the message: ",signature);
    }

    return (
        <div>
            <input type="text" id="message" placeholder="Enter the message" />
            <br />
            <button onClick={singMessage}>Sign Message</button>
        </div>
    )
}

export default SignMessage