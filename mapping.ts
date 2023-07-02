import {
  AttackSent,
  GENESIS,
  attackLost,
  planetConquered,
  playerRegistered,
  SendTerraformer,
  StartOutMining,
  resolvedTerraforming,
  resolvedOutmining,
  buildingsFinishedCrafting,
  buildingsStartedCrafting,
  shipsFinishedCrafting,
  shipsStartedCrafting,
  allianceCreated,
  joinedAlliance,
  changedAllianceOwner,
  leavingAlliance,
  invitedToAlliance,
  miningConcluded,
} from "./generated/DiamondContract/DiamondContract";
import {
  PlanetContract,
  Transfer,
} from "./generated/PlanetContract/PlanetContract"; // <-- Add this
import { DiamondContract } from "./generated/DiamondContract/DiamondContract"; // <-- Add this
import {
  Alliance,
  Attack,
  CraftBuilding,
  CraftShip,
  Invitation,
  Outmining,
  Planet,
  PlanetResource,
  PlanetResourceAvailable,
  Player,
  Terraforming,
} from "./generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { log } from "@graphprotocol/graph-ts";

import {
  ShipContract,
  Transfer as ShipTransfer,
} from "./generated/ShipContract/ShipContract";
import { Ship } from "./generated/schema";

const DIAMOND_CONTRACT_ADDRESS: string =
  "0xFf3D0Eb942a847966fc63942E6dc954c98D321De";

const PLANET_CONTRACT_ADDRESS: string =
  "0x251f9F3E74a8c7d52a5AE221A5Ec9047f96bA513";

export function handlePlayerRegistered(
  event: playerRegistered
): void {
  let player = new Player(event.params.playerAddress.toHexString());
  player.address = event.params.playerAddress.toHexString();
  player.faction = event.params.faction;
  player.save();
  //updatePlanets(event.address); //@notice, not necessary, since the NFT transfer already triggers it automatically (double work)
}

export function handleGenesis(event: GENESIS): void {
  updatePlanets(event.address);
}

export function handleTransfer(event: Transfer): void {
  let contractAddress = Address.fromString(DIAMOND_CONTRACT_ADDRESS);

  log.info("Actually updating transfer", []);
  updatePlanet(event);
}

function updatePlanet(event: Transfer): void {
  let planetId = event.params.tokenId.toI32();
  let diamondContract = DiamondContract.bind(
    Address.fromString(DIAMOND_CONTRACT_ADDRESS)
  );
  let planetContract = PlanetContract.bind(
    Address.fromString(PLANET_CONTRACT_ADDRESS)
  );

  let owner = planetContract.ownerOf(BigInt.fromI32(planetId));

  let resources: BigInt[] = [];
  for (let i = 0; i < 3; i++) {
    resources.push(
      diamondContract.getPlanetResources(
        BigInt.fromI32(planetId),
        BigInt.fromI32(i)
      )
    );
  }

  let planet = Planet.load(planetId.toString());
  if (planet == null) {
    log.error("Planet not found!", []);
    return;
  }

  planet.pvpEnabled = planetContract
    .planets(BigInt.fromI32(planetId))
    .getPvpEnabled();
  planet.miningLastClaimed = diamondContract.getLastClaimed(
    BigInt.fromI32(planetId)
  );
  planet.buildings = diamondContract.getAllBuildings(
    BigInt.fromI32(planetId)
  );

  let planetData = planetContract.planets(BigInt.fromI32(planetId));

  let planetResourcesUnmined = new PlanetResource(
    planetId.toString()
  );
  planetResourcesUnmined.antimatter = planetData.getAntimatter();
  planetResourcesUnmined.metal = planetData.getMetal();
  planetResourcesUnmined.crystal = planetData.getCrystal();
  planetResourcesUnmined.save();
  planet.planetResourcesUnmined = planetResourcesUnmined.id;

  let planetResourcesAvailable = new PlanetResourceAvailable(
    planetId.toString()
  );
  planetResourcesAvailable.metal = resources[0];
  planetResourcesAvailable.crystal = resources[1];
  planetResourcesAvailable.antimatter = resources[2];
  planetResourcesAvailable.save();
  planet.planetResourcesAvailable = planetResourcesAvailable.id;

  let player = Player.load(owner.toHex());
  planet.owner = player ? player.id : null;

  planet.save();
}

