import { buildDevnetNetworkOrchestrator, getBitcoinBlockHeight } from '../../helpers';
import { broadcastStackSTX, waitForNextPreparePhase, waitForNextRewardPhase, getPoxInfo } from '../helpers'
import { Accounts } from '../../constants';
import { StacksTestnet } from "@stacks/network";
import { DevnetNetworkOrchestrator } from "@hirosystems/stacks-devnet-js";

describe('testing stacking under epoch 2.1', () => {
    let orchestrator: DevnetNetworkOrchestrator;

    beforeAll(() => {
        orchestrator = buildDevnetNetworkOrchestrator({ epoch_2_0: 100, epoch_2_05: 101, epoch_2_1: 102, pox_2_activation: 103 }, false);
        orchestrator.start()
    });

    afterAll(() => {
        orchestrator.stop();
    });

    test('submitting stacks-stx through pox-1 contract during epoch 2.0 should succeed', async () => {
        const network = new StacksTestnet({ url: orchestrator.getStacksNodeUrl() });
        
        // Wait for Stacks genesis block
        orchestrator.waitForStacksBlock();
    
        // Wait for block N-2 where N is the height of the next prepare phase
        let chainUpdate = await waitForNextPreparePhase(network, orchestrator, -2);
        let blockHeight = getBitcoinBlockHeight(chainUpdate);
    
        // Broadcast some STX stacking orders
        let fee = 1000;
        let cycles = 1;
        let response = await broadcastStackSTX(2, network, 25_000_000_000_000, Accounts.WALLET_1, blockHeight, cycles, fee);
        expect(response.error).toBeUndefined();
    
        response = await broadcastStackSTX(2, network, 50_000_000_000_000, Accounts.WALLET_2, blockHeight, cycles, fee);
        expect(response.error).toBeUndefined();
    
        response = await broadcastStackSTX(2, network, 75_000_000_000_000, Accounts.WALLET_3, blockHeight, cycles, fee);
        expect(response.error).toBeUndefined();
    
        // Wait for block N+1 where N is the height of the next reward phase
        chainUpdate = await waitForNextRewardPhase(network, orchestrator, 1);
        let poxInfo = await getPoxInfo(network);
        
        // Assert
        expect(poxInfo.contract_id).toBe('ST000000000000000000002AMW42H.pox-2');
        expect(poxInfo.current_cycle.is_pox_active).toBe(true);
    })   
})
