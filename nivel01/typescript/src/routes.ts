import { Request, Response } from "express";
import createUser from "./services/Create_User";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "SamuelSantos@gmail.com",
    password: "2342",
    techs: [
      "Node",
      "React",
      "React native",
      {
        title: "Javascript",
        experience: 100,
      },
    ],
  });
  return response.json({ message: "Hello World" });
}
