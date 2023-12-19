import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts"
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
} from "../generated/Contract/Contract"

export function createAddressSetEvent(
  id: Bytes,
  newAddress: Address,
  hasProxy: boolean
): AddressSet {
  let addressSetEvent = changetype<AddressSet>(newMockEvent())

  addressSetEvent.parameters = new Array()

  addressSetEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  addressSetEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )
  addressSetEvent.parameters.push(
    new ethereum.EventParam("hasProxy", ethereum.Value.fromBoolean(hasProxy))
  )

  return addressSetEvent
}

export function createConfigurationAdminUpdatedEvent(
  newAddress: Address
): ConfigurationAdminUpdated {
  let configurationAdminUpdatedEvent = changetype<ConfigurationAdminUpdated>(
    newMockEvent()
  )

  configurationAdminUpdatedEvent.parameters = new Array()

  configurationAdminUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return configurationAdminUpdatedEvent
}

export function createEmergencyAdminUpdatedEvent(
  newAddress: Address
): EmergencyAdminUpdated {
  let emergencyAdminUpdatedEvent = changetype<EmergencyAdminUpdated>(
    newMockEvent()
  )

  emergencyAdminUpdatedEvent.parameters = new Array()

  emergencyAdminUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return emergencyAdminUpdatedEvent
}

export function createLendingPoolCollateralManagerUpdatedEvent(
  newAddress: Address
): LendingPoolCollateralManagerUpdated {
  let lendingPoolCollateralManagerUpdatedEvent = changetype<
    LendingPoolCollateralManagerUpdated
  >(newMockEvent())

  lendingPoolCollateralManagerUpdatedEvent.parameters = new Array()

  lendingPoolCollateralManagerUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return lendingPoolCollateralManagerUpdatedEvent
}

export function createLendingPoolConfiguratorUpdatedEvent(
  newAddress: Address
): LendingPoolConfiguratorUpdated {
  let lendingPoolConfiguratorUpdatedEvent = changetype<
    LendingPoolConfiguratorUpdated
  >(newMockEvent())

  lendingPoolConfiguratorUpdatedEvent.parameters = new Array()

  lendingPoolConfiguratorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return lendingPoolConfiguratorUpdatedEvent
}

export function createLendingPoolUpdatedEvent(
  newAddress: Address
): LendingPoolUpdated {
  let lendingPoolUpdatedEvent = changetype<LendingPoolUpdated>(newMockEvent())

  lendingPoolUpdatedEvent.parameters = new Array()

  lendingPoolUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return lendingPoolUpdatedEvent
}

export function createLendingRateOracleUpdatedEvent(
  newAddress: Address
): LendingRateOracleUpdated {
  let lendingRateOracleUpdatedEvent = changetype<LendingRateOracleUpdated>(
    newMockEvent()
  )

  lendingRateOracleUpdatedEvent.parameters = new Array()

  lendingRateOracleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return lendingRateOracleUpdatedEvent
}

export function createMarketIdSetEvent(newMarketId: string): MarketIdSet {
  let marketIdSetEvent = changetype<MarketIdSet>(newMockEvent())

  marketIdSetEvent.parameters = new Array()

  marketIdSetEvent.parameters.push(
    new ethereum.EventParam(
      "newMarketId",
      ethereum.Value.fromString(newMarketId)
    )
  )

  return marketIdSetEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPriceOracleUpdatedEvent(
  newAddress: Address
): PriceOracleUpdated {
  let priceOracleUpdatedEvent = changetype<PriceOracleUpdated>(newMockEvent())

  priceOracleUpdatedEvent.parameters = new Array()

  priceOracleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return priceOracleUpdatedEvent
}

export function createProxyCreatedEvent(
  id: Bytes,
  newAddress: Address
): ProxyCreated {
  let proxyCreatedEvent = changetype<ProxyCreated>(newMockEvent())

  proxyCreatedEvent.parameters = new Array()

  proxyCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  proxyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return proxyCreatedEvent
}
