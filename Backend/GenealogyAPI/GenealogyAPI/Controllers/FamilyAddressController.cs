﻿using AutoMapper;
using GenealogyBL.Interfaces;
using GenealogyCommon.Models.Param;
using GenealogyCommon.Models;
using Microsoft.AspNetCore.Mvc;
using GenealogyCommon.Constant;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using GenealogyDL.Interfaces;

namespace GenealogyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class FamilyAddressController : Controller
    {
        private readonly IFamilyAddressBL _familyAddressBL;
        private readonly IMapper _mapper;
        public FamilyAddressController(IFamilyAddressBL familyAddressBL, IMapper mapper)
        {
            _familyAddressBL = familyAddressBL;
            _mapper = mapper;
        }


        [HttpPost("paging")]
        public async Task<ServiceResult> GetPagingData(PageRequest paggingRequest)
        {
            var serviceResult = new ServiceResult();
            serviceResult.Data = await _familyAddressBL.GetPagingData(paggingRequest);
            return serviceResult;
        }

        [HttpPost("")]
        public async Task<ServiceResult> InsertFamilyAddress(FamilyAddressParam familyAddress)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return serviceResult.OnBadRequest("Invalid Param");
            }
            await _familyAddressBL.Create(_mapper.Map<FamilyAddress>(familyAddress));

            return serviceResult.OnSuccess("Created");
        }

        //[HttpPost("export")]
        //public async Task<ServiceResult> ExportFamilyTree([FromQuery] int idGenealogy)
        //{
        //    var serviceResult = new ServiceResult();
        //    if (!ModelState.IsValid)
        //    {
        //        return serviceResult.OnBadRequest("Invalid Param");
        //    }
        //    //await _familyTreeBL.Create(_mapper.Map<FamilyTree>(familytreeParam));

        //    return serviceResult.OnSuccess("Created");
        //}

        [HttpPut("")]
        public async Task<ActionResult<object>> UpdateFamilyAddress(FamilyAddressParam familyAddress)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _familyAddressBL.Update(_mapper.Map<FamilyAddress>(familyAddress));

            return serviceResult.OnSuccess("Updated");
        }

        [HttpDelete("")]
        public async Task<ActionResult<object>> DeleteFamilyAddress([FromQuery] int id, [FromQuery] int idGenealogy)
        {
            var serviceResult = new ServiceResult();
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _familyAddressBL.DeleteByID(id, idGenealogy);

            return serviceResult.OnSuccess("Deleted");
        }
    }
}