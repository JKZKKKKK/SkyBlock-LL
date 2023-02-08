const InitFig = require("../IntIsLand")
const CreateLand = require("../CreateLand")


class IslandLevel_Method {

    StructureData(start, end, height) {

        let Pos = {
            start: mc.newIntPos(start[0], height, start[1], 0),
            end: mc.newIntPos(end[0], height, end[1], 0)
        },
            Data = JSON.parse(mc.getStructure(Pos.start, Pos.end, false, false).toString()),
            Indices = Data["structure"]["block_indices"][0],
            Palette = Data["structure"]["palette"]["default"]["block_palette"],
            Block = InitFig.BL_VALUE,
            Level = 0

        Indices.forEach(key => {

            if (Block.hasOwnProperty(Palette[key]["name"])) Level += Block[Palette[key]["name"]]

        })

        return Level
    }

}



let IslandLevel = new IslandLevel_Method()

// 计算
let CacheLevel = {};

function Clac_Level(player) {
    if (CacheLevel[player.xuid] == null) {
        CacheLevel[player.xuid] = true
        ST(player, "正在计算岛屿等级...", 0);

        let data = CreateLand.GetLandData(player.xuid) ? CreateLand.GetLandData(player.xuid)["range"] : CreateLand.GetLandData(InitFig.INVITED_DATA[player.xuid]["master"])["range"],
            Start = data["first"],
            End = data["last"],
            Level = 0

        for (let k = 0; k <= 384; k++) {
            (() => {
                setTimeout(() => {
                    Level += IslandLevel.StructureData(Start, End, k - 64)
                    if (k == 384) {

                        let leves = parseInt(Level / 100);

                        _Level.SetupLevel(player.xuid, "level", leves)
                        _Level.SetupLevel(player.xuid, "interval", InitFig.FIG["level"]["interval"])
                        ST(player, `计算完成 你的岛屿等级为: ${leves}`, 0);
                        delete CacheLevel[player.xuid];

                    }

                }, k * (InitFig.MARK.protection_range / 5));

            })(k, player);
        }

    } else {
        ST(player, "岛屿等级计算中... 请勿重复操作!", 0);
    }
}

function getPlayerLevel() {
    let newobj = {};
    let keysSorted = Object.keys(InitFig.LAND_LEVEL).sort(function (a, b) {
        return InitFig.LAND_LEVEL[b].level - InitFig.LAND_LEVEL[a].level;
    });
    keysSorted.forEach(key => newobj[key] = InitFig.LAND_LEVEL[key]);
    return newobj;
}

Level_method = {
    _Clac(player) {
        if (_Level.GetLevel(player.xuid)["interval"] > 0) {
            ST(player, `查询频繁 , 请 ${_Level.GetLevel(player.xuid)["interval"]} 分钟后再试`)
        } else {
            Clac_Level(player)
        }
    },
    Query_Value(player) {
        if (InitFig.BL_VALUE[player.getHand().type] > 0) {
            ST(player, `当前方块的价值为 §c${InitFig.BL_VALUE[player.getHand().type]}`, 0);
        } else {
            ST(player, `一文不值`, 0);
        }
    },
    SetQuery(player) {
        let fm = mc.newCustomForm();
        fm.setTitle("设置方块价值");
        fm.addInput("输入数字");
        player.sendForm(fm, (player, data) => {
            if (data != null) {
                if (parseInt(data[0]) > 0) {
                    ST(player, `设置成功`, 0);
                    InitFig.BL_VALUE[player.getHand().type] = parseInt(data[0])
                    InitFig.BLDATA.set("BL_VALUE", InitFig.BL_VALUE);
                }
            }
        })
    },
    GetTop(player) {
        let obj = getPlayerLevel();
        let fm = mc.newSimpleForm();
        let content = "";
        fm.setTitle("§l§c岛屿等级排行榜")
        Object.keys(obj).forEach((key, index) => {
            content += `§l${index + 1} • §l§c${obj[key]["name"]}§l§r : §l§a${obj[key].level}§l§r\n\n`;
        });
        fm.setContent(content);
        player.sendForm(fm, (player, id) => { });
    }
}


module.exports = Level_method;