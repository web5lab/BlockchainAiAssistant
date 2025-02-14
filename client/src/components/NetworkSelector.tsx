import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { networks } from "@shared/schema";
import { useNetwork, switchNetwork } from "@/lib/web3";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function NetworkSelector() {
  const { network } = useNetwork();

  const handleNetworkChange = async (chainId: string) => {
    await switchNetwork(parseInt(chainId));
  };

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-orange-500" />
        <label className="text-sm font-medium text-orange-700">Network</label>
      </div>
      <Select value={network?.chainId.toString()} onValueChange={handleNetworkChange}>
        <SelectTrigger className="w-full bg-orange-50/50 border-orange-200 hover:bg-orange-100/50 transition-colors">
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          {networks.map((net) => (
            <SelectItem 
              key={net.chainId} 
              value={net.chainId.toString()}
              className="hover:bg-orange-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                {net.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}