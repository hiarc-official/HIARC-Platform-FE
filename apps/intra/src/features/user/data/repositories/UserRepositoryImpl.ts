// src/data/repositories/UserRepositoryImpl.ts

import { IUserRepository } from '@/features/user/domain/repositories/IUserRepository';
import { UserModel } from '@/features/user/domain/entities/UserModel';
import { BaseAxiosRepository } from '@core/repository/BaseAxiosRepository';
import { AxiosInstance } from 'axios';


/**
 * 예시 레포지토리입니다.
 * - IUserRepository를 구현합니다.
 */
export class UserRepositoryImpl extends BaseAxiosRepository implements IUserRepository {
  constructor(readonly axios: AxiosInstance) {
    super(axios);
  }

  /**
   * #1 id로 사용자 검색
   * @param id 사용자 ID
   * @returns 사용자 ID 또는 null
   */
  async findById(id: string): Promise<UserModel | null> {
    const result = await this.parseData<UserModel>(
      this.axios.get(`/api/users/${id}`),
      (json) => {
        const data = json as unknown;
        return UserModel.create({
          id: data.id,
          email: data.email,
          name: data.name,
        });
      }
    );

    if (Array.isArray(result)) {
      return result[0] ?? null;
    }

    return result;
  }

  /**
   * #2 email로 사용자 검색
   * @param email 사용자 Email
   * @returns 사용자 ID 또는 null
   */
  async findByEmail(email: string): Promise<UserModel | null> {
    return UserModel.create({
      id: '',
      email: email,
      name: '',
    });
  }

  /**
   * #3 사용자 저장
   * @param id 사용자 ID
   */
  async save(id: string): Promise<void> {
    console.log(id);
  }

  /**
   * #4 사용자 삭제
   * @param id 사용자 ID
   */
  async delete(id: string): Promise<void> {
    console.log(id);
  }
}
