import { ethers } from "ethers";
import { getProvider } from "./web3";

const ERC20_ABI = [
  "constructor(string name, string symbol, uint256 initialSupply)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

const ERC721_ABI = [
  "constructor(string name, string symbol, string baseURI)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function mint(address to, uint256 tokenId)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export async function deployERC20({ name, symbol, initialSupply }: { 
  name: string;
  symbol: string;
  initialSupply: string;
}) {
  const provider = getProvider();
  const signer = await provider.getSigner();
  
  const factory = new ethers.ContractFactory(
    ERC20_ABI,
    ERC20_BYTECODE,
    signer
  );
  
  const contract = await factory.deploy(
    name,
    symbol,
    ethers.parseUnits(initialSupply, 18)
  );
  
  return await contract.deployTransaction.wait();
}

export async function deployERC721({ name, symbol, baseURI }: {
  name: string;
  symbol: string;
  baseURI: string;
}) {
  const provider = getProvider();
  const signer = await provider.getSigner();
  
  const factory = new ethers.ContractFactory(
    ERC721_ABI,
    ERC721_BYTECODE,
    signer
  );
  
  const contract = await factory.deploy(name, symbol, baseURI);
  return await contract.deployTransaction.wait();
}

// Simplified bytecode for example purposes
const ERC20_BYTECODE = "0x...";
const ERC721_BYTECODE = "0x...";
