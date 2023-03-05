import { PrismaClient, Prisma } from "@prisma/client"
import { jh } from "./jh"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Jonathan Harker",
    email: "jonathan.harker@mailinator.com",
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
