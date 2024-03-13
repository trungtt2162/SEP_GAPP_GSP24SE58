﻿using GenealogyCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Interfaces
{
    public interface IBaseBL<T> 
    {
        Task<T> GetById(object id);
        Task<object> Create(T obj);
        Task<object> Update(T obj);
        Task<object> Delete(T obj);

    }
}
