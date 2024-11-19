import { WalletButtons } from "@/components/common/WalletButtons";
import { Button } from "@components/ui/button";
import { TxCreateData } from "@/app/api/tx/create/route";
import { TxSendData } from "@/app/api/tx/send/route";
import { ADDRESS, ADDRESS_TOKEN } from "@/utils/endpoints";
import { fetcher } from "@/utils/use-data-fetch";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";

export default function HomePage() {
    const { publicKey, signTransaction, connected } = useWallet();
    const sendSPL = async (): Promise<boolean> => {
        if (!connected || !publicKey) {
            console.error("Please, connect wallet.Try agian.");
            return false;
          }
      
          if (!signTransaction) {
            console.error("Error of transaction.Try agian.");
            return false;
          }
        try {

            const { tx: txCreateResponse } = await fetcher<TxCreateData>(
              "/api/tx/create",
              {
                method: "POST",
                body: JSON.stringify({
                  payerAddress: publicKey.toBase58(),
                  receiverAddress: new PublicKey(ADDRESS).toBase58(),
                  amount: 1000, // 1000
                  type: "token",
                  tokenAddress: new PublicKey(ADDRESS_TOKEN).toBase58() // SPL-address
                })
              }
            );
            const tx = Transaction.from(Buffer.from(txCreateResponse, "base64"));
            try{
              const signedTx = await signTransaction(tx);
              const signedTxBase64 = signedTx.serialize().toString("base64");

            const { txSignature } = await fetcher<TxSendData>("/api/tx/send", {
              method: "POST",
              body: JSON.stringify({ signedTx: signedTxBase64 })
            });
            return true; //true if paid 
            }
            catch{
              console.error("Error");
            return false; //false if it !paid 
            }
          } catch (error) {
            console.error("Error");
            return false; //false if !paid 
          }
    }
    return (
        <WalletButtons/>
        <Button onClick={sendSPL}></Button>
    );
};