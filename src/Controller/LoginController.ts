import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    login: async ({ body, BXOK, cookie: { auth }, }: { body: any, BXOK: any, cookie: any }) => {
        // console.log(body)
        const { username, password } = body;
        const user = await prisma.user.findFirst({
            where: { username: username },
        });
        if (user) {
            const isMatch = await Bun.password.verify(password, user.password);
            if (isMatch) {
                const Payload = {
                    id: user.id,
                    username: user.username,
                    level: user.level,

                }
                const token = await BXOK.sign(user);
                return {
                    status: 200,
                    message: "เข้าสู่ระบบสำเร็จ",
                    token: token,
                };
            }
        }
    },
    register: async ({ body }: { body: any }) => {
        // console.log(BXOK)
        const { username, password, passwordconfirm } = body;
        if (password == passwordconfirm) {
            const hash = await Bun.password.hash(password);
            await prisma.user.create({
                data: {
                    username: username,
                    password: hash,
                    type : 2,
                    level: 0,
                }
            })
            return {
                status: 200,
                message: "ลงชื่อเข้าใช้ระบบสำเร็จ",
            };
        } else {
            return {
                status: 400,
                message: "รหัสผ่านไม่ตรงกัน",
            };
        }

    },
    info: async ({ BXOK, cookie: { auth }, }: { BXOK: any, cookie: any }) => {
        // console.log(auth.value)
        const profile = await BXOK.verify(auth.value)
        // console.log(profile)
        return {
            status: 200,
            profile: profile,
        };
    },
}