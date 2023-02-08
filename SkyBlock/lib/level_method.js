//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 



// const InitFig = require("./IntIsLand")


_Level = {
    // 保存
    Save() {
        InitFig.ISLEVEL.set("LAND_LEVEL", InitFig.LAND_LEVEL);
    },
    CreateLevel(player) {
        InitFig.LAND_LEVEL[player.xuid] = {
            name: player.name,
            level: 0,
            interval: 0
        }
        this.Save()
    },
    RemoveLevel(xuid) {
        delete InitFig.LAND_LEVEL[xuid]
        this.Save()
    },
    SetupLevel(xuid, key, value) {
        InitFig.LAND_LEVEL[xuid][key] = value;
        this.Save()
    },
    GetLevel(xuid) {
        return InitFig.LAND_LEVEL[xuid];
    }
}


module.exports = _Level;