import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { networks } from "@shared/schema";
import { useNetwork, switchNetwork } from "@/lib/web3";

export default function NetworkSelector() {
  const { network } = useNetwork();

  const handleNetworkChange = async (chainId: string) => {
    await switchNetwork(parseInt(chainId));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Network</label>
      <Select value={network?.chainId.toString()} onValueChange={handleNetworkChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          {networks.map((net) => (
            <SelectItem key={net.chainId} value={net.chainId.toString()}>
              {net.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
