import { GENESIS } from "./generated/DiamondContract/DiamondContract";
import {
  PlanetContract,
  Transfer,
} from "./generated/PlanetContract/PlanetContract"; // <-- Add this
import { DiamondContract } from "./generated/DiamondContract/DiamondContract"; // <-- Add this
import {
  Planet,
  PlanetResource,
  PlanetResourceAvailable,
} from "./generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleGenesis(event: GENESIS): void {
  let planetContractAddress =
    "0x42ae07ee09001ABcE5372F75d0E12f9B31957149"; // Replace with the correct address

  let planetContract = PlanetContract.bind(
    Address.fromString(planetContractAddress)
  );
  let diamondContract = DiamondContract.bind(event.address);

  let planetsTotalSupply = planetContract.totalSupply();

  for (let i = 0; i < planetsTotalSupply.toI32(); i++) {
    let planetData = planetContract.planets(BigInt.fromI32(i + 1));
    let owner = planetContract.ownerOf(BigInt.fromI32(i + 1));
    let resources = [
      diamondContract.getPlanetResources(
        BigInt.fromI32(i + 1),
        BigInt.fromI32(0)
      ),
      diamondContract.getPlanetResources(
        BigInt.fromI32(i + 1),
        BigInt.fromI32(1)
      ),
      diamondContract.getPlanetResources(
        BigInt.fromI32(i + 1),
        BigInt.fromI32(2)
      ),
    ];

    let planet = new Planet((i + 1).toString());
    planet.planetType = planetData.getPlanetType().toI32();
    planet.ownerOfPlanet = owner.toHex();
    planet.pvpEnabled = planetData.getPvpEnabled();

    let planetResourcesUnmined = new PlanetResource(
      (i + 1).toString()
    );
    planetResourcesUnmined.antimatter = planetData.getAntimatter();
    planetResourcesUnmined.metal = planetData.getMetal();
    planetResourcesUnmined.crystal = planetData.getCrystal();
    planetResourcesUnmined.save();

    planet.planetResourcesUnmined = planetResourcesUnmined.id;

    let planetResourcesAvailable = new PlanetResourceAvailable(
      (i + 1).toString()
    );
    planetResourcesAvailable.metal = resources[0];
    planetResourcesAvailable.crystal = resources[1];
    planetResourcesAvailable.antimatter = resources[2];
    planetResourcesAvailable.save();

    planet.planetResourcesAvailable = planetResourcesAvailable.id;
    planet.save();
  }
}

export function handleTransfer(event: Transfer): void {
  // Do nothing for now
}
