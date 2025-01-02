import { Elysia } from "elysia";
import LoginController from "./Controller/LoginController";
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt';
import Salary from "./Controller/Admin/Salary";
import { cors } from '@elysiajs/cors'
import Get from "./Controller/Admin/Get";
import user from "./Controller/Admin/user";
const app = new Elysia()
  .use(cors())
  .use(
    swagger({
        documentation: {
            info: {
                title: 'Elysia Documentation',
                version: '1.0.0'
            },
            tags: [
              { name: 'User', description: 'User endpoints' },
              { name: 'Auth', description: 'Auth endpoints' },
              { name: 'Admin', description: 'Admin endpoints' }
          ]
        }
    })
  )
  .use(
    jwt({
      name: "BXOK", // ชื่อที่จะใช้ใน context ของ JWT
      secret: "BXOKweBfivem_071246_byBXOK", // secret key สำหรับ sign JWT
      exp: "2h", // กำหนดเวลาหมดอายุของ token
    })
  )
  .post("/login", LoginController.login, {detail: {tags: ['Auth']}})
  .post("/register", LoginController.register, {detail: {tags: ['Auth']}})
  .post("/info", LoginController.info, {detail: {tags: ['Auth']}})


  .post("/addType", Salary.addType, {detail: {tags: ['Admin']}})
  .post("/changeType", Salary.changType, {detail: {tags: ['Admin']}})
  .post("/addSalary", Salary.addSalary, {detail: {tags: ['Admin']}})
  .post("/changeSalary", Salary.changSalary, {detail: {tags: ['Admin']}})
  .post("/reduceSalary", Salary.reduceSalary, {detail: {tags: ['Admin']}})
  .post("/changeTicket", Salary.changTicket, {detail: {tags: ['Admin']}})
  .post("/addTicket", Salary.addTicket, {detail: {tags: ['Admin']}})
  .post("/reduceTicket", Salary.reduceTicket, {detail: {tags: ['Admin']}})
  .get("/userall", Get.getUserAll, {detail: {tags: ['Admin']}})
  .post("/userhistory", Get.getHistory, {detail: {tags: ['Admin']}})
  .post("/userhistoryall", Get.getHistoryall, {detail: {tags: ['Admin']}})
  .post("/updateuser", user.updateuser, {detail: {tags: ['Admin']}})
  .post("/deluser", user.deluser, {detail: {tags: ['Admin']}})
  .post("/getdas", Get.getdas, {detail: {tags: ['Admin']}})


  .post("/user", Get.getUser, {detail: {tags: ['User']}})
  .post("/userhistory", Get.getHistory, {detail: {tags: ['User']}})

  .listen(3021);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
