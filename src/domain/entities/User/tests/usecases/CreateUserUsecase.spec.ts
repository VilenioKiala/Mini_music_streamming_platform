import { CreateUserService } from "../../services";
import { AlreadyExistAnUserWithTheSameUsernameError } from "../../errors";
import { ValidationError } from "../../../../../helpers/errors/ValidationError";
import { usersToTest } from "../data/dataToTest.json";
import { UserValidator } from "../../validator";
import { InMemoryUserRepository } from "../../repository/inMemory";

describe("Create user use case", () => {
    const userRepository = new InMemoryUserRepository();

    const mockRepository = {
        getAllUsers: jest.fn(() => userRepository.getAllUsers()),
        saveUser: jest.fn(user => userRepository.saveUser(user)),
        deleteUser: jest.fn(),
        updateUser: jest.fn(),
        getUserByUsername: jest.fn(username =>
            userRepository.getUserByUsername(username)
        ),
        getUserById: jest.fn(),
    };

    beforeEach(() => {
        userRepository.clear();
    });

    it("should create a new user", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

        try {
            await sut.create(usersToTest[0]);
            const userSaved2 = await sut.create(usersToTest[1]);

            expect({
                ...userSaved2,
                password: undefined,
                idUser: undefined,
            }).toEqual({
                ...usersToTest[1],
                password: undefined,
                idUser: undefined,
            });

            expect(mockRepository.saveUser).toBeCalledTimes(2);
        } catch (error: any) {
            throw error;
        }

        const allUsersSaved = await mockRepository.getAllUsers();

        expect([
            { ...usersToTest[0], idUser: undefined, password: undefined },
            { ...usersToTest[1], idUser: undefined, password: undefined },
        ]).toEqual(
            allUsersSaved.map(userSaved => {
                return {
                    ...userSaved,
                    idUser: undefined,
                    password: undefined,
                };
            })
        );
        expect(allUsersSaved.length).toBe(2);
    });

    it("should not create a new user because of a missing first name", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

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
        }

        const allUsersSaved = await mockRepository.getAllUsers();
        expect(mockRepository.saveUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(0);
    });

    it("should not create a new user because of a missing last name", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

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
        }

        const allUsersSaved = await mockRepository.getAllUsers();
        expect(mockRepository.saveUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(0);
    });

    it("should not create a new user because of a missing username", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

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
        }

        const allUsersSaved = await mockRepository.getAllUsers();
        expect(mockRepository.saveUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(0);
    });

    it("should not create a new user because of an invalid username", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

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
        }

        const allUsersSaved = await mockRepository.getAllUsers();
        expect(mockRepository.saveUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(0);
    });

    it("should not create a new user because of an existing user with the same username", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

        try {
            await sut.create(usersToTest[0]);
            await sut.create(usersToTest[0]);
        } catch (error: any) {
            expect(error).toBeInstanceOf(
                AlreadyExistAnUserWithTheSameUsernameError
            );
            expect(error.field).toBe("username");
        }

        const allUsersSaved = await mockRepository.getAllUsers();
        expect(mockRepository.saveUser).toBeCalledTimes(1);
        expect(allUsersSaved.length).toBe(1);
    });

    it("should not create a new user because of a missing password", async () => {
        const sut = new CreateUserService(new UserValidator(), mockRepository);

        try {
            await sut.create({
                ...usersToTest[0],
                password: "",
            });
        } catch (error: any) {
            expect(mockRepository.saveUser).toBeCalledTimes(0);
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("password");
            expect(error.message.toLowerCase()).toBe(
                "o campo senha é obrigatório!"
            );
        }

        const allUsersSaved = await mockRepository.getAllUsers();
        expect(mockRepository.saveUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(0);
    });
});
