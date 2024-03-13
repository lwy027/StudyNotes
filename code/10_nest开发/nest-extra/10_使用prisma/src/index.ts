import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: "stdout",
//       level: "query",
//     },
//   ],
// });

// async function test2() {
//   const user = await prisma.user.create({
//     data: {
//       name: "东东东",
//       email: "dongdong@dong.com",
//       posts: {
//         create: [
//           {
//             title: "aaa",
//             content: "aaaa",
//           },
//           {
//             title: "bbb",
//             content: "bbbb",
//           },
//         ],
//       },
//     },
//   });
//   console.log(user);
// }

// test2();

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
  ],
});

async function test2() {
  const user = await prisma.user.create({
    data: {
      name: "李莉莉",
      email: "1ed222",
      posts: {
        create: [
          { title: "aaa", content: "bbb" },
          { title: "bbb", content: "ccc" },
        ],
      },
    },
  });

  console.log(user);
}

async function findManty() {
  const user = await prisma.user.findMany({
    where: {
      id: 1,
    },
  });
  const post = await prisma.post.findMany();
  console.log(user);

  console.log(post);
}

// test2();

findManty();
