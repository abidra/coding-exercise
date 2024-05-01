import { CarPark } from './usecase/CarPark';
import { Car } from './models/Car';
const readline = require('readline');

const carPark = new CarPark();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Displays the main menu with available commands.
 */
function displayMenu(): void {
  console.log('\nSelect command:');
  console.log('1. Add a car');
  console.log('2. Remove a car');
  console.log('3. List all cars');
  console.log('4. Exit');
}

/**
 * Handles the addition of a new car to the car park.
 * Prompts the user for the car's registration number and color, then adds it if valid.
 * @params {registrationNumber: string, color: string}
 */
function handleAddCar(): void {
  rl.question(
    'Enter registration number and color (e.g., AB123 Red): ',
    (input: any) => {
      const [registrationNumber, color] = input.split(' ');
      if (!registrationNumber || !color) {
        console.log('Error: Both registration number and color are required.');
        handleAddCar(); // prompt again if input was invalid
      } else {
        try {
          const result = carPark.create(new Car(registrationNumber, color));
          console.log(result);
        } catch (error: any) {
          console.log(`Error: ${error.message}`);
        }
        main(); // return to main menu
      }
    }
  );
}

/**
 * Handle remove a car from the car park.
 * Prompts the user for the registration number of the car to remove, then removes it if found.
 * @params {registrationNumber: string}
 */
function handleRemoveCar(): void {
  rl.question(
    'Enter the registration number of the car to remove: ',
    (registrationNumber: string) => {
      try {
        const result = carPark.delete(registrationNumber.trim());
        console.log(result);
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      }
      main(); // return to main menu
    }
  );
}

/**
 * Displays all cars currently parked in the car park.
 */
function handleListCars(): void {
  console.log(carPark.get());
  main(); // return to main menu
}

function main() {
  displayMenu();
  rl.question('Enter your choice (1-4): ', (choice: string) => {
    switch (choice.trim()) {
      case '1':
        handleAddCar();
        break;
      case '2':
        handleRemoveCar();
        break;
      case '3':
        handleListCars();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please select a valid option (1-4).');
        main();
    }
  });
}

rl.on('close', () => {
  console.log('\nExiting car park system.');
  process.exit(0);
});

main(); // start the application
