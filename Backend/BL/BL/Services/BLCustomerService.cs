using BL.Api;
using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLCustomerService:IBLcustomer
    {
        ICustomer Cast;
        public BLCustomerService(IDal dal) {
            Cast = dal.customers;
        }

        public async Task<Customer> Create(Customer customer)
        {
           return await Cast.Create(customer);
        }


        public async Task<List<Customer>> GetAll()
        {
            return await Cast.Read();
        }


        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            var customers = await Cast.Read();
            var customer = customers.FirstOrDefault(c => c.Id == id);

            if (customer == null)
            {
                throw new Exception("Customer is not found");
            }

            return customer;
        }
        public async Task DeleteCustoer(int id)
        {
            var customers = await Cast.Read();
            var customerToDelete = customers.FirstOrDefault(cust => cust.Id == id);


            if (customerToDelete != null)
            {
                Cast.Delete(customerToDelete);
                
            }
            else
            {
                throw new Exception($"Customer with ID {id} not found.");
            }
        }
    }
}

