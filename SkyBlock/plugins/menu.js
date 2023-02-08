
class IsMenu_Method {

    Level_1(player) {
        let fm1 = mc.newSimpleForm();
        fm1.setTitle("空岛菜单");
        fm1.addButton("我的岛屿传送点");
        fm1.addButton("公开岛屿列表");
        fm1.addButton("传送点设置");
        fm1.addButton("§l返回上一级");
        player.sendForm(fm1, (player, id) => {
            if (id != null) {
                switch (id) {
                    case 0:
                        Warp_Method.GetWarp(player)
                        break;
                    case 1:
                        Warp_Method.GetWarpList(player)
                        break;
                    case 2:
                        this.Level_1_3(player);
                        break;
                    case 3:
                        isMenu(player)
                        break;
                    default:
                        log(typeof id);
                }
            }
        })
    }



    Level_1_3(player) {
        let fm1 = mc.newSimpleForm();
        fm1.setTitle("空岛菜单");
        fm1.addButton("创建传送点");
        fm1.addButton("设置岛屿传送点是否公开");
        fm1.addButton("删除岛屿传送点");
        fm1.addButton("§l返回上一级");
        player.sendForm(fm1, (player, id) => {
            if (id != null) {
                switch (id) {
                    case 0:
                        Warp_Method.CreateWarp(player)
                        break;
                    case 1:
                        Warp_Method.SetupWarp(player)
                        break;
                    case 2:
                        Warp_Method.RemoveWarp(player)
                        break;
                    case 3:
                        this.Level_1(player)
                        break;
                    default:
                        log(typeof id);
                }
            }
        })
    }


    Level_2(player) {
        let fm = mc.newSimpleForm();
        fm.setTitle("空岛菜单");
        fm.addButton("查询岛屿等级");
        fm.addButton("岛屿等级排行");
        fm.addButton("查看手持方块价值");
        fm.addButton("§l返回上一级");
        player.sendForm(fm, (player, id) => {
            if (id != null) {
                switch (id) {
                    case 0:
                        player.runcmd("is level");
                        break;
                    case 1:
                        player.runcmd("is top");
                        break;
                    case 2:
                        player.runcmd("is value");
                        break;
                    case 3:
                        isMenu(player)
                        break;
                    default:
                        log(typeof id);
                }
            }
        })
    }


    Level_3(player) {
        let fm3 = mc.newSimpleForm();
        fm3.setTitle("空岛菜单");
        fm3.addButton("岛屿权限设置");
        fm3.addButton("设置岛屿返回点");
        fm3.addButton("§l返回上一级");
        player.sendForm(fm3, (player, id) => {
            if (id != null) {
                switch (id) {
                    case 0:
                        player.runcmd("is permission");
                        break;
                    case 1:
                        Warp_Method.SetSpawn(player)
                        break;
                    case 2:
                        isMenu(player)
                        break;
                    default:
                        log(typeof id);
                }
            }
        })
    }


}

let IsMenu = new IsMenu_Method()



function isMenu(player) {
    let fm = mc.newSimpleForm();
    fm.setTitle("岛屿菜单");
    fm.addButton("返回岛屿", "textures/ui/icon_recipe_nature");
    fm.addButton("岛屿传送点", "textures/ui/sidebar_icons/realms");
    fm.addButton("岛屿等级", "textures/ui/sidebar_icons/genre");
    fm.addButton("岛屿设置", "textures/ui/icon_setting");
    player.sendForm(fm, (player, id) => {
        if (id != null) {
            switch (id) {
                case 0:
                    player.runcmd("is home");
                    break;
                case 1:
                    IsMenu.Level_1(player)
                    break;
                case 2:
                    IsMenu.Level_2(player)
                    break;
                case 3:
                    IsMenu.Level_3(player)
                    break;
                default:
                    log(typeof id);
            }
        }
    })
}


mc.listen("onUseItem", (player, item) => {
    if (item.type == "minecraft:clock" && InitFig.Menu) {
        player.runcmd("is")
    }
})


IsLandEvent.listen("onRunIs", (player) => {
    isMenu(player)
    return false
})