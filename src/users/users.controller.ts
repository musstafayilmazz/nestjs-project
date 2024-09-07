import {Body, Controller, HttpCode, Post, HttpStatus, Get, Param} from '@nestjs/common';
import { CreateUserDto} from "./dtos/create-user.dto";
import { UsersService} from "./users.service";
import {User} from "./user.entity";

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password)
        return {message : "User successfully created!, "}
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    listUsers() {
        return this.usersService.list()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number) {
        return this.usersService.findById(id)
    }
}
