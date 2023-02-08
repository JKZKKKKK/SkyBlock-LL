//LiteLoaderScript Dev Helper
/// <reference path="d:\Desktop\CONFIG/dts/llaids/src/index.d.ts"/> 



IsLandEvent.listen("onEnter", (player, xuid) => {

    let str = player.xuid == xuid ? "§a欢迎回来" : "§a你正在访问"
    player.setTitle(str, 2)
    player.setTitle(`§c${CreateLand.GetLandData(xuid)["name"]}`, 3)

})

IsLandEvent.listen("onLeave", (player, xuid) => {

    if (!CreateLand.GetLandData(xuid)) return
    player.tell(`你离开了 ${CreateLand.GetLandData(xuid)["name"]} 的岛屿`, 4)

})
