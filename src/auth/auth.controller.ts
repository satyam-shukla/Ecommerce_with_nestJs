import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dtos/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Role } from './enums/role.enum';
import { Roles } from './enums/roles.decorator';
import { RolesGuard } from './enums/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService, private userService:UserService){}
    @Post("/register")
    async register(@Body() createUserDTO:CreateUserDTO){
        const user = await this.userService.addUser(createUserDTO);
        console.log(user)
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.User)
    @Get('/user')
    getProfile(@Request() req){
        return req.user
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('/admin')
    getDashboard(@Request() req) {
        return req.user;
    }
}
