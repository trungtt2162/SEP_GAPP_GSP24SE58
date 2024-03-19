﻿using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Implements;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyCommon.Models.Authen;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
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
        private readonly IPasswordHasher _passwordHasher;
        private readonly IEmailSender _emailSender;
        private readonly IFamilyHistoryDL _familyHistoryDL; 
        public SuperAdminBL(IFamilyHistoryDL familyHistoryDL, IEmailSender emailSender, IPasswordHasher passwordHasher, IPermissionDL permissionDL, IUserDL userDL, IGenealogyDL genealDL, IWebHostEnvironment env) : base(env, userDL)
        {
            _userDL = userDL;
            _genealDL = genealDL;
            _permissionDL = permissionDL;
            _passwordHasher = passwordHasher;
            _emailSender = emailSender;      
            _familyHistoryDL = familyHistoryDL;
        }

        public async Task<object> Create(User user, Genealogy genealogy)
        {
            var idGen = await _genealDL.Create(genealogy);
            var idUser = await _userDL.Create(user);
            var rawPassword = _passwordHasher.GenerateRandomPassword(12);
            // Gen password default: 
            var creden = new Credential()
            {
                UserName = user.Email,
                Password = rawPassword
            };
            // await _emailSender.SendEmailAsync("=", "xin chao", "xin chai");
            creden.Password = await _passwordHasher.HashPassword(creden.Password);
            await _userDL.SaveCredential(creden);
            // todo : Send mail
            var recip = new JObject {
                                {
                                    "Email",
                                    user.Email
                                }, {
                                    "Name",
                                   user.FirstName
                                }
                                };
            await _emailSender.SendEmailAsync(new JArray() { recip }, "Đã tạo tài khoản", $"username: {user.Email}, password: {rawPassword}", $"username: {user.Email}, password: {rawPassword}");
            var param = new Dictionary<string, object>()
            {
                ["p_UserID"] = idUser,
                ["p_RoleCode"] = nameof(UserRoles.Admin),
                ["P_IdGenealogy"] = idGen,
                ["p_ModifiedBy"] = "superaddmin"
            };
            await _permissionDL.InsertPermission(param);
            var historyFamily = new FamilyHistory()
            {

                IDGenealogy = idGen,
                Image = "",
                Description = ""
            };
            await _familyHistoryDL.Create(historyFamily);
            await _userDL.InsertUserRole(idUser, nameof(UserRoles.Admin));
            return null;
        }

        override
        public void GetCustomParamPaging(PageRequest pagingRequest){
            if (string.IsNullOrWhiteSpace(pagingRequest.Condition)){
                pagingRequest.Condition = " 1 = 1 ";
            }

            if (!string.IsNullOrWhiteSpace(pagingRequest.SearchKey))
            {
                pagingRequest.Condition += $" and Name like '%{pagingRequest.SearchKey}%'";
            }
            var users = _userDL.GetAllUserByRole(UserRoles.Admin, -1).Result;
            if (users != null && users.Count > 0){
                var con = new StringBuilder();
                con.Append(" and Id in ( ");
                users.ForEach(user =>
                {
                    con.Append($" {user.UserID},");
                });
                con.Append(" -1 ) ");
                pagingRequest.Condition += con.ToString() ;
            }else {
                pagingRequest.Condition += " Id is null ";
            }
            
        }
    }
}
