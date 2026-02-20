import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { KnowledgeModule } from '@/knowledge/knowledge.module';
import { ChatModule } from '@/chat/chat.module';
import { HealthModule } from '@/health/health.module';

@Module({
  imports: [KnowledgeModule, ChatModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
