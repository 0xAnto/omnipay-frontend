import React, { SetStateAction, useEffect, useState } from 'react';
import nft from '../image/BoredApe.png';
import { Button, Dropdown, Flex, Input, Menu, MenuProps, Radio, RadioChangeEvent, Space, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { ADDRESS, BundlerEndpoints, USDC } from 'utils/Constants';
import { PrimeSdk } from '@etherspot/prime-sdk';
import { ethers } from 'ethers';
import { getUiAmount } from 'utils/helpers';
import { ERC20Helper } from 'utils/ERC20Helper';

const Dashboard = () => {
  const [arbitrumGoerliInstance, setArbitrumGoerliInstance] = useState<PrimeSdk>();
  const [mantletestnetInstance, setMantletestnetInstance] = useState<PrimeSdk>();
  const [scrollsepoliaInstance, setScrollsepoliaInstance] = useState<PrimeSdk>();
  const [basegoerliInstance, setBasegoerliInstance] = useState<PrimeSdk>();
  const [mumbaiInstance, setMumbaiInstance] = useState<PrimeSdk>();
  const [nativeBalance, setNativebalance] = useState<number>();
  const [sourceSelectedValue, setSourceSelectedValue] = useState(0);
  const [targetSelectedValue, setTargetSelectedValue] = useState(0);
  useEffect(() => {
    const sdk = async () => {
      const [arbitrumgoerliPrimeInstance, mantletestnetPrimeInstance, scrollsepoliaPrimeInstance, baseGoerliPrimeInstance, mumbaiPrimeInstance] = await Promise.all([

        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[421613].chainId),
            bundlerRpcUrl: BundlerEndpoints[421613].bundler as string,
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[5001].chainId),
            bundlerRpcUrl: BundlerEndpoints[5001].bundler as string,
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[534351].chainId),
            bundlerRpcUrl: BundlerEndpoints[534351].bundler as string,
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[84531].chainId),
            bundlerRpcUrl: BundlerEndpoints[84531].bundler as string,
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[80001].chainId),
            bundlerRpcUrl: BundlerEndpoints[80001].bundler as string,
            projectKey: '',
          }
        ),
      ]);
      // const data =new ERC20Helper(arbitrumgoerliPrimeInstance as PrimeSdk)
      setArbitrumGoerliInstance(arbitrumgoerliPrimeInstance);
      setMantletestnetInstance(mantletestnetPrimeInstance);
      setScrollsepoliaInstance(scrollsepoliaPrimeInstance)
      setBasegoerliInstance(baseGoerliPrimeInstance)
      setMumbaiInstance(mumbaiPrimeInstance)
    };
    sdk();
  }, []);

  const sourceChainOptions = [
    { label: 'Arbitrum Goerli', value: 1 },
    { label: 'Mantle Testnet', value: 2 },
    { label: 'Scroll Testnet', value: 3 },
    { label: 'Base Goerli', value: 4 },
    { label: 'Polygon Mumbai', value: 5 },
  ];
  const targetChainOptions = [
    { label: 'Arbitrum Goerli', value: 1 },
    { label: 'Mantle Testnet', value: 2 },
    { label: 'Scroll Testnet', value: 3 },
    { label: 'Base Goerli', value: 4 },
    { label: 'Polygon Mumbai', value: 5 },
  ];

  const handleSourceRadioChange = async (e: any) => {
    setSourceSelectedValue(e.target.value);
    let provider:ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(BundlerEndpoints[421613].bundler);
    switch (Number(e.target.value)) {
      case 1:
        provider = new ethers.providers.JsonRpcProvider(BundlerEndpoints[421613].bundler);
        break;
      case 2:
        provider = new ethers.providers.JsonRpcProvider(BundlerEndpoints[5001].bundler);
        break;
      case 3:
        provider = new ethers.providers.JsonRpcProvider(BundlerEndpoints[534351].bundler);
        break;
      case 4:
        provider = new ethers.providers.JsonRpcProvider(BundlerEndpoints[84531].bundler);
        break;
      case 5:
        provider = new ethers.providers.JsonRpcProvider(BundlerEndpoints[80001].bundler);
        break;
      default:
        break;
    }
    const balance = await provider.getBalance(
      ADDRESS,
      "latest"
    );
    setNativebalance(getUiAmount(Number(balance)))
  };

  const handleTargetRadioChange = (e: any) => {
    setTargetSelectedValue(e.target.value);
  };
  const items = [{ key: '1', label: 'USDC', logo: USDC.logoURI }];
  const handleClick = async (token: any) => {
    console.log('🚀 token:', token);
  };
  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const itemsdrop: MenuProps['items'] = [
    {
      label: 'USDC',
      key: '1',
      icon: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      {itemsdrop.map((item: any) => (
        <Menu.Item
          key={item.key}
          icon={<img src={item.icon} alt={item.label} className="menu-icon w-5 h-5 rounded-full mt-1 mr-1" />}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  interface DropdownItemProps {
    label: string;
    icon: string;
    onClick: () => void;
  }

  const DropdownItem: React.FC<DropdownItemProps> = ({ label, icon, onClick }) => (
    <Menu.Item key={label} icon={<img src={icon} alt={label} className="menu-icon w-5 h-5 rounded-full mt-1 mr-1" />}>
      {label}
    </Menu.Item>
  );
  const targetDropdown = (
    <Dropdown
      overlay={
        <Menu onClick={handleMenuClick}>
          {itemsdrop.map((item: any) => (
            <DropdownItem key={item.key} label={item.label} icon={item.icon} onClick={() => handleClick(item)} />
          ))}
        </Menu>
      }
      placement="bottomLeft"
      arrow
    >
      <Button>
        <Space>
          {`USDC (Target)`}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
  return (
    <div className="bg-black h-screen font-inter flex w-full flex-row justify-center items-center">
      <div className="w-[40%] h-full bg-white flex flex-row justify-center items-center">
        <div className="absolute top-5 mb-10">
          <Radio.Group value={sourceSelectedValue} size="large" onChange={handleSourceRadioChange}>
            {sourceChainOptions.map((option) => (
              <Radio.Button key={option.value} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="absolute top-14 mt-4">{`Balance : ${nativeBalance?nativeBalance:'0.0'}`}</div>
        <img className="w-40 h-40 absolute top-20 left-1/2 transform -translate-x-1/2 mt-8" src={nft} alt="matic" />

        <div className="absolute top-60 items-center mt-10">
          <p className="text-lg font-semibold">NFT Name: #3042</p>
          <p className="text-lg font-semibold">NFT Collection: Bored Ape Yacht Club</p>
        </div>
        <div className="absolute top-100 mb-10">
          <Radio.Group value={targetSelectedValue} size="large" onChange={handleTargetRadioChange}>
            {targetChainOptions
              .filter((option) => option.value !== sourceSelectedValue)
              .map((option) => (
                <Radio.Button key={option.value} value={option.value}>
                  {option.label}
                </Radio.Button>
              ))}
          </Radio.Group>
        </div>
        <div className="mt-20">
          {targetChainOptions
            .filter((option) => option.value !== sourceSelectedValue)
            .map((option) => (
              <Space>
                <Dropdown key={option.value} overlay={menu} placement="bottomLeft" arrow>
                  <Button className="bg-blue-500 text-white">
                    <Space>
                      USDC
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <span className="mr-6">{0}</span>
              </Space>
            ))}
        </div>
        <Button className="absolute top-80 mt-8" size="large">
          Mint
        </Button>
        <div className="absolute top-80 mt-80">
        <Button className="pr-[2px]" size="large">
          Submit 
        </Button>
        <Button className="mr-10" size="large">
          Cancel
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
