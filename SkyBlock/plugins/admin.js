
const ADMIN = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\admin.json', '{}');


const Language = require("../lib/lang")

let ADMIN_DATA = ADMIN.init("data", [])

function Create_Admin(player, type, TruePlayer) {
    CreateLand.CreateLandData(player, LandPos.Create());
    let newPos = CreateLand.GetLandData(player.xuid).range;
    let load = {
        x: parseInt((newPos.first[0] + newPos.last[0]) / 2),
        y: newPos.height + type.data.height,
        z: parseInt((newPos.first[1] + newPos.last[1]) / 2),
    }
    Warp.CreateData(player.xuid, load, player.name)
    mc.runcmdEx(`structure load ${type.type} ${load.x - (parseInt(type.data.length / 2))} ${load.y - type.data.height} ${load.z - (parseInt(type.data.width / 2))}`);
    setTimeout(() => {
        TruePlayer.teleport(load.x, load.y, load.z, 0);
    }, 1000);
}


class Manage_Methods {

    Primary(player) {
        let fm = mc.newSimpleForm();
        fm.setTitle("岛屿管理");
        fm.addButton("管理玩家岛屿")
        fm.addButton("创建自定义岛屿")
        fm.addButton("管理自定义岛屿")
        player.sendForm(fm, (player, data) => {
            if (data == null) return false
            switch (data) {
                case 0:
                    this.Secondary_1(player)
                    break;
                case 1:
                    this.Secondary_2(player)
                    break;
                case 2:
                    this.Secondary_3(player)
                    break;
                default:
                    break;
            }
        })
    }

    Secondary_1(player) {

        let fm1 = mc.newSimpleForm().setTitle("岛屿管理")

        let arr = Object.keys(InitFig.LAND_DATA);

        arr.forEach(key => fm1.addButton(InitFig.LAND_DATA[key]["name"]))

        player.sendForm(fm1, (player, data) => {
            if (data == null) return this.Primary(player)
            this.Secondary_1_1(player, arr[data])
        })
    }

    Secondary_1_1(player, xuid) {

        let fm1 = mc.newSimpleForm().setTitle("岛屿管理")

        fm1.addButton("传送到玩家岛屿")

        fm1.addButton("删除岛屿")
        fm1.addButton("扩建岛屿")

        player.sendForm(fm1, (player, id) => {

            if (id == null) return this.Secondary_1(player)

            switch (id) {

                case 0:

                    let pos = InitFig.LAND_WARP[xuid]["spawn"]
                    player.teleport(pos.x, pos.y, pos.z, 0)

                    break;
                case 1:

                    player.sendModalForm('删除岛屿', "你确定删除该岛屿?", "确定", "取消", (player, result) => {

                        // 点击取消则返回上一级菜单

                        if (!result) return this.Secondary_1_1(player, xuid)

                        // (删除自己的岛屿 , 或是退出加入的岛屿)

                        CreateLand.GetLandData(xuid) ? CreateLand.RemoveLandData(xuid) : Invite_method.Remove(xuid)

                        // 删除传送点数据
                        Warp.RemoveData(xuid)

                        // 删除等级数据 
                        Level.RemoveLevel(xuid)

                        // 传送至初始位置
                        player.teleport(InitFig.RESET.x, InitFig.RESET.y, InitFig.RESET.z, 0)

                        ST(player, "删除成功")

                    })

                    break;

                case 2:

                    let fm = mc.newCustomForm().setTitle("岛屿管理");

                    fm.addInput("输入要扩建的范围 ");

                    player.sendForm(fm, (player, data) => {

                        if (data == null) return this.Secondary_1_1(player, xuid)


                        if (data[0] == '' || isNaN(data[0])) return ST(player, "请输入正确的数字!")

                        let Range = [CreateLand.GetLandData(xuid)["range"]["first"], CreateLand.GetLandData(xuid)["range"]["last"]]

                        let Num = parseInt(data[0])

                        Range[0] = Range[0].map((i) => i <= 0 ? i - Num : i + Num)

                        Range[1] = Range[1].map((i) => i <= 0 ? i - Num : i + Num)

                        CreateLand.SetupLandData(xuid, "range", {
                            first: Range[0],
                            last: Range[1]
                        })

                        // let NewRange = 

                    })

                    break;

                default:
                    log(typeof id);
            }
        })
    }



