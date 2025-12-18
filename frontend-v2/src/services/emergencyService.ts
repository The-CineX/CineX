import { openContractCall } from '@stacks/connect';
import { getNetwork, getContractAddress, getContractName } from '../utils/network';
import type { ServiceResponse } from '../types';

export class EmergencyService {
  constructor(private userSession: any) {}

  async pauseSystem(): Promise<ServiceResponse<null>> {
    if (!this.userSession?.isUserSignedIn?.()) return { success: false, error: 'Not signed in' };
    const network = getNetwork();
    const contractAddress = getContractAddress('core');
    const contractName = getContractName('core');
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'pause-system',
        functionArgs: [],
        network,
        appDetails: { name: 'CineX' },
      });
      return { success: true, data: null };
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) };
    }
  }

  async resumeSystem(): Promise<ServiceResponse<null>> {
    if (!this.userSession?.isUserSignedIn?.()) return { success: false, error: 'Not signed in' };
    const network = getNetwork();
    const contractAddress = getContractAddress('core');
    const contractName = getContractName('core');
    try {
      await openContractCall({
        contractAddress,
        contractName,
        functionName: 'resume-system',
        functionArgs: [],
        network,
        appDetails: { name: 'CineX' },
      });
      return { success: true, data: null };
    } catch (err: any) {
      return { success: false, error: err?.message || String(err) };
    }
  }

  async getSystemStatus(): Promise<ServiceResponse<{ paused: boolean }>> {
    // Mock read-only status
    return { success: true, data: { paused: false } };
  }
}

export function createEmergencyService(userSession: any) {
  return new EmergencyService(userSession);
}
