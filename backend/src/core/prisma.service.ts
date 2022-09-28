import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/* This service facilitates usage of the PrismaClient. Other services should use this PrismaService
 * instead of using the PrismaClient directly.
 * More details about prisma usage in this app can be found here: https://docs.nestjs.com/recipes/prisma
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /* This event handler makes prisma connecting the database on module init. Otherwise the db would be connected lazily. */
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
