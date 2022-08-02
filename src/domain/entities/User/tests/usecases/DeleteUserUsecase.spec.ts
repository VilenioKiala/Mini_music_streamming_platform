import { User } from "../../User";
import { InMemoryUserRepository } from "../../repository/inMemory";
import { DeleteUserService } from "../../services";
import { usersToTest } from "../data/dataToTest.json";

describe("Delete user usecase", () => {
    const userRepository = new InMemoryUserRepository();

    const mockRepository = {
        saveUser: jest.fn(user => userRepository.saveUser(user)),
        deleteUser: jest.fn(user => userRepository.deleteUser(user)),
        updateUser: jest.fn(),
        getAllUsers: jest.fn(() => userRepository.getAllUsers()),
        getUserByUsername: jest.fn(username =>
            userRepository.getUserByUsername(username)
        ),
        getUserById: jest.fn(id => userRepository.getUserById(id)),
    };

    it("should delete an user", async () => {
        const sut = new DeleteUserService(mockRepository);

        try {
            const userToDelete = await mockRepository.saveUser(
                new User(usersToTest[0])
            );
            await mockRepository.saveUser(new User(usersToTest[1]));

            const userDeleted = await sut.delete({
                id: userToDelete.idUser,
            });

            expect({
                ...userDeleted,
                password: undefined,
                idUser: undefined,
            }).toEqual({
                ...usersToTest[0],
                password: undefined,
                idUser: undefined,
            });
        } catch (error: any) {
            throw error;
        }

        const searchedUser = await mockRepository.getUserByUsername(
            usersToTest[0].username
        );

        expect(searchedUser).toBeNull();
        expect(mockRepository.deleteUser).toBeCalledTimes(1);
    });
});
