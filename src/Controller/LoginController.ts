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
                const token = await BXOK.sign(Payload);
                if(user.level == 0) {
                    return {
                        status: 200,
                        message: "เข้าสู่ระบบสำเร็จ",
                        token: token,
                    };
                }
                if(user.level == 1) {
                    return {
                        status: 200,
                        success : true,
                        message: "เข้าสู่ระบบสำเร็จ",
                        token: token,
                    };
                }
                
            } else {
                return {
                    status: 400,
                    message: "รหัสผ่านไม่ถูกต้อง",
                };
            }
        } else {
            return {
                status: 400,
                message: "ไม่พบชื่อผู้ใช้งาน",
            };
        }
    },
    register: async ({ body }: { body: any }) => {
        // console.log(BXOK)
        const { username, password, passwordconfirm } = body;
        if (password == passwordconfirm) {
            const hash = await Bun.password.hash(password);
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hash,
                    // job : "",
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
    info: async ({ BXOK, headers }: { BXOK: any, headers: any }) => {
        console.log(headers.authorization);
        const authHeader = headers.authorization;
    
        if (!authHeader) {
            return { status: 401, message: "Missing Authorization Header" };
        }
    
        const token = authHeader.split(' ')[1];
        if (!token) {
            return { status: 401, message: "Invalid Authorization Format. Expected 'Bearer <token>'" };
        }
    
        try {
            const profile = await BXOK.verify(token);
    
            if (!profile) {
                // กรณี BXOK.verify() คืนค่า false
                return { status: 401, message: "Unauthorized - Invalid Token" };
            }
    
            return { status: 200, profile: profile };
        } catch (error) {
            console.error("Verification Error:", error);
            return { status: 401, message: "Unauthorized - Token Verification Failed" };
        }
    }     
    // info: async ({ BXOK, cookie: { auth } }: { BXOK: any, cookie: any }) => {
    //     try {
    //         if (!auth?.value) {
    //             console.error("Auth value is missing");
    //             return { status: 401, message: "Missing Authorization" };
    //         }
    //         console.log("Auth Value Received:", auth.value);
    //         const profile = await BXOK.verify(auth.value);
    //         return { status: 200, profile };
    //     } catch (error) {
    //         console.error("Error during verification:", error.message);
    //         return { status: 401, message: "Unauthorized" };
    //     }
    // }
    
}