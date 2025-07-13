using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLcustomer
    {
        public Task<List<Customer>> GetAll();
        public Task<Customer> GetCustomerByIdAsync(int id);
        public void Create(Customer customer);
        public Task DeleteCustoer(int id);
    }

}
