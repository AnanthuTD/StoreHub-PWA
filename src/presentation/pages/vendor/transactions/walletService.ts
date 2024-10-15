import axiosInstance from '@/config/axios';

export class WalletService {
  async getBalance(): Promise<number> {
    const response = await axiosInstance.get('/vendor/wallet/balance');
    return response.data.balance;
  }

  async getTransactionHistory(): Promise<any[]> {
    const response = await axiosInstance.get('/vendor/wallet/transactions');
    return response.data.transactions;
  }
}
