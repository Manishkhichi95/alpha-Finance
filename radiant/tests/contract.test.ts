import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address } from "@graphprotocol/graph-ts"
import { AddressSet } from "../generated/schema"
import { AddressSet as AddressSetEvent } from "../generated/Contract/Contract"
import { handleAddressSet } from "../src/contract"
import { createAddressSetEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = Bytes.fromI32(1234567890)
    let newAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let hasProxy = "boolean Not implemented"
    let newAddressSetEvent = createAddressSetEvent(id, newAddress, hasProxy)
    handleAddressSet(newAddressSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddressSet created and stored", () => {
    assert.entityCount("AddressSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddressSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddressSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hasProxy",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