function updatePlanetById(ID: BigInt): void {
  let planetId = ID.toI32();
  let diamondContract = DiamondContract.bind(
    Address.fromString(DIAMOND_CONTRACT_ADDRESS)
  );
  let planetContract = PlanetContract.bind(
    Address.fromString(PLANET_CONTRACT_ADDRESS)
  );

  let owner = planetContract.ownerOf(BigInt.fromI32(planetId));

  let resources: BigInt[] = [];
  for (let i = 0; i < 3; i++) {
    resources.push(
      diamondContract.getPlanetResources(
        BigInt.fromI32(planetId),
        BigInt.fromI32(i)
      )
    );
  }

  let planet = Planet.load(planetId.toString());
  if (planet == null) {
    log.error("Planet not found!", []);
    return;
  }

  planet.pvpEnabled = planetContract
    .planets(BigInt.fromI32(planetId))
    .getPvpEnabled();
  planet.miningLastClaimed = diamondContract.getLastClaimed(
    BigInt.fromI32(planetId)
  );
  planet.buildings = diamondContract.getAllBuildings(
    BigInt.fromI32(planetId)
  );

  let planetData = planetContract.planets(BigInt.fromI32(planetId));

  let planetResourcesUnmined = new PlanetResource(
    planetId.toString()
  );
  planetResourcesUnmined.antimatter = planetData.getAntimatter();
  planetResourcesUnmined.metal = planetData.getMetal();
  planetResourcesUnmined.crystal = planetData.getCrystal();
  planetResourcesUnmined.save();
  planet.planetResourcesUnmined = planetResourcesUnmined.id;

  let planetResourcesAvailable = new PlanetResourceAvailable(
    planetId.toString()
  );
  planetResourcesAvailable.metal = resources[0];
  planetResourcesAvailable.crystal = resources[1];
  planetResourcesAvailable.antimatter = resources[2];
  planetResourcesAvailable.save();
  planet.planetResourcesAvailable = planetResourcesAvailable.id;

  let player = Player.load(owner.toHex());
  planet.owner = player ? player.id : null;

  planet.save();
}

function updatePlanets(contractAddress: Address): void {
  let planetContract = PlanetContract.bind(
    Address.fromString(PLANET_CONTRACT_ADDRESS)
  );
  let diamondContract = DiamondContract.bind(
    Address.fromString(DIAMOND_CONTRACT_ADDRESS)
  );

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
    planet.miningLastClaimed = diamondContract.getLastClaimed(
      BigInt.fromI32(i)
    );

    let buildingsData = diamondContract.getAllBuildings(
      BigInt.fromI32(i)
    );
    let buildings = new Array<BigInt>(buildingsData.length);
    for (let j = 0; j < buildingsData.length; j++) {
      buildings[j] = buildingsData[j];
    }
    planet.buildings = buildings;

    planet.save();
  }
}

export function handleAttackSent(event: AttackSent): void {
  let contract = DiamondContract.bind(event.address);
  let attackStatus = contract.getAttackStatus(event.params.id);

  let attackerShips = attackStatus.attackerShipsIds as BigInt[];

  // Iterate over each ship ID and update the planet
  for (let i = 0; i < attackerShips.length; i++) {
    let ship = Ship.load(attackerShips[i].toString());
    if (ship != null) {
      // Check if the ship exists
      ship.planet = null; // Set planet to null as the ship is in transit
      ship.save();
    }
  }

  let attack = new Attack(event.params.id.toString());
  attack.attackerShips = attackerShips;
  attack.fromPlanet = attackStatus.fromPlanet;
  attack.toPlanet = attackStatus.toPlanet;
  attack.attackerAddress = attackStatus.attacker.toHexString();
  attack.startTime = event.block.timestamp;
  attack.arrivalTime = attackStatus.timeToBeResolved;
  attack.resolved = false;

  attack.save();
}

