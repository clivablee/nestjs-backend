import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UserService } from './services/user/user.service';
import { ExampleMiddleware } from './middleware/example/example.middleware';

@Module({
  controllers: [UsersController],
  providers: [UserService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes('users')
  }
}
