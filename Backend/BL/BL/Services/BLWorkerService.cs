using BL.Api;
using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLWorkerService:IBLworker
    {
        IWorker worker;
        public BLWorkerService(IDal dal)
        {
            worker = dal.workers;
        }

        public void Create(Worker newWorker)
        {
            worker.Create(newWorker);
        }

        public async Task<List<Worker>> GetAll()
        {
            return await worker.Read();
        }

        public async Task<Worker> GetWorkerByIdAsync(int id)
        {
            var workers = await worker.Read();

            var work = workers.FirstOrDefault(c => c.Id == id);

            if (work == null)
            {
                throw new Exception("Customer is not found");
            }

            return work;
        }

        public async Task<Worker> WorkerDetails(int id)
        {
            var workers = await worker.Read(); 
            var workerDetails = workers.FirstOrDefault(w => w.Id == id);

            if (workerDetails == null)
            {
                return null;
            }

            return workerDetails;
        }
        public async Task DeleteWorker(int id)
        {
            var workers = await worker.Read();
            var workerToDelete = workers.FirstOrDefault(cust => cust.Id == id);

            if (workerToDelete != null)
            {
                worker.Delete(workerToDelete);
            }
            else
            {
                throw new Exception($"Worker with ID {id} not found.");
            }
        }
    }
}