    Secondary_2(player) {
        let fm = mc.newCustomForm();
        fm.setTitle("岛屿管理");
        fm.addInput("请输入岛屿名");
        player.sendForm(fm, (player, key) => {
            if (key == null) return this.Primary(player)

            let fm = mc.newCustomForm();
            let newfile = [];
            InitFig.FIG.file.forEach(key => {
                newfile.push(key.name)
            });
            fm.setTitle("空岛");
            fm.addLabel('选择你要创建的空岛类型:');
            fm.addDropdown("选项:", newfile);
            player.sendForm(fm, (player, data) => {
                if (data != null) {
                    ST(player, "§a正在创建岛屿");
                    let xuid = system.randomGuid()
                    ADMIN_DATA.push(xuid)
                    ADMIN.set("data", ADMIN_DATA)
                    Create_Admin({
                        name: key[0],
                        xuid: xuid
                    }, InitFig.FIG.file[data[1]], player)

                    ST(player, "§a创建成功 输入/is 打开空岛菜单");
                }
            })

        });
    }


    Secondary_3(player) {
        let fm1 = mc.newSimpleForm();
        fm1.setTitle("岛屿管理");
        ADMIN_DATA.forEach(key => {
            fm1.addButton(InitFig.LAND_DATA[key]["name"])
        });
        player.sendForm(fm1, (player, data) => {
            if (data == null) return this.Primary(player)

            let obj = Warp.GetData(ADMIN_DATA[data])["spawn"];
            player.teleport(obj.x, obj.y, obj.z, 0);
            ST(player, `输入 /is manage set 设置自定义岛屿权限`)

        })
    }


    AdminSetup(player) {
        let xuid = player.inIsLand()
        let fm1 = mc.newSimpleForm();
        fm1.setTitle("岛屿管理");
        fm1.addButton("权限设置");
        fm1.addButton("创建传送点");
        fm1.addButton("删除岛屿传送点");
        player.sendForm(fm1, (player, id) => {
            if (id == null) return false
            switch (id) {
                case 0:
                    let Prems = CreateLand.GetLandData(xuid)["permissions"]
                    let Prems_List = Object.keys(Prems)
                    let fm2 = mc.newCustomForm()
                    fm2.setTitle("设置岛屿权限")
                    fm2.addLabel("岛屿权限控制:")
                    Prems_List.forEach(key => {
                        fm2.addSwitch(Language.data["permissions"][key], Prems[key])
                    });
                    player.sendForm(fm2, (player, data) => {
                        if (data == null) return this.AdminSetup(player)
                        let flag = 1;
                        let obj = {};

                        Prems_List.forEach(key => obj[key] = data[flag++]);

                        CreateLand.SetupLandData(xuid, "permissions", obj)
                        player.tell("§b§l" + "权限设置成功" + "");

                    })
                    break;
                case 1:
                    let fm = mc.newCustomForm();
                    fm.setTitle("设置岛屿传送点");
                    fm.addInput("输入传送点名称:");
                    fm.addSwitch("是否公开", true);
                    player.sendForm(fm, (player, data) => {
                        if (data != null && data[0] != '') {
                            Warp.CreateWarp({
                                xuid: xuid,
                                pos: player.pos
                            }, data[0], data[1])
                            ST(player, `设置传送点成功!`);
                        } else {
                            ST(player, `§c设置传送点失败 , 请检查输入是否有误!`);
                        }
                    })
                    break;
                case 2:
                    let teleport = Warp.GetData(xuid)["teleport"]
                    let fm1 = mc.newSimpleForm();
                    fm1.setTitle("删除岛屿传送点");
                    teleport.forEach((key) => {
                        fm1.addButton(key["name"]);
                    });
                    player.sendForm(fm1, (player, id) => {
                        if (id != null) {
                            player.sendModalForm("删除", "你确定删除该传送点吗", "确定", "取消", (player, result) => {
                                if (result) {
                                    teleport.splice(id, 1)
                                    Warp.SetData(xuid, "teleport", teleport)
                                }
                            })
                        }
                    });
                    break;
                default:
                    log(typeof id);
            }
        })
    }


}

let admin = new Manage_Methods()



mc.regPlayerCmd("is manage", "岛屿管理", (player) => {

    admin.Primary(player)

}, 1)

mc.regPlayerCmd("is manage set", "自定义岛屿管理", (player) => {

    if (ADMIN_DATA.includes(player.inIsLand())) return admin.AdminSetup(player)

    ST(player, "你必须在需要被管理的岛屿上!")

}, 1)


// function StructurePlayer(player, name, xuid) {
//     return {
//         name: name,
//         xuid: xuid,
//         player: player,
//         pos: player.pos,
//         sendForm(fm, callback) {
//             this.player.sendForm(fm, callback)
//         },
//         teleport(arguments) {
//             this.player.teleport(...arguments)
//         },
//         tell(arguments) {
//             this.player.tell(...arguments)
//         }
//     }

// }