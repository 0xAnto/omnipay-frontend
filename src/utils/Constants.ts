export const USDC = {
  logoURI: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
};
export const ADDRESS = '0xbA9aA9DeE8CEeA4D6ac0b4a29B6528431B1D6678';

// Bundler endpoints
export const BundlerEndpoints = {
  421613: {
    chainId: 421613,
    bundler: 'https://arbitrumgoerli-bundler.etherspot.io',
    contracts: {
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      walletFactory: {
        etherspot: '0x7f6d8F107fE8551160BD5351d5F1514A6aD5d40E',
        zeroDev: '0x5de4839a76cf55d0c90e2061ef4386d962E15ae3',
        simpleAccount: '0x9406Cc6185a346906296840746125a0E44976454',
      },
    },
    graphqlEndpoint: 'qa-etherspot.pillarproject.io',
  },
  5001: {
    chainId: 5001,
    bundler: 'https://mantletestnet-bundler.etherspot.io/',
    contracts: {
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      walletFactory: {
        etherspot: '0x7f6d8F107fE8551160BD5351d5F1514A6aD5d40E',
        zeroDev: '',
        simpleAccount: '0x9406Cc6185a346906296840746125a0E44976454',
      },
    },
  },
  534351: {
    chainId: 534351,
    bundler: 'https://scrollsepolia-bundler.etherspot.io/',
    contracts: {
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      walletFactory: {
        etherspot: '0x7f6d8F107fE8551160BD5351d5F1514A6aD5d40E',
        zeroDev: '',
        simpleAccount: '0x9406Cc6185a346906296840746125a0E44976454',
      },
    },
  },
  84531: {
    chainId: 84531,
    bundler: 'https://basegoerli-bundler.etherspot.io',
    contracts: {
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      walletFactory: {
        etherspot: '0x7f6d8F107fE8551160BD5351d5F1514A6aD5d40E',
        zeroDev: '0x5de4839a76cf55d0c90e2061ef4386d962E15ae3',
        simpleAccount: '0x9406Cc6185a346906296840746125a0E44976454',
      },
    },
  },
  80001: {
    chainId: 80001,
    bundler: 'https://mumbai-bundler.etherspot.io',
    contracts: {
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      walletFactory: {
        etherspot: '0x7f6d8F107fE8551160BD5351d5F1514A6aD5d40E',
        zeroDev: '0x5de4839a76cf55d0c90e2061ef4386d962E15ae3',
        simpleAccount: '0x9406Cc6185a346906296840746125a0E44976454',
      },
    },
  },
};

export const ContractAddress = {
  421613: {
    chainId: 421613,
    USDC: '0xB786f06D3274805bf892dad11f49fEfAa45A5dAE',
    NFT: '0x640551913901CdbD7769b6f72943186f356069FB'
  },
  5001: {
    chainId: 5001,
    USDC: '0xB786f06D3274805bf892dad11f49fEfAa45A5dAE',
    NFT: '0x640551913901CdbD7769b6f72943186f356069FB'
  },
  534351: {
    chainId: 534351,
    USDC: '0x640551913901CdbD7769b6f72943186f356069FB',
    NFT: '0xB786f06D3274805bf892dad11f49fEfAa45A5dAE'
  },
  84531: {
    chainId: 84531,
    USDC: '0xB786f06D3274805bf892dad11f49fEfAa45A5dAE',
    NFT: '0x640551913901CdbD7769b6f72943186f356069FB'
  },
  80001: {
    chainId: 80001,
    USDC: '0xB786f06D3274805bf892dad11f49fEfAa45A5dAE',
    NFT: '0x640551913901CdbD7769b6f72943186f356069FB'
  },
};