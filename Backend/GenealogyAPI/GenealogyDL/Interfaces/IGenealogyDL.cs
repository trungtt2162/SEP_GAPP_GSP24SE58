﻿using GenealogyCommon.Models;
using GenealogyDL.Implements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyDL.Interfaces
{
    public interface IGenealogyDL: IBaseDL<Genealogy>
    {
        Task<int> Create(Genealogy gen);
    }
}
