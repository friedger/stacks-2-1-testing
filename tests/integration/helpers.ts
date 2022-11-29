import { StacksDevnetOrchestrator } from '@hirosystems/stacks-devnet-js';
import { time } from 'console';
import { Constants } from './constants';


interface EpochTimeline {
    epoch_2_0: number,
    epoch_2_05: number,
    epoch_2_1: number,
    pox_2_activation: number,
}

const DEFAULT_EPOCH_TIMELINE = {
    epoch_2_0: Constants.DEVNET_DEFAULT_EPOCH_2_0,
    epoch_2_05: Constants.DEVNET_DEFAULT_EPOCH_2_05,
    epoch_2_1: Constants.DEVNET_DEFAULT_EPOCH_2_1,
    pox_2_activation: Constants.DEVNET_DEFAULT_POX_2_ACTIVATION,
}

export function buildStacksDevnetOrchestrator(networkId: number = 0, timeline: EpochTimeline = DEFAULT_EPOCH_TIMELINE) {
    const orchestrator = new StacksDevnetOrchestrator({
        path: "./Clarinet.toml",
        logs: true,
        devnet: {
            network_id: networkId,
            bitcoin_controller_block_time: Constants.BITCOIN_BLOCK_TIME,
            epoch_2_0: timeline.epoch_2_0,
            epoch_2_05: timeline.epoch_2_05,
            epoch_2_1: timeline.epoch_2_1,
            pox_2_activation: timeline.pox_2_activation,
            bitcoin_controller_automining_disabled: false,
            bitcoin_node_p2p_port: 10000 + networkId * 10 + 1,
            bitcoin_node_rpc_port: 10000 + networkId * 10 + 2,
            stacks_node_p2p_port: 10000 + networkId * 10 + 3,
            stacks_node_rpc_port: 10000 + networkId * 10 + 4,
            orchestrator_port: 10000 + networkId * 10 + 5,
            orchestrator_control_port: 10000 + networkId * 10 + 6,
            stacks_api_port: 10000 + networkId * 10 + 7,
            stacks_explorer_port: 10000 + networkId * 10 + 8,
            bitcoin_explorer_port: 10000 + networkId * 10 + 9,
        }
    });
    return orchestrator;
}
