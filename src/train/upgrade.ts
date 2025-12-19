import * as ex from "excalibur";

export const UpgradeTypeTrain = "train";
export const UpgradeTypePlayer = "player";
export const UpgradeTypeRoom = "room";

export class Upgrade extends ex.Actor {
  upgradeType: string;
  constructor(obj: any) {
    super(obj);
    this.upgradeType = obj.upgradeType;
  }
}
