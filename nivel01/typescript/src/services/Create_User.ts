interface TechsProperties {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | TechsProperties>;
}

export default function createUser({
  name = "",
  email,
  password,
  techs,
}: CreateUserData) {
  const user = {
    name,
    email,
    password,
    techs,
  };

  return user;
}
