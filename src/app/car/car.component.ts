import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
  public carInfo = {
    title: 'Audi A6',
    mileage: 0,
    fuelTankValue: 65,
    fuel: 5
  };
  public options = [
    {
      optionName: 'Вид топлива',
      optionVal: 'бензин',
    },
    {
      optionName: 'Объем двигателя',
      optionVal: '1.8 л',
    },
    {
      optionName: 'Максимальная скорость',
      optionVal: '200 км/ч',
    },
    {
      optionName: 'Тип привода',
      optionVal: 'передний',
    },
    {
      optionName: 'Тип КПП',
      optionVal: 'механика',
    },
    {
      optionName: 'Количество дверей',
      optionVal: 5,
    },
  ];

  /**
   * drive - обработчик события отправкм формы "drive-action"
   *    1. Принимает input формы, преобразует его значение в число и очищает input;
   *    2. Делает проверку на то, передалось ли числовое значение, если нет - возвращает сообщение о ошибке;
   *    3. Проверяет, сколько останется топлива, если проехать заданное растояние;
   *    4. Если запас топлива будет больше 0 - обновляет километраж и запас топлива;
   *    5. Если запас топлива будет <= 0:
   *          - считает количетсво километров до окончания запаса топлива;
   *          - обновляет запас топлива и километраж;
   *          - выводит сообщение о том, что топливо закончилось и необходимо заправиться.
  */
  public drive(kilometersInput): void {
    const kilometersNumber: number = +kilometersInput.value;
    kilometersInput.value = '';

    if (!this.checkType(kilometersNumber)) {
      return console.log('Это не число!');
    }

    const fuelResidue: number = this.carInfo.fuel - kilometersNumber * 0.05;

    if (fuelResidue > 0) {
      this.carInfo.fuel = fuelResidue;
      this.carInfo.mileage += kilometersNumber;
    } else {
      const traveledKilometers: number = kilometersNumber - Math.abs(fuelResidue / 0.05);
      this.carInfo.mileage += traveledKilometers;
      this.carInfo.fuel -= traveledKilometers * 0.05;
      return console.log(`Вы проехали ${traveledKilometers} километров, а сейчас вам следует заправиться!`);
    }
  }

  /**
   * refuel - обработчик события отправкм формы "refuel-action"
   *    1. Принимает input формы, преобразует его значение в число и очищает input;
   *    2. Делает проверку на то, передалось ли числовое значение, если нет - возвращает сообщение о ошибке;
   *    3. Делает проверку на то, сколько топлива пытается залить пользователь, если больше объема бака - обновляет запас топлива и
   *       вывоводит сообщение о переизбытке топлива;
   *    4. Обновляет запас топлива, если все хорошо.
   */
  public refuel(fuelAmount): void {
    const fuel: number = +fuelAmount.value;
    fuelAmount.value = '';

    if (!this.checkType(fuel)) {
      return console.log('Это не число!');
    }

    if (fuel > this.carInfo.fuelTankValue) {
      this.carInfo.fuel += this.carInfo.fuelTankValue;
      return console.log(`Вы залили полный бак, а ${fuel - this.carInfo.fuelTankValue}л пролилось мимо`);
    }

    this.carInfo.fuel += fuel;
  }

  /**
   * checkType - проверяет перкданное ей значение на число
   */
  private checkType(val): boolean {
    return !isNaN(parseFloat(val)) && isFinite(val);
  }

  constructor() {}
  ngOnInit() {
  }
}
