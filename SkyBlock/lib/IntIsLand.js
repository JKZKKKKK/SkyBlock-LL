//LiteLoaderScript Dev Helper
/// <reference path="d:/Desktop\CONFIG/JS/HelperLib-master/src/index.d.ts"/> 

const CONFIG = new JsonConfigFile('.\\plugins\\SkyBlock\\config.json', "{}")
const DATA = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\data.json', "{}")
const WARP = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\warp.json', "{}")
const PLAYER = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\player.json', "{}")
const LEVEL = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\level.json', "{}")
const BL = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\blockValue.json', '{}');
const INVITED = new JsonConfigFile('.\\plugins\\SkyBlock\\data\\invited.json', '{}');
const InitIsLand = {
    SaveData(key, value) {
        CONFIG.set(key, value);
    },
    CONFIG_DATA: CONFIG,
    ISLAND: DATA,
    ISWARP: WARP,
    ISPLAYER: PLAYER,
    ISLEVEL: LEVEL,
    BLDATA: BL,
    INVITED: INVITED,

    Menu: CONFIG.init("Menu", true),
    INVITED_DATA: INVITED.init("INVITED", {}),
    BL_VALUE: BL.init("BL_VALUE", {}),
    Admin: CONFIG.init("Admin", []),
    MARK: CONFIG.init("POS_MARK", {
        mark: 4,
        start_x: 0,
        start_z: 0,
        island_height: 64,
        protection_range: 100,
        distance_between_islands: 800,
        data: {
            init: 1,
            Fre: 1,
            dir: 0,
            Tag: "first",
            mode: ["left", "top", "right", "down"]
        }
    }),
    FIG: CONFIG.init("isLand", {
        default_language: "zh_CN",
        max_team_size: 4,
        max_wrap_num: 3,
        level: {
            interval: 10,
            delay: 80
        },
        reset: {
            reset_limit: 3,
            kicked_keep_inventory: false
        },
        file: [{
            type: "sky1",
            name: "空岛",
            data: {
                length: 9,
                width: 9,
                height: 8
            }
        }],
        invite: {
            max: 3
        }
    }),
    RESET: CONFIG.init("SPAWN", {
        x: 0,
        y: 64,
        z: 0
    }),
    LAND_DATA: DATA.init("LAND_DATA", {}),
    LAND_WARP: WARP.init("LAND_WARP", {}),
    LAND_PLAYER: PLAYER.init("LAND_PLAYER", {}),
    LAND_LEVEL: LEVEL.init("LAND_LEVEL", {}),
    Dimension: CONFIG.init("Dimension", {
        The_Nether: false,
        The_End: false
    }),
    LAND_WORLD: DATA.init("world", {
        destroy_block: false,
        place_block: false,
        drop_item: true,
        take_item: true,
        atk_friendly_mob: false,
        atk_hostile_mob: false,
        atk_player: false,
        allow_ues_crafting_table: true,
        allow_ues_furnace: false,
        allow_ues_blast_furnace: false,
        allow_ues_smoker: false,
        allow_ues_enchanting_table: true,
        allow_ues_beacon: false,
        allow_open_anvil: false,
        allow_open_barrel: false,
        allow_open_hopper: false,
        allow_open_chest: false,
        allow_open_dropper: false,
        allow_open_dispenser: false,
        allow_open_shulker_box: false,
        allow_open_firegen: false,
        allow_use_projectile: false,
        allow_use_bucket: false,
    }),
}


module.exports = InitIsLand;