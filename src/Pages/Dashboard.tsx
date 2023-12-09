import React, { SetStateAction, useEffect, useState } from 'react';
import nft from '../image/BoredApe.png';
import { Button, Dropdown, Flex, Input, Menu, MenuProps, Radio, RadioChangeEvent, Space, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { ADDRESS, BundlerEndpoints, ContractAddress, USDC } from 'utils/Constants';
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
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[5001].chainId),
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[534351].chainId),
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[84531].chainId),
            projectKey: '',
          }
        ),
        new PrimeSdk(
          {
            privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY as string,
          },
          {
            chainId: Number(BundlerEndpoints[80001].chainId),
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
  useEffect(()=>{
    const sdk = async () => {
    let address = await mumbaiInstance?.getCounterFactualAddress()
    console.log("basegoerliInstance",  await basegoerliInstance?.getCounterFactualAddress())
    console.log("arbitrumGoerliInstance",  await arbitrumGoerliInstance?.getCounterFactualAddress())
    console.log("mantletestnetInstance",  await mantletestnetInstance?.getCounterFactualAddress())
    console.log("scrollsepoliaInstance",  await scrollsepoliaInstance?.getCounterFactualAddress())
    console.log("basegoerliInstance",  await basegoerliInstance?.getCounterFactualAddress())
    }
    sdk();
  },[mumbaiInstance])
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
  const usdcBalance = (chain:number) => {
    switch (Number(chain)) {
      case 1:
        let data =new ERC20Helper(arbitrumGoerliInstance as PrimeSdk,ContractAddress[421613].USDC,new ethers.providers.JsonRpcProvider(BundlerEndpoints[421613].bundler))
        console.log("🚀 ~ file: Dashboard.tsx:201 ~ usdcBalance ~ data:", data)
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-black  xxl:h-screen xl:h-screen  lg:-screen md:h-full sm:h-full max-sm:h-full  font-inter flex w-full flex-row justify-center items-center">
      <div className="xxl:w-[40%] xl:w-[60%] lg:w-[80%] md:w-[80%] sm:w-[100%] max-sm:w-[100%]   h-full bg-white flex flex-col justify-center items-center gap-[2rem]">
        <div className="">
          <Radio.Group value={sourceSelectedValue} size="large" onChange={handleSourceRadioChange}>
            {sourceChainOptions.map((option) => (
              <Radio.Button key={option.value} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="">{`Balance : ${nativeBalance?nativeBalance:'0.0'}`}</div>
        <img className="w-40 h-40 " src={nft} alt="matic" />

        <div className="flex flex-col justify-center items-center">
          <p className="text-lg font-semibold">NFT Name: #3042</p>
          <p className="text-lg font-semibold">NFT Collection: Bored Ape Yacht Club</p>
        </div>
        <Button className="" size="large">
          Mint
        </Button>
        <div className="flex flex-row justify-center items-center gap-[1rem]">
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
        <div className="flex flex-row justify-center items-center gap-[1rem]">
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
                <span className="">{0}</span>
              </Space>
            ))}
        </div>
        <div className="flex flex-row justify-center items-center gap-[1rem]">
        <Button className="" size="large">
          Submit 
        </Button>
        <Button className="" size="large">
          Cancel
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
