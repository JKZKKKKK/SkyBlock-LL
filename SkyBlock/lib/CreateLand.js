//LiteLoaderScript Dev Helper
// 数据创建

// 导入初始化文件
// const InitFig = require("./IntIsLand")

const CreateLandData = {
    Save() {
        InitFig.ISLAND.set("LAND_DATA", InitFig.LAND_DATA);
    },
    CreateLandData(player, _pos) {
        InitFig.LAND_DATA[player.xuid] = {
            name: player.name,
            share: [],
            range: _pos,
            permissions: {
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
            }
        }
        this.Save()
    },
    RemoveLandData(xuid) {
        delete InitFig.LAND_DATA[xuid]
        this.Save()
    },
    SetupLandData(xuid, key, value) {
        InitFig.LAND_DATA[xuid][key] = value;
        this.Save()
    },
    GetLandData(xuid) {
        return InitFig.LAND_DATA[xuid];
    }
}

module.exports = CreateLandData