export function handleSendTerraformer(event: SendTerraformer): void {
  let contract = DiamondContract.bind(event.address);

  let terraformInstance = contract.showTerraformingInstance(
    event.params.instanceId
  );

  let attackerShips = terraformInstance.shipsIds as BigInt[];

  // Iterate over each ship ID and update the planet
  for (let i = 0; i < attackerShips.length; i++) {
    let ship = Ship.load(attackerShips[i].toString());
    if (ship != null) {
      // Check if the ship exists
      ship.planet = null; // Set planet to null as the ship is in transit
      ship.save();
    }
  }

  let terraforming = new Terraforming(
    event.params.instanceId.toString()
  );
  terraforming.attackerShips = attackerShips;
  terraforming.fromPlanet = terraformInstance.fromPlanetId;
  terraforming.toPlanet = event.params.toPlanet;
  terraforming.startTime = terraformInstance.timestamp;
  terraforming.arrivalTime = event.params.arrivalTime;
  terraforming.resolved = false;

  let firstShip = Ship.load(terraformInstance.shipsIds[0].toHex());
  if (firstShip != null) {
    terraforming.senderAddress = firstShip.owner;
  }

  terraforming.save();
}

export function handleStartOutMining(event: StartOutMining): void {
  let contract = DiamondContract.bind(event.address);

  let outminingInstance = contract.showOutminingInstance(
    event.params.id
  );

  let attackerShips = outminingInstance.shipsIds as BigInt[];

  // Iterate over each ship ID and update the planet
  for (let i = 0; i < attackerShips.length; i++) {
    let ship = Ship.load(attackerShips[i].toString());
    if (ship != null) {
      // Check if the ship exists
      ship.planet = null; // Set planet to null as the ship is in transit
      ship.save();
    }
  }

  let outmining = new Outmining(event.params.id.toString());
  outmining.attackerShips = attackerShips;
  outmining.fromPlanet = outminingInstance.fromPlanetId;
  outmining.toPlanet = outminingInstance.toPlanetId;
  outmining.senderAddress = event.params.sender.toHexString();
  outmining.startTime = outminingInstance.timestamp;
  outmining.arrivalTime = outminingInstance.arrivalTime;
  outmining.resolved = false;

  outmining.save();
}

export function handlePlanetConquered(event: planetConquered): void {
  let attack = Attack.load(event.params.id.toString());
  if (attack != null) {
    attack.resolved = true;
    attack.save();
  }
}

export function handleAttackLost(event: attackLost): void {
  let attack = Attack.load(event.params.id.toString());

  if (attack != null) {
    updatePlanetById(attack.toPlanet);
    attack.resolved = true;
    attack.save();
  }
}

export function handleResolvedOutmining(
  event: resolvedOutmining
): void {
  let outminingId = event.params.id.toString();
  let outmining = Outmining.load(outminingId);

  if (outmining != null) {
    updatePlanetById(outmining.fromPlanet);
    outmining.resolved = true;
    outmining.save();
  }
}

export function handleResolvedTerraforming(
  event: resolvedTerraforming
): void {
  let terraformingId = event.params.id.toString();
  let terraforming = Terraforming.load(terraformingId);

  if (terraforming != null) {
    terraforming.resolved = true;
    terraforming.save();
  }
}

export function handleShipTransfer(event: ShipTransfer): void {
  let contractAddress = Address.fromString(DIAMOND_CONTRACT_ADDRESS);

  let diamondContract = DiamondContract.bind(contractAddress);

  let shipData = diamondContract.getShipTypeStats(
    event.params.tokenId
  );

  let ship = new Ship(event.params.tokenId.toHexString());

  ship.shipType = shipData.shipType;
  ship.price = shipData.price as Array<BigInt>;
  ship.attack = shipData.attack;
  ship.attackTypes = shipData.attackTypes as Array<BigInt>;
  ship.defenseTypes = shipData.defenseTypes as Array<BigInt>;
  ship.health = shipData.health;
  ship.cargo = shipData.cargo;
  ship.craftTime = shipData.craftTime;
  ship.craftedFrom = shipData.craftedFrom;
  ship.name = shipData.name;
  ship.moduleSlots = shipData.moduleSlots;

  let player = Player.load(event.params.to.toHexString());
  if (player === null) {
    player = new Player(event.params.to.toHexString());
    player.address = event.params.to.toHexString();
    // Assuming faction to be zero if player is not already registered
    player.faction = BigInt.fromI32(0);
    player.save();
  }

  ship.owner = player.id;

  // We need to identify which Planet the Ship is associated with and assign it to ship.planet
  // @TODO new view function to check s.assignedPlanet[shipId];
  let planetId = diamondContract.checkShipAssignedPlanet(
    event.params.tokenId
  );
  let planet = Planet.load(planetId.toString());
  if (planet !== null) {
    ship.planet = planet.id;
  }

  ship.save();
}

