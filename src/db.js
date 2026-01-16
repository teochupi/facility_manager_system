// Mock Database using LocalStorage
const INITIAL_DATA = {
  buildings: [
    { id: 1, name: "Building 1" },
    { id: 2, name: "Building 2" }
  ],
  floors: [
    { id: 1, buildingId: 1, number: "1" },
    { id: 2, buildingId: 1, number: "2" },
    { id: 3, buildingId: 2, number: "G" }
  ],
  offices: [
    { id: 1, floorId: 1, number: "101" },
    { id: 2, floorId: 1, number: "102" }
  ],
  requests: [
    {
      id: "C757370",
      userId: 1,
      building: "Building 1",
      floor: "1",
      office: "101",
      problemType: "Interior Repair",
      description: "Broken chair in the corner.",
      status: "HLD",
      date: "2025-12-23"
    }
  ]
};

export class DB {
  static init() {
    // If we want to force reset due to your request, we can clear here.
    // Otherwise it only sets if empty.
    localStorage.removeItem('fm_data');
    if (!localStorage.getItem('fm_data')) {
      localStorage.setItem('fm_data', JSON.stringify(INITIAL_DATA));
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
