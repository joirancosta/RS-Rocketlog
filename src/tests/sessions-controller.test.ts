import request from "supertest"
import { prisma } from "@/database/prisma"
import { app } from "@/app"

describe("SessionsController", () => {
  let user_id: string

  afterAll(async () => {
      await prisma.user.delete({ where: { id: user_id }})
  })

  it("should authenticate a and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Auth Test User",
      email: "authtestuser@example.com",
      password: "1234567"
    })

    user_id = userResponse.body.id

    const sessionsResponse = await request(app).post("/sessions").send({
      email: "authtestuser@example.com",
      password: "1234567"
    })

    expect(sessionsResponse.status).toBe(200)
    expect(sessionsResponse.body.token).toEqual(expect.any(String))
  })
})