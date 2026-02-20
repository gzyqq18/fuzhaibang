import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'fuzhaibang',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get()
  root() {
    return {
      message: '负债帮后端服务',
      service: 'fuzhaibang',
      version: '1.0.0',
      health: '/health',
      api: '/api',
    };
  }
}