export function handleBuildingsStartedCrafting(
  event: buildingsStartedCrafting
): void {
  let contract = DiamondContract.bind(event.address);
  let craftItem = contract.getCraftBuildings(event.params.planetId);

  let craftBuilding = new CraftBuilding(
    event.params.planetId.toString()
  );
  craftBuilding.amount = craftItem.amount;
  craftBuilding.planetId = event.params.planetId.toI32();
  craftBuilding.itemId = craftItem.itemId;
  craftBuilding.readyTimestamp = craftItem.readyTimestamp;
  craftBuilding.startTimestamp = craftItem.startTimestamp;
  craftBuilding.unclaimedAmount = craftItem.unclaimedAmount;
  craftBuilding.craftTimeItem = craftItem.craftTimeItem;
  craftBuilding.isActive = true;

  craftBuilding.save();

  let planet = Planet.load(event.params.planetId.toString());
  if (planet != null) {
    planet.craftingBuilding = craftBuilding.id;
    planet.save();
  }
}

export function handleBuildingsFinishedCrafting(
  event: buildingsFinishedCrafting
): void {
  let planet = Planet.load(event.params.planetId.toI32().toString());
  if (planet != null) {
    let craftBuildingId = planet.craftingBuilding;
    if (craftBuildingId != null) {
      let craftBuilding = CraftBuilding.load(
        craftBuildingId as string
      );
      if (craftBuilding != null) {
        craftBuilding.isActive = false;
        craftBuilding.save();
      }

      // Add finished building to the list of buildings on the planet
      let buildings = planet.buildings;
      buildings.push(craftBuilding!.itemId);
      planet.buildings = buildings;
    }
    planet.craftingBuilding = null;
    planet.save();
  }
}

export function handleShipsStartedCrafting(
  event: shipsStartedCrafting
): void {
  let contract = DiamondContract.bind(event.address);
  let craftItem = contract.getCraftFleets(event.params.planetId);

  let craftShip = new CraftShip(event.params.planetId.toString());
  craftShip.amount = craftItem.amount;
  craftShip.planetId = event.params.planetId.toI32();
  craftShip.itemId = craftItem.itemId;
  craftShip.readyTimestamp = craftItem.readyTimestamp;
  craftShip.startTimestamp = craftItem.startTimestamp;
  craftShip.unclaimedAmount = craftItem.unclaimedAmount;
  craftShip.craftTimeItem = craftItem.craftTimeItem;
  craftShip.isActive = true;

  craftShip.save();

  let planet = Planet.load(event.params.planetId.toString());
  if (planet != null) {
    planet.craftingShip = craftShip.id;
    planet.save();
  }
}

export function handleShipsFinishedCrafting(
  event: shipsFinishedCrafting
): void {
  let planet = Planet.load(event.params.planetId.toI32().toString());
  if (planet != null) {
    let craftShipId = planet.craftingShip;
    if (craftShipId != null) {
      let craftShip = CraftShip.load(craftShipId as string);
      if (craftShip != null) {
        craftShip.isActive = false;
        craftShip.save();
      }
    }
    planet.craftingShip = null;
    planet.save();
  }
}
export function handleAllianceCreated(event: allianceCreated): void {
  let alliance = new Alliance(event.params.allianceName.toString());
  alliance.name = event.params.allianceName.toString();
  alliance.leaderAddress = event.params.allianceCreator.toHexString();
  alliance.memberCount = 1; // Initially the creator is the only member

  alliance.save();

  let player = Player.load(alliance.leaderAddress);
  if (player != null) {
    player.alliance = alliance.id;
    player.save();
  } else {
    log.error("Player {} not found", [alliance.leaderAddress]);
  }
}

