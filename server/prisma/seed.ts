import { PrismaClient, Prisma } from "@prisma/client"
import { jh } from "./jh"

const prisma = new PrismaClient()

const colors = [
  "slate",
  // "gray",
  // "zinc",
  // "neutral",
  // "stone",
  // "red",
  // "orange",
  "amber",
  // "yellow",
  // "lime",
  // "green",
  "emerald",
  // "teal",
  // "cyan",
  "sky",
  // "blue",
  // "indigo",
  "violet",
  // "purple",
  // "fuchsia",
  // "pink",
  "rose",
  // "white",
]

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Jonathan Harker",
    email: "jonathan.harker@mailinator.com",
    notes: {
      create: jh,
    },
  },
  {
    name: "Lucy Westerna",
    email: "lucy.westerna@mailinator.com",
    notes: {
      create: [
        {
          content:
            "Don't let your notes vanish into thin air like a vampire in the morning sun. Use our note-taking app to keep your thoughts organized and safe from the undead.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Capture your ideas before they turn to dust with our note-taking app. Whether you're a night owl or a creature of the day, our app is perfect for any nocturnal note-taker.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Summon the power of the undead to boost your productivity with our Dracula-themed note-taking app. Keep your notes fresh and at your fingertips, just like the Count's victims.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Take your notes to the dark side with our Dracula-inspired app. Whether you're a mortal or a vampire, our app has all the features you need to keep your ideas alive and thriving.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Unleash the power of the night with our Dracula-themed note-taking app. Never miss a detail again, whether you're stalking prey or just taking notes in your coffin.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Become the master of your thoughts with our Dracula-inspired note-taking app. Keep your ideas organized and easily accessible, just like the Count's coffins.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Sink your teeth into a new level of productivity with our Dracula-themed note-taking app. Stay on top of your to-do list and never forget an idea again.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Get your notes in shape with our Dracula-inspired app. Our powerful tools will help you slay your to-do list and conquer your goals, just like the Count dominates his victims.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Transform your notes from ordinary to extraordinary with our Dracula-themed app. Whether you're a mortal or a vampire, our app will help you achieve your goals and reign supreme.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
        },
        {
          content:
            "Experience the dark side of note-taking with our Dracula-inspired app. Our powerful features will help you capture every detail, no matter how elusive or supernatural.",
          textColor: colors[Math.floor(Math.random() * colors.length)],
          cardColor: colors[Math.floor(Math.random() * colors.length)],
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
