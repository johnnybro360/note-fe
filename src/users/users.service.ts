import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Request} from "express";

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService) {
    }

    async getMyUser(id: string, req: Request) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException(
                'User not found'
            );
        }

        const decodedUser = req.user as { id: string, email: string };

        if (user.id !== decodedUser.id) {
            throw new ForbiddenException(
                'You are not allowed to access this resource'
            );
        }

        delete user.hashedPassword;

        return {user};
    }

    async getAllUsers(){
        return this.prisma.user.findMany({
            select: {
                email: true,
                id: true
            }
        });
    }
}
