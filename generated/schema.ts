// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Player extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Player entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Player must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Player", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Player | null {
    return changetype<Player | null>(store.get_in_block("Player", id));
  }

  static load(id: string): Player | null {
    return changetype<Player | null>(store.get("Player", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get faction(): BigInt {
    let value = this.get("faction");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set faction(value: BigInt) {
    this.set("faction", Value.fromBigInt(value));
  }

  get planets(): PlanetLoader {
    return new PlanetLoader("Player", this.get("id")!.toString(), "planets");
  }

  get ships(): ShipLoader {
    return new ShipLoader("Player", this.get("id")!.toString(), "ships");
  }
}

export class Planet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Planet entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Planet must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Planet", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Planet | null {
    return changetype<Planet | null>(store.get_in_block("Planet", id));
  }

  static load(id: string): Planet | null {
    return changetype<Planet | null>(store.get("Planet", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get planetId(): i32 {
    let value = this.get("planetId");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set planetId(value: i32) {
    this.set("planetId", Value.fromI32(value));
  }

  get planetType(): BigInt {
    let value = this.get("planetType");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set planetType(value: BigInt) {
    this.set("planetType", Value.fromBigInt(value));
  }

  get planetResourcesUnmined(): string {
    let value = this.get("planetResourcesUnmined");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set planetResourcesUnmined(value: string) {
    this.set("planetResourcesUnmined", Value.fromString(value));
  }

  get planetResourcesAvailable(): string {
    let value = this.get("planetResourcesAvailable");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set planetResourcesAvailable(value: string) {
    this.set("planetResourcesAvailable", Value.fromString(value));
  }

  get owner(): string | null {
    let value = this.get("owner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set owner(value: string | null) {
    if (!value) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromString(<string>value));
    }
  }

  get pvpEnabled(): boolean {
    let value = this.get("pvpEnabled");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set pvpEnabled(value: boolean) {
    this.set("pvpEnabled", Value.fromBoolean(value));
  }

  get miningLastClaimed(): BigInt {
    let value = this.get("miningLastClaimed");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set miningLastClaimed(value: BigInt) {
    this.set("miningLastClaimed", Value.fromBigInt(value));
  }

  get buildings(): Array<BigInt> {
    let value = this.get("buildings");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigIntArray();
    }
  }

  set buildings(value: Array<BigInt>) {
    this.set("buildings", Value.fromBigIntArray(value));
  }

  get ships(): ShipLoader {
    return new ShipLoader("Planet", this.get("id")!.toString(), "ships");
  }
}

export class PlanetResource extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PlanetResource entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PlanetResource must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PlanetResource", id.toString(), this);
    }
  }

  static loadInBlock(id: string): PlanetResource | null {
    return changetype<PlanetResource | null>(
      store.get_in_block("PlanetResource", id)
    );
  }

  static load(id: string): PlanetResource | null {
    return changetype<PlanetResource | null>(store.get("PlanetResource", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get antimatter(): BigInt {
    let value = this.get("antimatter");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set antimatter(value: BigInt) {
    this.set("antimatter", Value.fromBigInt(value));
  }

  get metal(): BigInt {
    let value = this.get("metal");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set metal(value: BigInt) {
    this.set("metal", Value.fromBigInt(value));
  }

  get crystal(): BigInt {
    let value = this.get("crystal");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set crystal(value: BigInt) {
    this.set("crystal", Value.fromBigInt(value));
  }
}

export class PlanetResourceAvailable extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save PlanetResourceAvailable entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PlanetResourceAvailable must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PlanetResourceAvailable", id.toString(), this);
    }
  }

  static loadInBlock(id: string): PlanetResourceAvailable | null {
    return changetype<PlanetResourceAvailable | null>(
      store.get_in_block("PlanetResourceAvailable", id)
    );
  }

  static load(id: string): PlanetResourceAvailable | null {
    return changetype<PlanetResourceAvailable | null>(
      store.get("PlanetResourceAvailable", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get antimatter(): BigInt {
    let value = this.get("antimatter");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set antimatter(value: BigInt) {
    this.set("antimatter", Value.fromBigInt(value));
  }

  get metal(): BigInt {
    let value = this.get("metal");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set metal(value: BigInt) {
    this.set("metal", Value.fromBigInt(value));
  }

  get crystal(): BigInt {
    let value = this.get("crystal");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set crystal(value: BigInt) {
    this.set("crystal", Value.fromBigInt(value));
  }
}

export class Ship extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Ship entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Ship must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Ship", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Ship | null {
    return changetype<Ship | null>(store.get_in_block("Ship", id));
  }

  static load(id: string): Ship | null {
    return changetype<Ship | null>(store.get("Ship", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get shipType(): BigInt {
    let value = this.get("shipType");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set shipType(value: BigInt) {
    this.set("shipType", Value.fromBigInt(value));
  }

  get price(): Array<BigInt> {
    let value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigIntArray();
    }
  }

  set price(value: Array<BigInt>) {
    this.set("price", Value.fromBigIntArray(value));
  }

  get attack(): BigInt {
    let value = this.get("attack");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set attack(value: BigInt) {
    this.set("attack", Value.fromBigInt(value));
  }

  get attackTypes(): Array<BigInt> {
    let value = this.get("attackTypes");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigIntArray();
    }
  }

  set attackTypes(value: Array<BigInt>) {
    this.set("attackTypes", Value.fromBigIntArray(value));
  }

  get defenseTypes(): Array<BigInt> {
    let value = this.get("defenseTypes");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigIntArray();
    }
  }

  set defenseTypes(value: Array<BigInt>) {
    this.set("defenseTypes", Value.fromBigIntArray(value));
  }

  get health(): BigInt {
    let value = this.get("health");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set health(value: BigInt) {
    this.set("health", Value.fromBigInt(value));
  }

  get cargo(): BigInt {
    let value = this.get("cargo");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set cargo(value: BigInt) {
    this.set("cargo", Value.fromBigInt(value));
  }

  get craftTime(): BigInt {
    let value = this.get("craftTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set craftTime(value: BigInt) {
    this.set("craftTime", Value.fromBigInt(value));
  }

  get craftedFrom(): BigInt {
    let value = this.get("craftedFrom");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set craftedFrom(value: BigInt) {
    this.set("craftedFrom", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get moduleSlots(): BigInt {
    let value = this.get("moduleSlots");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set moduleSlots(value: BigInt) {
    this.set("moduleSlots", Value.fromBigInt(value));
  }

  get owner(): string {
    let value = this.get("owner");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get planet(): string {
    let value = this.get("planet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set planet(value: string) {
    this.set("planet", Value.fromString(value));
  }
}

export class Attack extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Attack entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Attack must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Attack", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Attack | null {
    return changetype<Attack | null>(store.get_in_block("Attack", id));
  }

  static load(id: string): Attack | null {
    return changetype<Attack | null>(store.get("Attack", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get attackerShips(): Array<BigInt> | null {
    let value = this.get("attackerShips");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set attackerShips(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("attackerShips");
    } else {
      this.set("attackerShips", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }

  get fromPlanet(): BigInt {
    let value = this.get("fromPlanet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fromPlanet(value: BigInt) {
    this.set("fromPlanet", Value.fromBigInt(value));
  }

  get toPlanet(): BigInt {
    let value = this.get("toPlanet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set toPlanet(value: BigInt) {
    this.set("toPlanet", Value.fromBigInt(value));
  }

  get attackerAddress(): string {
    let value = this.get("attackerAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set attackerAddress(value: string) {
    this.set("attackerAddress", Value.fromString(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get arrivalTime(): BigInt {
    let value = this.get("arrivalTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set arrivalTime(value: BigInt) {
    this.set("arrivalTime", Value.fromBigInt(value));
  }

  get resolved(): boolean {
    let value = this.get("resolved");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set resolved(value: boolean) {
    this.set("resolved", Value.fromBoolean(value));
  }
}

export class Terraforming extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Terraforming entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Terraforming must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Terraforming", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Terraforming | null {
    return changetype<Terraforming | null>(
      store.get_in_block("Terraforming", id)
    );
  }

  static load(id: string): Terraforming | null {
    return changetype<Terraforming | null>(store.get("Terraforming", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get attackerShips(): Array<BigInt> | null {
    let value = this.get("attackerShips");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set attackerShips(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("attackerShips");
    } else {
      this.set("attackerShips", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }

  get fromPlanet(): BigInt {
    let value = this.get("fromPlanet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fromPlanet(value: BigInt) {
    this.set("fromPlanet", Value.fromBigInt(value));
  }

  get toPlanet(): BigInt {
    let value = this.get("toPlanet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set toPlanet(value: BigInt) {
    this.set("toPlanet", Value.fromBigInt(value));
  }

  get senderAddress(): string {
    let value = this.get("senderAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set senderAddress(value: string) {
    this.set("senderAddress", Value.fromString(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get arrivalTime(): BigInt {
    let value = this.get("arrivalTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set arrivalTime(value: BigInt) {
    this.set("arrivalTime", Value.fromBigInt(value));
  }

  get resolved(): boolean {
    let value = this.get("resolved");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set resolved(value: boolean) {
    this.set("resolved", Value.fromBoolean(value));
  }
}

export class Outmining extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Outmining entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Outmining must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Outmining", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Outmining | null {
    return changetype<Outmining | null>(store.get_in_block("Outmining", id));
  }

  static load(id: string): Outmining | null {
    return changetype<Outmining | null>(store.get("Outmining", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get attackerShips(): Array<BigInt> | null {
    let value = this.get("attackerShips");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set attackerShips(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("attackerShips");
    } else {
      this.set("attackerShips", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }

  get fromPlanet(): BigInt {
    let value = this.get("fromPlanet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fromPlanet(value: BigInt) {
    this.set("fromPlanet", Value.fromBigInt(value));
  }

  get toPlanet(): BigInt {
    let value = this.get("toPlanet");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set toPlanet(value: BigInt) {
    this.set("toPlanet", Value.fromBigInt(value));
  }

  get senderAddress(): string {
    let value = this.get("senderAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set senderAddress(value: string) {
    this.set("senderAddress", Value.fromString(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get arrivalTime(): BigInt {
    let value = this.get("arrivalTime");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set arrivalTime(value: BigInt) {
    this.set("arrivalTime", Value.fromBigInt(value));
  }

  get resolved(): boolean {
    let value = this.get("resolved");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set resolved(value: boolean) {
    this.set("resolved", Value.fromBoolean(value));
  }
}

export class PlanetLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Planet[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Planet[]>(value);
  }
}

export class ShipLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Ship[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Ship[]>(value);
  }
}
