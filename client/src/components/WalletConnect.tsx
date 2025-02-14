import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/web3";
import { SiEthereum } from "react-icons/si";

export default function WalletConnect() {
  const { address, connect, disconnect } = useWallet();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Wallet</label>
      {address ? (
        <div className="space-y-2">
          <div className="text-sm font-mono bg-orange-100 p-2 rounded-lg break-all">
            {address}
          </div>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={disconnect}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button 
          className="w-full bg-orange-400 hover:bg-orange-500"
          onClick={connect}
        >
          <SiEthereum className="mr-2" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
