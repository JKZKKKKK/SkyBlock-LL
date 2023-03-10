//LiteLoaderScript Dev Helper
/// <reference path="d:/Desktop\CONFIG/JS/HelperLib-master/src/index.d.ts"/> 

// const InitFig = require("./IntIsLand")

const LANG = new JsonConfigFile(`.\\plugins\\SkyBlock\\lang\\${InitFig.FIG.default_language}.json`, "{}")

let _language = {

    permissions: {
        permis: "岛屿保护",
        destroy_block: "允许破坏方块",
        place_block: "允许放置方块",
        drop_item: "允许丢出物品",
        take_item: "允许拾取物品",
        atk_friendly_mob: "允许攻击友好生物",
        atk_hostile_mob: "允许攻击敌对生物",
        atk_player: "允许攻击玩家",
        allow_ues_crafting_table: "允许使用工作台",
        allow_ues_furnace: "允许使用熔炉",
        allow_ues_blast_furnace: "允许使用高炉",
        allow_ues_smoker: "允许使用火炉",
        allow_ues_brewing_stand: "允许使用酿造台",
        allow_ues_enchanting_table: "允许使用附魔台",
        allow_ues_beacon: "允许操作信标",
        allow_open_anvil: "允许使用铁砧",
        allow_open_barrel: "允许打开桶",
        allow_open_hopper: "允许打开漏斗",
        allow_open_chest: "允许打开箱",
        allow_open_dropper: "允许打开投掷器",
        allow_open_dispenser: "允许打开发射器",
        allow_open_shulker_box: "允许开潜匿箱",
        allow_open_firegen: "允许使用打火石",
        allow_use_projectile: "允许使用弹射物",
        allow_use_bucket: "允许使用空桶",
        cultivated_land_degradation: "允许破坏耕地",
    }
}

// LANG.set("LANGUAGE", _language.permissions)

let language = {
    data: _language
}

module.exports = language