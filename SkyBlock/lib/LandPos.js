//LiteLoaderScript Dev Helper
//LiteLoaderScript Dev Helper
/// <reference path="d:/Desktop\CONFIG/JS/HelperLib-master/src/index.d.ts"/> 

// const InitFig = require("./IntIsLand");


function returnDir(dirs) {
    let dir = dirs;
    return dir < 3 ? (dir + 1) : 0;
}

let direction = {
    top(pos, value) {
        pos.start_z += value
    },
    down(pos, value) {
        pos.start_z -= value
    },
    left(pos, value) {
        pos.start_x -= value
    },
    right(pos, value) {
        pos.start_x += value
    }
}


function createPos(_data) {
    let pos = _data;
    let data = _data.data;
    if (data.Tag == "first") {
        if (data.Fre > 0) {
            data.Fre = (data.Fre - 1);
        } else {
            data.Tag = "last";
            data.Fre = data.init;
            data.dir = returnDir(data.dir);
        }
    } else if (data.Tag == "last") {
        if (data.Fre > 0) {
            data.Fre = (data.Fre - 1);
        } else {
            data.Tag = "first";
            data.init = (data.init + 1);
            data.Fre = data.init;
            data.dir = returnDir(data.dir);
        }
    }
    direction[data.mode[data.dir]](pos, (pos.distance_between_islands + pos.protection_range))
    return pos;
}

let CreatePos = {
    Create() {
        // 偷个懒 ... 
        let NewPos = {};
        let product = (InitFig.MARK.protection_range + InitFig.MARK.distance_between_islands);
        if (InitFig.MARK.mark > 0) {

            switch (InitFig.MARK.mark) {
                case 4:

                    NewPos = {
                        first: [InitFig.MARK.start_x, InitFig.MARK.start_z],
                        last: [InitFig.MARK.start_x + InitFig.MARK.protection_range, InitFig.MARK.start_z + InitFig.MARK.protection_range],
                        height: InitFig.MARK.island_height,
                        dimid: [0]
                    }

                    InitFig.MARK.mark -= 1
                    InitFig.SaveData("POS_MARK", InitFig.MARK);

                    break;
                case 3:
                    NewPos = {
                        first: [InitFig.MARK.start_x, InitFig.MARK.start_z + product],
                        last: [InitFig.MARK.start_x + InitFig.MARK.protection_range, InitFig.MARK.start_z + product + InitFig.MARK.protection_range],
                        height: InitFig.MARK.island_height,
                        dimid: [0]
                    }

                    InitFig.MARK.mark -= 1
                    InitFig.SaveData("POS_MARK", InitFig.MARK);

                    break;
                case 2:
                    NewPos = {
                        first: [InitFig.MARK.start_x + product, InitFig.MARK.start_z + product],
                        last: [InitFig.MARK.start_x + product + InitFig.MARK.protection_range, InitFig.MARK.start_z + product + InitFig.MARK.protection_range],
                        height: InitFig.MARK.island_height,
                        dimid: [0]
                    }

                    InitFig.MARK.mark -= 1
                    InitFig.SaveData("POS_MARK", InitFig.MARK);

                    break;
                case 1:
                    NewPos = {
                        first: [InitFig.MARK.start_x + product, InitFig.MARK.start_z],
                        last: [InitFig.MARK.start_x + product + InitFig.MARK.protection_range, InitFig.MARK.start_z + InitFig.MARK.protection_range],
                        height: InitFig.MARK.island_height,
                        dimid: [0]
                    }

                    InitFig.MARK.mark -= 1
                    InitFig.SaveData("POS_MARK", InitFig.MARK);

                    break;
            }
            return NewPos;
        } else {
            InitFig.SaveData("POS_MARK", createPos(InitFig.MARK));
            return {
                first: [InitFig.MARK.start_x, InitFig.MARK.start_z],
                last: [InitFig.MARK.start_x + InitFig.MARK.protection_range, InitFig.MARK.start_z + InitFig.MARK.protection_range],
                height: InitFig.MARK.island_height,
                dimid: [0]
            }
        }

    }
}


module.exports = CreatePos;