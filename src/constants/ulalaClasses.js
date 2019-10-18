export const ClassType = {
    DPS: "Dps",
    MAGIC_DPS: "Magic DPS",
    TANK: "Tank",
    SUPPORT: "Support"
};

export const ULALA_CLASSES = [
    {
        id: 1,
        name: "Assassin",
        type: ClassType.DPS
    },
    {
        id: 2,
        name: "Hunter",
        type: ClassType.DPS
    },
    {
        id: 3,
        name: "Gladiator",
        type: ClassType.TANK
    },
    {
        id: 4,
        name: "Warrior",
        type: ClassType.TANK
    },
    {
        id: 5,
        name: "Shaman",
        type: ClassType.SUPPORT
    },
    {
        id: 6,
        name: "Warlock",
        type: ClassType.MAGIC_DPS
    },
    {
        id: 7,
        name: "Druid",
        type: ClassType.SUPPORT
    },
    {
        id: 8,
        name: "Mage",
        type: ClassType.MAGIC_DPS
    }
];

export const getClassByName = (name) => {
    let result = null;

    for (let index in ULALA_CLASSES) {
        let element = ULALA_CLASSES[index];
        if (element.name.trim() === name.trim()) {
            result = element;
            break;
        }
    }

    return {key: result.id, label: result.name};
};

export const getAllClassIdsByType = (type) => {
    let classIds = [];
    for (let index in ULALA_CLASSES) {
        let element = ULALA_CLASSES[index];

        if (element.type === type) {
            classIds.push(element.id);
        }
    }

    return classIds;
}

export const ULALA_CLASS_TAG_COLORS = [
    "orange",
    "orange",
    "red",
    "red",
    "purple",
    "purple",
    "cyan",
    "cyan",
];

export const ULALA_CLASS_HEX_COLORS = [
    "orange",
    "orange",
    "red",
    "red",
    "purple",
    "purple",
    "cyan",
    "cyan",
];

