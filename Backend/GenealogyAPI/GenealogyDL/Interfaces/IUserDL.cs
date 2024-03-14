﻿using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyDL.Implements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IUserDL: IBaseDL<User>
    {
        Task<bool> SaveCredential(Credential credential);

        Task<int> Create(User user);

        Task<bool> CheckUserExist(string userName);

        Task<T> GetUserPassword<T>(string userName);

        Task<int> CreateAdmin(User user);
        Task<UserRole> GetUserRole(int userID);
        Task<User> GetUserByUserName(string userName);
        Task<List<User>> GetAllUserByRole(string roleCode, int idGen);
    }
}
