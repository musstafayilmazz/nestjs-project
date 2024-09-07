import {Injectable, NotFoundException} from '@nestjs/common';
import { Repository} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { User} from "./user.entity";

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private repo: Repository<User>) {}


    create(email: string, password:string){
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    list(){
        return this.repo.find()
    }

    async findById(id:number): Promise<User> {
        const user = await this.repo.findOne({
            where: {id},
        });
        if(!user){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
}


