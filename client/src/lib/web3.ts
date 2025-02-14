import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { networks, type Network } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkConnection();
    window.ethereum?.on("accountsChanged", checkConnection);
    return () => {
      window.ethereum?.removeListener("accountsChanged", checkConnection);
    };
  }, []);

  async function checkConnection() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setAddress(accounts[0] || null);
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error);
    }
  }

  async function connect() {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }
      
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      
      setAddress(accounts[0]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive"
      });
    }
  }

  function disconnect() {
    setAddress(null);
  }

  return { address, connect, disconnect };
}

export function useNetwork() {
  const [network, setNetwork] = useState<Network | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkNetwork();
    window.ethereum?.on("chainChanged", checkNetwork);
    return () => {
      window.ethereum?.removeListener("chainChanged", checkNetwork);
    };
  }, []);

  async function checkNetwork() {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const networkInfo = networks.find(n => n.chainId === parseInt(chainId, 16));
        setNetwork(networkInfo || null);
      }
    } catch (error) {
      console.error("Failed to check network:", error);
    }
  }

  return { network };
}

export async function switchNetwork(chainId: number) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    });
  } catch (error: any) {
    if (error.code === 4902) {
      const network = networks.find(n => n.chainId === chainId);
      if (network) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: `0x${chainId.toString(16)}`,
            chainName: network.name,
            rpcUrls: [network.rpcUrl]
          }]
        });
      }
    }
  }
}

export function getProvider() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask");
  }
  return new ethers.BrowserProvider(window.ethereum);
}
