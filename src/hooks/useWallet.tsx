
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

export type WalletType = {
  address: string | null;
  balance: string | null;
  chainId: string | null;
  networkName: string | null;
};

interface WalletContextType {
  wallet: WalletType;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Chain ID for Monad testnet
const MONAD_TESTNET_CHAIN_ID = '0x1252';

// Monad Testnet network configuration
const MONAD_TESTNET = {
  chainId: MONAD_TESTNET_CHAIN_ID,
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ankr.com/monad_testnet'],
  blockExplorerUrls: ['https://explorer.testnet.monad.xyz/'],
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletType>({
    address: null,
    balance: null,
    chainId: null,
    networkName: null,
  });
  const [connecting, setConnecting] = useState(false);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          // User is already connected
          await updateWalletInfo(accounts[0]);
        }
      }
    };
    
    checkConnection();
    
    // Listen for account changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected wallet
      disconnectWallet();
    } else {
      // User switched accounts
      await updateWalletInfo(accounts[0]);
    }
  };

  const handleChainChanged = async () => {
    if (wallet.address) {
      await updateWalletInfo(wallet.address);
    }
  };

  const updateWalletInfo = async (address: string) => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networkName = getNetworkName(chainId);
      const balance = await getBalance(address);
      
      setWallet({
        address,
        balance,
        chainId,
        networkName,
      });

      // Check if connected to Monad testnet
      if (chainId !== MONAD_TESTNET_CHAIN_ID) {
        toast("Please switch to Monad Testnet for full functionality", {
          description: "Your wallet is connected, but voting requires Monad Testnet",
          action: {
            label: "Switch Network",
            onClick: () => switchNetwork()
          }
        });
      }
    } catch (error) {
      console.error('Error updating wallet info:', error);
    }
  };

  const getNetworkName = (chainId: string): string => {
    const networks: Record<string, string> = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet',
      [MONAD_TESTNET_CHAIN_ID]: 'Monad Testnet',
    };

    return networks[chainId] || `Unknown Network (${chainId})`;
  };

  const getBalance = async (address: string): Promise<string> => {
    try {
      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      
      // Convert from wei to ETH (or MON)
      const balanceInEth = parseInt(balanceHex, 16) / 1e18;
      return balanceInEth.toFixed(4);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  };

  const switchNetwork = async () => {
    if (!window.ethereum) return;

    try {
      // Try to switch to Monad Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_TESTNET],
          });
        } catch (addError) {
          console.error('Error adding network:', addError);
          toast.error('Failed to add Monad Testnet to your wallet');
        }
      } else {
        console.error('Error switching network:', switchError);
        toast.error('Failed to switch to Monad Testnet');
      }
    }
  };

  const connectWallet = async () => {
    try {
      setConnecting(true);
      
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        toast.error('No Ethereum wallet detected', {
          description: 'Please install MetaMask or another EVM-compatible wallet to continue.',
        });
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await updateWalletInfo(accounts[0]);
      
      toast.success('Wallet connected', {
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        toast.error('Connection rejected', {
          description: 'You rejected the connection request.',
        });
      } else {
        toast.error('Failed to connect wallet', {
          description: error.message || 'An unknown error occurred.',
        });
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      chainId: null,
      networkName: null,
    });
    
    toast.info('Wallet disconnected');
  };

  const isConnected = !!wallet.address;

  return (
    <WalletContext.Provider
      value={{ wallet, connecting, connectWallet, disconnectWallet, isConnected }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

// Add this to make TypeScript happy with the window.ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}
