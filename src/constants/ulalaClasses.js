export const ULALA_CLASSES = [
    {
        id: 1,
        name: "Assassin",
    },
    {
        id: 2,
        name: "Hunter",
    },
    {
        id: 3,
        name: "Gladiator",
    },
    {
        id: 4,
        name: "Warrior",
    },
    {
        id: 5,
        name: "Shaman",
    },
    {
        id: 6,
        name: "Warlock",
    },
    {
        id: 7,
        name: "Druid",
    },
    {
        id: 8,
        name: "Mage",
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

