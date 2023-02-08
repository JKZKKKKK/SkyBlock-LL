//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 





function IsLnad_Self(player, target) {

    let id = Protect_Method.ReturnID(InitFig.LAND_DATA, "range", target)



    if (!id) return false


    return id == player.xuid || id == InitFig.INVITED_DATA[player.xuid]["master"] ? true : false

}


Warp_Methods = {

    WhetherWarp(player, callback1) {
        if (Warp.GetData(player.xuid) != null) {
            if (Warp.GetData(player.xuid)["teleport"].length > 0) {
                callback1(player)
            } else {
                ST(player, "§c你还没有传送点", 0);
            }
        } else {
            ST(player, "§c你还没有传送点", 0);
        }
    },

    CreateWarp(player) {

        if (IsLnad_Self(player, player.pos)) {
            if (Warp.GetData(player.xuid)["teleport"].length < InitFig.FIG.max_wrap_num) {
                let fm = mc.newCustomForm();
                fm.setTitle("设置岛屿传送点");
                fm.addInput("输入传送点名称:");
                fm.addSwitch("是否公开", true);
                player.sendForm(fm, (player, data) => {
                    if (data != null && data[0] != '') {
                        Warp.CreateWarp(player, data[0], data[1])
                        ST(player, `设置传送点成功!`);
                    } else {
                        ST(player, `§c设置传送点失败 , 请检查输入是否有误!`);
                    }
                })
            } else {
                ST(player, `§c设置失败 你最多可以设置 ${InitFig.FIG.max_wrap_num} 个传送点`);
            }
        } else {
            ST(player, `§c你必须在自己的岛屿上`);
        }

    },

    RemoveWarp(player) {

        this.WhetherWarp(player, () => {
            let teleport = Warp.GetData(player.xuid)["teleport"]
            let fm = mc.newSimpleForm();
            fm.setTitle("删除岛屿传送点");
            teleport.forEach((key) => {
                fm.addButton(key["name"]);
            });
            player.sendForm(fm, (player, id) => {
                if (id != null) {
                    player.sendModalForm("删除", "你确定删除该传送点吗", "确定", "取消", (player, result) => {
                        if (result) {
                            teleport.splice(id, 1)
                            Warp.SetData(player.xuid, "teleport", teleport)
                        }
                    })
                }
            });
        })
    },

    SetupWarp(player) {
        this.WhetherWarp(player, () => {
            let teleport = Warp.GetData(player.xuid)["teleport"]
            let fm = mc.newCustomForm();
            fm.setTitle("设置传送点是否公开");
            fm.addLabel('传送点列表: ');
            teleport.forEach((key) => {
                fm.addSwitch(key.name, key.flag);
            });
            player.sendForm(fm, (player, data) => {
                if (data != null) {
                    data.splice(0, 1)
                    data.forEach((data, index) => {
                        teleport[index]["flag"] = data;
                        Warp.SetData(player.xuid, "teleport", teleport)
                    })
                }
            })
        })
    },

    GetWarp(player) {
        this.WhetherWarp(player, () => {
            let teleport = Warp.GetData(player.xuid)["teleport"]
            let fm = mc.newSimpleForm();
            fm.setTitle("我的传送点");
            teleport.forEach((key) => {
                fm.addButton(key["name"]);
            })
            player.sendForm(fm, (player, id) => {
                if (id != null) {
                    player.teleport(teleport[id].x, teleport[id].y, teleport[id].z, teleport[id].dimid);
                }
            })
        })
    },

    getPlayerOpenWarp(xuid) {
        let arr = Warp.GetData(xuid)["teleport"];
        let newArr = [];
        arr.forEach(value => {
            if (value.flag) {
                newArr.push(value);
            }
        });
        return newArr;
    },

    GetWarpList(player) {
        let fm = mc.newSimpleForm();
        fm.setTitle("岛屿传送点");
        let warp = Object.keys(InitFig.LAND_WARP);

        let Staging = []

        warp.forEach((key) => {
            if (this.getPlayerOpenWarp(key).length > 0) {
                fm.addButton(`${Warp.GetData(key)["name"]}\n §c查看玩家传送点列表`);
                Staging.push(key);
            }
        });

        player.sendForm(fm, (player, id) => {
            if (id != null) {
                let _playerOpenWarp = this.getPlayerOpenWarp(Staging[id]);
                let fm2 = mc.newSimpleForm();
                fm2.setTitle("岛屿传送点");
                _playerOpenWarp.forEach((key) => {
                    fm2.addButton(`${key.name}`);
                });
                player.sendForm(fm2, (player, id) => {
                    if (id != null) {
                        let a = _playerOpenWarp[id];
                        player.teleport(a.x, a.y, a.z, a.dimid);
                    }
                })
            }
        })
    },

    SetSpawn(player) {
        let obj = Warp.Rounding(player, player.name, true)
        if (IsLnad_Self(player, player.pos)) {
            Warp.SetData(player.xuid, "spawn", {
                x: obj.x,
                y: obj.y,
                z: obj.z
            })
            ST(player, "§a已将当前位置设置为岛屿返回点...", 0);
        } else {
            ST(player, "§c你必须在自己的岛屿上!", 0);
        }

    },

    ReturnLand(player) {
        let obj = Warp.GetData(player.xuid)["spawn"];
        player.teleport(obj.x, obj.y, obj.z, 0);
    }

}



module.exports = Warp_Methods