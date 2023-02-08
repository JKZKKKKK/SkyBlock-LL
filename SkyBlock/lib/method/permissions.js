//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 

// 岛屿权限控制
const Language = require("../lang")
// const CreateLand = require("../CreateLand")

Permissions_Set = {
    Set_Permissions(player) {

        let Prems = CreateLand.GetLandData(player.xuid)["permissions"]
        let Prems_List = Object.keys(Prems)
        let fm = mc.newCustomForm()
        fm.setTitle("设置岛屿权限")
        fm.addLabel("岛屿权限控制:")

        Prems_List.forEach(key => {
            fm.addSwitch(Language.data["permissions"][key], Prems[key])
        })

        player.sendForm(fm, (player, data) => {
            if (data != null) {
                let flag = 1;
                let obj = {};
                Prems_List.forEach(key => {
                    obj[key] = data[flag++]
                });
                CreateLand.SetupLandData(player.xuid, "permissions", obj)
                player.tell("§b§l" + "权限设置成功" + "");
            }
        })
    }
}

module.exports = Permissions_Set