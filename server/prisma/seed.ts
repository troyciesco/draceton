import { PrismaClient, Prisma } from "@prisma/client"
import { jh } from "./jh"

const prisma = new PrismaClient()

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     notes: {
//       create: [
//         {
// //           content: "https://slack.prisma.io",
//         },
//       ],
//     },
//   },
//   {
//     name: "Nilu",
//     email: "nilu@prisma.io",
//     notes: {
//       create: [
//         {
//           title: "Follow Prisma on Twitter",
//           content: "https://www.twitter.com/prisma",
//         },
//       ],
//     },
//   },
//   {
//     name: "Mahmoud",
//     email: "mahmoud@prisma.io",
//     notes: {
//       create: [
//         {
//           title: "Ask a question about Prisma on GitHub",
//           content: "https://www.github.com/prisma/prisma/discussions",
//         },
//         {
//           title: "Prisma on YouTube",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
// ]

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Jonathan Harker",
    email: "jonathan.harker@mailinator.com",
    tags: {
      create: [{ name: "Ch. 1" }],
    },
    notes: {
      create: jh,
    },
  },
  {
    name: "Mina Harker",
    email: "mina.harker@mailinator.com",
    notes: {
      create: [
        {
          content: "https://slack.prisma.io",
          tags: {
            create: [{ name: "test tag" }],
          },
        },
      ],
    },
  },
  {
    name: "Lucy Westenra",
    email: "lucy.westenra@mailinator.com",
    notes: {
      create: [
        {
          content: "https://slack.prisma.io",
          tags: {
            create: [{ name: "test tag" }],
          },
        },
      ],
    },
  },
  {
    name: "John Seward",
    email: "john.seward@mailinator.com",
    notes: {
      create: [
        {
          content: "https://slack.prisma.io",
          tags: {
            create: [{ name: "test tag" }],
          },
        },
      ],
    },
  },
  {
    name: "Van Helsing",
    email: "van.helsing@mailinator.com",
    notes: {
      create: [
        {
          content: "https://slack.prisma.io",
          tags: {
            create: [{ name: "test tag" }],
          },
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
