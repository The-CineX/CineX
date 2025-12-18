import { uintCV, stringUtf8CV } from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';
import { getNetwork, getContractAddress, getContractName } from '../utils/network';
import type { ServiceResponse, VerificationApplication, VerifiedFilmmaker, PaginatedResponse, PaginationParams } from '../types';

export class VerificationService {
  constructor(private userSession: any) {}

  async submitVerification(app: Partial<VerificationApplication>): Promise<ServiceResponse<VerificationApplication>> {
    if (!this.userSession?.isUserSignedIn?.()) {
      return { success: false, error: 'User not signed in' };
    }

    const network = getNetwork();
    const contractAddress = getContractAddress('verification');
    const contractName = getContractName('verification');

    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'submit-verification',
        functionArgs: [stringUtf8CV(app?.filmmakerName || 'Unknown')],
        network,
        appDetails: { name: 'CineX' },
      });

      const application: VerificationApplication = {
        id: `verif-${Date.now()}`,
        applicant: this.userSession.loadUserData?.()?.profile?.stxAddress || 'SP...mock',
        filmmakerName: app?.filmmakerName || 'Unknown',
        portfolio: app?.portfolio || [],
        status: 'pending',
        submittedAt: Date.now(),
      };

      return { success: true, data: application };
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) };
    }
  }

  async checkVerificationStatus(address: string): Promise<ServiceResponse<VerificationApplication | null>> {
    if (!address) return { success: true, data: null };
    // Mock: addresses ending with 'A' are approved
    const status = address.endsWith('A') ? 'approved' : 'pending';
    const app: VerificationApplication = {
      id: `verif-${address}`,
      applicant: address,
      filmmakerName: 'Mock Filmmaker',
      portfolio: [],
      status,
      submittedAt: Date.now() - 100000,
    };
    return { success: true, data: app };
  }

  async getVerifiedFilmmakers(params: PaginationParams = { page: 1, pageSize: 10 }): Promise<ServiceResponse<PaginatedResponse<VerifiedFilmmaker>>> {
    const items: VerifiedFilmmaker[] = [
      { address: 'SP2ABCDEFG...', name: 'Jane Doe', bio: 'Filmmaker' },
    ];
    return { success: true, data: { items, total: items.length, page: params.page, pageSize: params.pageSize } };
  }
}

export function createVerificationService(userSession: any) {
  return new VerificationService(userSession);
}
