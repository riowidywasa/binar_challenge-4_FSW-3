class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.containerCars = document.getElementById("container-cars");
    this.filterByDate = document.getElementById('filterDate');
    this.filterByTime = document.getElementById('filterTime')
    this.filterByCapacity = document.getElementById('filterCapacity')
  }

  async init() {
    await this.load();
    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    this.clear();
    const data = this.filterCar();

    if (data.length == 0 || data == undefined) {
      const node = document.createElement('div');
      node.innerHTML = '<h1> Mobil tidak tersedia </h1>';
      this.containerCars.appendChild(node);
    } else {
      data.forEach((car) => {
        const node = document.createElement('div');
        node.className = "col mb-5"
        node.innerHTML = car.render();
        this.containerCars.appendChild(node);
      });
    }
  };

  filterCar() {
    const dateValue = this.filterByDate.value
    const timeValue = this.filterByTime.value
    const capacityValue = this.filterByCapacity.value
    console.log(dateValue, timeValue, capacityValue)
    const dateTime = new Date(`${dateValue} ${timeValue}`);
    if (dateTime == 'Invalid Date') {
      alert('Harap pilih tanggal dan yang benar');
      return;
    } else if (capacityValue <= 0) {
      alert('Harap masukan jumlah penumpang!');
      return;
    } else {
      return Car.list.filter((car) => car.capacity >= capacityValue && car.availableAt > dateTime && car.available === true )
    }
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.containerCars.firstElementChild;
    //menampilkan data
    while (child) {
      child.remove();
      child = this.containerCars.firstElementChild;
    }
  };
}