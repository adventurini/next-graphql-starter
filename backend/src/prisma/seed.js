const bcrypt = require('bcryptjs');

const prisma = require('../prismaClient');

async function main() {
  const ideas = () => {
    const amtIdeas = 10;
    const ideas = [];

    for (let i = 1; i < amtIdeas; i++) {
      ideas.push({ content: 'seeded idea ' + i });
    }

    return ideas;
  };

  await prisma.mutation.createUser({
    data: {
      email: 'user@email.com',
      password: await bcrypt.hash('User123#', 10),
      ideas: { create: ideas() }
    }
  });
}

main().catch(e => console.error(e));
