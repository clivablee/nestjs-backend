import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import type { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) { }
  
  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    console.log("[3] CONTROLLER: ", req.user)
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req: Request) {
    console.log("[6] PROTECTED CONTROLLER: ", req.user)
    req.user
  }

}
