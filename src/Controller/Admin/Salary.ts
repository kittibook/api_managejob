import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
    addType : async({ body }: { body: any }) => {
        try {
            const { userid, type } = body;
        await prisma.user.update({
            where : {id : userid},
            data : {
                type : type
            }
        })
        await prisma.salary.create({
            data : {
                UserId : userid,
                salary : 0,
                ticket : 0
            }
        })
        return {
            status: 200,
            message: "เพิ่ม Type สำเร็จ",
        };

        } catch (error) {
            return {
                status: 400,
                error: error,
            };
        }

    },
    changType : async({ body }: { body: any }) => {
        try {
            const { userid, type } = body;
            await prisma.user.update({
                where : {id : userid},
                data : {
                    type : type
                }
            })
    
            return {
                status: 200,
                message: "เพิ่ม Type สำเร็จ",
            }; 
        } catch (error) {
            return {
                status: 400,
                error: error,
            };
        }
    },
    changSalary : async({ body }: { body: any }) => {
        try {
            const { userid , salary } = body;
            await prisma.salary.update({
                where : { UserId : userid },
                data : { 
                    salary : salary
                }
            })

            // HISTORY
            await prisma.history.create({
                data :{
                  type :   0,
                  typelable : "ปรับเปลี่ยนเลขเงินเดือน",
                  UserId : userid,
                  amount : salary
                }
            })


            return {
                status: 200,
                message: "เพิ่ม Salary สำเร็จ",
            };
        } catch (error) {
            return {
                status: 400,
                error: error,
            };
        }
    },
    addSalary : async({ body }: { body: any }) => {
        try {
            const { userid , salary } = body;
            await prisma.salary.update({
                where : { UserId : userid },
                data : { 
                    salary : {
                        increment : salary
                    }
                }
            })
            // HISTORY
            await prisma.history.create({
                data :{
                  type :   0,
                  typelable : "เพิ่ม เงินเดือน",
                  UserId : userid,
                  amount : salary
                }
            })
            return {
                status: 200,
                message: "เพิ่ม Salary สำเร็จ",
            };
        } catch (error) {
            return {
                status: 400,
                error: error,
            };
        }
    },
    reduceSalary : async({ body }: { body: any }) => {
        try {
            const { userid , salary } = body;
            await prisma.salary.update({
                where : { UserId : userid },
                data : { 
                    salary : {
                        decrement : salary
                    }
                }
            })
            // HISTORY
            await prisma.history.create({
                data :{
                  type :   0,
                  typelable : "เบิก เงินเดือน",
                  UserId : userid,
                  amount : salary
                }
            })
            return {
                status: 200,
                message: "เพิ่ม Salary สำเร็จ",
            };
        } catch (error) {
            return {
                status: 400,
                error: error,
            };
        }
    },
    changTicket : async({ body }: { body: any }) => {
        try {
            const { userid , ticket } = body;
            await prisma.salary.update({
                where : { UserId : userid },
                data : { 
                    ticket : ticket,
                    salary : ticket * 9
                }
            })
            // HISTORY
            await prisma.history.create({
                data :{
                  type :   1,
                  typelable : "ปรับเปลี่ยน ตั๋ว",
                  UserId : userid,
                  amount : ticket
                }
            })
            return {
                status: 200,
                message: "เพิ่ม Salary สำเร็จ",
            };
        } catch (error) {
            return {
                status: 400,
                error: error,
            }; 
        }
    },
    addTicket : async({ body }: { body: any }) => {
        try {
            const { userid , ticket } = body;
            await prisma.salary.update({
                where : { UserId : userid },
                data : { 
                    ticket : {
                        increment : ticket
                    },
                    salary : {
                        increment : ticket * 9
                    }
                }
            })
            // HISTORY
            await prisma.history.create({
                data :{
                type :   1,
                typelable : "เพิ่ม ตั๋ว",
                UserId : userid,
                amount : ticket
                }
            })

            return {
                status: 200,
                message: "เพิ่ม Salary สำเร็จ",
            };
        } catch (error) {
            return {
                status: 400,
                error: error,
            }; 
        }
    },
    reduceTicket : async({ body }: { body: any }) => {
        try {
            const { userid , ticket } = body;
            await prisma.salary.update({
                where : { UserId : userid },
                data : { 
                    ticket : {
                        decrement : ticket
                    },
                    salary : {
                        decrement : ticket * 9
                    }
                }
            })
            // HISTORY
            await prisma.history.create({
                data :{
                type :   1,
                typelable : "ลด ตั๋ว",
                UserId : userid,
                amount : ticket
                }
            })
            return {
                status: 200,
                message: "เพิ่ม Salary สำเร็จ",
            };
        } catch (error) {
            return {
                status: 400,
                error: error,
            };
        }
    },
 }