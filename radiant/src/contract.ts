import {
  AddressSet as AddressSetEvent,
  ConfigurationAdminUpdated as ConfigurationAdminUpdatedEvent,
  EmergencyAdminUpdated as EmergencyAdminUpdatedEvent,
  LendingPoolCollateralManagerUpdated as LendingPoolCollateralManagerUpdatedEvent,
  LendingPoolConfiguratorUpdated as LendingPoolConfiguratorUpdatedEvent,
  LendingPoolUpdated as LendingPoolUpdatedEvent,
  LendingRateOracleUpdated as LendingRateOracleUpdatedEvent,
  MarketIdSet as MarketIdSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PriceOracleUpdated as PriceOracleUpdatedEvent,
  ProxyCreated as ProxyCreatedEvent
} from "../generated/Contract/Contract"
import {
  AddressSet,
  ConfigurationAdminUpdated,
  EmergencyAdminUpdated,
  LendingPoolCollateralManagerUpdated,
  LendingPoolConfiguratorUpdated,
  LendingPoolUpdated,
  LendingRateOracleUpdated,
  MarketIdSet,
  OwnershipTransferred,
  PriceOracleUpdated,
  ProxyCreated
} from "../generated/schema"

export function handleAddressSet(event: AddressSetEvent): void {
  let entity = new AddressSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.newAddress = event.params.newAddress
  entity.hasProxy = event.params.hasProxy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleConfigurationAdminUpdated(
  event: ConfigurationAdminUpdatedEvent
): void {
  let entity = new ConfigurationAdminUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmergencyAdminUpdated(
  event: EmergencyAdminUpdatedEvent
): void {
  let entity = new EmergencyAdminUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLendingPoolCollateralManagerUpdated(
  event: LendingPoolCollateralManagerUpdatedEvent
): void {
  let entity = new LendingPoolCollateralManagerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLendingPoolConfiguratorUpdated(
  event: LendingPoolConfiguratorUpdatedEvent
): void {
  let entity = new LendingPoolConfiguratorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLendingPoolUpdated(event: LendingPoolUpdatedEvent): void {
  let entity = new LendingPoolUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLendingRateOracleUpdated(
  event: LendingRateOracleUpdatedEvent
): void {
  let entity = new LendingRateOracleUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMarketIdSet(event: MarketIdSetEvent): void {
  let entity = new MarketIdSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newMarketId = event.params.newMarketId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePriceOracleUpdated(event: PriceOracleUpdatedEvent): void {
  let entity = new PriceOracleUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProxyCreated(event: ProxyCreatedEvent): void {
  let entity = new ProxyCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.newAddress = event.params.newAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
