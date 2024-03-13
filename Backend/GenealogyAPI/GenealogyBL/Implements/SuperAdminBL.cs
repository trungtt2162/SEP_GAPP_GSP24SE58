﻿using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class SuperAdminBL: BaseBL<User>, ISuperAdminBL
    {
        private readonly IUserDL _userDL;
        private readonly IGenealogyDL _genealDL;
        private readonly IPermissionDL _permissionDL;
        public SuperAdminBL(IPermissionDL permissionDL, IUserDL userDL, IGenealogyDL genealDL, IWebHostEnvironment env) : base(env, userDL)
        {
            _userDL = userDL;
            _genealDL = genealDL;
            _permissionDL = permissionDL;
            var conn = _configuration.GetConnectionString("Genealogy_DB");
            _userDL.InitializeDatabaseContext(conn ?? "");
            _permissionDL.InitializeDatabaseContext(conn ?? "");
            _genealDL.InitializeDatabaseContext(conn ?? "");
        }

        public async Task<object> Create(User user, Genealogy genealogy)
        {
            var idGen = await _genealDL.Create(genealogy);
            var idUser = await _userDL.Create(user);
            var param = new Dictionary<string, object>()
            {
                ["p_UserID"] = idUser,
                ["p_RoleCode"] = nameof(UserRoles.Admin),
                ["P_IdGenealogy"] = idGen,
                ["p_ModifiedBy"] = "superaddmin"
            };
            await _permissionDL.InsertPermission(param);
            return null;
        }
    }
}