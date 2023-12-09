export const USDC = {
  logoURI: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
};

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