export function handleJoinedAlliance(event: joinedAlliance): void {
  let player = Player.load(event.params.playerAddress.toHexString());
  let alliance = Alliance.load(event.params.allianceName.toString());

  if (player != null && alliance != null) {
    player.alliance = alliance.id;
    player.save();

    alliance.memberCount += 1;
    alliance.save();
  } else {
    log.error("Player or Alliance not found", []);
  }
}

export function handleLeavingAlliance(event: leavingAlliance): void {
  let player = Player.load(event.params.playerAddress.toHexString());
  let alliance = Alliance.load(event.params.allianceName.toString());

  if (player != null && alliance != null) {
    player.alliance = null;
    player.save();

    alliance.memberCount -= 1;
    alliance.save();
  } else {
    log.error("Player or Alliance not found", []);
  }
}

export function handleChangedAllianceOwner(
  event: changedAllianceOwner
): void {
  let alliance = Alliance.load(event.params.allianceName.toString());

  if (alliance != null) {
    alliance.leaderAddress = event.params.newOwner.toHexString();
    alliance.save();
  } else {
    log.error("Alliance not found", []);
  }
}

export function handleInvitedToAlliance(
  event: invitedToAlliance
): void {
  // Convert allianceName from bytes32 to string
  let allianceName = event.params.allianceName.toString();

  // Find alliance by name (assuming it's unique)
  let alliance = Alliance.load(allianceName);
  if (alliance == null) {
    log.error("Alliance not found", [allianceName]);
    return;
  }

  // Load player by address
  let playerAddress = event.params.playerAddress.toHexString();
  let player = Player.load(playerAddress);
  if (player == null) {
    log.error("Player not found", [playerAddress]);
    return;
  }

  // Create new Invitation
  let invitationId = event.transaction.hash.toHex();
  let invitation = new Invitation(invitationId);
  invitation.invitee = player.id;
  invitation.alliance = alliance.id;
  invitation.timestamp = event.params.timestamp;
  invitation.save();
}

function updateMinedPlanet(event: miningConcluded): void {
  let planetId = event.params.planetId.toI32();
  let diamondContract = DiamondContract.bind(
    Address.fromString(DIAMOND_CONTRACT_ADDRESS)
  );
  let planetContract = PlanetContract.bind(
    Address.fromString(PLANET_CONTRACT_ADDRESS)
  );

  let owner = planetContract.ownerOf(BigInt.fromI32(planetId));

  let resources: BigInt[] = [];
  for (let i = 0; i < 3; i++) {
    resources.push(
      diamondContract.getPlanetResources(
        BigInt.fromI32(planetId),
        BigInt.fromI32(i)
      )
    );
  }

  let planet = Planet.load(planetId.toString());
  if (planet == null) {
    log.error("Planet not found! At Event miningConcluded", []);
    return;
  }
  let planetData = planetContract.planets(BigInt.fromI32(planetId));

  let planetResourcesUnmined = new PlanetResource(
    planetId.toString()
  );
  planetResourcesUnmined.antimatter = planetData.getAntimatter();
  planetResourcesUnmined.metal = planetData.getMetal();
  planetResourcesUnmined.crystal = planetData.getCrystal();
  planetResourcesUnmined.save();
  planet.planetResourcesUnmined = planetResourcesUnmined.id;

  let planetResourcesAvailable = new PlanetResourceAvailable(
    planetId.toString()
  );
  planetResourcesAvailable.metal = resources[0];
  planetResourcesAvailable.crystal = resources[1];
  planetResourcesAvailable.antimatter = resources[2];
  planetResourcesAvailable.save();
  planet.planetResourcesAvailable = planetResourcesAvailable.id;

  let player = Player.load(owner.toHex());
  planet.owner = player ? player.id : null;

  planet.save();
}
