import { PrismaClient } from "@prisma/client";

export async function POST(request: Request){
    const prisma = new PrismaClient()
    const users = prisma.users.create({
        data: {
            person: 'test',
            top: 'string1',
            bottom: 'string2',
        },
    })
    console.log(users)
}