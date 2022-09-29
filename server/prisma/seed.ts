import { PrismaClient } from '@prisma/client';
import * as csv from 'csvtojson';
import * as randomstring from 'randomstring';
import { fetchCovers } from './utils';

const prisma = new PrismaClient();

async function main() {
  try {
    const jsonBooks = await csv().fromFile('./books.csv');
    const bookData = await fetchCovers(jsonBooks);

    console.log(`Dumping ${bookData?.length} books into the database`);
    let countDatasetsWritten = 0;
    for await (const book of bookData) {
      const id = randomstring.generate(7);
      await prisma.book.create({ data: { ...book, id } });
      await prisma.bookMini.create({
        data: {
          author: book.author,
          genre: book.genre,
          cover: book.cover,
          title: book.title,
          listPrice: book.listPrice,
          currency: book.currency,
          country: book.country,
          averageRating: book.averageRating,
          ratingsCount: book.ratingsCount,
          id
        },
      });

      countDatasetsWritten += 1;
      if (countDatasetsWritten % 50 === 0) {
        console.log(`${countDatasetsWritten} books written to database.`);
      }
    }

    console.log(
      `Finished dumping books data into the database. ${countDatasetsWritten} books written.`,
    );
  } catch (error) {
    console.log(error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
