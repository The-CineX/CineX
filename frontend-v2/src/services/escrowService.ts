import { uintCV, principalCV } from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { getNetwork, getContractAddress, getContractName } from '../utils/network';
import type { ServiceResponse, EscrowDeposit, EscrowRelease, PaginatedResponse, PaginationParams } from '../types';

export class EscrowService {
  constructor(private userSession: any) {}

  async depositToEscrow(campaignId: string, amount: string): Promise<ServiceResponse<EscrowDeposit>> {
    if (!this.userSession?.isUserSignedIn?.()) {
      return { success: false, error: 'User not signed in' };
    }

    const network = getNetwork();
    const contractAddress = getContractAddress();
    const contractName = getContractName('escrow');

    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'deposit-to-campaign',
        functionArgs: [principalCV(contractAddress), uintCV(Number(amount))],
        network,
        appDetails: { name: 'CineX' },
      });

      const deposit: EscrowDeposit = {
        id: `escrow-${Date.now()}`,
        campaignId,
        depositor: this.userSession.loadUserData?.()?.profile?.stxAddress || 'SP...mock',
        amount,
        createdAt: Date.now(),
        status: 'held',
      };

      return { success: true, data: deposit };
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) };
    }
  }

  async withdrawFromEscrow(escrowId: string): Promise<ServiceResponse<EscrowRelease>> {
    if (!this.userSession?.isUserSignedIn?.()) {
      return { success: false, error: 'User not signed in' };
    }

    const release: EscrowRelease = {
      id: `release-${Date.now()}`,
      escrowId,
      amount: '0',
      releasedAt: Date.now(),
      receiver: this.userSession.loadUserData?.()?.profile?.stxAddress || 'SP...mock',
      status: 'completed',
    };

    return { success: true, data: release };
  }

  async getUserEscrowDeposits(params: PaginationParams = { page: 1, pageSize: 10 }): Promise<ServiceResponse<PaginatedResponse<EscrowDeposit>>> {
    const items: EscrowDeposit[] = [
      {
        id: 'escrow-1',
        campaignId: 'campaign-1',
        depositor: 'SP2ABCDEFG...',
        amount: '1000000000',
        createdAt: Date.now() - 100000,
        status: 'held',
      },
    ];
    return { success: true, data: { items, total: items.length, page: params.page, pageSize: params.pageSize } };
  }
}

export function createEscrowService(userSession: any) {
  return new EscrowService(userSession);
}
