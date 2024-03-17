﻿using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IFamilyHistoryBL: IBaseBL<FamilyHistory>
    {
        Task<FamilyHistory> GetByGenealogyId(object id);
    }
}
