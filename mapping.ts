import {
  GENESIS,
  playerRegistered,
} from "./generated/DiamondContract/DiamondContract";
import {
  PlanetContract,
  Transfer,
} from "./generated/PlanetContract/PlanetContract"; // <-- Add this
import { DiamondContract } from "./generated/DiamondContract/DiamondContract"; // <-- Add this
import {
  Planet,
  PlanetResource,
  PlanetResourceAvailable,
  Player,
} from "./generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { log } from "@graphprotocol/graph-ts";

export function handlePlayerRegistered(
  event: playerRegistered
): void {
  let player = new Player(event.params.playerAddress.toHexString());
  player.address = event.params.playerAddress.toHexString();
  player.faction = event.params.faction;
  player.save();
  updatePlanets(event.address);
}

export function handleGenesis(event: GENESIS): void {
  updatePlanets(event.address);
}

export function handleTransfer(event: Transfer): void {
  let contractAddress = Address.fromString(
    "0x90e01831D96f8aaE0f9f4ec0fFb399aC789A4c97"
  );

  log.info("Actually updating transfer", []);
  updatePlanets(contractAddress);
}

function updatePlanets(contractAddress: Address): void {
  let planetContractAddress =
    "0x42ae07ee09001ABcE5372F75d0E12f9B31957149"; // Replace with the correct address

  let planetContract = PlanetContract.bind(
    Address.fromString(planetContractAddress)
  );
  let diamondContract = DiamondContract.bind(contractAddress);

  let planetsTotalSupply = planetContract.totalSupply();

  for (let i = 1; i < planetsTotalSupply.toI32(); i++) {
    let planetData = planetContract.planets(BigInt.fromI32(i));

    let owner = planetContract.ownerOf(BigInt.fromI32(i));

    let resources = [
      diamondContract.getPlanetResources(
        BigInt.fromI32(i),
        BigInt.fromI32(0)
      ),
      diamondContract.getPlanetResources(
        BigInt.fromI32(i),
        BigInt.fromI32(1)
      ),
      diamondContract.getPlanetResources(
        BigInt.fromI32(i),
        BigInt.fromI32(2)
      ),
    ];

    let planet = new Planet(i.toString());
    planet.planetId = i;

    planet.planetType = diamondContract.getPlanetType(
      BigInt.fromI32(i)
    );

    log.info("Updating planet type: {}", [
      diamondContract.getPlanetType(BigInt.fromI32(i)).toString(),
    ]);

    log.info("Actually saved planet type: {}", [
      planet.planetType.toString(),
    ]);

    let player = Player.load(owner.toHex());
    if (player !== null) {
      planet.owner = player.id; // assign the string ID
    }
    planet.pvpEnabled = planetData.getPvpEnabled();

    let planetResourcesUnmined = new PlanetResource(i.toString());
    planetResourcesUnmined.antimatter = planetData.getAntimatter();
    planetResourcesUnmined.metal = planetData.getMetal();
    planetResourcesUnmined.crystal = planetData.getCrystal();
    planetResourcesUnmined.save();

    planet.planetResourcesUnmined = planetResourcesUnmined.id;

    let planetResourcesAvailable = new PlanetResourceAvailable(
      i.toString()
    );
    planetResourcesAvailable.metal = resources[0];
    planetResourcesAvailable.crystal = resources[1];
    planetResourcesAvailable.antimatter = resources[2];
    planetResourcesAvailable.save();

    planet.planetResourcesAvailable = planetResourcesAvailable.id;
    planet.save();
  }
}
