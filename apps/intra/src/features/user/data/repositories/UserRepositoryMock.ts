// src/data/repositories/UserRepositoryMock.ts

import { IUserRepository } from '@/features/user/domain/repositories/IUserRepository';
import { UserModel } from '@/features/user/domain/entities/UserModel';

/**
 * 사용자 정보에 대한 Mock 저장소입니다.
 * 실제 API가 아닌, 하드코딩된 데이터를 사용합니다.
 */
export class UserRepositoryMock implements IUserRepository {
  private mockUsers: UserModel[] = [
    UserModel.create({ id: '1', email: 'test1@example.com', name: '테스트1' }),
    UserModel.create({ id: '2', email: 'test2@example.com', name: '테스트2' }),
  ];

  async findById(id: string): Promise<UserModel | null> {
    const found = this.mockUsers.find((user) => user.id === id);
    return found ?? null;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const found = this.mockUsers.find((user) => user.email === email);
    return found ?? null;
  }

  async save(id: string): Promise<void> {
    // 이미 존재하지 않으면 더미 사용자 추가
    const exists = this.mockUsers.find((user) => user.id === id);
    if (!exists) {
      this.mockUsers.push(
        UserModel.create({ id, email: `${id}@mock.com`, name: `사용자 ${id}` })
      );
    }
  }

  async delete(id: string): Promise<void> {
    this.mockUsers = this.mockUsers.filter((user) => user.id !== id);
  }
}

// (선택) 외부에서 직접 사용할 수 있도록 mocks export
export const mocks = {
  userRepository: new UserRepositoryMock(),
};