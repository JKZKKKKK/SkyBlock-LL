//LiteLoaderScript Dev Helper
/// <reference path="d:/Desktop\CONFIG/JS/HelperLib-master/src/index.d.ts"/> 

// 岛屿权限控制

function Permission(xuid, subject) {
    return CreateLand.GetLandData(xuid)["permissions"][subject] ? true : false;
}

function IsLnad_Self(player, target, subject) {

    if (InitFig.Admin.includes(player.name)) return true

    if (InitFig.LAND_WORLD[subject]) return true

    if (player.pos.dimid == 1 && InitFig.Dimension["The_Nether"]) return true
    if (player.pos.dimid == 2 && InitFig.Dimension["The_End"]) return true


    let id = Protect_Method.ReturnID(InitFig.LAND_DATA, "range", target)

    if (id && player.pos.dimid == 0) {

        if (id == player.xuid || CreateLand.GetLandData(id)["share"].includes(player.xuid) || Permission(id, subject)) {

            return true

        } else {

            return false

        }
    } else {
        return false
    }
}

function ST(player, text, type) {
    player.tell("§b" + text + "", type);
}



// intercept
function Intercept(player, target, subject) {
    if (IsLnad_Self(player, target, subject)) {

        return true

    } else {

        ST(player, "岛屿保护", 4);
        return false
    }
}




(() => {

    // DestroyBlock
    mc.listen("onDestroyBlock", (player, block) => {
        return Intercept(player, block.pos, "destroy_block")
    })

    // AttackEntity
    let friendly_mob = ["minecraft: ocelot", "minecraft: cat", "minecraft: polar_bear", "minecraft: wolf",
        "minecraft: sheep", "minecraft: pig", "minecraft: cow", "minecraft: bee", "minecraft: chicken",
        "minecraft: mooshroom", "minecraft: parrot", "minecraft: rabbit", "minecraft: llama", "minecraft: horse",
        "minecraft: donkey", "minecraft: mule", "minecraft: tropicalfish",
        "minecraft: cod", "minecraft: pufferfish", "minecraft: salmon", "minecraft: dolphin", "minecraft: turtle",
        "minecraft: panda", "minecraft: fox", "minecraft: squid", "minecraft: glow_squid", "minecraft: trader_llama",
        "minecraft: tadpole", "minecraft: frog", "minecraft: allay", "minecraft: axolotl", "minecraft: goat",
        "minecraft:wandering_trader", "minecraft:villager_v2"]
    mc.listen("onAttackEntity", (player, entity) => {
        if (entity.isPlayer()) {
            return Intercept(player, entity.pos, "atk_player")
        } else {
            if (friendly_mob.includes(entity.type)) {
                return Intercept(player, entity.pos, "atk_friendly_mob")
            } else {
                return Intercept(player, entity.pos, "atk_hostile_mob")
            }
        }
    })

    // UseItem
    mc.listen("onUseItem", (player, item) => {

        switch (item.type) {
            case "minecraft:bow":
                return Intercept(player, player.pos, "allow_use_projectile")
            case "minecraft:crossbow":
                return Intercept(player, player.pos, "allow_use_projectile")
            case "minecraft:trident":
                return Intercept(player, player.pos, "allow_use_projectile")
            default:
                break;
        }
    })

    // 玩家对方块使用物品（点击右键）
    mc.listen("onUseItemOn", (player, item, block, side, pos) => {
        if (item.type == "minecraft:flint_and_steel") {

            return Intercept(player, block.pos, "allow_open_firegen")

        } else if (item.type == "minecraft:bucket" && Intercept(player, player.pos, "allow_use_bucket")) {

            if (block.type == "minecraft:obsidian" && Protect_Method.ReturnID(InitFig.LAND_DATA, "range", block.pos) == player.xuid) {
                mc.setBlock(block.pos, "minecraft:lava", 0);
                ST(player, "已将黑曜石转换为岩浆");
            }

            return Intercept(player, player.pos, "allow_use_bucket")
        }
    })

    // 玩家捡起物品
    mc.listen("onTakeItem", (player, item) => {
        return Intercept(player, player.pos, "take_item")
    })

    // 玩家丢出物品
    mc.listen("onDropItem", (player, item) => {
        return Intercept(player, player.pos, "drop_item")
    })

    // 玩家吃东西
    mc.listen("onEat", (player, item) => {

    })


    // 玩家放置方块
    mc.listen("onPlaceBlock", (player, block) => {
        return Intercept(player, block.pos, "place_block")
    })

    // 玩家打开容器方块
    mc.listen("onOpenContainer", (player, block) => {
        switch (block.type) {
            case "minecraft:crafting_table":
                return Intercept(player, block.pos, "allow_ues_crafting_table")
            case "minecraft:furnace":
                return Intercept(player, block.pos, "allow_ues_furnace")
            case "minecraft:blast_furnace":
                return Intercept(player, block.pos, "allow_ues_blast_furnace")
            case "minecraft:smoker":
                return Intercept(player, block.pos, "allow_ues_smoker")
            case "minecraft:brewing_stand":
                return Intercept(player, block.pos, "allow_ues_brewing_stand")
            case "minecraft:enchanting_table":
                return Intercept(player, block.pos, "allow_ues_enchanting_table")
            case "minecraft:shulker_box":
                return Intercept(player, block.pos, "allow_open_dispenser")
            case "minecraft:undyed_shulker_box":
                return Intercept(player, block.pos, "allow_open_dispenser")
            case "minecraft:beacon":
                return Intercept(player, block.pos, "allow_ues_beacon")
            case "minecraft:anvil":
                return Intercept(player, block.pos, "allow_open_anvil")
            case "minecraft:barrel":
                return Intercept(player, block.pos, "allow_open_barrel")
            case "minecraft:hopper":
                return Intercept(player, block.pos, "allow_open_hopper")
            case "minecraft:chest":
                return Intercept(player, block.pos, "allow_open_chest")
            case "minecraft:dropper":
                return Intercept(player, block.pos, "allow_open_dropper")
            case "minecraft:dispenser":
                return Intercept(player, block.pos, "allow_open_dispenser")
            default:
                break;
        }
    })

    log("[permission] : island permissions load...");
})()