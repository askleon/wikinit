import { Prisma, PrismaClient } from "@prisma/client"

const articlesToCreate = [
    {
        id: 1,
        title: 'Article 1',
        description: 'Description 1',
        content: '<strong>Content 1</strong>',
    },
    {
        id: 2,
        title: 'Article 2',
        description: 'Description 2',
        content: '<italic>Content 2</italic>',
    },
    {
        id: 3,
        title: 'Article 3',
        description: 'Description 3',
        content: '<strong>Content 3</strong>',
    },
]


const client = new PrismaClient()

const seed = async (articles: any) => {
    for (const article of articles) {
        await client.articles.upsert({
            where: { id: article.id },
            update: article,
            create: article,
        })
    }
}

console.log('Seeding...');

try {
    await seed(articlesToCreate);
    console.log('Seed completed');
} catch (error) {
    console.error(error);
} finally {
    await client.$disconnect();
    console.log('db.client Disconnected');
}