import { PrimeSdk } from '@etherspot/prime-sdk';
import { BigNumber, Contract, providers } from 'ethers';
import { ERC20_ABI } from './ERC20_ABI';

export class ERC20Helper {
  token: Contract;
  constructor(
    private sdk: PrimeSdk,
    public tokenAddress: string,
    public walletProvider: providers.JsonRpcProvider
  ) {
    this.token = new Contract(this.tokenAddress, ERC20_ABI, this.walletProvider);
  }

  async name(): Promise<string> {
    const name = await this.token.functions.name();
    return name[0];
  }

  async symbol(): Promise<string> {
    const symbol = await this.token.functions.symbol();
    return symbol[0];
  }

  async decimals(): Promise<number> {
    const decimal = await this.token.functions.decimals();
    return decimal[0];
  }

  async totalSupply(): Promise<BigNumber> {
    const supply = await this.token.functions.totalSupply();
    return supply[0];
  }

  async balanceOf(address: string): Promise<BigNumber> {
    const bal = await this.token.functions.balanceOf(address);
    return bal[0];
  }

  async allowance(owner: string, spender: string): Promise<BigNumber> {
    const allowance = await this.token.functions.allowance(owner, spender);
    return allowance[0];
  }

  async approve(spender: string, amount: BigNumber): Promise<any> {
    const transactionData = this.token.interface.encodeFunctionData('approve', [spender, amount]);
    await this.sdk.addUserOpsToBatch({ to: this.tokenAddress, data: transactionData });
  }

  async decreaseAllowance(spender: string, subtractedValue: BigNumber): Promise<any> {
    const transactionData = this.token.interface.encodeFunctionData('decreaseAllowance', [spender, subtractedValue]);
    await this.sdk.addUserOpsToBatch({ to: this.tokenAddress, data: transactionData });
  }

  async increaseAllowance(spender: string, addedValue: BigNumber): Promise<any> {
    const transactionData = this.token.interface.encodeFunctionData('increaseAllowance', [spender, addedValue]);
    await this.sdk.addUserOpsToBatch({ to: this.tokenAddress, data: transactionData });
  }

  async transfer(recipient: string, amount: BigNumber): Promise<any> {
    const transactionData = this.token.interface.encodeFunctionData('transfer', [recipient, amount]);
    await this.sdk.addUserOpsToBatch({ to: this.tokenAddress, data: transactionData });
  }

  async transferFrom(sender: string, recipient: string, amount: BigNumber): Promise<any> {
    const transactionData = this.token.interface.encodeFunctionData('transferFrom', [sender, recipient, amount]);
    await this.sdk.addUserOpsToBatch({ to: this.tokenAddress, data: transactionData });
  }
}
