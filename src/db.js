// Mock Database using LocalStorage
const INITIAL_DATA = {
  buildings: [
    { id: 1, name: "Building 1" },
    { id: 2, name: "Building 2" },
    { id: 3, name: "Building 3" }
  ],
  floors: [
    { id: 1, buildingId: 1, number: "1" },
    { id: 2, buildingId: 1, number: "2" },
    { id: 3, buildingId: 2, number: "G" },
    { id: 4, buildingId: 3, number: "1" }
  ],
  offices: [
    { id: 1, floorId: 1, number: "101" },
    { id: 2, floorId: 1, number: "102" },
    { id: 3, floorId: 4, number: "301" }
  ],
  requests: [
    {
      id: "C757370",
      userId: 1,
      building: "Building 1",
      floor: "1",
      office: "101",
      problemType: "Interior Repair",
      description: "Broken chair / Счупен стол",
      status: "HLD",
      date: "2026-01-16",
      attachments: []
    }
  ]
};

export class DB {
  static init() {
    // Force reset for specific update
    if (!localStorage.getItem('fm_data_v2')) {
      localStorage.removeItem('fm_data');
      localStorage.setItem('fm_data', JSON.stringify(INITIAL_DATA));
      localStorage.setItem('fm_data_v2', 'true'); // Version tag to prevent infinite reset
    }
  }

  static getData() {
    return JSON.parse(localStorage.getItem('fm_data'));
  }

  static saveData(data) {
    localStorage.setItem('fm_data', JSON.stringify(data));
  }

  static addBuilding(name) {
    const data = this.getData();
    const id = Date.now();
    data.buildings.push({ id, name });
    this.saveData(data);
    return id;
  }

  static addFloor(buildingId, number) {
    const data = this.getData();
    const id = Date.now();
    data.floors.push({ id, buildingId, number });
    this.saveData(data);
    return id;
  }

  static addOffice(floorId, number) {
    const data = this.getData();
    const id = Date.now();
    data.offices.push({ id, floorId, number });
    this.saveData(data);
    return id;
  }

  static createRequest(request) {
    const data = this.getData();
    const id = "C" + Math.floor(100000 + Math.random() * 900000);
    const newRequest = { ...request, id, date: new Date().toISOString().split('T')[0], status: 'HLD' };
    data.requests.unshift(newRequest);
    this.saveData(data);
    return newRequest;
  }

  static getRequests() {
    return this.getData().requests;
  }
}

DB.init();
