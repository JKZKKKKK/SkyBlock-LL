//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 

ll.registerPlugin(
    "BE_Skyblock",
    "Be - Island plug-in",
    [2, 0, 6]
);



// 导入配置

const InitFig = require("./SkyBlock/lib/IntIsLand")

const CreateLand = require("./SkyBlock/lib/CreateLand")

const LandPos = require("./SkyBlock/lib/LandPos")

const permissions = require("./SkyBlock/lib/permissions")

const PlayerData = require("./SkyBlock/lib/player")

const Warp = require("./SkyBlock/lib/Warp")

const Language = require("./SkyBlock/lib/lang")

const Level = require("./SkyBlock/lib/level_method")

const Protect_Method = require("./SkyBlock/lib/method/Protect")


class Global_Data {

    constructor() {

        this.inIsLand = {}

    }

}

let Global = new Global_Data()



LLSE_Player.prototype.inIsLand = function () {
    return Global.inIsLand[this.xuid]
}


LLSE_Player.prototype.whetherLand = function () {
    return CreateLand.GetLandData(this.xuid) || InitFig.INVITED_DATA[this.xuid] ? true : false
}


class IsLandEventRegistration {


    constructor() {
        this.message = {}
    }

    listen(type, fn) {

        if (!this.message[type]) this.message[type] = []
        this.message[type].push(fn)

    }

    $off(type, fn) {

        if (!this.message[type]) return

        if (!fn) {
            return this.message[type] = undefined
        }

        this.message[type] = this.message[type].filter(item => item !== fn)

    }

    $emit(type, agrument) {

        if (!this.message[type]) return true

        let flag = true

        this.message[type].forEach(item => {

            if (item(...agrument) == false) flag = false

        })

        return flag

    }

}

let IsLandEvent = new IsLandEventRegistration()


function IsLandEventlisten(type, callback) {
    IsLandEvent.listen(type, ll.import(callback))
}




// 导出岛屿事件
ll.export(IsLandEventlisten, "TrendSkyEvent")

// 岛屿模板文件加载
let _file = File.getFilesList(".\\plugins\\SkyBlock\\structures");
let _file2 = File.getFilesList(".\\behavior_packs\\vanilla\\structures");

_file.forEach(item => {

    if (!_file2.includes(item)) {
        file.copy('.\\plugins\\SkyBlock\\structures\\' + item, '.\\behavior_packs\\vanilla\\structures');
        log(`[SkyBlock] 空島文件 {${item}} 加載成功 ... `);
    }

})



// 空岛扩展插件加载

let plugins = File.getFilesList(".\\plugins\\SkyBlock\\plugins")

colorLog("green", "正在加載空島擴展插件...")


const jsFilenames = plugins.filter(filename => filename.endsWith('.js'));

setTimeout(() => {

    let count = 0
    jsFilenames.forEach((item) => {
        require(`./SkyBlock/plugins/${item}`)
        colorLog("green", `${item} 加載成功`)
        count++
    })

    colorLog("green", `加載 ${count} 個擴展... `)

}, 100)


setInterval(() => {

    let Players = mc.getOnlinePlayers()
    if (!Players) return

    Players.forEach((item) => {

        let xuid = Protect_Method.ReturnID(InitFig.LAND_DATA, "range", item.pos)

        let tag = item.inIsLand()

        if (xuid) {

            if (tag) {

                if (!IsLandEvent.$emit("inLand", [item, xuid])) return

                let str = item.xuid == xuid ? `` : `你正在${CreateLand.GetLandData(xuid)["name"]}的島嶼`
                item.tell(str, 4)

                return false
            }

            Global.inIsLand[item.xuid] = xuid

            IsLandEvent.$emit("onEnter", [item, xuid])

        } else {

            if (!tag) return

            delete Global.inIsLand[item.xuid]

            IsLandEvent.$emit("onLeave", [item, tag])
        }


    })

}, 200)



function ST(player, text, type) {
    player.tell("§b[空島] §a" + text + "", type);
}


function Create(player, type) {
    CreateLand.CreateLandData(player, LandPos.Create());
    let newPos = CreateLand.GetLandData(player.xuid).range;
    let load = {
        x: parseInt((newPos.first[0] + newPos.last[0]) / 2),
        y: newPos.height + type.data.height,
        z: parseInt((newPos.first[1] + newPos.last[1]) / 2),
    }
    Warp.CreateData(player.xuid, load, player.name)
    PlayerData.CreateData(player.xuid)
    Level.CreateLevel(player)
    mc.runcmdEx(`structure load ${type.type} ${load.x - (parseInt(type.data.length / 2))} ${load.y - type.data.height} ${load.z - (parseInt(type.data.width / 2))}`);
    setTimeout(() => {
        player.teleport(load.x, load.y, load.z, 0);
    }, 1000);
}


function NewLand(player) {
    if (player.whetherLand()) {
        if (!IsLandEvent.$emit("onRunIs", [player])) return
        ST(player, "§a你已經有一個島嶼了")

    } else {
        let fm = mc.newCustomForm();
        let newfile = [];
        InitFig.FIG.file.forEach(key => {
            newfile.push(key.name)
        });
        fm.setTitle("空島");
        fm.addLabel('選擇你要創建的空島類型:');
        fm.addDropdown("選項:", newfile);
        player.sendForm(fm, (player, data) => {
            if (data != null) {
                ST(player, "§a正在為你創建島嶼");
                Create(player, InitFig.FIG.file[data[1]])
                ST(player, "§a创建成功 輸入/is 打開空島菜單");
            }
        })
    }
}






