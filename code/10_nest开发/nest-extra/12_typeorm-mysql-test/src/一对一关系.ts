import { withLatestFrom } from "rxjs";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { IdCard } from "./entity/IdCard";

AppDataSource.initialize()
  .then(async () => {
    const user = new User();

    user.firstName = "李";
    user.lastName = "级联保存";
    user.age = 32;

    const idCard = new IdCard();

    idCard.cardName = "11111";
    idCard.user = user;

    // const userInfo = await AppDataSource.manager.save(user);
    // const idCardInfo = await AppDataSource.manager
    //   .getRepository(IdCard)
    //   .createQueryBuilder("ic")
    //   .leftJoinAndSelect("ic.user", "u")
    //   .getMany();
    const userInfo = await AppDataSource.manager.find(User, {
      relations: {
        idCard: true,
      },
    });
    console.log(user);

    console.log(userInfo);
  })
  .catch((error) => console.log(error));
