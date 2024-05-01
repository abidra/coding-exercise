import { Car } from '../models/Car';

export class CarPark {
  private cars: Car[] = [];

  public create(car: Car): string {
    if (
      this.cars.find((c) => c.registrationNumber === car.registrationNumber)
    ) {
      return 'Error: Car with this registration number already exists.';
    }
    this.cars.push(car);
    return 'Car added successfully.';
  }

  public delete(registrationNumber: string): string {
    const carIndex = this.cars.findIndex(
      (c) => c.registrationNumber === registrationNumber
    );
    if (carIndex === -1) {
      return `Error: No car found with ${registrationNumber} registration number.`;
    }
    this.cars.splice(carIndex, 1);
    return 'Car removed successfully.';
  }

  public get(): string {
    if (this.cars.length === 0) {
      return 'No cars in the car park.';
    }
    return this.cars
      .map(
        (car) =>
          `Registration Number: ${car.registrationNumber}, Color: ${car.color}`
      )
      .join('\n');
  }
}
