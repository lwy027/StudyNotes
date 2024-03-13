import { withLatestFrom } from "rxjs";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { IdCard } from "./entity/IdCard";
import { Employee } from "./entity/Employee";
import { Department } from "./entity/Department";

AppDataSource.initialize()
  .then(async () => {
    const d1 = new Department();

    d1.name = "技术部";

    const employee1 = new Employee();
    employee1.name = "小明";
    employee1.department = d1;

    const employee2 = new Employee();
    employee2.name = "小军";
    employee2.department = d1;
    const employee3 = new Employee();
    employee3.name = "小红";
    employee3.department = d1;

    const employee4 = new Employee();
    employee4.name = "小强";
    employee4.department = d1;

    // const ems = await AppDataSource.manager.findAndCount(Employee, {
    //   relations: {
    //     department: true,
    //   },
    // });
    // console.log(ems);

    const e1 = new Employee();
    e1.name = "张三";

    const e2 = new Employee();
    e2.name = "李四";

    const e3 = new Employee();
    e3.name = "王五";

    const d2 = new Department();
    d2.name = "销售部";
    d2.employees = [e1, e2, e3];

    await AppDataSource.manager.save(Department, d2);
  })
  .catch((error) => console.log(error));
