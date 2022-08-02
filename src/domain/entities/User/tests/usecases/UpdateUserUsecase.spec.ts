import { UpdateUserService } from "./../../services/UpdateUserService";
import { InMemoryUserRepository } from "../../repository/inMemory";
import { usersToTest } from "../data/dataToTest.json";
import { UserValidator } from "../../validator";
import { CreateUserService } from "../../services";
import { ValidationError } from "../../../../../helpers/errors";
import { AlreadyExistAnUserWithTheSameUsernameError } from "../../errors";

describe("Update user usecase tests", () => {
    const userRepository = new InMemoryUserRepository();
    const mockRepository = {
        getAllUsers: jest.fn(() => userRepository.getAllUsers()),
        saveUser: jest.fn(user => userRepository.saveUser(user)),
        deleteUser: jest.fn(),
        updateUser: jest.fn(user => userRepository.updateUser(user)),
        getUserByUsername: jest.fn(),
        getUserById: jest.fn(id => userRepository.getUserById(id)),
    };

    beforeEach(() => {
        userRepository.clear();
    });

    it("should update the first name of an existing user", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            const userUpdated = await sut.update({
                id: userSaved.idUser,
                data: { firstName: "vil" },
            });

            expect({
                ...userUpdated,
            }).toEqual({
                ...userSaved,
                firstName: "vil",
            });
        } catch (error: any) {
            throw error;
        }

        const allUsersSaved = await mockRepository.getAllUsers();

        expect([
            {
                ...usersToTest[0],
                firstName: "vil",
                idUser: undefined,
                password: undefined,
            },
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

        expect(mockRepository.updateUser).toBeCalledTimes(1);
    });

    it("should update the last name of an existing user", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            const userUpdated = await sut.update({
                id: userSaved.idUser,
                data: { lastName: "kibala" },
            });

            expect({
                ...userUpdated,
            }).toEqual({
                ...userSaved,
                lastName: "kibala",
            });
        } catch (error: any) {
            throw error;
        }

        const allUsersSaved = await mockRepository.getAllUsers();

        expect([
            {
                ...usersToTest[0],
                lastName: "kibala",
                idUser: undefined,
                password: undefined,
            },
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

        expect(mockRepository.updateUser).toBeCalledTimes(1);
    });

    it("should update the username of an existing user", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            const userUpdated = await sut.update({
                id: userSaved.idUser,
                data: { username: "joao" },
            });

            expect({
                ...userUpdated,
            }).toEqual({
                ...userSaved,
                username: "joao",
            });
        } catch (error: any) {
            throw error;
        }

        const allUsersSaved = await mockRepository.getAllUsers();

        expect([
            {
                ...usersToTest[0],
                username: "joao",
                idUser: undefined,
                password: undefined,
            },
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

        expect(mockRepository.updateUser).toBeCalledTimes(1);
    });

    it("should update the password of an existing user", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            const passwordSaved = userSaved.password;
            await createUserService.create(usersToTest[1]);
            const userUpdated = await sut.update({
                id: userSaved.idUser,
                data: { password: "ell" },
            });
            const passwordUpdated = userUpdated.password;

            expect(passwordSaved).not.toBe(passwordUpdated);
            expect({
                ...userUpdated,
                password: undefined,
            }).toEqual({
                ...userSaved,
                password: undefined,
            });
        } catch (error: any) {
            throw error;
        }

        const allUsersSaved = await mockRepository.getAllUsers();

        expect([
            {
                ...usersToTest[0],
                idUser: undefined,
                password: undefined,
            },
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

        expect(mockRepository.updateUser).toBeCalledTimes(1);
    });

    it("should not update an user because of a missing first name", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            await sut.update({
                id: userSaved.idUser,
                data: { firstName: "" },
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("firstName");
            expect(error.message.toLowerCase()).toBe(
                "o campo primeiro nome é obrigatório!"
            );
        }
        const allUsersSaved = await mockRepository.getAllUsers();

        expect(mockRepository.updateUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(2);
    });

    it("should not update an user because of a missing last name", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            await sut.update({
                id: userSaved.idUser,
                data: { lastName: "" },
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("lastName");
            expect(error.message.toLowerCase()).toBe(
                "o campo apelido é obrigatório!"
            );
        }
        const allUsersSaved = await mockRepository.getAllUsers();

        expect(mockRepository.updateUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(2);
    });

    it("should not update an user because of a missing username", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            await sut.update({
                id: userSaved.idUser,
                data: { username: "" },
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("username");
            expect(error.message.toLowerCase()).toBe(
                "o campo nome de usuário é obrigatório!"
            );
        }
        const allUsersSaved = await mockRepository.getAllUsers();

        expect(mockRepository.updateUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(2);
    });

    it("should not update an user because of an invalid username", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            await createUserService.create(usersToTest[1]);
            await sut.update({
                id: userSaved.idUser,
                data: { username: "vilenio kiala" },
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("username");
            expect(error.message.toLowerCase()).toBe(
                "o campo nome de usuário só pode conter letras e números!"
            );
        }
        const allUsersSaved = await mockRepository.getAllUsers();

        expect(mockRepository.updateUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(2);
    });

    it("should not update an user because of an existing user with the same username", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            const userSaved2 = await createUserService.create(usersToTest[1]);
            await sut.update({
                id: userSaved.idUser,
                data: { username: userSaved2.username },
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(
                AlreadyExistAnUserWithTheSameUsernameError
            );
            expect(error.field).toBe("username");
        }
        const allUsersSaved = await mockRepository.getAllUsers();

        expect(mockRepository.updateUser).toBeCalledTimes(1);
        expect(allUsersSaved.length).toBe(2);
    });

    it("should not update an user because of a missing password", async () => {
        const createUserService = new CreateUserService(
            new UserValidator(),
            mockRepository
        );
        const sut = new UpdateUserService(new UserValidator(), mockRepository);

        try {
            const userSaved = await createUserService.create(usersToTest[0]);
            const userSaved2 = await createUserService.create(usersToTest[1]);
            await sut.update({
                id: userSaved.idUser,
                data: { password: "" },
            });
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.field).toBe("password");
        }
        const allUsersSaved = await mockRepository.getAllUsers();

        expect(mockRepository.updateUser).toBeCalledTimes(0);
        expect(allUsersSaved.length).toBe(2);
    });
});
