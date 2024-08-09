import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body()loginDTO: LoginDto
  ) {
    return this.authService.login(
      loginDTO.username,
      loginDTO.password
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req,
  ) {
    return req.user;
  }
}
