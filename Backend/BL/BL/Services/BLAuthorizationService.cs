using BL.Api;
using Dal.Api;
using Dal.Models;
using Dal.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLAuthorizationService:IBLauthorization
    {
        ICustomer Castomer;
        IWorker Worker;
        public BLAuthorizationService(IDal dal)
        {
            Castomer = dal.customers;
            Worker =dal.workers;
        }

        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            var customers = await Castomer.Read();
            var customer = customers.FirstOrDefault(c => c.Id == id);

            if (customer == null)
            {
                return null;
            }

            return customer;
        }
        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            var workers = await Worker.Read();
            var worker = workers.FirstOrDefault(w => w.Id == id);
            if (worker == null)
            {
                return null ;
            }
            return worker;
        }
    }
}
