type ApplicationError = {
    name: string;
    message: string;
};

type RequestError = {
    status: number,
    data: object | null,
    statusText: string,
    name: string,
    message: string,
};

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}