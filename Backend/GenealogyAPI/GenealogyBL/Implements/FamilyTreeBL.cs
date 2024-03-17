using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Constant;
using GenealogyCommon.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Implements;
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
    internal class FamilyTreeBL: BaseBL<FamilyTree>, IFamilyTreeBL
    {
        private readonly IFamilyTreeDL _familyTreeDL;
        private readonly IUserBL _userBL;
        private readonly IAuthService _authService;
        private readonly IUserGenealogyDL _userGenealogyDL;
        private readonly IMapper _mapper;
        public FamilyTreeBL(IMapper mapper, IUserGenealogyDL userGenealogyDL, IAuthService authService,IUserBL userBL,IFamilyTreeDL familyTreeDL, IWebHostEnvironment env) : base(env, familyTreeDL)
        {
            _familyTreeDL = familyTreeDL;
            _userBL = userBL;
            _authService = authService;
            _userGenealogyDL = userGenealogyDL;
            _mapper = mapper;
        }

        public async Task<List<FamilyTreeClient>> GetTrees(object idGenealogy)
        {
            var trees =  await _familyTreeDL.GetAll(idGenealogy);
            var users = await _userGenealogyDL.GetAll(idGenealogy);
            var treeClient = new List<FamilyTreeClient>();
            if (trees.Any())
            {
                foreach(var t in trees)
                {
                    var d = _mapper.Map<FamilyTreeClient>(t);
                    d.Users = users.Where(x => x.IdFamilyTree == t.Id).ToList();
                    treeClient.Add(d);
                }
            }
            var a = BuildTree(_mapper.Map<List<FamilyTreeExport>>(treeClient));
            return treeClient;
        }

        public async Task<object> Create(FamilyTree familyTree)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Add, familyTree.IdGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.Create(familyTree);
        }

        public async Task<bool> Update(FamilyTree familyTree)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Edit, familyTree.IdGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.Update(familyTree);
        }

        public async Task<bool> DeleteByID(int id, int idGenealogy)
        {
            var check = await _userBL.CheckPermissionSubSystem(int.Parse(_authService.GetUserID()), SubSystem.Genealogy, PermissionCode.Delete, idGenealogy);
            if (!check)
            {
                throw new ArgumentException("UnAuthorized");
            }
            return await _familyTreeDL.DeleteById(id, idGenealogy);
        }

        public FamilyTreeExport BuildTree(List<FamilyTreeExport> trees)
        {
            var dictionary = trees.ToDictionary(item => item.Id, item => item);
            var roots = new List<FamilyTreeExport>();
            foreach (var item in trees)
            {
                if (!item.ParentID.HasValue)
                {
                    roots.Add(item);
                }
                else
                {
                    if (dictionary.TryGetValue(item.ParentID.Value ,out var parent))
                    {
                        parent.Children.Add(item);
                    }
                }
            }
            int a = GetWeightTree(roots.FirstOrDefault());
            return roots.FirstOrDefault();
        }

        public int GetWeightTree(FamilyTreeExport familyTree)
        {
            if (familyTree == null)
            {
                return 0;
            }
            if (familyTree.Children.Count == 0)
            {
                return familyTree.Users.Count;
            }
            int weight = familyTree.Users?.Count ?? 0;
            foreach (var item in familyTree.Children)
            {
                weight += GetWeightTree(item);
            }
            familyTree.Weight = weight;
            return weight;

        }

    }
}
