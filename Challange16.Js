const { v4: uuidv4 } = require('uuid');

class Tyre {
    constructor(brand, size) {
        this.brand = brand;
        this.size = size;
        this.tyreInfo = `${this.brand} ${this.size} inch`;
    }
}

class Door {
    constructor(numOfDoor) {
        this.numOfDoor = numOfDoor;
    }
}

class Seat {
    constructor(numOfSeat) {
        this.numOfSeat = numOfSeat;
        this.seatInfo = `${this.numOfSeat} seater`;
    }
}

class Car {
    constructor(varian, numOfDoor, numOfSeat, tyreBrand, tyreSize, warranty) {
        this.varian = varian;
        this.door = new Door(numOfDoor);
        this.seat = new Seat(numOfSeat);
        this.tyre = new Tyre(tyreBrand, tyreSize);
        this.warranty = warranty;
        this.warrantyInfo = `${warranty} year`;
    }
}

class CarFactory {
    constructor() {
        this.cars = []
    }

    produce(year) {
        function randNum() { return Math.ceil(Math.random() * 5) };

        const agyaNum = randNum();
        const rushNum = randNum();

        for (let i = 0; i < agyaNum; i++) {
            const agya = new Car('Agya', 5, 5, 'Dunlop', 15, 1);
            agya.year = year;
            agya.sn = uuidv4();
            this.cars.push(agya)
        }

        for (let j = 0; j < rushNum; j++) {
            const rush = new Car('Rush', 5, 5, 'Bridgestone', 17, 3);
            rush.year = year;
            rush.sn = uuidv4();
            this.cars.push(rush)
        }
    }

    getCarInfo(car) {
        return {
            varian: car.varian,
            sn: car.sn,
            door: car.door.numOfDoor,
            seat: car.seat.seatInfo,
            tyre: car.tyre.tyreInfo,
            year: car.year,
            warranty: car.warrantyInfo
        }
    }

    result() {
        for (let i = 0; i < this.cars.length; i++) {
            console.log(`no. ${i + 1}`)
            const carInfo = this.getCarInfo(this.cars[i])
            for (const key in carInfo) {
                console.log(`${key}\t: ${carInfo[key]}`)
            }
            console.log('')
        }
    }

    guaranteeSimulation(year){
        console.log(`Hasil simulasi garansi semua mobil pada tahun ${year}:\n`)
        for (let i = 0; i < this.cars.length; i++){
            this.cars[i].warranty+this.cars[i].year>=year? this.cars[i].warrantyStatus=true : this.cars[i].warrantyStatus=false;
            console.log(`no. ${i + 1}`)
            const carInfo = this.getCarInfo(this.cars[i])
            for (const key in carInfo) {
                console.log(`${key}\t: ${carInfo[key]}`)
            }
            console.log('')
            if(this.cars[i].warrantyStatus===false){
                console.log(`status on ${year} this guarantee status is expired\n`)
            } else {console.log(`status on ${year} this guarantee status is active\n`)}
        }
    }

}

const toyota = new CarFactory();
toyota.produce(2020);
toyota.produce(2022)
toyota.result();
toyota.guaranteeSimulation(2025);
