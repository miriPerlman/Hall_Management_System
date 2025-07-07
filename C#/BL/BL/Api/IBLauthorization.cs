using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLauthorization
    {
        public Task<Worker> GetWorkerByIdAsync(int id);
        public Task<Customer> GetCustomerByIdAsync(int id);

    }
}
