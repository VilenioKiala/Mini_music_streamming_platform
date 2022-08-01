import { User } from "../../User";
import { InMemoryUserRepository } from "../../repository/inMemory";
import { DeleteUserService } from "../../services";
import { usersToTest } from "../data/dataToTest.json";

describe("Delete user usecase", () => {
    const userRepository = {
        saveUser: jest.fn(),
        deleteUser: jest.fn(),
        getAllUsers: jest.fn(),
        getUserByUsername: jest.fn(),
        getUserById: jest.fn(),
    };

    userRepository.deleteUser.mockResolvedValueOnce(new User(usersToTest[0]));

    it("should delete an user", async () => {
        const sut = new DeleteUserService(userRepository);

        userRepository.getUserById.mockReturnValue({ ...usersToTest[0] });

        try {
            const userDeleted = await sut.delete({ id: "1" });

            expect({
                ...userDeleted,
                password: undefined,
                id: undefined,
            }).toEqual({
                ...usersToTest[0],
                password: undefined,
                id: undefined,
            });
        } catch (error: any) {
            throw error;
        } finally {
            expect(userRepository.deleteUser).toBeCalledTimes(1);
        }
    });
});
