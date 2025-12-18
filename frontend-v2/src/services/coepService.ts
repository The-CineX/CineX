import { uintCV, stringUtf8CV, principalCV, bufferCV } from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { getNetwork, getContractAddress, getContractName } from '../utils/network';
import type { ServiceResponse, CoEPPool, PoolMember, PaginatedResponse, PaginationParams } from '../types';

export class CoEPService {
  constructor(private userSession: any) {}

  async createPool(title: string, target: string): Promise<ServiceResponse<CoEPPool>> {
    if (!this.userSession?.isUserSignedIn?.()) {
      return { success: false, error: 'User not signed in' };
    }

    const network = getNetwork();
    const contractAddress = getContractAddress();
    const contractName = getContractName('coep');

    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'create-pool',
        functionArgs: [stringUtf8CV(title), uintCV(Number(target))],
        network,
        appDetails: { name: 'CineX' },
      });

      const pool: CoEPPool = {
        id: `pool-${Date.now()}`,
        title,
        targetAmount: target,
        currentAmount: '0',
        members: [],
        createdAt: Date.now(),
        status: 'active',
      };

      return { success: true, data: pool };
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) };
    }
  }

  async getPools(params: PaginationParams = { page: 1, pageSize: 10 }): Promise<ServiceResponse<PaginatedResponse<CoEPPool>>> {
    const mock: CoEPPool[] = [
      {
        id: 'pool-1',
        title: 'Short Film Co-Op',
        targetAmount: '10000000000',
        currentAmount: '2500000000',
        members: [],
        createdAt: Date.now() - 1000000,
        status: 'active',
      },
    ];

    return { success: true, data: { items: mock, total: mock.length, page: params.page, pageSize: params.pageSize } };
  }

  async getPoolDetails(poolId: string): Promise<ServiceResponse<CoEPPool>> {
    const mock: CoEPPool = {
      id: poolId,
      title: 'Mock Pool',
      targetAmount: '5000000000',
      currentAmount: '1000000000',
      members: [],
      createdAt: Date.now() - 500000,
      status: 'active',
    };
    return { success: true, data: mock };
  }

  async getPoolMembers(poolId: string): Promise<ServiceResponse<PoolMember[]>> {
    const mock: PoolMember[] = [
      { address: 'SP2ABCDEFG...', amount: '1000000000', joinedAt: Date.now() - 200000 },
    ];
    return { success: true, data: mock };
  }

  async contributeToPool(params: { poolId: string; amount: string }): Promise<ServiceResponse<{ txId: string; amount: string }>> {
    if (!this.userSession?.isUserSignedIn?.()) {
      return { success: false, error: 'User not signed in' };
    }

    const membersResult = await this.getPoolMembers(params.poolId);
    if (!membersResult.success || !membersResult.data) {
      return { success: false, error: 'Failed to verify pool membership' };
    }

    const userAddress = this.userSession.loadUserData?.()?.profile?.stxAddress || '';
    const isMember = Array.isArray(membersResult.data) && membersResult.data.some((m: any) => m.address === userAddress);
    if (!isMember) {
      return { success: false, error: 'Must be a pool member to contribute' };
    }

    const network = getNetwork();
    const contractAddress = getContractAddress();
    const contractName = getContractName('coep');

    try {
      const txId = await new Promise<string>((resolve, reject) => {
        openContractCall({
          contractAddress,
          contractName,
          functionName: 'contribute-to-existing-pool',
          functionArgs: [uintCV(parseInt(params.poolId))],
          network,
          onFinish: (data: any) => resolve(data?.txId),
          onCancel: () => reject(new Error('User cancelled contribution')),
        });
      });

      return { success: true, data: { txId, amount: params.amount }, transactionId: txId };
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) };
    }
  }
}

export function createCoEPService(userSession: any) {
  return new CoEPService(userSession);
}
