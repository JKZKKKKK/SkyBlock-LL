
mc.listen("onChat", (player, msg) => {

    if (player.whetherLand()) {

        mc.broadcast(`§a[空岛]§c [${Level.GetLevel(player.xuid)["level"]}]§r ${player.name}: ${msg}`)

    } else {

        mc.broadcast(`§a[空岛]§r[§a${0}]§r ${player.name}: ${msg}`)
    }

    return false;
})