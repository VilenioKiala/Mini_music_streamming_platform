import { CreateUserService } from "../../services";
import { AlreadyExistAnUserWithTheSameUsernameError } from "../../errors";
import { ValidationError } from "../../../../../helpers/errors/ValidationError";
import { usersToTest } from "../data/dataToTest.json";
import { UserValidator } from "../../validator";
import { InMemoryUserRepository } from "../../repository/inMemory";

describe("Create user use case", () => {
    const userRepository = {
        getAllUsers: jest.fn(),
        saveUser: jest.fn(),
        deleteUser: jest.fn(),
        getUserByUsername: jest.fn(),
        getUserById: jest.fn(),
    };

    userRepository.saveUser.mockResolvedValueOnce(usersToTest[0]);

    it("should create a new user", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        userRepository.getUserByUsername.mockReturnValue(null);

        try {
            const userSaved = await sut.create(usersToTest[0]);
            expect({
                ...userSaved,
                password: undefined,
            }).toEqual({
                ...usersToTest[0],
                password: undefined,
            });
        } catch (error: any) {
            throw error;
        } finally {
            expect(userRepository.saveUser).toBeCalledTimes(1);
        }
    });

    it("should not create a new user because of a missing first name", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        try {
            await sut.create({
                ...usersToTest[0],
                firstName: "",
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("firstName");
            expect(error.message.toLowerCase()).toBe(
                "o campo primeiro nome é obrigatório!"
            );
        } finally {
            expect(userRepository.saveUser).toBeCalledTimes(0);
        }
    });
    it("should not create a new user because of a missing last name", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        try {
            await sut.create({
                ...usersToTest[0],
                lastName: "",
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("lastName");
            expect(error.message.toLowerCase()).toBe(
                "o campo apelido é obrigatório!"
            );
        } finally {
            expect(userRepository.saveUser).toBeCalledTimes(0);
        }
    });

    it("should not create a new user because of a missing username", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        try {
            await sut.create({
                ...usersToTest[0],
                username: "",
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("username");
            expect(error.message.toLowerCase()).toBe(
                "o campo nome de usuário é obrigatório!"
            );
        } finally {
            expect(userRepository.saveUser).toBeCalledTimes(0);
        }
    });

    it("should not create a new user because of an invalid username", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        try {
            await sut.create({
                ...usersToTest[0],
                username: "vilenio kiala",
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("username");
            expect(error.message.toLowerCase()).toBe(
                "o campo nome de usuário só pode conter letras e números!"
            );
        } finally {
            expect(userRepository.saveUser).toBeCalledTimes(0);
        }
    });

    it("should not create a new user because of an existing user with the same username", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        userRepository.getUserByUsername.mockReturnValue(usersToTest[0]);

        try {
            await sut.create(usersToTest[0]);
        } catch (error: any) {
            expect(error).toBeInstanceOf(
                AlreadyExistAnUserWithTheSameUsernameError
            );
            expect(error.field).toBe("username");
        } finally {
            expect(userRepository.saveUser).toBeCalledTimes(0);
        }
    });

    it("should not create a new user because of a missing password", async () => {
        const sut = new CreateUserService(new UserValidator(), userRepository);

        userRepository.getAllUsers.mockReturnValue(null);

        try {
            await sut.create({
                ...usersToTest[0],
                password: "",
            });
        } catch (error: any) {
            expect(userRepository.saveUser).toBeCalledTimes(0);
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("password");
            expect(error.message.toLowerCase()).toBe(
                "o campo senha é obrigatório!"
            );
        }
    });
});
