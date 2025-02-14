import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/web3";
import { SiEthereum } from "react-icons/si";
import { motion } from "framer-motion";
import { Wallet, LogOut } from "lucide-react";

export default function WalletConnect() {
  const { address, connect, disconnect } = useWallet();

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2">
        <Wallet className="w-4 h-4 text-orange-500" />
        <label className="text-sm font-medium text-orange-700">Wallet</label>
      </div>
      {address ? (
        <div className="space-y-3">
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative text-sm font-mono bg-orange-50/80 p-3 rounded-lg break-all border border-orange-200 backdrop-blur-sm">
              {address}
            </div>
          </motion.div>
          <Button 
            variant="outline" 
            className="w-full border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-colors group" 
            onClick={disconnect}
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Disconnect
          </Button>
        </div>
      ) : (
        <Button 
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg hover:shadow-orange-200/50 group"
          onClick={connect}
        >
          <SiEthereum className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Connect Wallet
        </Button>
      )}
    </motion.div>
  );
}