// 
mc.regPlayerCmd("is", "創建空島", (player) => {
    NewLand(player)
});



// 传送点

let Warp_Method = require("./SkyBlock/lib/method/warp")

mc.regPlayerCmd("is warp create", "新建島嶼傳送點", (player) => {
    Warp_Method.CreateWarp(player)
});
mc.regPlayerCmd("is warp remove", "刪除島嶼傳送點", (player) => {
    Warp_Method.RemoveWarp(player)
});
mc.regPlayerCmd("is warp set", "傳送點設置", (player) => {
    Warp_Method.SetupWarp(player)
});
mc.regPlayerCmd("is warp get", "獲取島嶼列表", (player) => {
    Warp_Method.GetWarp(player)
});
mc.regPlayerCmd("is warp list", "公開島嶼列表", (player) => {
    Warp_Method.GetWarpList(player)
});
mc.regPlayerCmd("is spawn", "設置島嶼返回點", (player) => {
    Warp_Method.SetSpawn(player)
});
mc.regPlayerCmd("is home", "返回島嶼", (player) => {
    Warp_Method.ReturnLand(player)
});

mc.listen("onRespawn", (player) => {

    setTimeout(() => {

        if (player.whetherLand()) Warp_Method.ReturnLand(player)

    }, 100);

})

// 等级

let Level_Method = require("./SkyBlock/lib/method/level")

mc.regPlayerCmd("is top", "	島嶼等級排行榜​", (player) => {
    Level_Method.GetTop(player)
});
mc.regPlayerCmd("is level", "計算島嶼等級", (player) => {
    Level_Method._Clac(player)
});
mc.regPlayerCmd("is value", "查看手持方塊價值​", (player) => {
    Level_Method.Query_Value(player)
});
mc.regPlayerCmd("is setvalue", "設置手持方塊價值​", (player) => {
    Level_Method.SetQuery(player)
}, 1);

// 岛屿等级计算
setInterval(() => {
    let playerList = mc.getOnlinePlayers();
    if (playerList.length > 0 && Object.keys(InitFig.LAND_LEVEL).length > 0) {
        playerList.forEach((player) => {
            if (player.whetherLand() && Level.GetLevel(player.xuid)["interval"]) {
                let l = Level.GetLevel(player.xuid)["interval"];
                Level.SetupLevel(player.xuid, "interval", l - 1)
            }
        })
    }
}, (60000));




mc.regPlayerCmd("is delete", "刪除島嶼", (player) => {
    if (CreateLand.GetLandData(player.xuid) == null && InitFig.INVITED_DATA[player.xuid] == null) {
        ST(player, "你還沒有島嶼!");
        return false
    }
    player.sendModalForm('刪除島嶼', "你確定刪除島嶼?", "確定", "取消", (player, result) => {
        if (result && PlayerData.GetData(player.xuid)["reset_limit"] >= 1) {
            if (CreateLand.GetLandData(player.xuid)) {
                CreateLand.RemoveLandData(player.xuid)
            } else {
                Invite_method.Remove(player.xuid)
            }
            PlayerData.SetData(player.xuid, "reset_limit", PlayerData.GetData(player.xuid)["reset_limit"] - 1)
            Warp.RemoveData(player.xuid)
            Level.RemoveLevel(player.xuid)
            player.teleport(InitFig.RESET.x, InitFig.RESET.y, InitFig.RESET.z, 0);
            ST(player, "已刪除你的島嶼");

        }
    })

}, 1);


// 构造一个模拟 Player 对象

function StructurePlayer(player, name, xuid) {
    return {
        name: name,
        xuid: xuid,
        player: player,
        pos: player.pos,
        sendForm(fm, callback) {
            this.player.sendForm(fm, callback)
        },
        tell(arguments) {
            this.player.tell(...arguments)
        }
    }

}



// 权限设置
let Permission_Method = require("./SkyBlock/lib/method/permissions")


mc.regPlayerCmd("is setworld", "設置世界權限", (player) => {

    let Prems = InitFig.LAND_WORLD
    let Prems_List = Object.keys(Prems)
    let fm = mc.newCustomForm()
    fm.setTitle("設置世界權限")
    fm.addLabel("世界權限控制:")

    Prems_List.forEach(key => fm.addSwitch(Language.data["permissions"][key], Prems[key]))

    player.sendForm(fm, (player, data) => {

        if (data == null) return

        let obj = {}

        Prems_List.forEach((key, index) => obj[key] = data[index + 1])

        // 能实现就行啦 反正已经在重构了
        InitFig.LAND_WORLD = obj

        InitFig.ISLAND.set("world", obj)

        player.tell("§b§l" + "權限設置成功" + "");

    })



}, 1);



mc.regPlayerCmd("is permission", "島嶼權限設置", (player) => {
    if (CreateLand.GetLandData(player.xuid)) {
        Permission_Method.Set_Permissions(player)
    } else {
        ST(player, "§c無權使用!")
    }
});

// 岛屿邀请
let Invite_method = require("./SkyBlock/lib/method/invite")

mc.regPlayerCmd("is invite", "發送島嶼邀請", (player, args) => {
    if (mc.getPlayer(args[0])) {
        Invite_method.invite(player, args[0])
    } else {
        ST(player, "§c請輸入正確玩家名,並確保被邀請玩家在線")
    }
});

mc.regPlayerCmd("is accept", "接受島嶼邀請", (player) => {
    Invite_method.accept(player)
});

mc.regPlayerCmd("is refuse", "拒絕島嶼邀請", (player) => {
    Invite_method.refuse(player)
});





log("==============================")
log("空島插件已在運行")
log("杯子老大好")
log("==============================")