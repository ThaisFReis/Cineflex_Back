import { prisma } from "../config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.TokenUncheckedCreateInput){
    return await prisma.token.create({
        data,
    })
}


const UserSessionRepository = {
    create,
}

export default UserSessionRepository;