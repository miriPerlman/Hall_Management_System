
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLworker
    {
        public void Create(Worker worker);
        public Task<Worker> GetWorkerByIdAsync(int id);
        public Task<List<Worker>> GetAll();
        public Task<Worker> WorkerDetails(int id);
        public Task DeleteWorker(int id);

    }
}
