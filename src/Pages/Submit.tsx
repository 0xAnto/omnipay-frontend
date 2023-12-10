import React, { useState } from 'react';
import close_black from '../image/close_black.svg';
import { useStore } from 'store';
import { Button, Dropdown, Menu, MenuProps, Radio, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ERC20Helper } from 'utils/ERC20Helper';
import { BigNumber, ethers } from 'ethers';
import { ADDRESS, BundlerEndpoints, ContractAddress, FEEPAYER } from 'utils/Constants';
import { PrimeSdk } from '@etherspot/prime-sdk';
import { sleep } from 'utils/helpers';
interface SubmitHandleInterface {
  arbitrumGoerliInstance: PrimeSdk;
  mantletestnetInstance: PrimeSdk;
  scrollsepoliaInstance: PrimeSdk;
  basegoerliInstance: PrimeSdk;
  mumbaiInstance: PrimeSdk;
}
const Submit = (props: SubmitHandleInterface) => {
  const [isLoader, setIsLoader] = useState(false);
  const [ishash, sethash] = useState<string>('');
  const targetChainOptions = [
    { label: 'Arbitrum Goerli', value: 1 },
    { label: 'Mantle Testnet', value: 2 },
    { label: 'Scroll Testnet', value: 3 },
    { label: 'Base Goerli', value: 4 },
    { label: 'Polygon Mumbai', value: 5 },
  ];
  const {
    isSubmitOpen,
    sourceSelectedValue,
    targetSelectedValue,
    arbitrumGoerliUsdcValue,
    mantletestnetUsdcValue,
    scrollsepoliaUsdcValue,
    basegoerliUsdcValue,
    mumbaiUsdcValue,

    updateSubmitOpen,
    updateSourceSelectedValue,
    updateTargetSelectedValue,
  } = useStore();
  console.log('🚀 ~ file: Submit.tsx:28 ~ targetSelectedValue:', targetSelectedValue);
  const itemsdrop: MenuProps['items'] = [
    {
      label: 'USDC',
      key: '1',
      icon: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
    },
  ];
  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    message.info('Selected USDC.');
  };
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
  const handleTargetRadioChange = (e: any) => {
    updateTargetSelectedValue(e.target.value);
  };
  const apifetch = async (op: any, chain: number) => {
    const body = {
      userOp: op,
      chainId: chain,
    };
    const response: any = await (
      await fetch('http://localhost:3006/wallet/generatePaymasterAndData', {
        method: 'POST',
        body: JSON.stringify(body),
      })
    ).json();

    console.log('response: ', response);
    if (!response.error) {
      let paymasterAndData = response.paymasterAndData;
      console.log('🚀 ~ file: Submit.tsx:81 ~ apifetch ~ paymasterAndData:', paymasterAndData);
    }

    // console.log('op: ', paymasterAndData);

    // // sign the UserOp and sending to the bundler...
    // const uoHash = await primeSdk.send(paymasterAndData);
    // console.log(UserOpHash: ${uoHash});
  };
  const getExplorerLink = (hash: any, chain: any) => {
    let link = '';
    switch (chain) {
      case 1:
        link = `https://goerli.arbiscan.io/tx/${hash}`;
        break;
    }
    return link;
  };
  const handleClick = async (chain: number) => {
    setIsLoader(true);
    console.log('🚀 ~ file: Submit.tsx:75 ~ handleClick ~ chain:', chain);
    try {
      const [arbitrumgoerliusdc, mantletestnetusdc, scrollsepoliausdc, baseGoerliusdc, mumbaiusdc] = await Promise.all([
        new ERC20Helper(
          props.arbitrumGoerliInstance as PrimeSdk,
          ContractAddress[421613].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[421613].bundler)
        ),
        new ERC20Helper(
          props.mantletestnetInstance as PrimeSdk,
          ContractAddress[5001].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[5001].bundler)
        ),
        new ERC20Helper(
          props.scrollsepoliaInstance as PrimeSdk,
          ContractAddress[534351].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[534351].bundler)
        ),
        new ERC20Helper(
          props.basegoerliInstance as PrimeSdk,
          ContractAddress[84531].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[84531].bundler)
        ),
        new ERC20Helper(
          props.mumbaiInstance as PrimeSdk,
          ContractAddress[80001].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[80001].bundler)
        ),
      ]);
      let data = arbitrumgoerliusdc.transfer(FEEPAYER, 100000 as unknown as BigNumber);
      let opmantletestnet = await props.arbitrumGoerliInstance.estimate();
      let hashmantletestnet = await props.arbitrumGoerliInstance.send(opmantletestnet);
      let userOpsReceiptmantletestnet = null;
      const timeoutmantletestnet = Date.now() + 60000; // 1 minute timeout
      while (userOpsReceiptmantletestnet == null && Date.now() < timeoutmantletestnet) {
        await sleep(2);
        userOpsReceiptmantletestnet = await props.arbitrumGoerliInstance.getUserOpReceipt(hashmantletestnet);
      }
      if (userOpsReceiptmantletestnet.success) {
        sethash(userOpsReceiptmantletestnet.receipt.transactionHash);
      }
    } catch (error: any) {
      console.log('Error handleClick order:', error);
    } finally {
    }
  };
  return (
    <div className="fixed z-[2] inset-0 h-full w-full bg-[rgba(0,0,0,0.20)] bg-white flex flex-row justify-center 2xl:items-center xl:items-center lg:items-center md:items-center sm:items-center max-sm:items-center">
      <div
        className={`2xl:w-[45rem] xl:w-[55rem] lg:w-[55rem] md:w-[55rem] sm:w-[21rem] max-sm:w-[21rem] h-[38.875rem] ${
          true
            ? 'bg-[#FFFFFF] border-[#DAECEF]'
            : 'bg-gradient-to-r from-[#f5fffa0f] to-[#F5F7FA00] border-[#1e1f22] bg-white'
        } border-2 rounded-[1rem]`}
      >
        <div className="flex justify-between p-[3%_5%] connect_bg_container  rounded-t-[1rem]  ">
          <div className={`text-${true ? '#364152' : 'white'} font-[500] text-[1.25rem]`}></div>
          <img
            src={close_black}
            alt="close"
            className="cursor-pointer"
            onClick={() => {
              updateSubmitOpen(false);
            }}
          />
        </div>
        <div className={`flex flex-col justify-center items-center gap-[1rem] mb-6`}>
          This Transaction will cost 0.1 USDC
        </div>
        <div className={`flex flex-col justify-start items-start  ml-28 font-[500] text-[0.875rem]`}>
          Select Chain To Pay Fee:
        </div>
        <div className="flex flex-col justify-center items-center gap-[1rem] mt-6">
          <div className="flex flex-col justify-center items-center gap-[1rem]">
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
            {sourceSelectedValue !== 1 && (
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>
                    <Space>
                      USDC
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <span>{arbitrumGoerliUsdcValue ? arbitrumGoerliUsdcValue : 0}</span>
              </Space>
            )}
            {sourceSelectedValue !== 2 && (
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>
                    <Space>
                      USDC
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <span>{mantletestnetUsdcValue ? mantletestnetUsdcValue : 0}</span>
              </Space>
            )}
            {sourceSelectedValue !== 3 && (
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>
                    <Space>
                      USDC
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <span>{scrollsepoliaUsdcValue ? scrollsepoliaUsdcValue : 0}</span>
              </Space>
            )}
            {sourceSelectedValue !== 4 && (
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>
                    <Space>
                      USDC
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <span>{basegoerliUsdcValue ? basegoerliUsdcValue : 0}</span>
              </Space>
            )}
            {sourceSelectedValue !== 5 && (
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>
                    <Space>
                      USDC
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <span>{mumbaiUsdcValue ? mumbaiUsdcValue : 0}</span>
              </Space>
            )}
          </div>
        </div>
        {targetSelectedValue && targetSelectedValue !== 0 ? (
          <div>
            {isLoader ? (
              <div className={`flex flex-col justify-center items-center gap-[1rem] mt-6`}>
                Paying gas fee 0.1 USDC ...
              </div>
            ) : (
              <></>
            )}

            {ishash ? (
              <div>
                <p>
                  <a
                    className="flex flex-col justify-center items-center text-purple-700 underline hover:underline hover:text-purple-500"
                    href={getExplorerLink(ishash, 1)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View transaction
                  </a>
                </p>
              </div>
            ) : (
              <></>
            )}
            {!isLoader?(
              <div className="flex flex-row justify-center items-center gap-[1rem] mt-11">
                <Button className="" size="large" onClick={() => handleClick(targetSelectedValue)}>
                  Pay&Send
                </Button>
                <Button className="" size="large">
                  Cancel
                </Button>
              </div>
            ):(<></>)
            }
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Submit;
