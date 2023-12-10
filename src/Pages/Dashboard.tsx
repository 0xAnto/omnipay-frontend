import React, { useEffect, useState } from 'react';
import nft from '../image/nft.jpeg';
import { Button, Dropdown, Form, Input, Menu, MenuProps, Radio, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ADDRESS, BundlerEndpoints, ContractAddress, USDC } from 'utils/Constants';
import { PrimeSdk } from '@etherspot/prime-sdk';
import { Contract, ethers } from 'ethers';
import { getUiAmount, sleep } from 'utils/helpers';
import { ERC20Helper } from 'utils/ERC20Helper';
import TextArea from 'antd/es/input/TextArea';
import Submit from './Submit';
import { ERC721_ABI } from 'utils/NFT_ABI';
import Lottie from 'react-lottie-player';
import loader from '../image/loader.json';
import { useStore } from 'store';

const Dashboard = () => {
  const [arbitrumGoerliInstance, setArbitrumGoerliInstance] = useState<PrimeSdk>();
  const [mantletestnetInstance, setMantletestnetInstance] = useState<PrimeSdk>();
  const [scrollsepoliaInstance, setScrollsepoliaInstance] = useState<PrimeSdk>();
  const [basegoerliInstance, setBasegoerliInstance] = useState<PrimeSdk>();
  const [mumbaiInstance, setMumbaiInstance] = useState<PrimeSdk>();
  const [nativeBalance, setNativebalance] = useState<number>();
  const [mintTypeValue, setMintTypeValue] = useState(1);
  const [formData, setFormData] = useState({
    to: '',
    data: '',
  });
  const [isLoader, setIsLoader] = useState(false);
  const [isBalanceLoader, setIsBalanceLoader] = useState(false);
  const {
    isSubmitOpen,
    sourceSelectedValue,
    updateSubmitOpen,
    updateSourceSelectedValue,
    updateTargetSelectedValue,
    updatedArbitrumGoerliUSDC,
    updatedBasegoerliUSDC,
    updatedMantletestnetUSDC,
    updatedMumbaiUSDC,
    updatedScrollsepoliaUSDC,
    setFee,
    setuserops,
  } = useStore();
  useEffect(() => {
    const sdk = async () => {
      const [
        arbitrumgoerliPrimeInstance,
        mantletestnetPrimeInstance,
        scrollsepoliaPrimeInstance,
        baseGoerliPrimeInstance,
        mumbaiPrimeInstance,
      ] = await Promise.all([
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
      setArbitrumGoerliInstance(arbitrumgoerliPrimeInstance);
      setMantletestnetInstance(mantletestnetPrimeInstance);
      setScrollsepoliaInstance(scrollsepoliaPrimeInstance);
      setBasegoerliInstance(baseGoerliPrimeInstance);
      setMumbaiInstance(mumbaiPrimeInstance);
      const [arbitrumgoerliusdc, mantletestnetusdc, scrollsepoliausdc, baseGoerliusdc, mumbaiusdc] = await Promise.all([
        new ERC20Helper(
          arbitrumGoerliInstance as PrimeSdk,
          ContractAddress[421613].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[421613].bundler)
        ),
        new ERC20Helper(
          mantletestnetInstance as PrimeSdk,
          ContractAddress[5001].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[5001].bundler)
        ),
        new ERC20Helper(
          scrollsepoliaInstance as PrimeSdk,
          ContractAddress[534351].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[534351].bundler)
        ),
        new ERC20Helper(
          basegoerliInstance as PrimeSdk,
          ContractAddress[84531].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[84531].bundler)
        ),
        new ERC20Helper(
          mumbaiInstance as PrimeSdk,
          ContractAddress[80001].USDC,
          new ethers.providers.JsonRpcProvider(BundlerEndpoints[80001].bundler)
        ),
      ]);
      updatedArbitrumGoerliUSDC(getUiAmount(Number(await arbitrumgoerliusdc.balanceOf(ADDRESS)), 6));
      updatedMantletestnetUSDC(getUiAmount(Number(await mantletestnetusdc.balanceOf(ADDRESS)), 6));
      updatedScrollsepoliaUSDC(getUiAmount(Number(await scrollsepoliausdc.balanceOf(ADDRESS)), 6));
      updatedBasegoerliUSDC(getUiAmount(Number(await baseGoerliusdc.balanceOf(ADDRESS)), 6));
      updatedMumbaiUSDC(getUiAmount(Number(await mumbaiusdc.balanceOf(ADDRESS)), 6));
    };
    sdk();
  }, []);
  const mintType = [
    { label: 'Call Data', value: 1 },
    { label: 'NFT', value: 2 },
  ];
  const sourceChainOptions = [
    { label: 'Arbitrum Goerli', value: 1 },
    { label: 'Mantle Testnet', value: 2 },
    { label: 'Scroll Testnet', value: 3 },
    { label: 'Base Goerli', value: 4 },
    { label: 'Polygon Mumbai', value: 5 },
  ];
  // const targetChainOptions = [
  //   { label: 'Arbitrum Goerli', value: 1 },
  //   { label: 'Mantle Testnet', value: 2 },
  //   { label: 'Scroll Testnet', value: 3 },
  //   { label: 'Base Goerli', value: 4 },
  //   { label: 'Polygon Mumbai', value: 5 },
  // ];

  const handleSourceRadioChange = async (e: any) => {
    try {
      setIsBalanceLoader(true);
      updateSourceSelectedValue(e.target.value);
      let provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(
        BundlerEndpoints[421613].bundler
      );
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
      const balance = await provider.getBalance(ADDRESS, 'latest');
      setNativebalance(getUiAmount(Number(balance), 18));
    } catch (error: any) {
      console.log('Error executing order:', error);
    } finally {
      setIsBalanceLoader(false);
    }
  };

  // const handleTargetRadioChange = (e: any) => {
  //   updateTargetSelectedValue(e.target.value);
  // };
  const handleMintChange = (e: any) => {
    setMintTypeValue(e.target.value);
  };
  const handleClick = async (token: any) => {
    console.log('🚀 token:', token);
  };
  // const mintClick = async () => {
  //   try {
  //     setIsLoader(true);
  //     await sleep(5000);
  //     // let data = await mintUserOps(sourceSelectedValue);
  //     // console.log('🚀 ~ file: Dashboard.tsx:183 ~ mintClick ~ data:', data);
  //   } catch (error: any) {
  //     console.log('Error executing order:', error);
  //   } finally {
  //     setIsLoader(true);
  //     updateSubmitOpen(true);
  //   }
  // };
  const mintUserOps = async (sourceSelectedValue: number) => {
    try {
      setIsLoader(true);
      switch (sourceSelectedValue) {
        case 1:
          if (!arbitrumGoerliInstance) return;
          console.log('arbitrumGoerli');
          let collection = new Contract(
            ContractAddress[421613].NFT,
            ERC721_ABI,
            new ethers.providers.JsonRpcProvider(BundlerEndpoints[421613].bundler)
          );
          const transactionData = collection.interface.encodeFunctionData('safeMint', [ADDRESS]);
          await arbitrumGoerliInstance.clearUserOpsFromBatch();
          await arbitrumGoerliInstance?.addUserOpsToBatch({
            to: ContractAddress[421613].NFT,
            data: transactionData,
          });
          let useropsdata = await arbitrumGoerliInstance.estimate();
          setuserops(useropsdata);
          const body = {
            userOp: useropsdata,
            chainId: 421613,
          };
          const response: any = await (
            await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
              method: 'POST',
              body: JSON.stringify(body),
            })
          ).json();
          if (response.error === false) {
            setFee(response.usdAmount);
          }
          break;
        case 2:
          if (!mantletestnetInstance) return;
          console.log('mantletestnet');
          let collection1 = new Contract(
            ContractAddress[5001].NFT,
            ERC721_ABI,
            new ethers.providers.JsonRpcProvider(BundlerEndpoints[5001].bundler)
          );
          const transactionData1 = collection1.interface.encodeFunctionData('safeMint', [ADDRESS]);
          await mantletestnetInstance.clearUserOpsFromBatch();
          await mantletestnetInstance?.addUserOpsToBatch({
            to: ContractAddress[5001].NFT,
            data: transactionData1,
          });
          let opmantletestnet = await mantletestnetInstance.estimate();
          setuserops(opmantletestnet);
          const body1 = {
            userOp: opmantletestnet,
            chainId: 5001,
          };
          const response1: any = await (
            await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
              method: 'POST',
              body: JSON.stringify(body1),
            })
          ).json();
          if (response1.error === false) {
            setFee(response1.usdAmount);
          }
          break;
        case 3:
          if (!scrollsepoliaInstance) return;
          console.log('scrollsepolia');
          let collection2 = new Contract(
            ContractAddress[534351].NFT,
            ERC721_ABI,
            new ethers.providers.JsonRpcProvider(BundlerEndpoints[534351].bundler)
          );
          const transactionData2 = collection2.interface.encodeFunctionData('safeMint', [ADDRESS]);
          await scrollsepoliaInstance.clearUserOpsFromBatch();
          await scrollsepoliaInstance?.addUserOpsToBatch({
            to: ContractAddress[534351].NFT,
            data: transactionData2,
          });
          let useropsdata1 = await scrollsepoliaInstance.estimate();
          setuserops(useropsdata1);
          const body2 = {
            userOp: useropsdata1,
            chainId: 534351,
          };
          const response2: any = await (
            await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
              method: 'POST',
              body: JSON.stringify(body2),
            })
          ).json();
          if (response2.error === false) {
            setFee(response2.usdAmount);
          }
          break;
        case 4:
          if (!basegoerliInstance) return;
          console.log('basegoerli');
          let collection3 = new Contract(
            ContractAddress[84531].NFT,
            ERC721_ABI,
            new ethers.providers.JsonRpcProvider(BundlerEndpoints[84531].bundler)
          );
          const transactionData3 = collection3.interface.encodeFunctionData('safeMint', [ADDRESS]);
          await basegoerliInstance.clearUserOpsFromBatch();
          await basegoerliInstance?.addUserOpsToBatch({
            to: ContractAddress[84531].NFT,
            data: transactionData3,
          });
          let opbasegoerli = await basegoerliInstance.estimate();
          setuserops(opbasegoerli);
          const body3 = {
            userOp: opbasegoerli,
            chainId: 84531,
          };
          const response3: any = await (
            await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
              method: 'POST',
              body: JSON.stringify(body3),
            })
          ).json();
          if (response3.error === false) {
            setFee(response3.usdAmount);
          }
          break;

        case 5:
          if (!mumbaiInstance) return;
          console.log('mumbai');
          let collection4 = new Contract(
            ContractAddress[80001].NFT,
            ERC721_ABI,
            new ethers.providers.JsonRpcProvider(BundlerEndpoints[80001].bundler)
          );
          const transactionData4 = collection4.interface.encodeFunctionData('safeMint', [ADDRESS]);
          await mumbaiInstance.clearUserOpsFromBatch();
          await mumbaiInstance?.addUserOpsToBatch({
            to: ContractAddress[80001].NFT,
            data: transactionData4,
          });
          let opmumbai = await mumbaiInstance.estimate();
          setuserops(opmumbai);
          const body4 = {
            userOp: opmumbai,
            chainId: 80001,
          };
          const response4: any = await (
            await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
              method: 'POST',
              body: JSON.stringify(body4),
            })
          ).json();
          if (response4.error === false) {
            setFee(response4.usdAmount);
          }
          break;
        default:
          break;
      }
    } catch (error: any) {
      console.log('Error executing order:', error);
    } finally {
      setIsLoader(true);
      updateSubmitOpen(true);
    }
  };
  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    message.info('Selected USDC.');
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
  type FieldType = {
    PrivateKey?: string;
    to?: string;
    Data?: string;
  };
  const onFinish = (values: any) => {
    const privateKeyValue = values.PrivateKey;
    console.log('PrivateKey:', privateKeyValue);
    const to = values.to;
    console.log('to:', to);
  };
  const usdcUserOps = async (sourceSelectedValue: number, to: string, data: string) => {
    switch (sourceSelectedValue) {
      case 1:
        console.log('arbitrumGoerli');
        if (!arbitrumGoerliInstance) return;
        await arbitrumGoerliInstance.clearUserOpsFromBatch();
        await arbitrumGoerliInstance.addUserOpsToBatch({
          to: to,
          data: data,
        });
        let op = await arbitrumGoerliInstance.estimate();
        setuserops(op);
        const body = {
          userOp: op,
          chainId: 421613,
        };
        const response: any = await (
          await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
            method: 'POST',
            body: JSON.stringify(body),
          })
        ).json();
        if (response.error === false) {
          setFee(response.usdAmount);
        }
        break;
      case 2:
        console.log('mantletestnet');
        if (!mantletestnetInstance) return;
        await mantletestnetInstance.clearUserOpsFromBatch();
        await mantletestnetInstance.addUserOpsToBatch({
          to: to,
          data: data,
        });
        let opmantletestnet = await mantletestnetInstance.estimate();
        setuserops(opmantletestnet);
        const body1 = {
          userOp: opmantletestnet,
          chainId: 5001,
        };
        const response1: any = await (
          await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
            method: 'POST',
            body: JSON.stringify(body1),
          })
        ).json();
        if (response1.error === false) {
          setFee(response1.usdAmount);
        }
        break;
      case 3:
        console.log('scrollsepolia');
        if (!scrollsepoliaInstance) return;
        await scrollsepoliaInstance.clearUserOpsFromBatch();
        await scrollsepoliaInstance.addUserOpsToBatch({
          to: to,
          data: data,
        });
        let opscrollsepolia = await scrollsepoliaInstance.estimate();
        setuserops(opscrollsepolia);
        const body2 = {
          userOp: opscrollsepolia,
          chainId: 534351,
        };
        const response2: any = await (
          await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
            method: 'POST',
            body: JSON.stringify(body2),
          })
        ).json();
        if (response2.error === false) {
          setFee(response2.usdAmount);
        }
        break;
      case 4:
        console.log('basegoerli');
        if (!basegoerliInstance) return;
        await basegoerliInstance.clearUserOpsFromBatch();
        await basegoerliInstance?.addUserOpsToBatch({
          to: to,
          data: data,
        });
        let opbasegoerli = await basegoerliInstance.estimate();
        setuserops(opbasegoerli);
        const body3 = {
          userOp: opbasegoerli,
          chainId: 84531,
        };
        const response3: any = await (
          await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
            method: 'POST',
            body: JSON.stringify(body3),
          })
        ).json();
        if (response3.error === false) {
          setFee(response3.usdAmount);
        }
        break;
      case 5:
        console.log('mumbai');
        if (!mumbaiInstance) return;
        await mumbaiInstance.clearUserOpsFromBatch();
        await mumbaiInstance?.addUserOpsToBatch({
          to: to,
          data: data,
        });
        let opmumbai = await mumbaiInstance.estimate();
        setuserops(opmumbai);
        const body4 = {
          userOp: opmumbai,
          chainId: 80001,
        };
        const response4: any = await (
          await fetch('https://omnipay-etherspot.koyeb.app/wallet/fetch_price', {
            method: 'POST',
            body: JSON.stringify(body4),
          })
        ).json();
        if (response4.error === false) {
          setFee(response4.usdAmount);
        }
        break;
      default:
        break;
    }
  };
  const handleExecute = async () => {
    try {
      const { to, data } = formData;
      let dataOps = await usdcUserOps(sourceSelectedValue, to, data);
      console.log('🚀 ~ file: Dashboard.tsx:576 ~ handleExecute ~ dataOps:', dataOps);
    } catch (error) {
    } finally {
      updateSubmitOpen(true);
    }

    // console.log('🚀 USDC :', dataOps);
  };
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="bg-black  xxl:h-screen xl:h-screen  lg:-screen md:h-full sm:h-full max-sm:h-full  font-inter flex w-full flex-row justify-center items-center">
      <div className="xxl:w-[40%] xl:w-[60%] lg:w-[80%] md:w-[80%] sm:w-[100%] max-sm:w-[100%]   h-full bg-white flex flex-col justify-center items-center gap-[2rem]">
        <div>
          <p className="justify-center items-center font-extrabold">Omni Pay</p>
        </div>

        <div className="">
          <div className="flex flex-row justify-center items-center mb-1"></div>
          <Radio.Group value={sourceSelectedValue} size="large" onChange={handleSourceRadioChange}>
            {sourceChainOptions.map((option) => (
              <Radio.Button key={option.value} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        {isBalanceLoader ? (
          <div className=" flex justify-center items-center">
            <span>{'Loading '}</span>
            <Lottie
              loop
              animationData={loader}
              play
              className="w-[2.2rem] h-[1.2rem] flex justify-center items-center"
            />
          </div>
        ) : (
          <div className="">{`Balance : ${nativeBalance ? nativeBalance : '0.0'}`}</div>
        )}
        {/* <div className="">{`Balance : ${nativeBalance ? nativeBalance : '0.0'}`}</div> */}
        <Radio.Group value={mintTypeValue} size="large" onChange={handleMintChange}>
          {mintType.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
        {mintTypeValue && mintTypeValue == 2 ? (
          <div className="flex flex-col justify-center items-center">
            <img className="w-40 h-40 " src={nft} alt="matic" />
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg font-semibold">NFT Name: #3042</p>
              <p className="text-lg font-semibold">NFT Collection: Lucky Louie</p>
            </div>
            <div>
              <Button
                className="mt-1"
                onClick={() => {
                  mintUserOps(sourceSelectedValue);
                }}
                size="large"
              >
                {isLoader ? (
                  <div className=" flex justify-center items-center">
                    <span>{'Estimating '}</span>
                    <Lottie
                      loop
                      animationData={loader}
                      play
                      className="w-[2.2rem] h-[1.2rem] flex justify-center items-center"
                    />
                  </div>
                ) : (
                  <span>{'Mint'}</span>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className={`flex flex-col justify-center items-center `}>
            <Form.Item<FieldType> label="To" name="to" rules={[{ message: 'Enter target address' }]}>
              <Input placeholder="Enter target address" onChange={(e) => handleInputChange('to', e.target.value)} />
            </Form.Item>
            <Form.Item<FieldType> label="Data" name="Data" rules={[{ message: 'Enter calldata' }]}>
              <TextArea
                rows={4}
                placeholder="Enter call data"
                onChange={(e) => handleInputChange('data', e.target.value)}
              />
            </Form.Item>
            <div>
              <Button className="mt-5" size="large" onClick={handleExecute}>
                Execute
              </Button>
            </div>
          </div>
        )}
      </div>

      {isSubmitOpen && (
        <Submit
          arbitrumGoerliInstance={arbitrumGoerliInstance!}
          basegoerliInstance={basegoerliInstance!}
          mantletestnetInstance={mantletestnetInstance!}
          mumbaiInstance={mumbaiInstance!}
          scrollsepoliaInstance={scrollsepoliaInstance!}
        />
      )}
    </div>
  );
};

export default Dashboard;
