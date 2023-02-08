//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 


// const InitFig = require("./IntIsLand")

_PlayerData = {
    Save() {
        InitFig.ISPLAYER.set("LAND_PLAYER", InitFig.LAND_PLAYER);
    },
    CreateData(xuid) {
        InitFig.LAND_PLAYER[xuid] = {
            reset_limit: InitFig.FIG.reset.reset_limit
        }
        this.Save()
    },
    SetData(xuid, key, value) {
        InitFig.LAND_PLAYER[xuid][key] = value
        this.Save()
    },
    GetData(xuid) {
        return InitFig.LAND_PLAYER[xuid]
    },
    RemoveData(xuid) {
        delete InitFig.LAND_PLAYER[xuid]
        this.Save()
    }
}

module.exports = _PlayerData