//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 

// const InitFig = require("../IntIsLand")
// const CreateLand = require("../CreateLand")
// const PlayerData = require("../player")
// const Warp = require("../Warp")
// const Level = require("../level_method")


function ST(player, text, type) {
    player.tell("§b" + text + "", type);
}

let PL = {};
let PLD = {}
Invite = {

    Save() {
        InitFig.INVITED.set("INVITED", InitFig.INVITED_DATA)
    },

    invite(player, Invited) {
        if (!PL[player.xuid]) {
            if (mc.getPlayer(Invited)) {
                let pl = mc.getPlayer(Invited)
                ST(pl, `玩家: ${player.name} 向你發送了一個島嶼邀請 , 有效期30秒 , 接受/is invite accept 拒絕/is invite refuse §c接受邀請會刪除當前島嶼 , 請慎重考慮!`)

                PL[player.xuid] = pl.xuid;
                PLD[pl.xuid] = player.xuid;

                (function (player, Invited) {
                    setTimeout(() => {
                        if (PL[player]) {
                            delete PL[player]
                            delete PLD[Invited]
                            if (mc.getPlayer(player)) ST(mc.getPlayer(player), "邀请过期")
                        }
                    }, 30000);
                })(player.xuid, pl.xuid);


            }
        } else {
            ST(player, '§c請勿重複操作')
        }
    },

    accept(player) {
        if (PLD[player.xuid]) {
            if (CreateLand.GetLandData(PLD[player.xuid])["share"].length < InitFig.FIG.invite.max) {
                let newLnad = CreateLand.GetLandData(PLD[player.xuid])["share"]
                newLnad.push(player.xuid)
                CreateLand.SetupLandData(PLD[player.xuid], "share", newLnad)

                InitFig.INVITED_DATA[player.xuid] = {
                    master: PLD[player.xuid]
                }

                CreateLand.RemoveLandData(player.xuid)
                // 设置传送点
                Warp.SetData(player.xuid, "spawn", Warp.GetData(PLD[player.xuid])["spawn"])
                Warp.SetData(player.xuid, "teleport", [])


                let obj = Warp.GetData(PLD[player.xuid])["spawn"];
                player.teleport(obj.x, obj.y, obj.z, 0);


                delete PL[PLD[player.xuid]]
                delete PLD[player.xuid]

                this.Save();
            } else {
                ST(player, '§c島嶼人數已達上限')
            }
        } else {
            ST(player, '§c你沒有收到島嶼邀請')
        }
    },

    refuse(player) {
        if (PLD[player.xuid]) {
            delete PL[PLD[player.xuid]]
            delete PLD[player.xuid]

        } else {
            ST(player, '§c你沒有收到島嶼邀請')
        }
    },
    Remove(xuid) {
        delete InitFig.INVITED_DATA[xuid]

        this.Save();
    }
}

module.exports = Invite
