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
                ST(pl, `玩家: ${player.name} 向你发送了一个岛屿邀请 , 有效期30秒 , 接受/is invite accept 拒绝/is invite refuse §c接受邀请会删除当前岛屿 , 请慎重考虑!`)

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
            ST(player, '§c请勿重复操作')
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
                ST(player, '§c岛屿人数已达上限')
            }
        } else {
            ST(player, '§c你没有收到岛屿邀请')
        }
    },

    refuse(player) {
        if (PLD[player.xuid]) {
            delete PL[PLD[player.xuid]]
            delete PLD[player.xuid]

        } else {
            ST(player, '§c你没有收到岛屿邀请')
        }
    },
    Remove(xuid) {
        delete InitFig.INVITED_DATA[xuid]

        this.Save();
    }
}

module.exports = Invite