/**
 * Prisma seed – creates the initial admin user.
 *
 * Run: npx prisma db seed
 *
 * ⚠️  Change the password after first login in production.
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...\n')

  const passwordHash = await bcrypt.hash('Ligrow2024!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ligrow.com' },
    update: {},
    create: {
      email: 'admin@ligrow.com',
      name: 'Administrador',
      role: 'ADMIN',
      passwordHash,
    },
  })

  console.log(`✅ Admin user ready`)
  console.log(`   Email:      ${admin.email}`)
  console.log(`   Password:   Ligrow2024!`)
  console.log(`   Role:       ${admin.role}`)
  console.log(`\n⚠️  Cambia la contraseña en producción.`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
