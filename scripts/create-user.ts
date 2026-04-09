/**
 * CLI script to add a new user manually.
 * No public registration is allowed — users are created via this script
 * or directly in Prisma Studio (npm run db:studio).
 *
 * Usage:
 *   npx tsx scripts/create-user.ts \
 *     --email user@example.com \
 *     --name "Nombre Apellido" \
 *     --password "SecurePassword123"
 *
 * Optional:
 *   --role ADMIN   (default: MEMBER)
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag)
  return idx !== -1 ? process.argv[idx + 1] : undefined
}

async function main() {
  const email = getArg('--email')
  const name = getArg('--name')
  const password = getArg('--password')
  const roleArg = getArg('--role')
  const role = roleArg === 'ADMIN' ? 'ADMIN' : 'MEMBER'

  if (!email || !name || !password) {
    console.error('Usage: npx tsx scripts/create-user.ts --email <email> --name "<name>" --password <pass>')
    process.exit(1)
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.error(`❌ A user with email ${email} already exists.`)
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { email, name, role, passwordHash },
  })

  console.log(`✅ User created: ${user.email} (${user.role})`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
