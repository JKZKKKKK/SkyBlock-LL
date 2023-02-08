//LiteLoaderScript Dev Helper
/// <reference path="d:/Desktop\CONFIG/JS/HelperLib-master/src/index.d.ts"/> 


// const InitFig = require("./IntIsLand");

_Warp = {
    Save() {
        InitFig.ISWARP.set("LAND_WARP", InitFig.LAND_WARP);
    },
    Rounding(player, text, flag) {
        return {
            name: text,
            x: parseInt(player.pos.x),
            y: parseInt(player.pos.y),
            z: parseInt(player.pos.z),
            dimid: player.pos.dimid,
            flag: flag
        }
    },
    CreateData(xuid, _spawn, name) {
        InitFig.LAND_WARP[xuid] = {
            spawn: _spawn,
            name: name,
            teleport: []
        }
        this.Save()
    },
    SetData(xuid, key, value) {
        InitFig.LAND_WARP[xuid][key] = value
        this.Save()
    },
    GetData(xuid) {
        return InitFig.LAND_WARP[xuid]
    },
    RemoveData(xuid) {
        delete InitFig.LAND_WARP[xuid]
        this.Save()
    },
    CreateWarp(player, text, flag) {
        let data = this.GetData(player.xuid)["teleport"];
        data.push(this.Rounding(player, text, flag))
        this.SetData(player.xuid, "teleport", data)
    }
}

module.exports = _Warp