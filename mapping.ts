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
import { BigInt } from "@graphprotocol/graph-ts";

export function handleGenesis(event: GENESIS): void {
  let planetContract = PlanetContract.bind(event.address);
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

    for (let j = 0; j < resources.length; j++) {
      let planetResourceAvailable = new PlanetResourceAvailable(
        (i + 1).toString() + "-" + j.toString()
      );
      planetResourceAvailable.planet = planet.id;
      planetResourceAvailable.type = [
        "antimatter",
        "metal",
        "crystal",
      ][j];
      planetResourceAvailable.amount = resources[j];
      planetResourceAvailable.save();

      planet.planetResourcesAvailable =
        planet.planetResourcesAvailable.concat([
          planetResourceAvailable.id,
        ]);
    }

    planet.save();
  }
}

export function handleTransfer(event: Transfer): void {
  // Do nothing for now
}
