import { CarPark } from '../usecase/CarPark';
import { Car } from '../models/Car';

describe('CarPark', () => {
  let carPark: CarPark;

  beforeEach(() => {
    carPark = new CarPark();
  });

  test('adds a car successfully', () => {
    const result = carPark.create(new Car('AB123', 'Red'));
    expect(result).toBe('Car added successfully.');
    expect(carPark.get()).toContain('AB123');
  });

  test('prevents adding a duplicate car', () => {
    carPark.create(new Car('AB123', 'Red'));
    const result = carPark.create(new Car('AB123', 'Blue'));
    expect(result).toBe(
      'Error: Car with this registration number already exists.'
    );
  });

  test('removes a car successfully', () => {
    carPark.create(new Car('AB123', 'Red'));
    const result = carPark.delete('AB123');
    expect(result).toBe('Car removed successfully.');
    expect(carPark.get()).not.toContain('AB123');
  });

  test('handles removing a non-existent car', () => {
    const result = carPark.delete('AB123');
    expect(result).toBe('Error: No car found with AB123 registration number.');
  });

  test('lists cars in the car park', () => {
    carPark.create(new Car('AB123', 'Red'));
    carPark.create(new Car('CD456', 'Blue'));
    const carsList = carPark.get();
    expect(carsList).toContain('AB123');
    expect(carsList).toContain('CD456');
  });

  test('returns message when no cars are present', () => {
    expect(carPark.get()).toBe('No cars in the car park.');
  });
});
