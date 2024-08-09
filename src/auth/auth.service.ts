import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(Users: User): Promise<any>{
    return this.authRepository.save(Users);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
   const user = await this.userService.findByUsername(username);
   if(user?.password !== password){
     throw new UnauthorizedException();
   }
   const payload = { sub: user.id, username: user.username };
   const access_token = this.jwtService.sign(payload);
   return {
     access_token
   };
  }

}
