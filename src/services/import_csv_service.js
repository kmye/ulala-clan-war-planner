import { getClassByName } from '../constants/classes';

function cleanString(value) {
  return value.replace(/"/g, '');
}

const COLUMN_INDEX_NAME = 0;
const COLUMN_INDEX_POWER = 1;
const COLUMN_INDEX_CLASS = 2;

class ImportCSVService {
  processRows(rawData) {
    const dataRows = rawData.split(/\n/g);

    return dataRows.map((element, index) => {
      if (index !== 0) {
        const playerData = element.split(',');

        return {
          name: cleanString(playerData[COLUMN_INDEX_NAME]),
          power: cleanString(playerData[COLUMN_INDEX_POWER]),
          class: getClassByName(cleanString(playerData[COLUMN_INDEX_CLASS])),
        };
      }
    });
  }
}

export const importCSVService = new ImportCSVService();
