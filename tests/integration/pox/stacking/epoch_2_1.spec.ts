import { buildStacksDevnetOrchestrator } from '../../helpers';
import { broadcastStackSTX, waitForNextPreparePhase, waitForNextRewardPhase, getPoxInfo, getBitcoinBlockHeight } from '../helpers'
import { Accounts } from '../../constants';
import { StacksTestnet } from "@stacks/network";

describe('testing stacking under epoch 2.1', () => {

    test('submitting stacks-stx through pox-1 contract during epoch 2.0 should succeed', async () => {
        // const orchestrator = buildStacksDevnetOrchestrator(2);
        // orchestrator.start();

        // const network = new StacksTestnet({ url: orchestrator.getStacksNodeUrl() });
        
        // // Wait for Stacks genesis block
        // orchestrator.waitForStacksBlock();
    
        // // Wait for block N-2 where N is the height of the next prepare phase
        // let chainUpdate = await waitForNextPreparePhase(network, orchestrator, -2);
        // let blockHeight = getBitcoinBlockHeight(chainUpdate);
    
        // // Broadcast some STX stacking orders
        // let response = await broadcastStackSTX(1, network, 25_000_000_000_000, Accounts.WALLET_1, blockHeight);
        // expect(response.error).toBeUndefined();
    
        // response = await broadcastStackSTX(1, network, 50_000_000_000_000, Accounts.WALLET_2, blockHeight);
        // expect(response.error).toBeUndefined();
    
        // response = await broadcastStackSTX(1, network, 75_000_000_000_000, Accounts.WALLET_3, blockHeight);
        // expect(response.error).toBeUndefined();
    
        // // Wait for block N+1 where N is the height of the next reward phase
        // chainUpdate = await waitForNextRewardPhase(network, orchestrator, 1);
        // let poxInfo = await getPoxInfo(network);
        // expect(poxInfo.current_cycle.is_pox_active).toBe(true);

        // orchestrator.stop();
    })   
})
